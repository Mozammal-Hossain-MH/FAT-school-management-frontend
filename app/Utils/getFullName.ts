import { formatRole } from "./formatRole";

interface Name {
  title: string;
  first_Name: string;
  middle_Name: string;
  last_Name: string;
}

export const getFullName = (name: Name) => {
  const nameArray = [
    name?.title,
    name?.first_Name,
    name?.middle_Name,
    name?.last_Name,
  ];
  const filteredName = nameArray?.filter((n) => n);

  return filteredName?.length > 0 ? formatRole(filteredName?.join(" ")) : "N/A";
};
