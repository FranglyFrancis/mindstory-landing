import { Routes, Route } from "react-router-dom";
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import ContactBar from './components/shared/ContactBar';
import Home from './pages/Home';
import About from './pages/About';
import Services from "./pages/services/Services";
import ServiceDetail from "./pages/services/ServiceDetail";
import { NotFound } from "./pages/NotFound";
import './App.css';

function App() {

  return (
   <div className="app">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About /> }/>
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} /> {/*Service detail- layout for all services  :slug- a placeholder */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ContactBar />
    </div>
  )
}

export default App
