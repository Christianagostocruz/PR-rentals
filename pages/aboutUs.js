import React from "react";
import { urlFor } from "../lib/client";
import { client } from "../lib/client";
import FooterBanner from "../components/FooterBanner";

const AboutUs = ({ owners, bannerData }) => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-header">
        <h2>Rentals Charter</h2>
        <p>Enjoy Puerto Rico</p>
      </div>
      <div className="products-container">
        {owners?.map((owner) => (
          <div key={owner._id} className="product-card">
            <img
              alt="Rentals Charter Owners"
              src={urlFor(owner.image && owner.image[0])}
              width={100}
              height={100}
              className="product-image"
            />
            <div className="product-description">
              <p className="product-name">{owner.name}</p>
              <p className="product-price">{owner.details}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="aboutus-section">
        <h2>Our Mission</h2>
        <p className="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec
          libero ex. Sed scelerisque, est eu viverra eleifend, leo dolor commodo
          augue, nec egestas sapien nunc eget ante. In fermentum hendrerit
          dapibus. Nunc eu imperdiet sem. Aenean neque nibh, dictum at tortor
          vel, fermentum mollis lectus. Orci varius natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Duis porta hendrerit
          dignissim. Maecenas pretium neque placerat vehicula pretium.
          Suspendisse risus turpis, pulvinar at convallis sed, volutpat vitae
          metus. Phasellus in massa sit amet risus rutrum lacinia ut sit amet
          nisi. Nulla tempor luctus porta. Cras sagittis, felis vel laoreet
          auctor, tellus odio congue purus, vel fringilla mi arcu sed est.
          Curabitur dapibus ipsum non feugiat consequat.{" "}
        </p>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[1]}/>
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "owners"]`;
  const owners = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { owners, bannerData },
  };
};
export default AboutUs;
