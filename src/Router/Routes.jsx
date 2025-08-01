import {
  createBrowserRouter
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from '../pages/Authentication/Login/Login'
import Register from '../pages/Authentication/Register/Register'
import BookParcel from "../pages/BookAParcel/BookParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/Customer/MyParcels/MyParcels";
import TrackParcel from "../pages/Dashboard/Customer/TrackParcel/TrackParcel";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'bookParcel',
        element: <PrivateRoute><BookParcel/></PrivateRoute>
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children:[
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'track',
        Component: TrackParcel
      }
    ]
  }
]);