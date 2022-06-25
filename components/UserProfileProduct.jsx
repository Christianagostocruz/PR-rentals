import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const UserProfileProduct = ({ userProduct }) => {
  return (
    <div className="products-container">
      <p>Properties</p>
      {userProduct.length == 0 ? (
        <div>No Product available </div>
      ) : (
        <div className="products-container">
          {userProduct?.map((product, index) => (
            <div key={index} className="product-card">
              <Link href={`/product/${product.slug.current}`}>
                <a>
                  <img
                    alt="User Products"
                    src={urlFor(product.image && product.image[0])}
                    width={280}
                    height={200}
                    className="product-image"
                  />
                </a>
              </Link>
              <div className="product-description">
                <p className="product-name">{product.name}</p>
                <button>Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default UserProfileProduct;
