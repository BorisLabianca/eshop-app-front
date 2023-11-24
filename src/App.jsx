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
        <Footer />
      </Router>
    </>
  );
}

export default App;
