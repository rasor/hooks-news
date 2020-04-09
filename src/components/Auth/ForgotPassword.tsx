import React, { useState, useContext } from "react";

import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPwReset, setIsPwReset] = useState(false);
  const [pwResetError, setPwResetError] = useState(null);

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPwReset(true);
      setPwResetError(null);
    } catch (e) {
      console.error("Error sending email", e);
      setIsPwReset(false);
      setPwResetError(e.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="email"
        name="resetPasswordEmail"
        placeholder="Provide your account email"
        onChange={({ target }) => setResetPasswordEmail(target.value)}
        value={resetPasswordEmail}
      />
      <div>
        <button className="button pointer mr2" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
      {isPwReset && <p>Check email to reset password</p>}
      {pwResetError && <p className="error-text">{pwResetError}</p>}
    </div>
  );
}

export default ForgotPassword;
