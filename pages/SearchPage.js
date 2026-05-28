export class SearchPage {
    constructor(page) {
        this.page = page;

        this.products = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.addToCartBtn = page.locator('[data-test^="add-to-cart"]');
        this.removeBtn = page.locator('[data-test^="remove"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartItems = page.locator('.cart_item');
    }

    async addProduct(index = 0) {
        await this.addToCartBtn.nth(index).click();
    }

    async removeProduct(index = 0) {
        await this.removeBtn.nth(index).click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async sortProducts(option) {
        await this.sortDropdown.selectOption(option);
    }
}