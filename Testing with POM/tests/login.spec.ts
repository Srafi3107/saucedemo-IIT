import { test, expect } from '../fixtures/pomFixtures';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC01: Successful login with standard user', async ({ loginPage, inventoryPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC02: Locked out user displays error message', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('TC03: Invalid credentials show error message', async ({ loginPage }) => {
    await loginPage.login('invalid_user', 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });
});