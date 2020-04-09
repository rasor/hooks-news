import { useState, useEffect } from "react";

function useFormValidation(initialState, validateLogin, authenticate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
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

  const handleChange = ({ target }) =>
    setValues(state => ({ ...state, [target.name]: target.value }));

  const handleBlur = e => {
    const errors = validateLogin(values);
    setErrors(errors);
  };
  const handleSubmit = e => {
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
