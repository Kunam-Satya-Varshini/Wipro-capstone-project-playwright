import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout Service - Sauce Demo', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        // Add a product so checkout is possible
        await page.locator('[data-test^="add-to-cart"]').first().click();
    });

    test('CHECKOUT_001 open cart page', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('CHECKOUT_002 verify checkout button visible', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await expect(checkout.checkoutBtn).toBeVisible();
    });

    test('CHECKOUT_003 proceed to checkout step one', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();

        await expect(page).toHaveURL(/checkout-step-one/);
    });

    test('CHECKOUT_004 validate empty form error', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();
        await checkout.continueCheckout();

        await expect(checkout.errorMsg).toBeVisible();
    });

    test('CHECKOUT_005 validate first name required', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();

        await checkout.fillCheckoutInfo('', 'Doe', '12345');
        await checkout.continueCheckout();

        await expect(checkout.errorMsg).toBeVisible();
    });

    test('CHECKOUT_006 validate last name required', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();

        await checkout.fillCheckoutInfo('John', '', '12345');
        await checkout.continueCheckout();

        await expect(checkout.errorMsg).toBeVisible();
    });

    test('CHECKOUT_007 validate postal code required', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();

        await checkout.fillCheckoutInfo('John', 'Doe', '');
        await checkout.continueCheckout();

        await expect(checkout.errorMsg).toBeVisible();
    });

    test('CHECKOUT_008 valid checkout step one', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();

        await checkout.fillCheckoutInfo('John', 'Doe', '12345');
        await checkout.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two/);
    });

    test('CHECKOUT_009 verify checkout overview page', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();
        await checkout.fillCheckoutInfo('John', 'Doe', '12345');
        await checkout.continueCheckout();

        await expect(page.locator('.cart_list')).toBeVisible();
    });

    test('CHECKOUT_010 verify finish button visible', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();
        await checkout.fillCheckoutInfo('John', 'Doe', '12345');
        await checkout.continueCheckout();

        await expect(checkout.finishBtn).toBeVisible();
    });

    test('CHECKOUT_011 complete checkout successfully', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();
        await checkout.fillCheckoutInfo('John', 'Doe', '12345');
        await checkout.continueCheckout();
        await checkout.finishCheckout();

        await expect(checkout.successMsg).toHaveText('Thank you for your order!');
    });

    test('CHECKOUT_012 verify back home button', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();
        await checkout.fillCheckoutInfo('John', 'Doe', '12345');
        await checkout.continueCheckout();
        await checkout.finishCheckout();

        await expect(checkout.backHomeBtn).toBeVisible();
    });

    test('CHECKOUT_013 cancel checkout flow', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();

        await checkout.cancelBtn.click();

        await expect(page).toHaveURL(/cart/);
    });

    test('CHECKOUT_014 validate form persistence', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();

        await checkout.fillCheckoutInfo('John', 'Doe', '12345');

        await expect(checkout.firstName).toHaveValue('John');
    });

    test('CHECKOUT_015 full end-to-end checkout flow', async ({ page }) => {
        const checkout = new CheckoutPage(page);

        await checkout.openCart();
        await checkout.proceedToCheckout();
        await checkout.fillCheckoutInfo('John', 'Doe', '12345');
        await checkout.continueCheckout();
        await checkout.finishCheckout();

        await expect(page.locator('.complete-header')).toBeVisible();
    });

});