import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/HeaderLoyaut/Layout";
import Home from "./pages/HomeCv/Home";
import SignUp from "./pages/Sign/SignUp";
import Admin from "./pages/Admin/Admin";

import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <div className="App">
     <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="signup" element={<SignUp page={'Sign up'}/>} />
          <Route path="login" element={<SignUp page={'Sign in'}/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Route>

      </Routes>
    </HashRouter>
    
    </div>
  );
}

export default App;
