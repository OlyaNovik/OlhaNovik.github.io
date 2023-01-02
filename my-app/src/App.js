import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/HeaderLoyaut/Layout";
import Home from "./pages/HomeCv/Home";
import SignUp from "./pages/Sign/SignUp";
import Admin from "./pages/Admin/Admin";

import ErrorPage from "./pages/ErrorPage";

function App() {
  const admin = localStorage.getItem('user');
  console.log(admin?.user?.uid);
  console.log('clcl');
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="signup" element={<SignUp page={'Sign up'}/>} />
          <Route path="login" element={<SignUp page={'Sign in'}/>} />
          <Route path="admin" element={<Admin/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
