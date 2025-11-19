const { APIClient } = require('../utils/apiclient');

class TokenManager {
  constructor() {
    this.token = null;
    this.tokenExpiry = null;
  }

  // Get token by making login request
  async getToken(authURL, clientId, clientSecret) {
    try {
      // Check if token exists and is not expired
      if (this.token && this.isTokenValid()) {
        console.log('✓ Using cached token');
        return this.token;
      }

      console.log('🔄 Fetching new bearer token...');
      
      const client = new APIClient('');
      const loginPayload = {
        clientId: clientId,
        clientSecret: clientSecret
      };

      const response = await client.post(authURL, loginPayload);

      if (response.statusCode === 200 || response.statusCode === 201) {
        // Extract token from response
        // Adjust the path based on your API response structure
        this.token = response.body.token || response.body.accessToken || response.body.data?.token;
        
        // Store expiry time (default 1 hour if not provided)
        const expiresIn = response.body.expiresIn || 3600;
        this.tokenExpiry = Date.now() + (expiresIn * 1000);
        
        console.log(`✓ Bearer token obtained successfully`);
        return this.token;
      } else {
        throw new Error(`Authentication failed with status ${response.statusCode}: ${JSON.stringify(response.body)}`);
      }
    } catch (error) {
      console.error('✗ Error obtaining bearer token:', error.message);
      throw error;
    }
  }

  // Check if token is still valid (not expired)
  isTokenValid() {
    if (!this.token || !this.tokenExpiry) {
      return false;
    }
    return Date.now() < this.tokenExpiry;
  }

  // Get current token
  getStoredToken() {
    return this.token;
  }

  // Clear token
  clearToken() {
    this.token = null;
    this.tokenExpiry = null;
    console.log('✓ Token cleared');
  }

  // Get authorization header
  getAuthHeader() {
    if (!this.token) {
      return {};
    }
    return {
      'Authorization': `Bearer ${this.token}`
    };
  }
}

module.exports = new TokenManager();