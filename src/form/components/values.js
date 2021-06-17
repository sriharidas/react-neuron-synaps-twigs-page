import {
  servicesValues,
  noEmployees,
  FieldValues,
  countryValues,
  howDoUKnowUs,
} from "./Options.js";
const signupFields = [
  {
    Element: "input",
    type: "text",
    label: "First Name",
    id: "fname",
    name: "fname",
    placeholder: "Enter Your First Name",
  },
  {
    Element: "input",
    type: "text",
    label: "Last Name",
    id: "lname",
    name: "lname",
    placeholder: "Enter Your Last Name",
  },
  {
    Element: "input",
    type: "email",
    label: "Email",
    id: "emailid",
    name: "emailid",
    placeholder: "Enter Your Email Address",
  },
  {
    Element: "input",
    type: "password ",
    label: "Password",
    id: "password1",
    name: "password1",
    placeholder: "Enter Your Password",
  },
  {
    Element: "input",
    type: "password ",
    label: "Confirm Password",
    id: "password2",
    name: "password2",
    placeholder: "Enter Your Confirm Password",
  },
  {
    Element: "input",
    type: "text",
    label: "Company Name",
    id: "comp_name",
    name: "comp_name",
    placeholder: "Enter Your Company Name",
  },
  {
    Element: "select",
    value: countryValues,
    label: "Country",
    id: "country",
    name: "country",
    placeholder: "select Your Country",
  },
  {
    Element: "select",
    value: noEmployees,
    label: "No of Employees in Your Company",
    id: "no_employees",
    name: "no_employees",
    placeholder: "Select a option",
  },
  {
    Element: "input",
    type: "text",
    label: "Approximate no of customer",
    id: "no_customers",
    name: "no_customers",
    placeholder: "Enter the Approximate no of customer",
  },
  {
    Element: "input",
    type: "text",
    label: "Closest posting company",
    id: "closest_cmp",
    name: "closest_cmp",
    placeholder: "Enter the Closest posting company",
  },
  {
    Element: "input",
    type: "text",
    label: "Contact number (optional)",
    id: "contact",
    name: "contact",
    placeholder: "Enter Your Contact number",
  },
  {
    Element: "select",
    value: servicesValues,
    label: "Service required",
    id: "service",
    name: "service",
    placeholder: "Service required?",
  },
  {
    Element: "input",
    type: "text",
    label: "Nature of the app",
    id: "nature_app",
    name: "nature_app",
    placeholder: "Enter the Nature of the App",
  },
  {
    Element: "select",
    value: FieldValues,
    label: "Field of the app",
    id: "field_app",
    name: "field_app",
    placeholder: "Eselect the Field of the App",
  },
  {
    Element: "input",
    type: "text",
    label: "Your domain",
    id: "domain",
    name: "domain",
    placeholder: "Enter Your Your domain",
  },
  {
    Element: "select",
    value: howDoUKnowUs,
    label: "How do you know us?",
    id: "how_do_you_know_us",
    name: "how_do_you_know_us",
    placeholder: "How do you know us?",
  },
];
export const LoginValues = [
  {
    Element: "input",
    type: "email",
    label: "Email Id",
    id: "login_email",
    name: "login_email",
    placeholder: "Enter Your Email Id",
  },
  {
    Element: "input",
    type: "password ",
    label: "Password",
    id: "login_pwd",
    name: "login_pwd",
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
