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
  }


]);
