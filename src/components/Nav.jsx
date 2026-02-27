import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/transitly.png';
import useAuth from '../hooks/useAuth';

const Nav = () => {
      const { user, loading, logOut } = useAuth();

  if (loading) {
    return null; 
  }

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const links = (
    <>
      <li><NavLink to="/all-tickets">All Tickets</NavLink></li>
      <li><NavLink to="/bus">Bus</NavLink></li>
      <li><NavLink to="/train">Train</NavLink></li>
      <li><NavLink to="/planes">Planes</NavLink></li>
      <li><NavLink to="/offers">Offers</NavLink></li>
      <li><NavLink to="/pricing">Contact</NavLink></li>
      {user && <li><NavLink to="/dashboard/user-tickets">Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="p-4">
      <div className="navbar bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-gray-200/50 px-6">

        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white/90 backdrop-blur-md rounded-2xl z-1 mt-3 w-52 p-2 shadow-lg border border-gray-200/50"
            >
              {links}
            </ul>
          </div>

          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="Transitly" className="h-10 w-auto" />








            
            
          </NavLink>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img className='rounded-full h-[55px] w-[55px]' src={user.photoURL} alt="" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm">
                <li>{user.email}</li>
                <li><NavLink>Your Account</NavLink></li>
                <li><button onClick={handleSignOut}>Sign Out</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-2">
              <NavLink to="/signin" className="btn btn-2">Sign In</NavLink>
              <NavLink to="/register" className="btn btn-1">Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export default Nav;