import { useState } from "react";
import { FiX } from "react-icons/fi";
import { NavLink, useLocation } from "react-router";
import SidebarGenerator from "~/layouts/Sidebar/SidebarGenerator";
import useMenu from "~/layouts/useMenu.js";
import { getFullImageLink } from "~/Utils/getFullImageLink";
import useMoveUpStore from "./moveUpStore";

export default function SidebarMoveUpTheme() {
  const location = useLocation();
  const { isMoveUpNavbarOpen, setIsMoveUpNavbarOpen } = useMoveUpStore();

  //  GET USER
  const user = {};
  // GET SIDEBAR DATA
  const links = useMenu();
  const [activeMenu, setActiveMenu] = useState(
    links?.find(
      (menu) =>
        menu?.link ===
        (location?.pathname?.split("/")?.length > 1
          ? `/${location?.pathname?.split("/")?.at(1)}`
          : "/")
    )
  );

  const activeMenuChild = links?.find(
    (menu) => menu?.title === activeMenu?.title
  );

  return (
    <aside
      data-auto={`sidebar-container-every-page`}
      className={`${
        isMoveUpNavbarOpen
          ? activeMenu?.childrens?.length > 0
            ? "w-full"
            : "w-[70px]"
          : "w-0 md:w-full"
      } md:max-w-[280px] h-[calc(100vh-10px)] md:h-full  text-center fixed ${
        isMoveUpNavbarOpen ? "left-1" : "-left-[74px]"
      }  top-1 bottom-2 md:static overflow-x-hidden overflow-y-scroll scrollbar-none  flex text-sm border-r`}
    >
      <div
        className={`bg-primary w-[70px] flex flex-col pr-2 gap-1 overflow-x-hidden overflow-y-auto scrollbar-none`}
      >
        {/* LOGO */}
        <div className="flex flex-row  items-center justify-center sticky top-0 z-50 bg-primary">
          {/* LOGO  */}
          <NavLink
            data-auto={`navbar-logo-every-page`}
            to={`/`}
            className={`${user?.business?.logo ? "mb-4" : "mb-2"}`}
          >
            {user?.business !== null ? (
              <>
                {user?.business?.logo ? (
                  <>
                    <img
                      data-auto={`navbar-logo-image-every-page`}
                      className="h-[60px] w-[60px] object-cover  shadow-md "
                      src={`${getFullImageLink(user?.business?.logo)}`}
                      alt={""}
                    />
                  </>
                ) : (
                  <h1 className="text-xl text-base-300 h-[60px] w-[60px] flex justify-center items-center font-medium ">
                    {user?.business?.name
                      ?.split(" ")
                      ?.map((word) => word[0])
                      .join("")}
                  </h1>
                )}
              </>
            ) : (
              <div className={`flex`}>
                <img
                  data-auto={`navbar-not-logo-image-every-page`}
                  className="h-[60px] w-[60px] object-cover  shadow-md"
                  src={`/assets/lightLogo.png`}
                  alt={""}
                />
              </div>
            )}
          </NavLink>
        </div>

        {/* MAIN MENUS  */}
        {links
          ?.filter((menu) => menu?.show)
          ?.map((menu, index) => (
            <NavLink
              to={
                (location?.pathname?.split("/")?.length > 1
                  ? `/${location?.pathname?.split("/")?.at(1)}`
                  : "/") === menu?.link
                  ? location?.pathname
                  : menu?.childrens?.length > 0
                  ? menu?.childrens
                      ?.filter((c) => c?.show)
                      ?.at(0)
                      ?.childrens?.filter((c) => c?.show)?.length > 0
                    ? menu?.childrens
                        ?.filter((c) => c?.show)
                        ?.at(0)
                        ?.childrens?.filter((c) => c?.show)
                        ?.at(0)?.link
                    : menu?.childrens?.filter((c) => c?.show)?.at(0)?.link
                  : menu?.link
              }
              key={index}
              className={`cursor-pointer hover:bg-primary-content hover:text-primary rounded-md w-[60px] h-[60px] p-1 flex flex-col justify-center items-center ${
                (location?.pathname?.split("/")?.length > 1
                  ? `/${location?.pathname?.split("/")?.at(1)}`
                  : "/") === menu?.link
                  ? "bg-primary-content text-primary"
                  : "text-base-300"
              }`}
              onClick={
                (location?.pathname?.split("/")?.length > 1
                  ? `/${location?.pathname?.split("/")?.at(1)}`
                  : "/") === menu?.link
                  ? menu?.childrens?.length > 0
                    ? () => setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen)
                    : () => setIsMoveUpNavbarOpen(false)
                  : () => {
                      setActiveMenu(menu);
                      if (menu?.childrens?.length > 0) {
                        setIsMoveUpNavbarOpen(true);
                      } else {
                        setIsMoveUpNavbarOpen(false);
                      }
                    }
              }
            >
              <div className={() => `w-[30px] h-[30px]`}>
                <menu.Icon className={`text-xl `} />
              </div>
              <p
                className={`gap-x-1 text-[9px] font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-full text-center`}
              >
                {menu?.title}
              </p>
            </NavLink>
          ))}
      </div>

      {/* CHILD MENUS  */}
      <div
        className={` rounded-l-[5px] bg-base-300 py-1 overflow-x-hidden overflow-y-auto scrollbar-none transition-all relative ${
          activeMenuChild?.childrens?.length > 0
            ? isMoveUpNavbarOpen
              ? "w-full md:w-[210px]"
              : "w-0"
            : "w-0"
        }`}
      >
        <button
          data-auto={`navbar-toggle-button-every-page`}
          className={`absolute right-3 top-3 z-[1000] bg-transparent transition-all duration-300 w-10 h-10 block md:hidden overflow-hidden`}
          onClick={() => {
            setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen);
          }}
        >
          {isMoveUpNavbarOpen ? (
            <FiX className={`text-4xl text-primary`} />
          ) : (
            ""
          )}
        </button>
        <div
          className={`flex flex-col justify-center items-start border-b border-primary-content px-2 py-2 mb-5 pb-5 sticky top-0 z-50 bg-base-300`}
        >
          <span className={` font-bold text-lg`}>
            {user?.business?.name || "Tide HR"}
          </span>
          <span className={` text-xs font-light leading-3 `}>
            Let&apos;s build the future together
          </span>
        </div>

        <SidebarGenerator
          links={activeMenuChild?.childrens || []}
          theme={"moveUp"}
        />
      </div>
    </aside>
  );
}
