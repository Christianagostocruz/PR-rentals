import React, { useEffect } from "react";
import { client, urlFor } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const Home = ({ properties, cars, bannerData, sanityUser }) => {
  const { user, isLoading } = useUser();
  const randomizeProperties = properties.sort(() => 0.5 - Math.random());

  useEffect(() => {
    const data = {
      userId: user?.sub,
      email: user?.email,
      name: user?.name,
    };
    if (!isLoading && user) {
      const isLogging = sanityUser.map((sUser) => {
        return sUser.userId == user?.sub;
      });
      if (isLogging[0] == false) {
        const saveUser = async () => {
          await fetch("/api/user/user", {
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
        saveUser();
      }
    }
  }, [user, isLoading]);

  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Rental Cars</h2>
        <p>Enjoy our island on car</p>
      </div>
      <div className="products-container">
        {cars?.map((car) => (
          <div key={car._id} className="product-card">
            <Link href={`/product/${car.slug.current}`}>
              <a>
                <img
                  alt="Rentals Charter Owners"
                  src={urlFor(car.image && car.image[0])}
                  width={200}
                  height={150}
                  className="product-image"
                />
                <div className="product-description">
                  <p className="product-name">{car.name}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <div className="products-heading">
        <h2>Best Properties</h2>
        <p>Enjoy out best rentals properties on PR.</p>
      </div>
      <div className="marquee">
        <div className="maylike-products-container track">
          {randomizeProperties?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[2]} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const propertiesQuery = `*[_type == "product" && category == "Properties"]`;
  const properties = await client.fetch(propertiesQuery);

  const carsQuery = `*[_type == "product" && category == "Cars"]`;
  const cars = await client.fetch(carsQuery);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  const userQuery = `*[_type == "user"]`;
  const sanityUser = await client.fetch(userQuery);

  return {
    props: { properties, cars, bannerData, sanityUser },
  };
};

export default Home;
