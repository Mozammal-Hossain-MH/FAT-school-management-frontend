import { motion } from "framer-motion";
import { NavLink } from "react-router";
import useMoveUpStore from "../Themes/MoveUpTheme/moveUpStore";

const ChildMenuItemForSidebar = ({ index, subItem, childLevel, theme }) => {
  const { isMoveUpNavbarOpen, setIsMoveUpNavbarOpen } = useMoveUpStore();
  const submenuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  return (
    <motion.div
      variants={submenuItemVariants}
      className={`${index === 0 ? "mt-0.5" : ""}`}
    >
      <NavLink
        onClick={
          theme === "moveUp"
            ? () => setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen)
            : // subItem?.link === location.pathname
              //   ? () => setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen)
              //   : () => {}
              () => {}
        }
        to={subItem?.link}
        end={subItem?.link === "/"}
        style={{ paddingLeft: `${childLevel + 1 * 20}px` }}
        className={({ isActive }) =>
          `flex flex-row items-center space-x-4 ${
            theme === "moveUp" ? "p-2" : "p-2 py-3"
          }  bg-base-100 border-l-4 ${
            isActive
              ? `bg-primary-content font-bold  border-primary text-primary`
              : "border-primary-content border-l-base-100 font-light hover:bg-primary-content text-primary border-b-2"
          }`
        }
        data-auto={`submenu_btn-${subItem.title
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
        target={subItem?.newTab ? "_blank" : undefined}
        rel={subItem?.newTab ? "noopener noreferrer" : undefined}
      >
        <span className="flex text-sm font-medium">{subItem.title}</span>
      </NavLink>
    </motion.div>
  );
};

export default ChildMenuItemForSidebar;
