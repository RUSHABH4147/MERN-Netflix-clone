import { ArrowDropDown, Notifications, Search } from "@material-ui/icons"
import {  useState} from "react";
import "./nav.scss"

const Nav = () => {
    const [isScroll, setisScroll] = useState(false)
    window.onscroll = ()=>{
        setisScroll(window.pageYOffset === 0 ? false : true)
        return ()=>(window.onscroll=null)
    }
  return (
    <div className={isScroll ? "navbar scrolled" : " navbar"}>
        <div className="container">
            <div className="left">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="" />
               <span>Homeoage</span>
               <span>Series</span>
               <span>Movies</span>
               <span>New and Popular</span>
               <span>My List</span>
                </div>
            <div className="right">
                <Search className="icon" />
                <span>KID</span>
                <Notifications className="icon"/>
                <img src="https://images.pexels.com/photos/10154769/pexels-photo-10154769.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                <div className="profile">
                <ArrowDropDown className="icon"/>
                <div className="options">
                    <span>Settings</span>
                    <span>Logout</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Nav