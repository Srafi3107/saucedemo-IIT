import { test, expect } from '../fixtures/pomFixtures';

test.describe('Inventory & Cart Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('TC04: Add single item to cart updates badge count', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('TC05: Remove item from cart updates item list', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    await inventoryPage.openCart();

    await cartPage.removeItemByName('Sauce Labs Backpack');
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  test('TC06: Sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const pricesText = await inventoryPage.itemPrices.allInnerTexts();
    const numericPrices = pricesText.map((p) => parseFloat(p.replace('$', '')));

    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  });
});