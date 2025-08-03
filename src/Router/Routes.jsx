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
import Payment from "../pages/Dashboard/Customer/Payment/Payment";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import Forbidden from "../pages/Dashboard/Forbidden/Forbidden";
import AdminRoute from "../routes/AdminRoute";
import AllBookings from "../pages/Dashboard/Admin/AllBookings/AllBookings";


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
      },
      {
        path: 'payment',
        element: <PrivateRoute><Payment/></PrivateRoute>
      },
      {
        path: 'forbidden',
        Component: Forbidden
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
      },

      //admin routes
      {
        path: 'allUsers',
        element: <AdminRoute><AllUsers/></AdminRoute>
      },
      {
        path: 'allBookings',
        element: <AdminRoute><AllBookings/></AdminRoute>
      }
    ]
  }
]);