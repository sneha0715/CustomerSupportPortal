import HomePage from "./pages/homePage/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import CreateTicket from "./pages/CreateTicket";
import ViewTickets from "./pages/ViewTickets";
import Ticket from "./pages/Ticket";

import PrivateRoutes from "./components/routing/PrivateRoutes";
// import PublicRoutes from "./components/routing/PublicRoutes";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "./services/Toast";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          {/* <Route element={<PublicRoutes />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          {/* </Route> */}

          <Route element={<PrivateRoutes />}>
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/view-tickets" element={<ViewTickets />} />
            <Route path="/ticket/:ticketId" element={<Ticket />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;