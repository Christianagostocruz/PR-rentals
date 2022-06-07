import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import { getSession } from "@auth0/nextjs-auth0";

const Home = ({ products, bannerData, user }) => {
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Properties</h2>
        <p>Enjoy out best rentals properties on PR.</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  const userQuery = `*[_type == "user"]`;
  const user = await client.fetch(userQuery);

  const session = await getSession(req, res);
  console.log("SECCION", session);
  console.log("RULE", session?.user["http://localhost:3000/is_new"]);
  if (session?.user["http://localhost:3000/is_new"]) {
    session.user["http://localhost:3000/is_new"] = true;
    return {
      redirect: {
        permanent: false,
        destination: "/loginForm",
      },
    };
  }
  return {
    props: { products, bannerData, user },
  };
};

export default Home;
