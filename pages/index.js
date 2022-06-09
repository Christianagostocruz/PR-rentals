import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData, user }) => {
  const randomize = products.sort(() => 0.5 - Math.random());

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Properties</h2>
        <p>Enjoy out best rentals properties on PR.</p>
      </div>
      <div className="marquee">
      <div className="maylike-products-container track">
        {randomize?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[1]} />
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

  return {
    props: { products, bannerData, user },
  };
};

export default Home;
