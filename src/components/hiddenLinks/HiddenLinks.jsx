import { useSelector } from "react-redux";

const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  if (isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

export default ShowOnLogin;

export const ShowOnLogout = ({ children }) => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  if (!isLoggedIn) {
    return children;
  } else {
    return null;
  }
};
