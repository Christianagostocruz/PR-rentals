import React, { useState, useEffect } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { client } from "../lib/client";

export default withPageAuthRequired(function LoginForm({ data }) {
  const { user, error, isLoading } = useUser();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const userSlug = name.replaceAll(" ", "").toLowerCase();
  console.log(user)
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userId: user.sub,
      email: user.email,
      slug: userSlug,
      name: name,
      phone: phone,
    };
    console.log(user.password);
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Enter your name:
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="phone">
        Enter your phone:
        <input
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
});

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "user"]`;

  const data = await client.fetch(query);

  return { props: { data } };
};
