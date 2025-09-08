import { test as base } from '@playwright/test';
import { RegisterFormPage } from '../pages/register-form-page';

type PageClassObjectFixture = {
    registerFormPage: RegisterFormPage;
}

export const test = base.extend<PageClassObjectFixture>({
    registerFormPage: async ({ page }, use) => {
        await use(new RegisterFormPage(page));
    }
});

export { expect } from '@playwright/test';