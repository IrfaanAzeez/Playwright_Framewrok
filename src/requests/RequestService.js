const { APIClient } = require('../utils/apiclient');
const { AuthHandler, getAuthHandler } = require('../authorization/authHandler');

class UserRequestService {
  async _callApi(method, fullUrl, body = null, headers = {}) {
    // Get auth header if bearer token exists
    const authHandler = getAuthHandler();
    const authHeader = authHandler.getBearerAuthHeader();
    
    // Merge auth header with any additional headers
    const mergedHeaders = {
      ...authHeader,
      ...headers
    };

    // fullUrl should be a full URL
    const client = new APIClient('');
    let apiResponse;
    
    switch (method.toUpperCase()) {
      case 'GET':
        apiResponse = await client.get(fullUrl, mergedHeaders);
        break;
      case 'POST':
        apiResponse = await client.post(fullUrl, body, mergedHeaders);
        break;
      case 'PUT':
        apiResponse = await client.put(fullUrl, body, mergedHeaders);
        break;
      case 'DELETE':
        apiResponse = await client.delete(fullUrl, mergedHeaders);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    return {
      status: apiResponse.statusCode,
      data: apiResponse.body,
      headers: apiResponse.headers
    };
  }

  async getUserDetails(baseURL) {
    const full = `${baseURL}/products/1`;
    return this._callApi('GET', full);
  }

  async createNewUser(baseURL, payload) {
    const full = `${baseURL}/products/add`;
    return this._callApi('POST', full, payload);
  }

  async updateUser(baseURL, userId, payload) {
    const full = `${baseURL}/products/${userId}`;
    return this._callApi('PUT', full, payload);
  }

  async deleteUser(baseURL, userId) {
    const full = `${baseURL}/products/${userId}`;
    return this._callApi('DELETE', full);
  }
}

module.exports = new UserRequestService();