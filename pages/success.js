import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { getSession } from "@auth0/nextjs-auth0";
import { useStateContext } from "../context/StateContext";

const Success = ({ userId }) => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      const sessionId = query.get("session_id");
      if (sessionId) {
        const fetchSession = async () => {
          const { session } = await fetch(
            `/api/stripe/checkout-session?session_id=${sessionId}`
          ).then((r) => r.json());
          const { customer } = session;
          if (customer) {
            const updateUser = async () => {
              return await fetch("/api/user/updateUser", {
                method: "PATCH",
                body: JSON.stringify({
                  userData: {
                    user_metadata: {
                      stripe: {
                        customer,
                      },
                    },
                  },
                  userId,
                }),
                headers: { "Content-Type": "application/json" },
              });
            };
            updateUser().then(() => {
              setLoading(false);
            });
          }
        };
        fetchSession();
      }
    }
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return loading ? (
    <div>loading.......</div>
  ) : (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:c.agosto.cruz@gmail.com">
            rentals@charters.com
          </a>
        </p>
        <Link href="/">
          <a>
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await getSession(req, res);

  const user_id = session?.user?.sub || null;

  return {
    props: {
      userId: user_id,
    },
  };
}
export default Success;
