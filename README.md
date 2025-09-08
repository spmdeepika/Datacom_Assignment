# UI Automation Tests 
## Scope https://qa-practice.netlify.app/bugs-form

User Registration Related Test Cases

## Test Cases

### TC01 Validate user can navigate to page /bugs-form
### TC02 Validate user can successfully register with all fields filled
### TC03 Validate can not proceed without any mandatory fields filled
### TC04 Validate registered user details shows correctly once registered
### TC05 Validate with valid inputs but without T&C checked user can not register
### TC06 Validate Terms and Condition check box is cliackable
### TC07 Validate Register button should be disabled on page load
### TC08 Validate field labels names are correct
### TC09 Validate password field is Masked
### TC10 Validate without mandatory fields can not register
### TC11 Validate when email is not valid can not register
         - empty
         - invalid
### TC12  Validate when phone number is invalid can not register and give correct validation message
         - empty
         - chars
         - less than 10
         - greater than 10
         - 10 digits
### TC13 Validate password is according to the validation criteria
         - empty
         - minimum 6
         - maximum 20
         - greater than 20
         - less than 6
### TC14 Validate text field are not allows tags
         - FirstName
         - LastName
         - Phone
         - Email
         - Password

### Pre - Requirements:

[Node](https://nodejs.org/en/)

**### How to Setup**
 
**Using terminal:**
```
npm install
npx playwright install - This will install the browsers needed.
```
**### Configurations**
Create .env file with following parameters.
Refer .env.example for variables to set.

following variables need to set:  
BASE_URL - the URL of the application


**### How to Run Tests**

# To Run All Tests
```
npx playwright test
```