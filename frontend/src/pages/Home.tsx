import Hero from '../components/home/Hero'
import Expertise from '../components/home/Expertise'
import WhyMindstory from '../components/home/WhyMindstory'
import Services from '../components/home/HomeServices'
import SuccessStories from '../components/home/SuccessStories'
import FAQ from '../components/shared/FAQ'
<<<<<<< HEAD
import Testimonials from '../components/shared/Testimonials'
import TrustedBrands from '../components/shared/TrustedBrands'
import FeaturedBlogs from '../components/home/Blogs'
import { useFaqs } from '../hooks/useFaqs'

function Home() {
const { faqs } = useFaqs("home");
=======
import { homeFAQ } from '../data/home/HomeFAQ'
import Testimonials from '../components/shared/Testimonials'
import TrustedBrands from '../components/shared/TrustedBrands'
import FeaturedBlogs from '../components/home/Blogs'

function Home() {

>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
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
<<<<<<< HEAD
        <FAQ faqs={faqs} /> 
=======
        <FAQ faqs={homeFAQ} /> 
>>>>>>> 0634e2c5660ef805531cfb4532acefa3c72a1342
    </>
  )
}

export default Home
