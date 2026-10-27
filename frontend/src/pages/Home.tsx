import Hero from '../components/home/Hero/Hero'
import Expertise from '../components/home/Expertise/Expertise'
import WhyMindstory from '../components/home/About/WhyMindstory'
import Services from '../components/home/HomeServices'
import SuccessStories from '../components/home/Works/SuccessStories'
import FAQ from '../components/shared/FAQ/FAQ'
import Testimonials from '../components/shared/Testimonials/Testimonials'
import TrustedBrands from '../components/shared/Brands/TrustedBrands'
import FeaturedBlogs from '../components/home/Blog/Blogs'
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
