import { useEffect, useState } from "react";
import { FiAlignLeft, FiBell, FiX } from "react-icons/fi";
import { RiUser6Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router";
import ButtonLoading from "~/Components/Loadings/ButtonLoading";
import { OutsideClickHandler } from "~/Components/OutsideClickHandler";
import { formatRole } from "~/Utils/formatRole";
import { getFullImageLink } from "~/Utils/getFullImageLink";
import { getFullName } from "~/Utils/getFullName";
import useFilterState from "~/hooks/useFilterState";
import useMenu from "~/layouts/useMenu";
import RouteSearchComponentMoveUpTheme from "./RouteSearchComponentMoveUpTheme";
import useMoveUpStore from "./moveUpStore";

export default function NavbarMoveUpTheme() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogoutPending = false;
  const setLogout = () => {};
  // GET PERMISSION , MODULE AND USER FROM LOCAL DB
  const user = {};

  const [profileToggle, setProfileToggle] = useState(false);
  const { isMoveUpNavbarOpen, setIsMoveUpNavbarOpen } = useMoveUpStore();

  // NOTIFICATION RELATED WORK
  // FILTERS
  const [filters] = useFilterState({
    perPage: 20,
    page: 1,
  });

  // GET ALL DATA
  const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0);

  // NEED TO OPTIMIZE THE API
  const getAllData = () => {
    // getAllNotification({
    //   perPage: filters?.perPage,
    //   page: filters?.page,
    // })
    //   .then((res) => {
    //     setTotalUnreadNotifications(res?.total_unread_messages || 0);
    //   })
    //   .catch((error) => {
    //     handleApiError(error, "#00104");
    //   });
  };

  useEffect(() => {
    getAllData();
    setProfileToggle(false);
    // setIsOpen(false);
  }, [location]);

  // GET SIDEBAR DATA
  const links = useMenu();

  const matchedMenu = links?.find(
    (menu) =>
      (location?.pathname?.split("/")?.length > 1
        ? `/${location?.pathname?.split("/")?.at(1)}`
        : "/") === menu?.link
  );

  return (
    <nav
      data-cy="header_nav"
      className="w-full border-b z-50 h-[73px] px-5 flex items-center justify-between relative "
    >
      {/* toggle btn  */}
      {matchedMenu?.childrens?.length ? (
        <button
          data-auto={`navbar-toggle-button-every-page`}
          className={`relative z-40 bg-transparent transition-all duration-300 w-10 h-10 hidden md:block overflow-hidden`}
          onClick={() => {
            setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen);
          }}
        >
          {isMoveUpNavbarOpen ? (
            <FiX className={`text-4xl text-primary`} />
          ) : (
            <FiAlignLeft className={`text-4xl text-primary`} />
          )}
        </button>
      ) : (
        <div className={`hidden md:block`}></div>
      )}

      <button
        data-auto={`navbar-toggle-button-every-page`}
        className={`relative z-40 bg-transparent transition-all duration-300 w-10 h-10 block md:hidden overflow-hidden`}
        onClick={() => {
          setIsMoveUpNavbarOpen(!isMoveUpNavbarOpen);
        }}
      >
        {isMoveUpNavbarOpen ? (
          <FiX className={`text-4xl text-primary`} />
        ) : (
          <FiAlignLeft className={`text-4xl text-primary`} />
        )}
      </button>

      <div
        data-auto={`navbar-search-bar-every-page`}
        className={`border-primary-content`}
      >
        <RouteSearchComponentMoveUpTheme />
      </div>

      {/* PROFILE  */}
      <div
        data-cy="header_profile_container"
        className="flex justify-end items-center gap-x-8 "
      >
        <div data-cy="profile" className="flex items-center relative">
          <button
            data-auto={`navbar-profile-inside-button-every-page`}
            className=" flex justify-start gap-3 items-center "
            onClick={() => setProfileToggle(!profileToggle)}
          >
            <div className="hidden md:flex flex-col justify-start items-end">
              <h1 className="leading-3 font-medium text-left">
                {getFullName(user)}
              </h1>
              <span className=" font-light text-sm">
                {formatRole(user?.roles?.at(0)?.name)}
              </span>
            </div>

            {user?.image ? (
              <div className="avatar">
                <div className="w-10 ring ring-primary  rounded-full">
                  <img src={getFullImageLink(user?.image)} />
                </div>
              </div>
            ) : (
              <div className="avatar placeholder">
                <div className="bg-primary text-base-300 rounded-full w-10">
                  <span className="text-md font-medium">
                    {user?.first_Name?.slice(0, 1).toUpperCase()}
                    {user?.middle_Name
                      ? user?.middle_Name?.slice(0, 1).toUpperCase()
                      : ""}
                    {user?.last_Name?.slice(0, 1).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </button>

          {/* PROFILE DROPDOWN  */}
          <OutsideClickHandler
            onOutsideClick={() => {
              setProfileToggle(false);
            }}
            className={`absolute profileDropdown z-50 right-0 bg-base-200 w-auto mt-6 pt-5 overflow-hidden shadow-xl rounded-xl ${
              profileToggle ? "block top-10" : "hidden top-64"
            }`}
          >
            <div className="w-[270px] flex flex-col items-start">
              <div className="border-b border-primary-content pb-3 flex justify-between w-full px-5">
                <button
                  data-auto={`navbar-profile-inside-button-every-page`}
                  className=" flex justify-start gap-3 items-center "
                  onClick={() => navigate("/profile")}
                >
                  {user?.image ? (
                    <div className="avatar">
                      <div className="w-10 ring ring-primary  rounded-full">
                        <img src={getFullImageLink(user?.image)} />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar placeholder">
                      <div className="bg-primary text-base-300 rounded-full w-10">
                        <span className="text-md font-medium">
                          {user?.first_Name?.slice(0, 1).toUpperCase()}
                          {user?.middle_Name
                            ? user?.middle_Name?.slice(0, 1).toUpperCase()
                            : ""}
                          {user?.last_Name?.slice(0, 1).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col justify-start items-start">
                    <h1 className="leading-4 text-primary font-medium text-left">
                      {formatRole(
                        `${user?.title} ${user?.first_Name} ${
                          user?.middle_Name || ""
                        } ${user?.last_Name}`
                      )}
                    </h1>
                    <span className="text-gray-500 font-light">
                      {formatRole(user?.roles?.at(0)?.name)}
                    </span>
                  </div>
                </button>
              </div>

              <button
                data-auto={`navbar-my-profile-button-every-page`}
                className="px-5 py-3 w-full text-left hover:bg-primary hover:text-base-300 flex items-center gap-3"
                onClick={() => navigate("/profile")}
              >
                <RiUser6Line className="text-xl" /> My Profile
              </button>

              <button
                data-auto={`navbar-notification-button-every-page`}
                className="px-5 py-3 w-full text-left hover:bg-primary hover:text-base-300 group flex items-center gap-3"
                onClick={() => navigate("/communication/notification")}
              >
                <span className="relative flex h-6 w-6">
                  {totalUnreadNotifications ? (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary group-hover:bg-base-300 bg-opacity-60 opacity-75"></span>
                  ) : (
                    ""
                  )}
                  <span className="absolute top-1/2 left-1/2 inline-flex rounded-full text-[0.6rem] text-base-300 justify-center items-center">
                    <FiBell className="-translate-x-1/2 -translate-y-1/2 text-[#555] group-hover:text-base-300 font-black text-xl" />
                  </span>
                </span>{" "}
                Notification
              </button>

              <button
                data-auto={`navbar-logout-button-every-page`}
                className="px-5 group py-3 w-full text-left text-red-500 hover:bg-red-500 hover:text-base-300 flex items-center gap-3"
                onClick={() => setLogout()}
              >
                {isLogoutPending ? (
                  <ButtonLoading color="text-red-500 group-hover:text-base-300" />
                ) : (
                  <TbLogout2 className="text-xl" />
                )}{" "}
                Logout
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </nav>
  );
}
