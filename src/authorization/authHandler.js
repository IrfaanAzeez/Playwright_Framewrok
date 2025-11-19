const TokenManager = require('./tokenManager');

class AuthHandler {
  constructor() {
    this.tokens = {};
    this.credentials = {};
  }

  // Store credentials
  setCredentials(username, password) {
    this.credentials = { username, password };
  }

  // Get stored credentials
  getCredentials() {
    return this.credentials;
  }

  // Store token after login
  setToken(tokenKey, tokenValue) {
    this.tokens[tokenKey] = tokenValue;
  }

  // Get token
  getToken(tokenKey = 'authToken') {
    return this.tokens[tokenKey];
  }

  // Check if token exists
  hasToken(tokenKey = 'authToken') {
    return !!this.tokens[tokenKey];
  }

  // Clear all tokens
  clearTokens() {
    this.tokens = {};
  }

  // Clear specific token
  clearToken(tokenKey) {
    delete this.tokens[tokenKey];
  }

  // Clear all auth data
  clearAll() {
    this.tokens = {};
    this.credentials = {};
    TokenManager.clearToken();
  }

  // Build authorization header
  getAuthHeader(tokenKey = 'authToken') {
    const token = this.getToken(tokenKey);
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  // Get Bearer token using TokenManager
  async getBearerToken(authURL, clientId, clientSecret) {
    const token = await TokenManager.getToken(authURL, clientId, clientSecret);
    this.setToken('bearerToken', token);
    return token;
  }

  // Get Bearer auth header
  getBearerAuthHeader() {
    return TokenManager.getAuthHeader();
  }
}

let authHandlerInstance = null;

function getAuthHandler() {
  if (!authHandlerInstance) {
    authHandlerInstance = new AuthHandler();
  }
  return authHandlerInstance;
}

module.exports = { AuthHandler, getAuthHandler };