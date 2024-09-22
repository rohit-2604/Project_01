import React from "react";
import "./App.css";
import AppLayout from "./Components/Layout/AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Country from "./pages/Country";
import Errorpage from "./pages/Errorpage";
import CountryDetails from "./Components/Layout/CountryDetails";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    errorElement:<Errorpage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "country",
        element: <Country />,
      },
      {
        path: "country/:id",
        element: <CountryDetails />,
      },
      {
        path: "country\:id",
        element: <CountryDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
