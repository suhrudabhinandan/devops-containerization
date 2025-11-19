import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Landing from '../Components/Landing/Landing';
import Attendance from '../Components/Attendance/Attendance';
import Announcement from '../Components/Announcement/Announcement';
import Result from '../Components/Result/Result';


const routes = [
  { path: '/', element: <Home /> },            
  { path: '/LandingPage', element: <Landing /> },
  {path: '/attendancePage', element: <Attendance/>},
  {path: '/announcement', element: <Announcement/>} ,
  {path: '/result', element: <Result/>} ,
];


const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
    v7_relativeSplatPath: true,
    v7_startTransition: true,
  },
});

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
