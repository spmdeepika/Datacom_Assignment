import { BASE_URL } from '../src/utils/settings';
import { expect, test } from '../src/fixtures/page-class-fixture';
import { faker } from '@faker-js/faker';

test.describe('Validate User Registration', () => {

  test.beforeEach(async ({ page, registerFormPage }) => {
    await registerFormPage.navigateToRegisterPage(BASE_URL);
    expect(page.url()).toContain("/bugs-form");
  });

  test('Validate with valid inputs user can register successfully', async ({ registerFormPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const country = 'New Zealand';
    const phoneNumber = '0273116426';
    const email = faker.internet.email();
    const password = faker.internet.password();

    await registerFormPage.fillForm(lastName, phoneNumber, email, password, firstName, country);
    await registerFormPage.termsAndCondition.check();
    await registerFormPage.registerButton.click();

    const message = await registerFormPage.alertMessage.textContent();
    expect(message).toEqual('Successfully registered the following information');
  });

  test('Validate registered user details shows correctly: field : Last Name', async ({ registerFormPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const country = 'New Zealand';
    const phoneNumber = '0273116426';
    const email = faker.internet.email();
    const password = faker.internet.password();

    await registerFormPage.fillForm(lastName, phoneNumber, email, password, firstName, country);
    await registerFormPage.registerButton.click();

    expect(await registerFormPage.resultLName.textContent()).toEqual(`Last Name: ${lastName}`);
  });

  test('Validate registered user details shows correctly: field : Phone Number', async ({ registerFormPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const country = 'New Zealand';
    const phoneNumber = '0273116426';
    const email = faker.internet.email();
    const password = faker.internet.password();

    await registerFormPage.fillForm(lastName, phoneNumber, email, password, firstName, country);
    await registerFormPage.registerButton.click();

    expect(await registerFormPage.resultPhone.textContent()).toEqual(`Phone Number: ${phoneNumber}`);
  });

  test('Validate with valid inputs but without T&C checked user can not register', async ({ registerFormPage }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const country = 'New Zealand';
    const phoneNumber = '0273116426';
    const email = faker.internet.email();
    const password = faker.internet.password();

    await registerFormPage.fillForm(lastName, phoneNumber, email, password, firstName, country);
    await registerFormPage.registerButton.click();

    const message = await registerFormPage.alertMessage.textContent();
    expect(message).not.toEqual('Successfully registered the following information');
  });

  test('Validate Terms and Condition check box is cliackable', async ({ registerFormPage }) => {
    const isTermsAndConditionEnabled = await registerFormPage.termsAndCondition.isEnabled();
    expect(isTermsAndConditionEnabled).toEqual(true);
  });

  test('Validate Register button should be disabled on page load', async ({ registerFormPage }) => {
    const isRegisterButtonDisabled = await registerFormPage.registerButton.isDisabled();
    expect(isRegisterButtonDisabled).toEqual(true);
  });

  [
    { fieldId: 'firstName', label: 'First Name' },
    { fieldId: 'lastName', label: 'Last Name*' },
    { fieldId: 'phone', label: 'Phone number*' },
    { fieldId: 'emailAddress', label: 'Email address*' },
    { fieldId: 'password', label: 'Password*' }
  ].forEach(({ fieldId, label }) => {
    test(`Validate field labels are correct for Field ${fieldId}`, async ({ registerFormPage }) => {
      expect(await registerFormPage.getFieldLabelName(fieldId)).toEqual(label);
    });
  });

  test('Validate password field is Masked', async ({ registerFormPage }) => {
    await expect(registerFormPage.password).toHaveAttribute('type', 'password');
  });

  test('Validate Last Name is mandatory', async ({ registerFormPage }) => {
    const firstName = faker.person.firstName();
    const country = 'New Zealand';
    const phoneNumber = '0273116426';
    const email = faker.internet.email();
    const password = faker.internet.password();

    await registerFormPage.fillForm('', phoneNumber, email, password, firstName, country);
    await registerFormPage.registerButton.click();

    const message = await registerFormPage.alertMessage.textContent();
    expect(message).not.toEqual('Successfully registered the following information');
  });

  [
    { email: 'Empty', value: '' },
    { email: 'Invalid', value: '123' },
  ].forEach(({ email, value }) => {
    test(`Validate when email is ${email} user can not register`, async ({ registerFormPage }) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const country = 'New Zealand';
      const phoneNumber = '0273116426';
      const password = faker.internet.password();

      await registerFormPage.fillForm(lastName, phoneNumber, value, password, firstName, country);

      await registerFormPage.registerButton.click();

      const message = await registerFormPage.alertMessage.textContent();
      expect(message).not.toEqual('Successfully registered the following information');
    });
  });

  [
    { phoneNumber: 'Empty', value: '' },
    { phoneNumber: 'Less than 10 digits', value: '123' },
    { phoneNumber: 'Greater than 10 digits', value: '1234567890' },
  ].forEach(({ phoneNumber, value }) => {
    test(`Validate when phone number is ${phoneNumber} user can see phone number validation`, async ({ registerFormPage }) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const country = 'New Zealand';
      const email = faker.internet.email();
      const password = faker.internet.password();

      await registerFormPage.fillForm(lastName, value, email, password, firstName, country);
      await registerFormPage.registerButton.click();

      const message = await registerFormPage.alertMessage.textContent();
      expect(message).toEqual('The phone number should contain at least 10 characters!');
    });
  });

  test('Validate Phone Number should not include any chars', async ({ registerFormPage }) => {
    const firstName = faker.person.firstName();
    const country = 'New Zealand';
    const email = faker.internet.email();
    const password = faker.internet.password();
    const lastName = faker.person.lastName();
    const phoneNumber = 'abcdefghrt'

    await registerFormPage.fillForm(lastName, phoneNumber, email, password, firstName, country);
    await registerFormPage.registerButton.click();

    const message = await registerFormPage.alertMessage.textContent();
    expect(message).not.toEqual('Successfully registered the following information');
  });

  [
    { password: 'Empty', value: '' },
    { password: 'Less than 6 charcators', value: '12345' },
    { password: 'Greater than 20 charactors', value: '1qaz2wsxh123#5612b@w!' },
  ].forEach(({ password, value }) => {
    test(`Validate when password is ${password} user can see passowrd validation`, async ({ registerFormPage }) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const country = 'New Zealand';
      const email = faker.internet.email();
      const phoneNumber = '0273116426'

      await registerFormPage.fillForm(lastName, phoneNumber, email, value, firstName, country);
      await registerFormPage.registerButton.click();
      const message = await registerFormPage.alertMessage.textContent();

      expect(message).toEqual('The password should contain between [6,20] characters!');
    });
  });

  [
    { password: 'Equal to 20 charactors', value: '1qaz2wsxh123#5612b@w' },
    { password: 'Equal to 6 charactors', value: '1qaz2w' },
    { password: 'Between 6-20 charactors', value: '1qaz2wyuu' },
  ].forEach(({ password, value }) => {
    test(`Validate when password is ${password} user can register successfully`, async ({ registerFormPage }) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const country = 'New Zealand';
      const email = faker.internet.email();
      const phoneNumber = '0273116426'

      await registerFormPage.fillForm(lastName, phoneNumber, email, value, firstName, country);
      await registerFormPage.registerButton.click();

      const message = await registerFormPage.alertMessage.textContent();

      expect(message).toEqual('Successfully registered the following information');
    });
  });

  test('Validate text fields are not allowed scripts', async ({ registerFormPage }) => {
    const scriptTag = '<script>alert("oops lname!")</script>';

    await registerFormPage.fillForm(scriptTag, scriptTag, scriptTag, scriptTag, scriptTag, 'New Zealand');
    await registerFormPage.registerButton.click();

    const message = await registerFormPage.alertMessage.textContent();
    expect(message).not.toEqual('Successfully registered the following information');
  });

});

