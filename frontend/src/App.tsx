import React from "react";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <div className="app-container d-flex-cloumn vh-100">
      <ToastContainer position="bottom-right" autoClose={2500} />
      <React.Fragment>
        <Navbar />
      </React.Fragment>
      <main className="flex-grow-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer className="footer">
        <div className="text-center">Copyright © 2025 ASTRO, Inc.</div>
      </footer>
    </div>
  );
}

export default App;
