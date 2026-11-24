import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
  }

  async removeItemByName(productName: string) {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="remove-${formattedName}"]`).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}