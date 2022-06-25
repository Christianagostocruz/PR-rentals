import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import React from "react";

const UserProfileWallet = ({ user }) => {
  console.log(user);
  return (
    <div className="products-container">
      <p>Wallet</p>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  retrunTo: "/",
  async getServerSideProps({ req, res }) {
    return {
      props: {},
    };
  },
});
export default UserProfileWallet;
