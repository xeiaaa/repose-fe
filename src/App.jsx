import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home/Home";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserList from "./pages/UserList/UserList";
import LeaveList from "./pages/LeaveList/LeaveList";
import ApplyLeave from "./pages/ApplyLeave/ApplyLeave";
import MyLeaves from "./pages/MyLeaves/MyLeaves";

import useLocalStorage from "./hooks/useLocalStorage";

import { TOKEN_KEY } from "./constants";
import { me } from "./api";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const [tokens] = useLocalStorage(TOKEN_KEY, null);
  if (!tokens) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const CheckAuth = ({ children }) => {
  const location = useLocation();
  const [tokens] = useLocalStorage(TOKEN_KEY, null);
  console.log({ tokens });
  if (tokens) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const CheckRole = ({ role, children }) => {
  const location = useLocation();

  if (role === "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const location = useLocation();
  const [role, setRole] = useState("");
  const [_, setToken] = useLocalStorage(TOKEN_KEY, null);

  const getUserRole = async () => {
    try {
      if (location.pathname !== "/login") {
        const { data: result } = await me();
        console.log("GET USER ROLE", result);
        setRole(result.role);
      }
    } catch (err) {
      console.log(err);
      setToken(null);
    }
  };

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    getUserRole();
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        >
          <Route
            path="/"
            element={
              <Dashboard />
              // <CheckRole role={role}>
              //   <UserDashboard />
              // </CheckRole>
            }
          />
          <Route
            path="/users"
            element={
              <UserList />
              // <CheckRole role={role}>
              //   <UserDashboard />
              // </CheckRole>
            }
          />
          <Route path="/leaves" element={<LeaveList />} />
          <Route path="/my-leaves" element={<MyLeaves />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
        </Route>
        <Route
          path="/login"
          element={
            <CheckAuth>
              <Login />
            </CheckAuth>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
