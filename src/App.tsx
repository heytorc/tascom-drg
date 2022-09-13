import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { DrgProvider } from "@/commons/contexts/drg.context";
import { AuthProvider } from "./commons/contexts/auth.context";

import { AuthMiddleware } from "@/commons/middlewares/auth.middleware";

import Login from "@/pages/login";
import App from "@/pages/app"

export default function () {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="app" element={<AuthMiddleware />}>
            <Route index element={<DrgProvider><App /></DrgProvider>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter >
  )
}
