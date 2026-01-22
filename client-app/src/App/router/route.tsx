import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/homepage";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import KesedaranDashboard from "../../features/activities/dashboard/KesedaranDashboard";
import PemantauanDashboard from "../../features/activities/dashboard/PemantauanDashboard";
import EditKesedaranPage from "../../features/activities/form/EditKesedaranone";
import AddKesedaranPage from "../../features/activities/form/AddKesedaran";
import PemantauanForm from "../../features/activities/form/PemantauanForm";
import LandingPeringkatPage from "../../features/activities/dashboard/PeringkatLanding";
import LoginForm from "../../features/users/LoginForm";
import ProfilePage from "../../features/ProfilePage";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "peringkat", element: <LandingPeringkatPage /> },
      { path: "activities", element: <ActivityDashboard /> },
      { path: "activities/:id", element: <ActivityDetails /> },
      { path: "createActivity", element: <ActivityForm /> },
      { path: "manage/:id", element: <ActivityForm key="manage" /> },

      { path: "kesedaran", element: <KesedaranDashboard /> },
      { path: "tambahkesedaran", element: <AddKesedaranPage /> },
      { path: "edit/kesedaran/:id", element: <EditKesedaranPage /> },

      { path: "pemantauan", element: <PemantauanDashboard /> },
      { path: "createPemantauan", element: <PemantauanForm key='create' /> },
      { path: "edit/pemantauan/:id", element: <PemantauanForm key='edit' /> },

      { path: "profiles/:username", element: <ProfilePage /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

