import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dashboard";
import CreateTicket from "./pages/createTicket";
import Tickets from "./pages/tickets";
import SingleTicket from "./pages/singleTickets";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/submit-ticket/" element={<CreateTicket />} />
        <Route path="/tickets/" element={<Tickets />} />
        {/* use react router to set ticket_id as the param of the url */}
        <Route path="/tickets/:ticket_id" element={<SingleTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
