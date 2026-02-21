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
        loader: () => fetch('/data/Districts.json').then(res => res.json()).then(data => data.districts)
      }
    ]
}

     
]);
