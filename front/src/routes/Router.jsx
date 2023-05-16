/** React Router */
import { BrowserRouter, Route, Routes } from "react-router-dom";

/** Views */
import Calendar from "./Calendar";
import Chat from "./Chat";
import Dashboard from "./Dashboard";
import ForgetPassword from "./ForgetPassword";
import Login from "./Login";
import SignUp from "./SignUp";
import ToDoList from "./ToDoList";

/** Components */
import AuthGuard from "../components/AuthGuard";

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
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/calendar"
          element={
            <AuthGuard>
              <Calendar />
            </AuthGuard>
          }
        />
        <Route
          path="/chat"
          element={
            <AuthGuard>
              <Chat />
            </AuthGuard>
          }
        />
        <Route
          path="/todo"
          element={
            <AuthGuard>
              <ToDoList />
            </AuthGuard>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <AuthGuard>
              <User />
            </AuthGuard>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}
