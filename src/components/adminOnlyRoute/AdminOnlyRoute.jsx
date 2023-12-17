/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const { email } = useSelector((store) => store.auth);
  if (email === import.meta.env.VITE_ADMIN_EMAIL) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export const AdminOnlyLink = ({ children }) => {
  const { email } = useSelector((store) => store.auth);
  if (email === import.meta.env.VITE_ADMIN_EMAIL) {
    return children;
  } else {
    return null;
  }
};
export default AdminOnlyRoute;
