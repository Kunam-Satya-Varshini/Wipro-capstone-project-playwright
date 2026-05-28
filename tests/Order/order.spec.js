import { test, expect } from '@playwright/test';
import { OrderPage } from '../../pages/OrderPage';

test.describe('Order Service - Sauce Demo', () => {

    let order;

    test.beforeEach(async ({ page }) => {
        order = new OrderPage(page);

        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory/);
    });

    // ORDER_001
    test('ORDER_001 verify login success', async ({ page }) => {
        await expect(page).toHaveURL(/inventory/);
    });

    // ORDER_002
    test('ORDER_002 verify products visible', async () => {
        await expect(order.addToCartBtn.first()).toBeVisible();
    });

    // ORDER_003
    test('ORDER_003 add single product to cart', async () => {
        await order.addProduct(0);
        await expect(order.cartIcon).toBeVisible();
    });

    // ORDER_004
    test('ORDER_004 add product and verify cart badge', async () => {
        await order.addProduct(0);
        await expect(order.cartIcon).toBeVisible();
    });

    // ORDER_005
    test('ORDER_005 open cart page', async ({ page }) => {
        await order.openCart();
        await expect(page).toHaveURL(/cart/);
    });

    // ORDER_006
    test('ORDER_006 verify checkout button visible', async () => {
        await order.openCart();
        await expect(order.checkoutBtn).toBeVisible();
    });

    // ORDER_007
    test('ORDER_007 navigate to checkout step one', async ({ page }) => {
        await order.openCart();
        await order.checkout();
        await expect(page).toHaveURL(/checkout-step-one/);
    });

    // ORDER_008
    test('ORDER_008 empty checkout validation', async () => {
        await order.openCart();
        await order.checkout();
        await order.continue();
        await expect(order.errorMsg).toBeVisible();
    });

    // ORDER_009
    test('ORDER_009 fill checkout form', async ({ page }) => {
        await order.openCart();
        await order.checkout();

        await order.fillInfo('John', 'Doe', '12345');
        await order.continue();

        await expect(page).toHaveURL(/checkout-step-two/);
    });

    // ORDER_010
    test('ORDER_010 verify overview page', async ({ page }) => {
        await order.openCart();
        await order.checkout();
        await order.fillInfo('John', 'Doe', '12345');
        await order.continue();

        await expect(page.locator('.cart_list')).toBeVisible();
    });

    // ORDER_011
    test('ORDER_011 verify finish button', async () => {
        await order.openCart();
        await order.checkout();
        await order.fillInfo('John', 'Doe', '12345');
        await order.continue();

        await expect(order.finishBtn).toBeVisible();
    });

    // ORDER_012
    test('ORDER_012 complete order successfully', async () => {
        await order.openCart();
        await order.checkout();
        await order.fillInfo('John', 'Doe', '12345');
        await order.continue();
        await order.finish();

        await expect(order.successMsg).toHaveText('Thank you for your order!');
    });

    // ORDER_013
    test('ORDER_013 verify order confirmation text', async () => {
        await order.openCart();
        await order.checkout();
        await order.fillInfo('John', 'Doe', '12345');
        await order.continue();
        await order.finish();

        await expect(order.orderText).toBeVisible();
    });

    // ORDER_014
    test('ORDER_014 back to home button visible', async () => {
        await order.openCart();
        await order.checkout();
        await order.fillInfo('John', 'Doe', '12345');
        await order.continue();
        await order.finish();

        await expect(order.backHomeBtn).toBeVisible();
    });

    // ORDER_015
    test('ORDER_015 full end-to-end order flow', async () => {
        await order.addProduct(0);
        await order.openCart();
        await order.checkout();
        await order.fillInfo('John', 'Doe', '12345');
        await order.continue();
        await order.finish();

        await expect(order.successMsg).toBeVisible();
    });

});