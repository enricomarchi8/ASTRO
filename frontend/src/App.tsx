import React from "react";
import Navbar from "./components/Navbar";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

function App() {
  return (
    <div className="flex-cloumn vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <React.Fragment>
        <Navbar />
      </React.Fragment>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">Copyright © 2024 ASTRO, Inc.</div>
      </footer>
    </div>
  );
}

export default App;
