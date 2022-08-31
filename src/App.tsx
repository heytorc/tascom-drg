import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "@/pages/login";
import App from "@/pages/app"

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<App />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
