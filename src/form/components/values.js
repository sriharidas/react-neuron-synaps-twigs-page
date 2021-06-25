import {
  servicesValues,
  noEmployees,
  FieldValues,
  countryValues,
  howDoUKnowUs,
  closestCmp,
  ApxCust,
} from "./Options.js";

const signupFields = [
  {
    Element: "input",
    type: "text",
    label: "First Name",
    id: "first_name",
    name: "first_name",
    placeholder: "Enter Your First Name",
  },
  {
    Element: "input",
    type: "text",
    label: "Last Name",
    id: "second_name",
    name: "second_name",
    placeholder: "Enter Your Last Name",
  },
  {
    Element: "input",
    type: "text",
    label: "Username",
    id: "username",
    name: "username",
    placeholder: "Enter Your User Name",
  },
  {
    Element: "input",
    type: "email",
    label: "Email",
    id: "email",
    name: "email",
    placeholder: "Enter Your Email Address",
  },
  {
    Element: "input",
    type: "password",
    label: "Password",
    id: "password1",
    name: "password1",
    placeholder: "Enter Your Password",
  },
  {
    Element: "input",
    type: "password",
    label: "Confirm Password",
    id: "password2",
    name: "password2",
    placeholder: "Enter Your Confirm Password",
  },
  {
    Element: "input",
    type: "text",
    label: "Company Name",
    id: "userCompanyName",
    name: "userCompanyName",
    placeholder: "Enter Your Company Name",
  },
  {
    Element: "select",
    value: countryValues,
    label: "Country",
    id: "userCountry",
    name: "userCountry",
    placeholder: "select Your Country",
  },
  {
    Element: "select",
    value: noEmployees,
    label: "No of Employees in Your Company",
    id: "NoOfEmpInUser",
    name: "NoOfEmpInUser",
    placeholder: "Select a option",
  },
  {
    Element: "select",
    value: ApxCust,
    label: "Approximate no of your customer",
    id: "NoOfCustomersInUser",
    name: "NoOfCustomersInUser",
    placeholder: "Enter the Approximate no of your customers",
  },
  {
    Element: "select",
    value: closestCmp,
    label: "Closest post in company",
    id: "WhoCreatedAccount",
    name: "WhoCreatedAccount",
    placeholder: "Enter the Closest post in company",
  },
  {
    Element: "input",
    type: "text",
    label: "Contact number (optional)",
    id: "ContactNumber",
    name: "ContactNumber",
    placeholder: "Enter Your Contact number",
  },
  {
    Element: "select",
    value: servicesValues,
    label: "Service required",
    id: "OurServiseRequired",
    name: "OurServiseRequired",
    placeholder: "Service required?",
  },
  {
    Element: "select",
    value: FieldValues,
    label: "Field of the app",
    id: "FieldOfCustomerApp",
    name: "FieldOfCustomerApp",
    placeholder: "Eselect the Field of the App",
  },
  {
    Element: "input",
    type: "text",
    label: "Your domain",
    id: "CustomerDomain",
    name: "CustomerDomain",
    placeholder: "Enter Your Your domain",
  },
  {
    Element: "select",
    value: howDoUKnowUs,
    label: "How do you know us?",
    id: "HowDoTheyKnowUs",
    name: "HowDoTheyKnowUs",
    placeholder: "How do you know us?",
  },
];
export const LoginValues = [
  {
    Element: "input",
    type: "text",
    label: "username",
    id: "username",
    name: "username",
    placeholder: "Enter Your Username",
  },
  {
    Element: "input",
    type: "password",
    label: "Password",
    id: "password",
    name: "password",
    placeholder: "Enter Your Password",
  },
];
export default signupFields;
// First name
// Second name
// Company name
// Country - dropdown
// No of employees in your company - drop
// 1-25
// 25-100
// 100-500
// 500-5000

// Approximate no of customer - text

// Closest posting company

// Email

// Contact number (optional)

// Service required - dropdown: recommend

// Nature of the app - text

// Field of the app - drop-down movie, education

// Your domain - text

// How do you know us? - drop down
