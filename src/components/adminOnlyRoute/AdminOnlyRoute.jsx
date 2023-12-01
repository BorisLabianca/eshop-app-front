import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminOnlyRoute = ({ children }) => {
  const { email } = useSelector((store) => store.auth);
  if (email === "admin@mail.com") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export const AdminOnlyLink = ({ children }) => {
  const { email } = useSelector((store) => store.auth);
  if (email === "admin@mail.com") {
    return children;
  } else {
    return null;
  }
};
export default AdminOnlyRoute;
