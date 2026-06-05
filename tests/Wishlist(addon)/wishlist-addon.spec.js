import { test, expect } from '@playwright/test';
import { WishlistPage } from '../../pages/WishlistPage';

test.describe('Wishlist Service - Sauce Demo ()', () => {

    let wishlist;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory/);

        wishlist = new WishlistPage(page);
        await wishlist.waitForInventory();
    });

    test('WISHLIST_001 verify inventory page loaded', async () => {
        await expect(wishlist.inventoryItems.first()).toBeVisible();
    });

    test('WISHLIST_002 verify inventory count > 0', async () => {
        const count = await wishlist.getInventoryCount();
        expect(count).toBeGreaterThan(0);
    });

    test('WISHLIST_003 verify add to cart buttons visible', async () => {
        await expect(wishlist.addToCartButtons.first()).toBeVisible();
    });

    test('WISHLIST_004 add single item to cart', async ({ page }) => {
        await wishlist.addFirstItem();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('WISHLIST_005 add item by index', async ({ page }) => {
        await wishlist.addItemByIndex(1);
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('WISHLIST_006 add multiple items using loop', async ({ page }) => {
        await wishlist.addMultipleItems(2);
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    test('WISHLIST_007 remove first item from cart', async ({ page }) => {
        await wishlist.addFirstItem();
        await wishlist.removeFirstItem();
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

    test('WISHLIST_008 open cart page', async () => {
        await wishlist.openCart();
        await expect(wishlist.page).toHaveURL(/cart/);
    });

    test('WISHLIST_009 cart icon visible', async () => {
        await expect(wishlist.cartIcon).toBeVisible();
    });

    test('WISHLIST_010 cart badge appears after add', async ({ page }) => {
        await wishlist.addFirstItem();
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    });

    test('WISHLIST_011 inventory stability check', async () => {
        const count = await wishlist.getInventoryCount();
        expect(count).toBeGreaterThan(0);
    });

    test('WISHLIST_012 add and remove flow validation', async ({ page }) => {
        await wishlist.addFirstItem();
        await wishlist.removeFirstItem();
        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

    test('WISHLIST_013 multiple add/remove cycle', async ({ page }) => {
        await wishlist.addItemByIndex(0);
        await wishlist.addItemByIndex(1);
        await wishlist.removeFirstItem();
        await expect(page.locator('.shopping_cart_badge')).toBeVisible();
    });

    test('WISHLIST_014 cart navigation after add', async ({ page }) => {
        await wishlist.addFirstItem();
        await wishlist.openCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('WISHLIST_015 full wishlist flow', async ({ page }) => {
        await wishlist.addFirstItem();
        await wishlist.addItemByIndex(1);
        await wishlist.openCart();

        await expect(page).toHaveURL(/cart/);
    });

});
