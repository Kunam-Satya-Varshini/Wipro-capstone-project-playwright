import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test.describe('Search Service - Sauce Demo', () => {

    let search;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        await expect(page).toHaveURL(/inventory/);

        search = new SearchPage(page);
    });

    test('SEARCH_001 verify products visible', async () => {
        await expect(search.products).toHaveCount(6);
    });

    test('SEARCH_002 verify product names visible', async () => {
        await expect(search.productNames.first()).toBeVisible();
    });

    test('SEARCH_003 verify add to cart button visible', async () => {
        await expect(search.addToCartBtn.first()).toBeVisible();
    });

    test('SEARCH_004 add single product', async ({ page }) => {
        await search.addProduct(0);
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('SEARCH_005 add multiple products', async ({ page }) => {
        await search.addProduct(0);
        await search.addProduct(1);

        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    test('SEARCH_006 remove product from cart', async ({ page }) => {
        await search.addProduct(0);
        await search.removeProduct(0);

        await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    });

    test('SEARCH_007 open cart page', async ({ page }) => {
        await search.openCart();
        await expect(page).toHaveURL(/cart/);
    });

    test('SEARCH_008 verify cart icon visible', async () => {
        await expect(search.cartIcon).toBeVisible();
    });

    test('SEARCH_009 verify sorting dropdown visible', async () => {
        await expect(search.sortDropdown).toBeVisible();
    });

    test('SEARCH_010 sort A to Z', async () => {
        await search.sortProducts('az');
        await expect(search.productNames.first()).toBeVisible();
    });

    test('SEARCH_011 sort Z to A', async () => {
        await search.sortProducts('za');
        await expect(search.productNames.first()).toBeVisible();
    });

    test('SEARCH_012 sort price low to high', async () => {
        await search.sortProducts('lohi');
        await expect(search.products.first()).toBeVisible();
    });

    test('SEARCH_013 sort price high to low', async () => {
        await search.sortProducts('hilo');
        await expect(search.products.first()).toBeVisible();
    });

    test('SEARCH_014 full cart flow validation', async () => {
        await search.addProduct(0);
        await search.openCart();

        await expect(search.cartItems).toHaveCount(1);
    });

    test('SEARCH_015 verify inventory page loaded after login', async ({ page }) => {
        await expect(page).toHaveURL(/inventory/);
    });

});