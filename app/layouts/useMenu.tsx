import { FiPieChart } from "react-icons/fi";

const useMenu = () => {
  return [
    // DASHBOARD
    {
      title: "Dashboard",
      link: "/",
      Icon: FiPieChart,
      childrens: [],
      show: true,
    },
    {
      title: "My Activities",
      link: "/teachers",
      Icon: FiPieChart,
      show: true,
      childrens: [
        // ATTENDANCE REQUEST
        {
          title: "Attendance Request",
          link: "/teachers",
          Icon: "",
          childrens: [],
          show: true,
        },

        // LEAVE REQUEST
        {
          title: "Leave Requests",
          link: "/teachers",
          Icon: "",
          childrens: [],
          show: true,
        },
      ],
    },
  ];
};

export default useMenu;
