/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      title: "Frontend Developer",
      status: "Active",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "UI Designer",
      status: "Inactive",
      email: "jane@example.com",
    },
    // Add more dummy user data as needed
  ]);

  const updateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <UserContext.Provider value={{ users, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
