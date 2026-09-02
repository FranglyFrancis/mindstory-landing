import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import WhyMindstory from './components/WhyMindstory'
import Services from './components/Services'
import SuccessStories from './components/SuccessStories'
import FrequentlyAsked from './components/FAQ'

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SuccessStories />
        <Expertise />
        <WhyMindstory />
        <Services />
        <FrequentlyAsked />
      </main>
    </>
  )
}

export default App
