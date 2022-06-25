import Link from "next/link";
import React from "react";

const HeroBanner = ({ heroBanner }) => {
  const slug = heroBanner?.product.replaceAll(" ", "-").toLowerCase();

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        {/* <img src={urlFor(heroBanner.image)} alt='Hero Banner' className='hero-banner-image'/> */}
        <div>
          <Link href={"/product/productPage"}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>PRdise Rentals</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
