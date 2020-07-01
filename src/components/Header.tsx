import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "react-global-state-hook";
import "./Header.scss";
// menu button that appears on mobile
// slider from left
// logo/name
// profile icon on right
// list of links
const navItems: { path: string, label: string, icon: string }[] = [
  {
    label: "Profile",
    icon: "person",
    path: "/profile"
  },
  {
    label: "Diary",
    icon: "book",
    path: "/diary"
  },
  {
   label: "Purchase",
   icon: "attach_money",
   path: "/stock"   
  }
];
// menu_open
export const Header = () => {
  const [menu, setMenu] = useState(false)
  const [signedIn] = useGlobalState("SIGNED_IN", false);

  return (
    <header>
      <div onClick={(e) => setMenu(!menu)} className="mobile-menu">
        <i className="material-icons">{menu ? "menu_open" : "menu"}</i>
      </div>
      <div>
        <h1>Homegrown</h1>
      </div>
      <nav>
      {signedIn && 
        navItems.map((el, i) => (
          <div key={i} className="nav-icons">
            <Link to={el.path}><i className="material-icons">{el.icon}</i>{el.label}</Link>
          </div>
        ))
      }
      </nav> 
      <div>
        {signedIn ?
          <i className="material-icons">person</i>:
          <Link to="/auth/login">Login</Link>
          
        }
      </div>
      <SideMenu menu={menu} setMenu={setMenu}/>
    </header>
  )
};

const SideMenu = ({menu, setMenu}: {menu: boolean, setMenu: (x: boolean) => void} ) => {

  const handleClickOutside = e => {
    const isOutside = !e.target.closest(".side-menu");
    if (isOutside) {
      // alert("Outside");
      // close menu
      setMenu(false);
      document.removeEventListener("click", handleClickOutside);
    } 
  };

  useEffect(() => {
    if (menu) {
      // add eventlistener
      document.addEventListener("click", handleClickOutside);
    }
  }, [menu]);

  return (
    <div data-open={menu} className="side-menu">
      {navItems.map((el, i) => (
        <div key={i} className="nav-icons">
          <Link to={el.path}>
            <i className="material-icons">{el.icon}</i>
            {el.label}
          </Link>
        </div>
      ))}
    </div>
  );
}