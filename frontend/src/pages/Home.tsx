import Hero from '../components/home/Hero'
import Expertise from '../components/home/Expertise'
import WhyMindstory from '../components/home/WhyMindstory'
import Services from '../components/home/HomeServices'
import SuccessStories from '../components/home/SuccessStories'
import FAQ from '../components/shared/FAQ'
import Testimonials from '../components/shared/Testimonials'
import TrustedBrands from '../components/shared/TrustedBrands'
import FeaturedBlogs from '../components/home/Blogs'
import { useFaqs } from '../hooks/useFaqs'

function Home() {
const { faqs } = useFaqs("home");
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
        <FAQ faqs={faqs} /> 
    </>
  )
}

export default Home
