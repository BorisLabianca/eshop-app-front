import AdminOnlyRoute from "../../components/adminOnlyRoute/AdminOnlyRoute";
import Slider from "../../components/slider/Slider";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <div>
      <Slider />
      <AdminOnlyRoute />
    </div>
  );
};

export default Home;
