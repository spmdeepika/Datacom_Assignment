import { Locator, Page } from '@playwright/test';

export class RegisterFormPage {

    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly phoneNumber: Locator;
    readonly country: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly registerButton: Locator;
    readonly termsAndCondition: Locator;
    readonly alertMessage: Locator;
    readonly resultFName: Locator;
    readonly resultLName: Locator;
    readonly resultPhone: Locator;
    readonly resultEmail: Locator;
    readonly resultCounty: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.phoneNumber = page.locator('#phone');
        this.country = page.locator('#countries_dropdown_menu');
        this.email = page.locator('#emailAddress');
        this.password = page.locator('#password');
        this.registerButton = page.locator('#registerBtn');
        this.termsAndCondition = page.locator('#exampleCheck1');
        this.alertMessage = page.locator('#message');
        this.resultFName = page.locator('#resultFn');
        this.resultLName = page.locator('#resultLn');
        this.resultPhone = page.locator('#resultPhone');
        this.resultEmail = page.locator('#resultEmail');
        this.resultCounty = page.locator('#country');
    }

    async navigateToRegisterPage(baseUrl: string) {
        await this.page.goto(baseUrl + '/bugs-form');
    }

    async clickOnRegister() {
        await this.registerButton.click();
    }

    async selectTandCCheckBox() {
        await this.termsAndCondition.check();
    }

    async selectCountry(country: string) {
        await this.country.selectOption(country);
    }

    async getFieldLabelName(fieldIdAttributeName: string) {
        const locatorLabel = this.page.locator(`//input[@id="${fieldIdAttributeName}"]/preceding-sibling::label`);
        const labelName = await locatorLabel.textContent();
        return labelName;
    }

    async fillForm(lastName: string, phoneNumber: string, email: string, password: string, firstName?: string, country?: string) {
        await this.lastName.fill(lastName);
        await this.phoneNumber.fill(phoneNumber);
        await this.email.fill(email);
        await this.password.fill(password);
        if (firstName) {
            await this.firstName.fill(firstName);
        }
        if (country) {
            await this.selectCountry(country);
        }
    }
}