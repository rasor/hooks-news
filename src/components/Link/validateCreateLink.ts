import { Dictionary } from "../../models/interfaces";
import { CreateLinkFormValues } from "./CreateLink";

export default function validateCreateLink(values: CreateLinkFormValues): Dictionary {
  let errors: Dictionary = {};

  if (!values.description) {
    errors.description = "Description required";
  } else if (values.description.length < 10) {
    errors.description = "Description must be at least 10 characters ";
  }

  if (!values.url) {
    errors.url = "URL required";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "URL must be valid";
  }

  return errors;
}
