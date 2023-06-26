import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/homepage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import KesedaranDashboard from "../../features/activities/dashboard/KesedaranDashboard";
import PemantauanDashboard from "../../features/activities/dashboard/PemantauanDashboard";
import EditKesedaranPage from "../../features/activities/form/EditKesedaranone";
import EditPemantauanPage from "../../features/activities/form/EditPemantauan";
import LandingPeringkatPage from "../../features/activities/dashboard/PeringkatLanding";
import LoginForm from "../../features/users/LoginForm";
import CreatePemantauanPage from "../../features/activities/form/AddPemantauan";
import AddKesedaranPage from "../../features/activities/form/AddKesedaran";
import ProfilePage from "../../features/ProfilePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "peringkat", element: <LandingPeringkatPage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "kesedaran", element: <KesedaranDashboard /> },
      { path: "pemantauan", element: <PemantauanDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm /> },
      { path: "tambahkesedaran", element: <AddKesedaranPage /> },
      { path: "edit/kesedaran/:id", element: <EditKesedaranPage /> },
      // Route path for updating Pemantauan
      { path: "edit/pemantauan/:id", element: <EditPemantauanPage /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },
      { path: "profiles/:username", element: <ProfilePage /> },
      
      { path: "login", element: <LoginForm /> },
      // Route path for creating Pemantauan
      { path: "createPemantauan", element: <EditPemantauanPage /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
