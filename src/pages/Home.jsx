import Hero from '../components/home/Hero'
import Expertise from '../components/home/Expertise'
import WhyMindstory from '../components/home/WhyMindstory'
import Services from '../components/home/HomeServices'
import SuccessStories from '../components/home/SuccessStories'
import FAQ from '../components/shared/FAQ'
import { homeFAQ } from '../data/home/HomeFAQ'
import Testimonials from '../components/shared/Testimonials'
import TrustedBrands from '../components/shared/Brands'
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
        <FAQ faqs={homeFAQ} /> 
    </>
  )
}

export default Home
