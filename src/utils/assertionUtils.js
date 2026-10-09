class AssertionUtils {
  static async expectStatus(response, expectedStatus) {
    if (response.status() !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus} but got ${response.status()}`);
    }
  }

  static async expectBodyContains(response, field, value) {
    const body = await response.json();
    if (!body[field] || body[field] !== value) {
      throw new Error(`Expected ${field}=${value} in response body but got ${JSON.stringify(body)}`);
    }
  }
}

module.exports = AssertionUtils;
