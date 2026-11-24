import { test, expect } from '../fixtures/pomFixtures';

test.describe('End-to-End Checkout Tests', () => {
  test('TC07: Complete end-to-end checkout flow', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2. Add product & go to cart
    await inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');
    await inventoryPage.openCart();

    // 3. Checkout & fill details
    await cartPage.proceedToCheckout();
    await checkoutPage.fillShippingDetails('Jane', 'Doe', '10001');

    // 4. Finish & verify confirmation
    await checkoutPage.finishOrder();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });
});