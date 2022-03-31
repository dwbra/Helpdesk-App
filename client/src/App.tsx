import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import CreateTicket from './pages/createTicket';
import Tickets from './pages/tickets';

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/submit-ticket/" element={<CreateTicket/>}/>
      <Route path="/tickets/" element={<Tickets/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
