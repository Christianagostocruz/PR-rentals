import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import useClickOutside from "../hooks/useClickOutside";

const HeaderMenu = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useClickOutside(false);
  const openMenuModal = () => {
    isComponentVisible
      ? setIsComponentVisible(false)
      : setIsComponentVisible(true);
  };
  const { user, isLoading } = useUser();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div ref={ref}>
      <div className="header-menu-button" onClick={openMenuModal}>
        <AiOutlineMenu />
      </div>
      {isComponentVisible && (
        <div className="cart-wrapper">
          <div className="cart-container">
            <ul className="header-menu">
              {!isLoading && !user && (
                <>
                  <Link href="/api/auth/login">
                    <a>Login</a>
                  </Link>
                  <Link href="/loginForm">
                    <a>Become Host</a>
                  </Link>
                </>
              )}
              {!isLoading && user && (
                <>
                  <Link href="/user/profile">
                    <a>Dashboard</a>
                  </Link>
                  <Link href="/api/auth/logout">
                    <a>Logout</a>
                  </Link>
                </>
              )}
              <Link href="/aboutUs">
                <a>About us</a>
              </Link>
              <Link href="/">
                <a>Help</a>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
export default HeaderMenu;
