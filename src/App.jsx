import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactBar from './components/ContactBar';
import Home from './pages/Home';
import About from './pages/About';

function App() {

  return (
   <div className="app">
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About /> }/>
        </Routes>
      </main>
      <Footer />
      <ContactBar />
    </div>
  )
}

export default App
