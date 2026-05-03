import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/transitly.png';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from './Loading';
import ThemeSwitch from './ThemeSwitch';
import useThemeMode from '../hooks/useThemeMode';

const Nav = () => {
      const { user, loading: authLoading, logOut } = useAuth();
      const { role, roleLoading } = useRole();
      const navigate = useNavigate();
      const { theme, toggle } = useThemeMode();

  if (authLoading || roleLoading) {
    return (
      <div className='flex justify-center items-center h-20'>
        <Loading />
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };



  const dashboardPathByRole = {
    user: '/dashboard/bookings',
    vendor: '/vendor-dashboard',
    admin: '/admin-dashboard',
  };

  const profilePathByRole = {
    user: '/dashboard/user-profile',
    vendor: '/vendor-dashboard/profile',
    admin: '/admin-dashboard/profile',
  };

  const currentRole = role || user?.role;
  const dashboardPath = currentRole ? dashboardPathByRole[currentRole] : null;
  const profilePath = currentRole ? profilePathByRole[currentRole] : null;

  const links = (
    <>
      <li><NavLink to="/all-tickets">All Tickets</NavLink></li>
      <li><NavLink to="/pricing">Contact</NavLink></li>
      <li><NavLink to="/policies">Policies</NavLink></li>
      {user && dashboardPath && (
        <li><NavLink to={dashboardPath}>Dashboard</NavLink></li>
      )}
    </>
  );

  return (
    <div className="p-2 sticky top-0 z-50 bg-transparent">
      <div className="navbar nav-shell bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-gray-200/50 px-4 min-h-[4rem]">

        {/* LEFT */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden btn-sm">
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
            <img src={logo} alt="Transitly" className="h-8 w-auto" />
          </NavLink>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
        </div>
        <div className="navbar-end gap-1">
          <ThemeSwitch checked={theme === 'dark'} onChange={toggle} />
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button">
                <img className='rounded-full h-[45px] w-[45px]' src={user.photoURL} alt="" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu nav-dropdown bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li className="px-4 py-1 text-xs opacity-70">{user.email}</li>
                {profilePath && (
                  <li><NavLink to={profilePath}>Your Account</NavLink></li>
                )}
                <li><button onClick={handleSignOut}>Sign Out</button></li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-1">
              <NavLink to="/signin" className="btn btn-2 btn-sm">Sign In</NavLink>
              <NavLink to="/register" className="btn btn-1 btn-sm">Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;