export class CartPage {
    constructor(page) {
        this.page = page;

        this.inventory = page.locator('.inventory_list');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
        this.removeButtons = page.locator('[data-test^="remove"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartItems = page.locator('.cart_item');
        this.checkoutBtn = page.locator('#checkout');
        this.continueShopping = page.locator('#continue-shopping');
    }

    async waitForProducts() {
        await this.inventory.waitFor({ state: 'visible' });
    }

    async addProduct(index = 0) {
        const btn = this.addToCartButtons.nth(index);
        await btn.scrollIntoViewIfNeeded();
        await btn.click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async removeProduct(index = 0) {
        await this.removeButtons.nth(index).click();
    }
}