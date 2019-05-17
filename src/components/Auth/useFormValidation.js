import { useState, useEffect } from "react";

function useFormValidation(initialState, validateLogin, authenticate) {
  const [values, valuesSet] = useState(initialState);
  const [errors, errorsSet] = useState({});
  const [isSubmitting, isSubmittingSet] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        (async () => {
          const cb = await authenticate();
          isSubmittingSet(false);
          if (cb) cb();
        })();
      } else {
        isSubmittingSet(false);
      }
    }
  }, [errors]);

  const handleChange = ({ target }) =>
    valuesSet(state => ({ ...state, [target.name]: target.value }));

  const handleBlur = e => {
    const errors = validateLogin(values);
    errorsSet(errors);
  };
  const handleSubmit = e => {
    e.preventDefault();
    handleBlur();
    isSubmittingSet(true);
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
