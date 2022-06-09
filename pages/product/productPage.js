import { Product } from "../../components";
import { client } from "../../lib/client";

const ProductPage = ({ products }) => {
  return (
    <div className="product-page">
      <h2>Rentals Charters </h2>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};
export default ProductPage;