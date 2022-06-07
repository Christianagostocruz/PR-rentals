import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { client } from "../lib/client";
import { useRouter } from "next/router";

export function LoginForm({ sanityUsers }) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const userSlug = name.replaceAll(" ", "").toLowerCase();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      userId: user?.sub,
      email: user?.email,
      slug: userSlug,
      name: name,
      phone: phone,
    };
    console.log(sanityUsers)
    const sanityUser = sanityUsers.map((sUser) => sUser.userId == data.userId);
    console.log(sanityUser)
    console.log(data.userId)

    if (data && !sanityUser) {
      fetch("/api/user", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then(() => {
          console.log(data);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("este usuario ya existe.");
    }
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
      <input type="submit" value="Submit" />
    </form>
  );
}

export default LoginForm;

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "user"]`;

  const sanityUsers = await client.fetch(query);

  return { props: { sanityUsers } };
};
