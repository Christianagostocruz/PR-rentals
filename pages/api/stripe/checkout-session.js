import Stripe from "stripe";
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log("request body", req.body);
  console.log("request query", req.query);

  const { session_id } = req.query;

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["customer", "payment_intent", "line_items.data"],
  });
  console.log(
    "🚀 ~ file: checkout-session.js ~ line 8 ~ handler ~ session",
    session
  );

  res.status(200).json({ session });
}
