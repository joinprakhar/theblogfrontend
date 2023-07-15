import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const showToast = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
    </ToastContext.Provider>
  );
};

// import { createContext, useState } from "react";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [userInfo, setUserInfo] = useState(null);
//   return (
//     <UserContext.Provider value={{ userInfo, setUserInfo}}>
//       {children}
//     </UserContext.Provider>
//   );
// }
// export const PostContext = createContext({});
