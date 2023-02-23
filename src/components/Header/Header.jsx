import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./Header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigateTo = useNavigate();
  const location = useLocation();

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };


  const handleSearchQuery = (e) => {
    if (searchQuery.length > 0 && e.key === "Enter") {
      navigateTo(`/search/${searchQuery}`);
        setTimeout(()=>{
            setShowSearch(false)
        },1000)
    }
  };

  const navigationHandler = (type)=>{
    navigateTo(`/explore/${type}`)
    setMobileMenu(false)
  }

  const controlNavigationBarTransition = () =>{
    // console.log(Math.floor(window.scrollY))
    if(window.scrollY > 200)
        setShow("show")
    else
        setShow("top")

  }

  useEffect(()=>{
    window.addEventListener("scroll",controlNavigationBarTransition)
    return ()=>{
      window.removeEventListener("scroll",controlNavigationBarTransition)
    }
  },[lastScrollY])


  useEffect(()=>{
    window.scrollTo(0,0)
  },[location])

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <Link to="/"><img src={logo} alt="" /></Link>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={()=>navigationHandler("tv")}>Tv Shows</li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      { showSearch && <div className="searchBar">
        <ContentWrapper>
         <div className="searchInput">
         <input
            type="text"
            name=""
            placeholder="Search for a movie or Tv show"
            id=""
            onKeyUp={handleSearchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
         </div>
          <VscChromeClose  onClick={()=>setShowSearch(false)}/>
        </ContentWrapper>
      </div>}
    </header>
  );
};

export default Header;
