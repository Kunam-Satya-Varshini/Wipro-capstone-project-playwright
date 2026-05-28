export class WishlistPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.inventoryItems = page.locator('.inventory_item');
        this.addToCartButtons = page.locator('button.btn_inventory');
        this.removeButtons = page.locator('[data-test^="remove"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async waitForInventory() {
        await this.page.waitForSelector('.inventory_item', {
            state: 'visible',
            timeout: 20000
        });
    }

    async addFirstItem() {
        await this.addToCartButtons.first().click();
    }

    async addItemByIndex(index) {
        await this.addToCartButtons.nth(index).click();
    }

    async addMultipleItems(count) {
        for (let i = 0; i < count; i++) {
            await this.addToCartButtons.nth(i).click();
        }
    }

    async removeFirstItem() {
        await this.removeButtons.first().click();
    }

    async openCart() {
        await this.cartIcon.click();
    }

    async getInventoryCount() {
        return await this.inventoryItems.count();
    }
}