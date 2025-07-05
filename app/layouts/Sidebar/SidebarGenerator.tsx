import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import useMoveUpStore from "../Themes/MoveUpTheme/moveUpStore.js";
import ParentMenuItemForSidebar from "./ParentMenuItemForSidebar.js";

export default function SidebarGenerator({ links, theme }) {
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState({});
  const { isMoveUpNavbarOpen, setIsMoveUpNavbarOpen } = useMoveUpStore();

  // TOGGLE SUBMENU
  const toggleSubMenu = (link) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [link]: !prev[link],
    }));
  };

  // KEEP SUBMENU OPEN IF CHILD LINK ACTIVE
  useEffect(() => {
    const newSubMenus = {};
    links.forEach((lnk) => {
      if (
        lnk.childrens?.some((subItem) =>
          location.pathname.startsWith(subItem.link)
        )
      ) {
        newSubMenus[lnk.link] = true;
      }
    });
    setOpenSubMenus(newSubMenus);
  }, []);

  // RENDER SIDEBAR
  return links.map((lnk, i) => {
    const { title, link, Icon, show, childrens } = lnk;
    const isSubMenuOpen = openSubMenus[link] || false;

    return (
      <aside
        key={i}
        className={`flex flex-col text-sm w-full ${
          theme === "moveUp" ? "" : ""
        } `}
      >
        {childrens?.length > 0 ? (
          // WITH CHILD
          <ParentMenuItemForSidebar
            {...lnk}
            isSubMenuOpen={isSubMenuOpen}
            toggleSubMenu={toggleSubMenu}
            isChildAsParent={true}
            theme={theme}
          />
        ) : (
          // NO CHILD
          show && (
            <NavLink
              onClick={
                theme === "moveUp"
                  ? () => setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen)
                  : // link === location.pathname
                    // ? () => setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen)
                    // : () => {}
                    () => {}
              }
              data-auto={`menu_btn-${title.toLowerCase().replace(/\s+/g, "-")}`}
              to={link}
              end={link === "/"}
              className={({ isActive }) =>
                `flex flex-row items-center space-x-4 ${
                  theme === "moveUp" ? "p-2" : "px-2 py-3 pl-4"
                }  hover:text-primary/120 ${
                  isActive
                    ? "bg-primary text-base-300"
                    : "hover:bg-primary-content text-primary"
                }`
              }
            >
              {Icon ? (
                typeof Icon === "function" ? (
                  <Icon className="text-2xl" />
                ) : (
                  Icon
                )
              ) : (
                ""
              )}
              <span className="flex font-medium">{title}</span>
            </NavLink>
          )
        )}
      </aside>
    );
  });
}
