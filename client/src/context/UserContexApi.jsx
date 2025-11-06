import { useContext, createContext, useState, useEffect } from "react";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  let [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // console.log("user", user);
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };
  return (
    <UserContext.Provider value={{ user, updateUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const userUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
