import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { client } from "../lib/client";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(function LoginForm({ sanityUsers }) {
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
    const sanityUser = sanityUsers.map((sUser) => sUser.userId == data.userId);
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
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
        placeholder="Name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
        placeholder="Telephone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <div>
        <input type="submit" value="Submit" className="form-button"/>
        </div>
      </form>
    </div>
  );
});

export const getStaticProps = async ({ params }) => {
  const query = `*[_type == "user"]`;

  const sanityUsers = await client.fetch(query);

  return { props: { sanityUsers } };
};
