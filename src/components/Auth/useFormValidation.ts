import { useState, useEffect } from "react";
import { Dictionary } from "../../models/interfaces";

function useFormValidation(
  /** (form)vaules object to validate */
  initialState: Dictionary, 
  /** Func for validating the vlues object */
  validateLogin: ({}: Dictionary) => Dictionary, 
  /** Funct to exec if validation succeeds */
  authenticate: () => any
  ) {

  const [values, setValues] = useState<Dictionary>(initialState);
  const [errors, setErrors] = useState<Dictionary>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        (async () => {
          const cb = await authenticate();
          setIsSubmitting(false);
          if (cb) cb();
        })();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setValues(state => ({ ...state, [target.name]: target.value }));

  const handleBlur = () => {
    const errors = validateLogin(values);
    setErrors(errors);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleBlur();
    setIsSubmitting(true);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting
  };
}

export default useFormValidation;
