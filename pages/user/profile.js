import { useState, useEffect } from "react";
import { client } from "../../lib/client";
import { getSession, useUser } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import UserProfileProduct from "../../components/UserProfileProduct";
import UserProfileAccount from "../../components/UserProfileAccount";
import UserProfileSetting from "../../components/UserProfileSetting";
import UserProfileWallet from "../../components/UserProfileWallet";
import Link from "next/link";

const Profile = ({ userProduct }) => {
  const { user, isLoading } = useUser();
  const [option, setOption] = useState("Properties");

  useEffect(() => {});

  const handleCategoryChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <div className="product-page">
      <div className="hero-banner-container">
        <p className="beats-solo">Easy steps</p>
        <h3>To</h3>
        <h1>Post</h1>
        <div>
          <Link href={"/productForm"}>
            <button type="button">Post now</button>
          </Link>
          <div className="desc">
            <h5>PRdise Rentals</h5>
            <p>Puerto Rico</p>
          </div>
        </div>
      </div>
      <div className="filter-container">
        <p>Filter by Category:</p>
        <div>
          <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            <option value="Properties">Properties</option>
            <option value="Account">Account</option>
            <option value="Settings">Settings</option>
            <option value="Wallet">Wallet</option>
          </select>
        </div>
      </div>
      {option == "Properties" && (
        <UserProfileProduct userProduct={userProduct} />
      )}
      {option == "Account" && <UserProfileAccount user={user} />}
      {option == "Settings" && <UserProfileSetting />}
      {option == "Wallet" && <UserProfileWallet user={user}/>}
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  retrunTo: "/",
  async getServerSideProps({ req, res }) {
    const session = await getSession(req, res);

    const userQuery = `*[_type == "user" && userId == "${session?.user.sub}"]`;
    const sanityUser = await client.fetch(userQuery);

    const productQuery = `*[_type == "product" && references("${sanityUser[0]?._id}")]{
    name, price, image, category, slug, details
  }`;
    const userProduct = await client.fetch(productQuery);

    return {
      props: { userProduct },
    };
  },
});
export default Profile;
