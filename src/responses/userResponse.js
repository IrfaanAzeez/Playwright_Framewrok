const BaseResponse = require('./baseResponse');

class UserResponse extends BaseResponse {
  constructor() {
    super();
    this.getUserResponseData = null;
    this.createUserResponseData = null;
    this.updateUserResponseData = null;
    this.deleteUserResponseData = null;
  }

  setGetUserResponse(response) {
    this.getUserResponseData = response;
    console.log('Get User Response stored:', response);
  }

  getGetUserResponse() {
    return this.getUserResponseData;
  }

  setCreateUserResponse(response) {
    this.createUserResponseData = response;
    console.log('Create User Response stored:', response);
  }

  getCreateUserResponse() {
    return this.createUserResponseData;
  }

  setUpdateUserResponse(response) {
    this.updateUserResponseData = response;
    console.log('Update User Response stored:', response);
  }

  getUpdateUserResponse() {
    return this.updateUserResponseData;
  }

  setDeleteUserResponse(response) {
    this.deleteUserResponseData = response;
    console.log('Delete User Response stored:', response);
  }

  getDeleteUserResponse() {
    return this.deleteUserResponseData;
  }

  validateGetUserResponseStatus(expectedStatus) {
    return this.getUserResponseData.status === expectedStatus;
  }

  validateCreateUserResponseStatus(expectedStatus) {
    return this.createUserResponseData.status === expectedStatus;
  }

  validateUpdateUserResponseStatus(expectedStatus) {
    return this.updateUserResponseData.status === expectedStatus;
  }

  validateDeleteUserResponseStatus(expectedStatus) {
    return this.deleteUserResponseData.status === expectedStatus;
  }

  clearAllResponses() {
    this.getUserResponseData = null;
    this.createUserResponseData = null;
    this.updateUserResponseData = null;
    this.deleteUserResponseData = null;
  }
}

module.exports = new UserResponse();