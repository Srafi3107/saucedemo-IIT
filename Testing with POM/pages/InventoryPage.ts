import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async addItemToCartByName(productName: string) {
    // Converts "Sauce Labs Backpack" -> "add-to-cart-sauce-labs-backpack"
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-${formattedName}"]`).click();
  }

  async sortBy(optionValue: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(optionValue);
  }

  async openCart() {
    await this.cartLink.click();
  }
}