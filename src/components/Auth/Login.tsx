import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../../firebase";
import { Dictionary } from "../../models/interfaces";

export interface LoginFormValues extends Dictionary {
  name: string;
  email: string;
  password: string;
}
const INITIAL_SATE: LoginFormValues = {
  name: "Carlton Joseph",
  email: "carlton.joseph@gmail.com",
  password: "hooks1Man"
};

const Login: React.FC = (props: any) => {

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    isSubmitting,
    getErrCls
  } = useFormValidation(INITIAL_SATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  async function authenticateUser(values: LoginFormValues) {
    const { name, email, password } = values;
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password);
    } catch (e) {
      console.error("Auth error", e);
      setFirebaseError(e.message);
    }
    return () => props.history.push("/");
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login ? (
          <input
            type="text"
            placeholder="Your name"
            name="name"
            autoComplete="off"
            onChange={handleChange}
            value={values.name}
          />
        ) : null}
        <input
          type="text"
          placeholder="Your email"
          name="email"
          onChange={handleChange}
          value={values.email}
          onBlur={handleBlur}
          className={getErrCls(errors.email)}
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          type="password"
          placeholder="Choose a secure password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getErrCls(errors.passwords)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        {firebaseError && <p className="error-text">{firebaseError}</p>}
        <div className="flex mt3">
          <button
            type="submit"
            className="button pointer mr2"
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "gray" : "orange" }}
          >
            Submit
          </button>
          <button
            className="button pointer"
            onClick={e => {
              e.preventDefault();
              setLogin(state => !state);
            }}
          >
            {login ? "need to create an account" : "already have an account"}
          </button>
        </div>
      </form>
      <div className="forgot-password">
        <Link to="/forgot">forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
