import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavbarStyling, NavTitles, NavFlexEnd } from "../styled/styled";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  //get the user if it exists in local storage
  //set user to expect an array of strings, Use exclamation mark at end to tell TSC to ignore warning as you know its fine
  interface UserProfile {
    id: number;
    email: string;
    admin: number;
    status: number;
  }
  const user: UserProfile = JSON.parse(localStorage.getItem("profile")!);
  const [isAdmin, setIsAdmin] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }
    setIsAdmin(JSON.parse(localStorage.getItem("profile")!).admin);
  }, [user]);

  //use navigate to control where users are directed
  const navigate = useNavigate();
  //simple logout function to clear localstorage and then refresh the page
  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <NavbarStyling>
      {/* using logic to show specific menu items depending if a user exists or not */}
      {user ? (
        <>
          {isAdmin ? (
            <>
              <NavTitles>
                <Link to="/tickets">View All Support Tickets</Link>
              </NavTitles>
              <NavTitles>
                <button onClick={logout}>Log Out</button>
              </NavTitles>
            </>
          ) : (
            <>
              <NavTitles>
                <Link to="/submit-ticket">Submit A Ticket</Link>
              </NavTitles>
              <NavTitles>
                <Link to="/tickets">View Your Tickets</Link>
              </NavTitles>
              <NavTitles>
                <button onClick={logout}>Log Out</button>
              </NavTitles>
            </>
          )}
        </>
      ) : (
        <>
          <NavTitles>
            <Link to="/">Dashboard</Link>
          </NavTitles>
        </>
      )}
    </NavbarStyling>
  );
};

export default Navbar;
