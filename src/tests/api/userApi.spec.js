const { test, expect } = require('@playwright/test');

test.describe('API tests', () => {
  test('GET request returns 200 and valid data', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');
  });
});
