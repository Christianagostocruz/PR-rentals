import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

const HeaderMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const openMenuModal = () => {
    setOpenMenu(!openMenu);
  };
  const { user, error, isLoading } = useUser();
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      {openMenu == false && (
        <div className="header-menu-button" onClick={openMenuModal}>
          <AiOutlineMenu />
        </div>
      )}
      {openMenu == true && (
        <div className="header-menu-button" onClick={openMenuModal}>
          <AiOutlineMenu />
        </div>
      )}
      {openMenu == true && (
        <div className="header-menu">
          <ul>
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
            <Link href="/">
              <a>About us</a>
            </Link>
            <Link href="/">
              <a>Help</a>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};
export default HeaderMenu;
