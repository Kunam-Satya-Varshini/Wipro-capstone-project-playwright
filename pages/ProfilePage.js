export class ProfilePage {
    constructor(page) {
        this.page = page;

        this.menuBtn = page.locator('#react-burger-menu-btn');
        this.logoutBtn = page.locator('#logout_sidebar_link');

        this.inventoryItems = page.locator('.inventory_item');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.appLogo = page.locator('.app_logo');

        this.menuPanel = page.locator('.bm-menu-wrap');
        this.productImages = page.locator('.inventory_item_img');
    }

    async openMenu() {
        await this.menuBtn.waitFor({ state: 'visible' });
        await this.menuBtn.click();
        await this.menuPanel.waitFor({ state: 'visible' });
    }

    async logout() {
        await this.openMenu();
        await this.logoutBtn.waitFor({ state: 'visible' });
        await this.logoutBtn.click();
    }

    async getProductCount() {
        await this.inventoryItems.first().waitFor({ state: 'visible' });
        return await this.inventoryItems.count();
    }
}