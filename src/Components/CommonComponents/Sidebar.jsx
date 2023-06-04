import React, { useMemo, useState } from 'react';
import classNames from "classnames";
import Link from "next/link";
import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "../SVGS";
import { useRouter } from 'next/router';
import { getAuth, signOut } from "firebase/auth"
import useAuthStore from '@/Store/Store';
const Sidebar = () => {

//************************
      // menu Items
//************************

  const menuItems = [
    { id: 1, label: "Home", icon: HomeIcon, link: "/" },
    { id: 2, label: "Manage Posts", icon: ArticleIcon, link: "/posts" },
    { id: 3, label: "Manage Users", icon: UsersIcon, link: "/users" },
    { id: 4, label: "Manage Tutorials", icon: VideosIcon, link: "/tutorials" },
  ];
  // remove Token
  const { removeToken } = useAuthStore();
  // auth
  const auth = getAuth();

  // states
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  // router
  const router = useRouter();

  // activeMenu
  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  // classes
  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4  flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );
  const collapseIconClasses = classNames(
    "p-4 rounded bg-[#F3F4F6] absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );
    // functions
  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-[#F3F4F6] rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };
  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const logout = () => {
    signOut(auth);
    router.push("/login");
    removeToken();
  }


//************************
      //return
//************************
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: " 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className={classNames("flex items-center pl-1 gap-4", {
            hidden: toggleCollapse
          })}>
            <LogoIcon />
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Logo
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                <Link href={menu.link} className="flex py-4 px-3 items-center w-full h-full">

                  <div style={{ width: "2.5rem" }}>
                    <Icon />
                  </div>
                  {!toggleCollapse && (
                    <span
                      className={classNames(
                        "text-md font-medium text-text-light"
                      )}
                    >
                      {menu.label}
                    </span>
                  )}

                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div onClick={logout} className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  )
}

export default Sidebar
