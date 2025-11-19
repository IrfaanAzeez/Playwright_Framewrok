class BaseResponse {
  constructor(responseData = {}) {
    // allow undefined or partial responseData
    this.statusCode = responseData.statusCode ?? responseData.status ?? null;
    this.body = responseData.body ?? responseData.data ?? null;
    this.headers = responseData.headers ?? {};
  }

  getStatusCode() {
    return this.statusCode;
  }

  getBody() {
    return this.body;
  }

  getHeaders() {
    return this.headers;
  }

  isSuccess() {
    return typeof this.statusCode === 'number' && this.statusCode >= 200 && this.statusCode < 300;
  }

  getBodyProperty(propertyPath) {
    if (!this.body) return undefined;
    return propertyPath.split('.').reduce((obj, prop) => obj?.[prop], this.body);
  }
}

module.exports = BaseResponse;