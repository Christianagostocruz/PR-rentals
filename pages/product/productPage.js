import { useState, useEffect, useMemo } from "react";
import { Product } from "../../components";
import { client } from "../../lib/client";

const ProductPage = ({ sanityProducts }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCartegory] = useState();

  useEffect(() => {
    setProducts(sanityProducts);
  }, []);

  function getFilteredList() {
    if (!selectedCategory) {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }

  let filteredList = useMemo(getFilteredList, [selectedCategory, products]);

  const handleCategoryChange = (event) => {
    setSelectedCartegory(event.target.value);
  };

  return (
    <div className="product-page">
      <h2>Rentals Charters </h2>
      <div className="filter-container">
        <p>Filter by Category:</p>
        <div>
          <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="Cars">Cars</option>
            <option value="Properties">Properties</option>
          </select>
        </div>
      </div>
      <div className="products-container">
        {filteredList?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  const query = `*[_type == "product"]`;
  const sanityProducts = await client.fetch(query);

  return {
    props: { sanityProducts },
  };
};
export default ProductPage;
