// src/pages/user/Profile.jsx

import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const getProfile = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/user/profile",
          {
            credentials: "include"
          }
        );

        const data = await res.json();

        setUser(data.user);

      } catch (error) {
        console.log(error);
      }
    };

    getProfile();

  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Profile;