import Hero from '../components/home/Hero'
import Expertise from '../components/home/Expertise'
import WhyMindstory from '../components/home/WhyMindstory'
import Services from '../components/home/Services'
import SuccessStories from '../components/home/SuccessStories'
import FrequentlyAsked from '../components/home/FAQ'
import Testimonials from '../components/home/Testimonials'
import TrustedBrands from '../components/home/TrustedBrands'
import FeaturedBlogs from '../components/home/Blogs'

function Home() {

  return (
    <>
        <Hero />
        <SuccessStories />
        <Expertise />
        <WhyMindstory />
        <TrustedBrands />
        <Services />
        <FeaturedBlogs />
        <Testimonials />
        <FrequentlyAsked /> 
    </>
  )
}

export default Home
