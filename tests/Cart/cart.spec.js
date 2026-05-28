import { test, expect } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart Service - Sauce Demo', () => {

    test.beforeEach(async ({ page }) => {

        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await page.locator('.inventory_list').waitFor();
    });

    test('CART_001 add single product', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await expect(cart.cartIcon).toContainText('1');
    });

    test('CART_002 add multiple products', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.addProduct(1);
        await expect(cart.cartIcon).toContainText('2');
    });

    test('CART_003 open cart page', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.openCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('CART_004 verify cart items visible', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.openCart();
        await expect(cart.cartItems.first()).toBeVisible();
    });

    test('CART_005 remove single item', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.openCart();
        await cart.removeProduct(0);
        await expect(cart.cartItems).toHaveCount(0);
    });

    test('CART_006 remove multiple items', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.addProduct(1);
        await cart.openCart();
        await cart.removeProduct(0);
        await cart.removeProduct(0);
        await expect(cart.cartItems).toHaveCount(0);
    });

    test('CART_007 verify checkout button visible', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.openCart();
        await expect(cart.checkoutBtn).toBeVisible();
    });

    test('CART_008 verify continue shopping button', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.openCart();
        await expect(cart.continueShopping).toBeVisible();
    });

    test('CART_009 verify cart badge increases', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.addProduct(1);
        await expect(cart.cartIcon).toContainText('2');
    });

    test('CART_010 verify cart page URL', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.openCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('CART_011 verify product persists after refresh', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await page.reload();
        await expect(cart.cartIcon).toContainText('1');
    });

    test('CART_012 verify remove button visible', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.openCart();
        await expect(cart.removeButtons.first()).toBeVisible();
    });

    test('CART_013 verify empty cart state', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.openCart();
        await expect(cart.cartItems).toHaveCount(0);
    });

    test('CART_014 verify cart badge consistency after multiple actions', async ({ page }) => {

    const addButtons = page.locator('[data-test^="add-to-cart"]');

    // Add 3 products
    await addButtons.nth(0).click();
    await addButtons.nth(1).click();
    await addButtons.nth(2).click();

    // Verify badge = 3
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

    // Remove 1 product
    const removeButtons = page.locator('[data-test^="remove"]');
    await removeButtons.nth(0).click();

    // Verify badge updates
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
});

    test('CART_015 final cart stability check', async ({ page }) => {
        const cart = new CartPage(page);
        await cart.addProduct(0);
        await cart.openCart();
        await expect(cart.cartItems.first()).toBeVisible();
    });

});