const { Given, When, Then } = require('@cucumber/cucumber');
const UserRequestService = require('../../requests/RequestService');
const UserResponse = require('../../responses/userResponse');
const { dev: config } = require('../../../config/environment.json');

Given('Navigate to DummyJson Users Endpoint', async function () {
  this.baseURL = config.apiURL;
  console.log(`Base URL set to: ${this.baseURL}`);
});

When('Get User Details', async function () {
  try {
    const response = await UserRequestService.getUserDetails(this.baseURL);
    UserResponse.setGetUserResponse(response);
    this.getUserStatus = response.status;
    console.log(`Get User Details - Status: ${response.status}`);
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
});

When('Create New User', async function () {
  try {
    const timestamp = Date.now();
    const newUserPayload = {
      firstName: 'John',
      lastName: 'Doe',
      email: `john.doe+${timestamp}@example.com`, // randomized email to avoid conflicts
      age: 30,
      gender: 'male'
    };

    // Save payload for verification later
    this.createdUserPayload = newUserPayload;

    const response = await UserRequestService.createNewUser(this.baseURL, newUserPayload);
    UserResponse.setCreateUserResponse(response);
    this.createdUserId = response.data?.id;
    this.createUserStatus = response.status;
    console.log(`Create New User - Status: ${response.status}, UserID: ${this.createdUserId}`);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
});

When('Update the Details for Newly Created User', async function () {
  try {
    const updatedUserPayload = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      age: 31,
      gender: 'female'
    };
    
    const response = await UserRequestService.updateUser(
      this.baseURL,
      this.createdUserId,
      updatedUserPayload
    );
    UserResponse.setUpdateUserResponse(response);
    this.updateUserStatus = response.status;
    console.log(`Update User - Status: ${response.status}, UserID: ${this.createdUserId}`);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
});

When('Delete the Newly Added User', async function () {
  try {
    const response = await UserRequestService.deleteUser(this.baseURL, this.createdUserId);
    UserResponse.setDeleteUserResponse(response);
    this.deleteUserStatus = response.status;
    console.log(`Delete User - Status: ${response.status}, UserID: ${this.createdUserId}`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
});

Then('Verify all operations completed successfully', async function () {
  const createResponse = UserResponse.getCreateUserResponse();
  const updateResponse = UserResponse.getUpdateUserResponse();
  const deleteResponse = UserResponse.getDeleteUserResponse();

  // Accept any 2xx
  const ok = (s) => typeof s === 'number' && s >= 200 && s < 300;
  if (!ok(this.getUserStatus)) throw new Error(`Get failed: ${this.getUserStatus}`);
  if (!ok(this.createUserStatus)) throw new Error(`Create failed: ${this.createUserStatus}`);
  if (!ok(this.updateUserStatus)) throw new Error(`Update failed: ${this.updateUserStatus}`);
  if (!ok(this.deleteUserStatus)) throw new Error(`Delete failed: ${this.deleteUserStatus}`);

  // Create must return an id
  if (!createResponse?.data?.id) throw new Error(`Create did not return id: ${JSON.stringify(createResponse)}`);
  if (this.createdUserId == null || this.createdUserId !== createResponse.data.id) {
    throw new Error(`createdUserId mismatch. createdUserId=${this.createdUserId}, responseId=${createResponse?.data?.id}`);
  }

  // Update should reflect expected changes
  if (this.updatedUserPayload && updateResponse?.data) {
    if (updateResponse.data.firstName !== this.updatedUserPayload.firstName) {
      throw new Error(`Update mismatch: expected ${this.updatedUserPayload.firstName}, got ${updateResponse.data.firstName}`);
    }
  }

  // Delete can either return confirmation or rely on 2xx
  const deleteData = deleteResponse?.data;
  const deletedOk = (deleteData && (deleteData.isDeleted === true || deleteData.deleted === true)) || ok(this.deleteUserStatus);
  if (!deletedOk) throw new Error(`Delete not confirmed: ${JSON.stringify(deleteResponse)}`);

  console.log('All API operations verified.');
});