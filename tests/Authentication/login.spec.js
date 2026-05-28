import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication Service - Sauce Demo', () => {

    test('AUTH_001 valid login', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('standard_user', 'secret_sauce');

        await expect(login.appLogo).toBeVisible();
    });

    test('AUTH_002 invalid username', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('wrong_user', 'secret_sauce');

        await expect(login.errorMsg).toBeVisible();
    });

    test('AUTH_003 invalid password', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('standard_user', 'wrong_pass');

        await expect(login.errorMsg).toBeVisible();
    });

    test('AUTH_004 empty username', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('', 'secret_sauce');

        await expect(login.errorMsg).toBeVisible();
    });

    test('AUTH_005 empty password', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('standard_user', '');

        await expect(login.errorMsg).toBeVisible();
    });

    test('AUTH_006 both fields empty', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('', '');

        await expect(login.errorMsg).toBeVisible();
    });

    test('AUTH_007 locked out user', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('locked_out_user', 'secret_sauce');

        await expect(login.errorMsg).toBeVisible();
    });

    test('AUTH_008 problem user login', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('problem_user', 'secret_sauce');

        await expect(login.appLogo).toBeVisible();
    });

    test('AUTH_009 performance glitch user login', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('performance_glitch_user', 'secret_sauce');

        await expect(login.appLogo).toBeVisible();
    });

    test('AUTH_010 verify login button visible', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await expect(login.loginBtn).toBeVisible();
    });

    test('AUTH_011 verify username field visible', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await expect(login.username).toBeVisible();
    });

    test('AUTH_012 verify password field visible', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await expect(login.password).toBeVisible();
    });

    test('AUTH_013 login page load', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await expect(page).toHaveURL(/saucedemo/);
    });

    test('AUTH_014 login after refresh', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('standard_user', 'secret_sauce');

        await page.reload();

        await expect(login.appLogo).toBeVisible();
    });

    test('AUTH_015 logout flow', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();
        await login.login('standard_user', 'secret_sauce');

        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');

        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

});