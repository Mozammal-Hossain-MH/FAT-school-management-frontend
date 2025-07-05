import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useLocation } from "react-router";
import ChildMenuItemForSidebar from "./ChildMenuItsmForSidebar";

const ParentMenuItemForSidebar = ({
  show,
  title,
  link,
  Icon,
  childrens,
  isChildAsParent,
  childLevel,
  subDataAuto,
  theme,
}) => {
  const location = useLocation();
  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { staggerChildren: 0.1 },
    },
    exit: { opacity: 0, height: 0, transition: { staggerChildren: 0.05 } },
  };

  const [openSubMenus, setOpenSubMenus] = useState({});
  const toggleSubMenu = (link) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [link]: !prev[link],
    }));
  };

  const isSubMenuOpen = openSubMenus[link] || false;

  return (
    <>
      {show && (
        <button
          data-auto={
            subDataAuto
              ? `menu_btn-${subDataAuto
                  .toLowerCase()
                  .replace(/\s+/g, "-")}-${title
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`
              : `menu_btn-${title.toLowerCase().replace(/\s+/g, "-")}`
          }
          type="button"
          onClick={() => toggleSubMenu(link)}
          className={`flex w-full flex-row items-center justify-between ${
            theme === "moveUp" ? "py-1" : "p-2"
          } 
                  ${
                    location.pathname.startsWith(link)
                      ? `${
                          isChildAsParent ? "bg-primary" : "bg-primary/70"
                        } text-base-300`
                      : `${
                          isChildAsParent ? "bg-base-300" : "bg-base-100"
                        } hover:bg-primary-content text-primary`
                  }`}
        >
          <div className={`flex flex-row items-center space-x-4 pl-2 py-1`}>
            {Icon ? (
              isChildAsParent && typeof Icon === "function" ? (
                <Icon className="text-2xl" />
              ) : (
                Icon
              )
            ) : (
              ""
            )}
            <span className="flex font-semibold">{title}</span>
          </div>
          <motion.div
            animate={{ rotate: isSubMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`${isSubMenuOpen ? "rotate-180" : ""} flex ${
              theme === "moveUp" ? "mr-3" : ""
            }`}
          >
            <BiChevronDown size={theme === "moveUp" ? 18 : 24} />
          </motion.div>
        </button>
      )}

      {/* Animated Submenu */}
      <AnimatePresence>
        {isSubMenuOpen && (
          <motion.div
            variants={submenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            {childrens?.map((subItem, index) => {
              if (subItem?.childrens?.length > 0) {
                return (
                  <ParentMenuItemForSidebar
                    key={index}
                    {...subItem}
                    isSubMenuOpen={isSubMenuOpen}
                    toggleSubMenu={toggleSubMenu}
                    isChildAsParent={false}
                    childLevel={subItem?.level || 0}
                    subDataAuto={title}
                  />
                );
              } else {
                return (
                  subItem?.show && (
                    <ChildMenuItemForSidebar
                      key={index}
                      index={index}
                      subItem={subItem}
                      childLevel={childLevel}
                      theme={theme}
                    />
                  )
                );
              }
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ParentMenuItemForSidebar;
