import React, { useContext } from "react";

import useFormValidation from "../Auth/useFormValidation";
import validateCreateLink from "../Auth/validateCreateLink";
import { FirebaseContext } from "../../firebase";

const INITIAL_STATE = {
  description: "",
  url: ""
};

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  async function handleCreateLink() {
    if (!user) return props.history.push("/login");
    const newLink = {
      ...values,
      postedBy: {
        id: user.uid,
        name: user.displayName
      },
      voteCount: 0,
      votes: [],
      comments: [],
      created: Date.now()
    };
    await firebase.db.collection("links").add(newLink);
    return () => props.history.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        type="text"
        onChange={handleChange}
        value={values.description}
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        placeholder="This is the URL for the link"
        autoComplete="off"
        type="url"
        onChange={handleChange}
        value={values.url}
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
