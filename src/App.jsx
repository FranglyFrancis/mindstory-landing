import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import WhyMindstory from './components/WhyMindstory'
import Services from './components/Services'
import SuccessStories from './components/SuccessStories'
import FrequentlyAsked from './components/FAQ'
import Testimonials from './components/Testimonials'
import TrustedBrands from './components/TrustedBrands'
import FeaturedBlogs from './components/Blogs'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SuccessStories />
        <Expertise />
        <WhyMindstory />
        <TrustedBrands />
        <Services />
        <FeaturedBlogs />
        <Testimonials />
        <FrequentlyAsked />
        <Footer />
      </main>
    </>
  )
}

export default App
