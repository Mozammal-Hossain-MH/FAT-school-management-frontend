import DashboardLayoutMoveUpTheme from "~/layouts/Themes/MoveUpTheme/DashboardLayoutMoveUpTheme";

const ThemeProvider = () => {
  //   switch (user?.business?.theme) {
  switch ("move-up-theme") {
    case "move-up-theme":
      return (
        <>
          <DashboardLayoutMoveUpTheme />
        </>
      );
    default:
      return (
        <>
          <DashboardLayoutMoveUpTheme />
        </>
      );
  }
};

export default ThemeProvider;
