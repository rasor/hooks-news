import { Dictionary } from "../../models/interfaces";
import { LoginFormValues } from "./Login";

export default function validateLogin(values: LoginFormValues): Dictionary {
  let errors: Dictionary = {};

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters or greater";
  }

  if (!values.name) {
    errors.name = "Name required";
  }

  return errors;
}