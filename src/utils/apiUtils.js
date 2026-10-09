const config = require('../config/config');

class ApiUtils {
  constructor(request) {
    this.request = request;
  }

  async get(endpoint, options = {}) {
    return this.request.get(`${config.api.baseUrl}${endpoint}`, options);
  }

  async post(endpoint, body, options = {}) {
    return this.request.post(`${config.api.baseUrl}${endpoint}`, {
      data: body,
      ...options,
    });
  }

  async put(endpoint, body, options = {}) {
    return this.request.put(`${config.api.baseUrl}${endpoint}`, {
      data: body,
      ...options,
    });
  }

  async delete(endpoint, options = {}) {
    return this.request.delete(`${config.api.baseUrl}${endpoint}`, options);
  }
}

module.exports = ApiUtils;
