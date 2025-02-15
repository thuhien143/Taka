import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";


const NavBar = () => {
  const {toggle, darkMode} = useContext(DarkModeContext)
  const {currentUser} = useContext(AuthContext)
  
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{textDecoration:"none"}}>
          <span>Taka</span>
        </Link>
        <HomeOutlinedIcon/>
        {darkMode ? (<WbSunnyOutlinedIcon onClick={toggle}/>
        ) : (<DarkModeOutlinedIcon onClick={toggle}/>)}
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder="Search..."/>
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon/>
        <EmailOutlinedIcon/>
        <NotificationsOutlinedIcon/>
        <Link to={`/profile/${currentUser.id}`} className="user" style={{ textDecoration: "none", color: "inherit" }}>
          <img src={"/upload/" + currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
        </Link>
      </div>
    </div>
  )
}

export default NavBar