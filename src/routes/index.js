import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import PrivateRouter from "../pages/PrivateRouter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Search from "../pages/Search";
import JobDetail from "../pages/JobDetail";
import CompanyDetail from "../pages/CompanyDetail";
import Company from "../pages/Company";
import Logout from "../pages/Logout";
import LayoutDefault from "../layouts/layoutDefault";
import LayoutAdmin from "../layouts/layoutAdmin";
import Dashboard from "../pages/Dashboard";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import CreateJob from "../pages/CreateJob";
import JobDetailAdmin from "../pages/JobDetailAdmin";
import CVManage from "../pages/CVManage";
import DetailCV from "../pages/DetailCV";

export const routes = [
  {
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/job/:id",
        element: <JobDetail />,
      },
      {
        path: "/company",
        element: <Company />,
      },
      {
        path: "/company/:id",
        element: <CompanyDetail />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "*",
        element: <Error404 />,
      }
    ],
  },{
    element: <PrivateRouter />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "/admin",
            element: <Dashboard />,
          },
          {
            path: "/info-company",
            element: <InfoCompany />,
          },
          {
            path: "/job-manage",
            element: <JobManage />,
          },
          {
            path: "/create-job",
            element: <CreateJob />,
          },
          {
            path: "/job-detail/:id",
            element: <JobDetailAdmin />,
          },
          {
            path: "/cv-manage",
            element: <CVManage />,
          },
          {
            path: "/detail-cv/:id",
            element: <DetailCV />,
          },
        ],
      },
    ],
  }
];
