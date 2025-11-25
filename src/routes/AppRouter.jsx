import { useRoutes } from "react-router-dom";
import Login from "../public/Login";
import Signup from "../public/Signup";
import Tournament from "../pages/Tournament";

const AppRouter = () => {
  return useRoutes([
    { path: "/", element: <Login /> },
    {path:"/signup",element:<Signup></Signup>},
    {path:"/tounament",element:<Tournament></Tournament>}
  ]);
};

export default AppRouter;
