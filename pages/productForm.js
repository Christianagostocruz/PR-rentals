import React, { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { getSession } from "@auth0/nextjs-auth0";
import { client } from "../lib/client";

export default withPageAuthRequired(function LoginForm({ sanityUser }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [price, setPrice] = useState(0);
  const [detail, setDetail] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [image, setImage] = useState();
  const [imageAssets, setImageAssets] = useState();

  const userSlug = name.replaceAll(" ", "").toLowerCase();

  const imageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const prevImg = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(prevImg);
      setImage(event.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //sanity manage fit the cors security
    client.assets
      .upload("image", image, {
        contentType: image.type,
        filename: image.name,
      })
      .then((document) => {
        console.log("DOCUMENT", document);
        setImageAssets(document);
        const data = {
          userId: sanityUser[0]._id,
          slug: userSlug,
          name: name,
          category: category,
          price: price,
          detail: detail,
          image: document,
        };

        fetch("/api/product/productPost", {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then(() => {
            console.log(data);
            router.push("/user/profile");
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          placeholder="Name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          name="category-list"
          id="category-list"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="none">Select Category</option>
          <option value="Car">Car</option>
          <option value="Property">Property</option>
        </select>
        <input
          placeholder="Price"
          min="0"
          step="10"
          name="price"
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className="form-img">
          <label htmlFor="image">Upload Image</label>
          <input
            hidden={true}
            type="file"
            id="image"
            name="image"
            multiple={true}
            accept="image/*"
            onChange={imageChange}
          />
          {selectedImage && (
            <div className="form-img-preview">
              <Image
                height={200}
                width={250}
                src={selectedImage}
                alt="testing"
              />
              <div>
                <button onClick={removeSelectedImage}>Remove</button>
              </div>
            </div>
          )}
        </div>
        <textarea
          rows="4"
          col="50"
          maxLength="300"
          required
          placeholder="Detail"
          name="detail"
          type="textarea"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        ></textarea>
        <div>
          <input type="submit" value="Submit" className="form-button" />
        </div>
      </form>
    </div>
  );
});

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);

  const userQuery = `*[_type == "user" && userId == "${session?.user.sub}"]`;
  const sanityUser = await client.fetch(userQuery);

  return {
    props: { sanityUser },
  };
};
