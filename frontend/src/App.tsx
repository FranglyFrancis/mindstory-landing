import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import ContactBar from "./components/shared/ContactBar";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/services/Services";
import ServiceDetail from "./pages/services/ServiceDetail";
import { NotFound } from "./pages/NotFound";
import ProjectView from "./components/home/ProjectView";


import AdminApp from "./admin/AdminApp";

// Layout for normal website pages
function MainLayout() {
  return (
    <div className="app">
      <Navbar />

      <main className="page-content">
        <Outlet />
      </main>

      <Footer />
      <ContactBar />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Normal website layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/project-view/:slug" element={<ProjectView />} />
        <Route path="*" element={<NotFound />} />

      </Route>

      {/* Admin page without website layout */}
      <Route path="/admin" element={<AdminApp />} />
    </Routes>
  );
}

export default App;