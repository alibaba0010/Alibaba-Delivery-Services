"use client";
import { activeItem, sideBarItems } from "../../../app/configs/constants";
import Link from "next/link";
import useRouteChange from "../../../hooks/useRouteChange";

const Sidenav = () => {
  const { activeRoute, setActiveRoute } = useRouteChange();
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
