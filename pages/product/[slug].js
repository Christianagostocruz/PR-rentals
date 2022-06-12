import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { DayPicker } from "react-day-picker";
import Modal from "../../components/Modal";

const ProductDetails = ({ product, products }) => {
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [randomizeProduct, setRandomizeProduct] = useState();
  const { image, name, details, price } = product;
  const { qty, onAdd, selectedDay, setSelectedDay } = useStateContext();

  useEffect(() => {
    setRandomizeProduct(() => products?.sort(() => 0.5 - Math.random()));
  }, []);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              alt="Product Image"
              src={urlFor(image && image[index])}
              onClick={() => setShow(true)}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                alt="Products Images"
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <div className="calendar-container">
            <div>
              <DayPicker
                numberOfMonths={2}
                mode="range"
                fromDate={new Date()}
                selected={selectedDay}
                onSelect={setSelectedDay}
                className="calendar"
              />
            </div>
          </div>
          <div className="buttons">
            <span className="price">
              ${price}
              <br /> <small className="price-details">per night</small>
            </span>
            {!qty ? (
              <span className="price">$0</span>
            ) : (
              <span className="price">
                ${price * qty}
                <br />
                <small className="price-details">{qty} nights</small>
              </span>
            )}
          </div>
          <div className="buttons">
            {selectedDay?.to > selectedDay?.from ? (
              <>
                <button
                  type="button"
                  className="add-to-cart"
                  onClick={() => onAdd(product)}
                >
                  Add to Cart
                </button>
              </>
            ) : (
              <>
                <button
                  disabled
                  type="button"
                  className="add-to-cart-disabled"
                  onClick={() => onAdd(product)}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <p>Description:{details}</p>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {randomizeProduct?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
      <Modal
        name={name}
        show={show}
        onClose={() => setShow(false)}
        image={image}
        index={index}
      />
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = `*[_type == "product"]`;
  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: { products, product },
  };
};
export default ProductDetails;
