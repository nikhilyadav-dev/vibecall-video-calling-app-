import { useContext, createContext, useState, useEffect } from "react";
const UserContext = createContext();
function UserContext({ children }) {
  let [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });
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
    <UserContext.provider value={(user, updateUser, loading)}>
      {children}
    </UserContext.provider>
  );
}
