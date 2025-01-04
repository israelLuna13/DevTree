import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import ProfileView from "./views/ProfileView";
import LinkTreeView from "./views/LinkTreeView";
import HandleView from "./views/HandleView";
import NotFoundView from "./views/NotFoundView";
import HomeView from "./views/HomeView";
import ChangePasswordView from "./views/ChangePasswordView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        {/* the routes son will got the path /admin  */}
        <Route path="/admin" element={<AppLayout />}>
          {/* it going take the route father */}
          <Route index={true} element={<LinkTreeView />} />
          {/* this route going to join to route father /admin/profile */}
          <Route path="profile" element={<ProfileView />} />
          <Route path="change-password" element={<ChangePasswordView/>} />
        </Route>

        <Route path="/:handle" element={<AuthLayout />}>
          <Route index={true} element={<HandleView />} />
        </Route>
         
         <Route path="/" element={<HomeView/>}/>

        <Route path="/404" element={<AuthLayout />}>
          <Route element={<NotFoundView />} index={true} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
