// ==================================
// #00106
// ==================================

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import CustomLoading from "~/Components/Loadings/CustomLoading";
import useWindowWidth from "~/hooks/useWindowWidth";
import NavbarMoveUpTheme from "./NavbarMoveUpTheme";
import SidebarMoveUpTheme from "./SidebarMoveUpTheme";

export default function DashboardLayoutMoveUpTheme() {
  const { width } = useWindowWidth();

  const user = { business_id: 1, business: { is_subscribed: 1 } };
  //   const { isAuthenticated, setIsRouteChange } = useContext(AuthContext);
  const [isSubscriptionFound, setIsSubscriptionFound] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("intendedPath", location.pathname);
    // setIsRouteChange(Math.random());
    // if (!isAuthenticated) {
    //   navigate("/auth/login");
    //   setIsLoading(false);
    // } else {
    //   if (
    //     (!JSON.parse(localStorage.getItem("userData"))?.business
    //       ?.is_subscribed &&
    //       JSON.parse(localStorage.getItem("userData"))?.business_id) ||
    //     JSON.parse(localStorage.getItem("userData"))?.email_verified_at === null
    //   ) {
    //     setIsSubscriptionFound(false);
    //     setIsLoading(false);
    //   } else {
    //     setIsSubscriptionFound(true);
    //     setIsLoading(false);
    //   }
    // }
    //   }, [isAuthenticated, location.pathname]);
  }, [location.pathname]);

  if (isLoading) {
    return <CustomLoading />;
  } else {
    // if (!isSubscriptionFound) {
    //   return <NoSubscriptionFound />;
    // } else {
    return (
      <div data-cy="hrm_app" className={`p-0 bg-primary h-[100vh]`}>
        <div
          data-auto="main_container"
          className={`relative flex h-[calc(100vh-2px)] p-1`}
        >
          {user?.business_id ? (
            user?.business?.is_subscribed ? (
              width > 768 ? (
                <div
                  data-auto="main-sidebar"
                  className={`main-sidebar overflow-x-hidden transition-all duration-300 h-full `}
                >
                  <SidebarMoveUpTheme />
                </div>
              ) : (
                <div className={` bg-base-300 z-[60]`}>
                  <SidebarMoveUpTheme />
                </div>
              )
            ) : (
              ""
            )
          ) : width > 768 ? (
            <div
              data-auto="main-sidebar"
              className={`main-sidebar overflow-x-hidden transition-all duration-300`}
            >
              <SidebarMoveUpTheme />
            </div>
          ) : (
            <div className={` bg-base-300 z-[60]`}>
              <SidebarMoveUpTheme />
            </div>
          )}

          <motion.div
            data-cy="dashboard_welcome"
            className={`flex-grow overflow-y-auto bg-base-300 w-[500px] h-[calc(100vh-10px)] rounded-r-[5px] transition-all duration-300 delay-300`}
          >
            {user?.business_id ? (
              user?.business?.is_subscribed ? (
                <NavbarMoveUpTheme />
              ) : null
            ) : (
              <NavbarMoveUpTheme />
            )}
            <div
              className={`scroll-smooth scrollbar p-2 sm:p-5 custom-scrollbar h-[calc(100%-73px)]`}
            >
              <Outlet />
            </div>
          </motion.div>
        </div>
      </div>
    );
    // }
  }
}
