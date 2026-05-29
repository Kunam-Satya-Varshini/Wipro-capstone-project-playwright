import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.describe('Product Service - Sauce Demo', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    });

    test('PROD_001 verify product page loaded', async ({ page }) => {
        const prod = new ProductPage(page);
        await expect(prod.title).toHaveText('Products');
    });

    test('PROD_002 verify product list visible', async ({ page }) => {
    const prod = new ProductPage(page);

    const count = await prod.products.count();

    expect(count).toBeGreaterThan(0);
});
    test('PROD_003 verify product names visible', async ({ page }) => {
        const prod = new ProductPage(page);
        await expect(prod.productNames.first()).toBeVisible();
    });

    test('PROD_004 verify product prices visible', async ({ page }) => {
        const prod = new ProductPage(page);
        await expect(prod.productPrices.first()).toBeVisible();
    });

    test('PROD_005 add first product to cart', async ({ page }) => {
        const prod = new ProductPage(page);
        await prod.addProduct(0);
        await expect(prod.cartIcon).toContainText('1');
    });

    test('PROD_006 add multiple products to cart', async ({ page }) => {
        const prod = new ProductPage(page);
        await prod.addProduct(0);
        await prod.addProduct(1);
        await expect(prod.cartIcon).toContainText('2');
    });

    test('PROD_007 verify cart navigation', async ({ page }) => {
        const prod = new ProductPage(page);
        await prod.openCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('PROD_008 verify sort dropdown visible', async ({ page }) => {
        const prod = new ProductPage(page);
        await expect(prod.sortDropdown).toBeVisible();
    });

    test('PROD_009 sort products (A to Z)', async ({ page }) => {
        const prod = new ProductPage(page);
        await prod.sortDropdown.selectOption('az');
        await expect(prod.productNames.first()).toBeVisible();
    });

    test('PROD_010 sort products (Z to A)', async ({ page }) => {
        const prod = new ProductPage(page);
        await prod.sortDropdown.selectOption('za');
        await expect(prod.productNames.first()).toBeVisible();
    });

    test('PROD_011 sort price low to high', async ({ page }) => {
        const prod = new ProductPage(page);
        await prod.sortDropdown.selectOption('lohi');
        await expect(prod.productPrices.first()).toBeVisible();
    });

    test('PROD_012 sort price high to low', async ({ page }) => {
        const prod = new ProductPage(page);
        await prod.sortDropdown.selectOption('hilo');
        await expect(prod.productPrices.first()).toBeVisible();
    });

    test('PROD_013 verify add to cart button visible', async ({ page }) => {
        const prod = new ProductPage(page);
        await expect(prod.addToCartButtons.first()).toBeVisible();
    });

    test('PROD_014 verify product count consistency', async ({ page }) => {
        const prod = new ProductPage(page);
        const count = await prod.products.count();
        expect(count).toBeGreaterThan(0);
    });

    test('PROD_015 verify page reload retains products', async ({ page }) => {
        const prod = new ProductPage(page);
        await page.reload();
        await expect(prod.products.first()).toBeVisible();
    });

});