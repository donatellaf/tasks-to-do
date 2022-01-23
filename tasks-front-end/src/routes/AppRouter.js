import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../container/login/Login";
import Register from "../container/register/Register";
import Tasks from "../container/tasks/Tasks";
import PrivateLayout from "../layout/private/PrivateLayout";
import PublicLayout from "../layout/public/PublicLayout";

const AppRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.loginReducer);
  return (
    <Router>
      {!isLoggedIn && (
        <PublicLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </PublicLayout>
      )}
      {isLoggedIn && (
        <PrivateLayout>
          <Routes>
            <Route exact path="/tasks" element={<Tasks />} />
            <Route path="*" element={<Tasks />} />
          </Routes>
        </PrivateLayout>
      )}
    </Router>
  );
};

export default AppRoutes;
