import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/HeaderLoyaut/Layout";
import Home from "./pages/HomeCv/Home";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<ErrorPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
