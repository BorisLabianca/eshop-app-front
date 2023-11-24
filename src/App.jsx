import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import { Home, Contact } from "./pages/index";

// Components
import { Footer, Header } from "./components/index";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer
          tech={"React"}
          techSite={"https://reactjs.org/"}
          author={"Boris"}
          linkedin={"https://www.linkedin.com/in/boris-labianca-01a52871/"}
        />
      </Router>
    </>
  );
}

export default App;
