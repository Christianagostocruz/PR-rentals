import React from "react";

const UserProfileAccount = ({ user }) => {
  const emailValidation = async () => {
    await fetch("/api/user/userValidation", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(user)
  return (
    <div className="products-container">
      <p>Account</p>
      <button onClick={emailValidation}>Validate Email</button>
    </div>
  );
};

export default UserProfileAccount;
