"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { sideBarItems } from "../../app/configs/constants";
import useRouteChange from "../../hooks/useRouteChange";
import { usePathname } from "next/navigation";
const Sidenav = () => {
  const { activeRoute, setActiveRoute } = useRouteChange();
  const pathName = usePathname();
  useEffect(() => {
    setActiveRoute(pathName);
  }, [pathName]);

  return (
    <>
      {sideBarItems.map((i: SideBarItemsTypes, index: number) => (
        <Link
          href={i.url}
          key={i.url}
          onClick={() => setActiveRoute(i.url)}
          className={`${i.url === activeRoute && "text-[rgb(_91_111_230)]"} flex items-center text-2xl px-2`}
        >
          <span className="mr-4 text-3xl">{i.icon}</span>
          {i.title}
        </Link>
      ))}
    </>
  );
};

export default Sidenav;
