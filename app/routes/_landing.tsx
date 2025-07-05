import { Outlet } from "react-router";

export default function dashboardLayout() {
  return (
    <div>
      Landing <Outlet />
    </div>
  );
}
