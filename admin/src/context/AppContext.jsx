import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

const currency= '₹';

    const calculateAge = (dob) => {
  if (!dob) return "Not Provided"; // Return a string if dob is missing or invalid

  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return "Not Provided"; // Return a string if dob is invalid

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 0 ? age.toString() : "N/A"; // Ensure a string is returned
};

//   const calculateAge = (dob) => {
//     const today = new Date();
//     const birthDate = new Date(dob);

//     let age = today.getFullYear() - birthDate.getFullYear();
//     return age;
//   };

  

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];



  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

const value = {
    calculateAge, slotDateFormat, currency
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
