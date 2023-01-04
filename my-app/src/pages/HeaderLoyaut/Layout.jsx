import { Outlet, Link } from "react-router-dom";
import "./Layout.scss"
import hacker from "../../Image/hacker.png"

const Layout = () => {
  return (
    <>
    <div className="header">
      <div className="img_box">
        <img className="avatar" src={hacker} alt="" />
    <p></p>
      </div>
      <div className="Link_block">
     <p><Link to="/">Home</Link></p> 
     <p><Link to="/login">Sign In</Link></p> 
     {/* <p><Link to="/login">Login</Link></p>  */}
      </div>
    </div>
      <Outlet />
    </>
  )
};

export default Layout;