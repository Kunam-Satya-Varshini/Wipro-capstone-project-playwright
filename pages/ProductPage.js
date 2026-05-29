export class ProductPage {
    constructor(page) {
        this.page = page;

        this.title = page.locator('.title');
        this.products = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.addToCartButtons = page.locator('button.btn_inventory');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    }

    async addProduct(index = 0) {
        await this.addToCartButtons.nth(index).click();
    }

    async openCart() {
        await this.cartIcon.click();
    }
}