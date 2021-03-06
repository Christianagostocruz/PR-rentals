import sanityClient from "@sanity/client";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: "production",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
};

const client = sanityClient(config);

export default withApiAuthRequired(async function formInputs(req, res) {
  const { name, slug, userId, category, price, detail, image } = JSON.parse(
    req.body
  );

  console.log(image);
  try {
    await client.create({
      _type: "product",
      host: {
        _type: "reference",
        _ref: userId,
      },
      image: [image],
      name: name,
      category: category,
      slug: slug,
      price: parseInt(price),
      details: detail,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error", err });
  }
  return res.status(201).json({ message: "Submit" });
});
