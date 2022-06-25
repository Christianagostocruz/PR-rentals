import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

import Image from "next/image";

const Product = ({ product: { image, name, slug, price } }) => {
  const imageUrl = urlFor(image?.[0]).width(250).height(250).url();

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <a>
          <div className="product-card">
            <Image
              src={imageUrl}
              alt="Picture of the author"
              width={250}
              height={250}
              className="product-image"
            />
            <div className="product-description">
              <p className="product-name">{name}</p>
              <p className="product-price">${price}</p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
export default Product;
