import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/HeaderLoyaut/Layout";
import Home from "./pages/HomeCv/Home";
import Login from "./pages/Login/LoginPage";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Login />} />
          <Route path="*" element={<ErrorPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
