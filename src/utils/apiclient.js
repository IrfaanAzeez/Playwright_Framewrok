const https = require('https');
const http = require('http');

class APIClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Make HTTP request (supports GET, POST, PUT, DELETE, PATCH)
  async request(method, endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      console.log('baseUrl:', this.baseUrl, 'endpoint:', endpoint);
      
      // Check if endpoint is already a full URL
      let url;
      if (/^https?:\/\//.test(endpoint)) {
        // It's a full URL, use it directly
        url = new URL(endpoint);
      } else {
        // It's a relative path, combine with baseUrl
        if (!this.baseUrl) {
          reject(new Error('baseUrl is required for relative endpoints'));
          return;
        }
        url = new URL(endpoint, this.baseUrl);
      }
      const isHttps = url.protocol === 'https:';
      const client = isHttps ? https : http;

      const requestOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      };

      const req = client.request(url, requestOptions, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const responseData = {
              statusCode: res.statusCode,
              body: data ? JSON.parse(data) : null,
              headers: res.headers
            };
            resolve(responseData);
          } catch (error) {
            resolve({
              statusCode: res.statusCode,
              body: data,
              headers: res.headers
            });
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      // Send request body if present
      if (options.body) {
        const bodyString = typeof options.body === 'string' 
          ? options.body 
          : JSON.stringify(options.body);
        req.write(bodyString);
      }

      req.end();
    });
  }

  // GET request
  async get(endpoint, headers = {}) {
    return this.request('GET', endpoint, { headers });
  }

  // POST request
  async post(endpoint, body, headers = {}) {
    return this.request('POST', endpoint, { 
      body, 
      headers 
    });
  }

  // PUT request
  async put(endpoint, body, headers = {}) {
    return this.request('PUT', endpoint, { 
      body, 
      headers 
    });
  }

  // DELETE request
  async delete(endpoint, headers = {}) {
    return this.request('DELETE', endpoint, { headers });
  }

  // PATCH request
  async patch(endpoint, body, headers = {}) {
    return this.request('PATCH', endpoint, { 
      body, 
      headers 
    });
  }
}

module.exports = { APIClient };