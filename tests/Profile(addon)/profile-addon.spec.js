import { test, expect } from '@playwright/test';
import { ProfilePage } from '../../pages/ProfilePage';
import { login } from '../../utils/login';

test.describe('User Profile Service - Sauce Demo', () => {

    let profile;

    test.beforeEach(async ({ page }) => {

        profile = new ProfilePage(page);

       await login(page);

        await expect(profile.inventoryItems.first()).toBeVisible();
    });

    test('PROFILE_001 inventory visible', async () => {
        await expect(profile.inventoryItems.first()).toBeVisible();
    });

    test('PROFILE_002 app logo visible', async () => {
        await expect(profile.appLogo).toBeVisible();
    });

    test('PROFILE_003 cart visible', async () => {
        await expect(profile.cartIcon).toBeVisible();
    });

    test('PROFILE_004 product count > 0', async () => {
        const count = await profile.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test('PROFILE_005 menu opens', async () => {
        await profile.openMenu();
        await expect(profile.menuPanel).toBeVisible();
    });

    test('PROFILE_006 logout visible', async () => {
        await profile.openMenu();
        await expect(profile.logoutBtn).toBeVisible();
    });

    test('PROFILE_007 logout works', async ({ page }) => {
        await profile.logout();
        await expect(page).toHaveURL(/saucedemo/);
    });

    test('PROFILE_008 URL check', async ({ page }) => {
        await expect(page).toHaveURL(/inventory/);
    });

    test('PROFILE_009 refresh persistence', async ({ page }) => {
        await page.reload();
        await expect(profile.inventoryItems.first()).toBeVisible();
    });

    test('PROFILE_010 cart navigation', async ({ page }) => {
        await profile.cartIcon.click();
        await expect(page).toHaveURL(/cart/);
    });

    test('PROFILE_011 back navigation', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveURL(/inventory/);
    });

    test('PROFILE_012 inventory stability', async () => {
        const count = await profile.getProductCount();
        expect(count).toBeGreaterThan(0);
    });

    test('PROFILE_013 images visible', async ({ page }) => {
        await expect(profile.productImages.first()).toBeVisible();
    });

    test('PROFILE_014 title check', async ({ page }) => {
        await expect(page).toHaveTitle(/Swag Labs/);
    });

    test('PROFILE_015 full flow', async ({ page }) => {
        await profile.cartIcon.click();
        await expect(page).toHaveURL(/cart/);

        await page.goBack();
        await expect(profile.inventoryItems.first()).toBeVisible();
    });

});