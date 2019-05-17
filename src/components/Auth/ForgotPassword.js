import React, { useState, useContext } from "react";

import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext);
  const [resetPasswordEmail, resetPasswordEmailSet] = useState("");
  const [isPwReset, isPwResetSet] = useState(false);
  const [pwResetError, pwResetErrorSet] = useState(null);

  const handleResetPassword = async () => {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      isPwResetSet(true);
      pwResetErrorSet(null);
    } catch (e) {
      console.error("Error sending email", e);
      isPwResetSet(false);
      pwResetErrorSet(e.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="email"
        name="resetPasswordEmail"
        placeholder="Provide your account email"
        onChange={({ target }) => resetPasswordEmailSet(target.value)}
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
