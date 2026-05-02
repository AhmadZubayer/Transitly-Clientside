import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../components/register/SignIn";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import SignUp from "../components/register/SignUp";
import AllTickets from "../components/AllTickets/AllTickets";
import Policies from "../pages/Policies";
import TicketDetailsPage from "../pages/TicketDetailsPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import UserBookings from "../pages/UserDashboard/UserBookings";
import UserRoute from "./UserRoute";
import UserProfile from "../pages/UserDashboard/UserProfile";
import UserBookingConfirmed from "../pages/UserDashboard/UserBookingConfirmed.jsx";
import UserPayments from "../pages/UserDashboard/UserPayments.jsx";
import VendorDashboardLayout from "../layouts/VendorDashboardLayout";
import VendorProfile from "../pages/VendorDashboard/VendorProfile";
import AddTicket from "../pages/VendorDashboard/AddTicket";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/AdminDashboard/ManageUsers.jsx";
import ManageTickets from "../pages/AdminDashboard/ManageTickets.jsx";
import AdvertiseTickets from "../pages/AdminDashboard/AdvertiseTickets.jsx";
import PlatformAnalytics from "../pages/AdminDashboard/PlatformAnalytics.jsx";
import Profile from "../pages/Profile.jsx";




export const Router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => ({ bookingSteps: (await (await fetch('/data/BookingSteps.json')).json()).steps })
      },
      {
        path: 'all-tickets',
        Component: AllTickets
      },
      {
        path: 'policies',
        Component: Policies
      },
      {
        path: 'ticket/:ticketId',
        element: <PrivateRoute><TicketDetailsPage></TicketDetailsPage></PrivateRoute>
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'signin',
        Component: SignIn
      },
      {
        path: 'register',
        Component: SignUp
      }
    ]
  }, 
  {
    path: 'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: UserBookings
      },
      {
        path: 'bookings',
        element: <UserRoute><UserBookings></UserBookings></UserRoute>
      },
      {
        path: 'user-bookings',
        element: <UserRoute><UserBookings></UserBookings></UserRoute>
      },
      {
        path: 'user-payments',
        element: <UserRoute><UserPayments></UserPayments></UserRoute>
      },
      {
        path: 'payment-history',
        element: <UserRoute><UserPayments></UserPayments></UserRoute>
      },
      {
        path: 'user-profile',
        element: <UserRoute><UserProfile></UserProfile></UserRoute>
      },
      {
        path: 'payment-success',
        element: <UserRoute><UserBookingConfirmed></UserBookingConfirmed></UserRoute>
      },
      {
        path: 'booking-confirmed',
        element: <UserRoute><UserBookingConfirmed></UserBookingConfirmed></UserRoute>
      }
    ]
  },
  {
    path: 'vendor-dashboard',
    element: <PrivateRoute><VendorDashboardLayout></VendorDashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <VendorRoute><VendorProfile></VendorProfile></VendorRoute>
      },
      {
        path: 'profile',
        element: <VendorRoute><VendorProfile></VendorProfile></VendorRoute>
      },
      {
        path: 'add-ticket',
        element: <VendorRoute><AddTicket></AddTicket></VendorRoute>
      }
    ]
  }, 
  {
    path: 'admin-dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      
      {
        index: true,
        element: <AdminRoute><Profile></Profile></AdminRoute>
      },
      {
        path: 'profile',
        element: <AdminRoute><Profile></Profile></AdminRoute>
      },
      {
        path: 'manage-users',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'manage-tickets',
        element: <AdminRoute><ManageTickets></ManageTickets></AdminRoute>
      },
      {
        path: 'advertise-tickets',
        element: <AdminRoute><AdvertiseTickets></AdvertiseTickets></AdminRoute>
      },
      {
        path: 'platform-analytics',
        element: <AdminRoute><PlatformAnalytics></PlatformAnalytics></AdminRoute>
      }
    ]

  }


]);
