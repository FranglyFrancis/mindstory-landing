import { Routes, Route } from "react-router-dom";
import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';
import ContactBar from './components/home/ContactBar';
import Home from './pages/Home';
import About from './pages/About';
import Services from "./pages/services/Services";

function App() {

  return (
   <div className="app">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About /> }/>
          <Route path="/services" element={<Services />} />
        </Routes>
      </main>
      <Footer />
      <ContactBar />
    </div>
  )
}

export default App
