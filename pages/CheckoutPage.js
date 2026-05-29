export class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Cart page
        this.cartIcon = page.locator('.shopping_cart_link');
        this.checkoutBtn = page.locator('#checkout');

        // Checkout Step 1
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueBtn = page.locator('#continue');

        // Checkout Step 2 (overview)
        this.finishBtn = page.locator('#finish');
        this.cancelBtn = page.locator('#cancel');

        // Confirmation
        this.successMsg = page.locator('.complete-header');
        this.backHomeBtn = page.locator('#back-to-products');

        // Error
        this.errorMsg = page.locator('[data-test="error"]');
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click();
    }

    async fillCheckoutInfo(first, last, zip) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
    }

    async continueCheckout() {
        await this.continueBtn.click();
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }
}