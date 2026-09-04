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
        {/* <div class="wave-container">
          <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,128L60,117.3C120,107,240,85,360,85.3C480,85,600,107,720,112C840,117,960,107,1080,96C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
        </div> */}
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
