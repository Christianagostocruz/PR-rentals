import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React from 'react'


    const UserProfileSetting = () => {
  return (
    <div className="products-container">
    <p>Settings</p>
  </div>
  )
}

// export const getServerSideProps = withPageAuthRequired({
//   retrunTo: "/",
//   async getServerSideProps({ req, res }) {
//     const session = await getSession(req, res);

//     const userQuery = `*[_type == "user" && userId == "${session?.user.sub}"]`;
//     const sanityUser = await client.fetch(userQuery);

//     const productQuery = `*[_type == "product" && references("${sanityUser[0]?._id}")]{
//     name, price, image, category, slug, details
//   }`;
//     const userProduct = await client.fetch(productQuery);

//     return {
//       props: { userProduct },
//     };
//   },
// });
export default UserProfileSetting;