export class OrderPage {
    constructor(page) {
        this.page = page;

        // Inventory page
        this.addToCartBtn = page.locator('[data-test^="add-to-cart"]');
        this.cartIcon = page.locator('.shopping_cart_link');

        // Cart page
        this.checkoutBtn = page.locator('#checkout');

        // Checkout form
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');

        // Error (added for negative test coverage)
        this.errorMsg = page.locator('[data-test="error"]');

        // Overview
        this.finishBtn = page.locator('#finish');

        // Order confirmation
        this.successMsg = page.locator('.complete-header');
        this.orderText = page.locator('.complete-text');
        this.backHomeBtn = page.locator('#back-to-products');
    }

    // Add product to cart (supports multiple products)
    async addProduct(index = 0) {
        await this.addToCartBtn.nth(index).click();
    }

    // Navigate to cart
    async openCart() {
        await this.cartIcon.click();
    }

    // Go to checkout page
    async checkout() {
        await this.checkoutBtn.click();
    }

    // Fill checkout form
    async fillInfo(first, last, zip) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
    }

    // Continue checkout flow
    async continue() {
        await this.continueBtn.click();
    }

    // Finish order
    async finish() {
        await this.finishBtn.click();
    }

    // Helper: full checkout flow (added for reusability)
    async completeOrder(first, last, zip) {
        await this.checkout();
        await this.fillInfo(first, last, zip);
        await this.continue();
        await this.finish();
    }
}