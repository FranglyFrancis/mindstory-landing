import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import WhyMindstory from './components/WhyMindstory'

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Expertise />
        <WhyMindstory />
      </main>
    </>
  )
}

export default App
