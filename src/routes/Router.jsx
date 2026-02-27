import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../components/register/SignIn";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import SignUp from "../components/register/SignUp";
import AllTickets from "../components/AllTickets";


export const Router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        loader: async () => {
          const [districtRes, stepsRes] = await Promise.all([
            fetch('/data/Districts.json'),
            fetch('/data/BookingSteps.json')
          ]);

          const districtData = await districtRes.json();
          const stepsData = await stepsRes.json();

          return {
            districts: districtData.districts,
            bookingSteps: stepsData.steps
          };
        }
      },
      {
        path: 'all-tickets',
        Component: AllTickets
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
