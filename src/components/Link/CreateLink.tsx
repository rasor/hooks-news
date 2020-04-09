import React, { useContext } from "react";

import useFormValidation from "../../hooks/useFormValidation";
import validateCreateLink from "./validateCreateLink";
import { FirebaseContext } from "../../firebase";
import { Dictionary } from "../../models/interfaces";

export interface CreateLinkFormValues extends Dictionary {
  description: string;
  url: string;
}
const INITIAL_STATE: CreateLinkFormValues = {
  description: "",
  url: ""
};

function CreateLink(props: any) {
  const { firebase, user } = useContext(FirebaseContext);

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    isSubmitting,
    getErrCls
  } = useFormValidation(INITIAL_STATE, validateCreateLink, handleCreateLink);

  async function handleCreateLink(values: CreateLinkFormValues) {
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
        className={getErrCls(errors.description)}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        placeholder="This is the URL for the link"
        autoComplete="off"
        type="url"
        onChange={handleChange}
        value={values.url}
        className={getErrCls(errors.url)}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
