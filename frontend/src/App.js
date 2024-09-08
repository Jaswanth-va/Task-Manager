import TaskManager from './components/TaskManager.js';
import LoginPage from "./components/Login.js"
import RegisterPage from './components/Register.js';
import PrivateRoute from './components/PrivateRoute.js';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import NotFoundPage from './components/NotFoundPage.js';
import './App.css';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage  />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<TaskManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;