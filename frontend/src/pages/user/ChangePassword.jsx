// src/pages/user/ChangePassword.jsx

import { useState } from "react";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/api/user/password",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            currentPassword,
            newPassword
          })
        }
      );

      const data = await res.json();

      setMessage(data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Change Password</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(e.target.value)
          }
        />

        <br />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(e.target.value)
          }
        />

        <br />

        <button type="submit">
          Change Password
        </button>

      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ChangePassword;