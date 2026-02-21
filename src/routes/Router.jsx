import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";


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
      }
    ]
  }


]);
