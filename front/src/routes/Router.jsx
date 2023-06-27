/** React Router */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/** Views */
import Calendar from "./Calendar";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import Profile from "./Profile";
import SignUp from "./SignUp";
import Students from "./Students";
import ToDoList from "./ToDoList";

/** Components */
import { GuardAuth, GuardTutor } from "../components/index";

/**
 * The router component.
 * @component
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/"
          element={
            <GuardAuth>
              <Dashboard />
            </GuardAuth>
          }
        />
        <Route
          path="/calendar"
          element={
            <GuardAuth>
              <Calendar />
            </GuardAuth>
          }
        />
        <Route
          path="/chat"
          element={
            <GuardAuth>
              <Chat />
            </GuardAuth>
          }
        />
        <Route
          path="/todo"
          element={
            <GuardAuth>
              <ToDoList />
            </GuardAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <GuardAuth>
              <Profile />
            </GuardAuth>
          }
        />
        <Route
          path="/my-students"
          element={
            <GuardTutor>
              <Students />
            </GuardTutor>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
