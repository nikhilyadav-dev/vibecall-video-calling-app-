import { Navigate, Outlet } from "react-router-dom";
import { userUser } from "../../context/UserContexApi";
function IsloggedIn() {
  const { loading, user } = userUser();
  if (loading) return <div>Loading....</div>;
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default IsloggedIn;
