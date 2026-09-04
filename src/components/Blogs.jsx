import '../App.css'
import digital from '../assets/digital.webp'
import google from '../assets/google.webp'
import reels from '../assets/reels.webp'
import top5 from '../assets/top5.webp'

function FeaturedBlogs(){
    return(
        <>
        <section className="centered-section">
            <h2>Featured Blogs</h2>
            <p className="centered-desc">Explore a world of knowledge, innovation, and inspiration with Mindstory's Blogs. Our carefully curated content covers the latest trends, expert insights, and creative ideas to elevate your understanding of the digital landscape. Stay informed and inspired as you delve into a wealth of information that sparks creativity and drives success in the ever-evolving world of digital marketing.</p>
            <div className="blogs-wrapper">
                <div className="card" style={{width: '18rem'}}>
                <img src={digital} className="card-img-top w-80 mx-auto" alt="..." />
                <div className="card-body">
                    <p className="cards-text">If you are running a small business in kerala, You will definitely ask this question” How much should i spend for Digital Marketing?”.We can’t decide…</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted blogs-footer"><a href="https://mindstory.in/how-much-should-a-small-business-actually-spend-on-digital-marketinghow-much-should-a-small-business-actually-spend-on-digital-marketing/">continue reading</a></small>
                </div>
            </div>
            <div className="card" style={{width: '18rem'}}>
                <img src={google} className="card-img-top w-80 mx-auto" alt="..." />
                <div className="card-body">
                    <p className="cards-text">If you've ever searched for a competitor's product and seen those neat little stars and a price tag sitting right under their listing  while your own page shows up looking plain and text only  you know exactly how frustrating this is. You've done the work...</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted blogs-footer"><a href="https://mindstory.in/https-mindstory-in/">continue reading</a></small>
                </div>
            </div>

            
            <div className="card" style={{width: '18rem'}}>
                <img src={reels} className="card-img-top w-80 mx-auto" alt="..." />
                <div className="card-body">
                    <p className="cards-text">There is a business in your city right now  same industry as yours, similar budget, maybe even a smaller team  and they…</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted blogs-footer"><a href="https://mindstory.in/why-reels-are-your-fastest-business-growth-tool-right-now/">continue reading</a></small>
                </div>
            </div>
            <div className="card" style={{width: '18rem'}}>
                <img src={top5} className="card-img-top w-80 mx-auto" alt="..." />
                <div className="card-body">
                    <p className="cards-text">Today, every business wants one thing visibility on Google. Whether it’s a small local store, a startup, or a growing brand, being found online has…</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted blogs-footer"><a href="https://mindstory.in/top-5-seo-agencies-in-thrissur-that-businesses-trust-in-2026/">continue reading</a></small>
                </div>
            </div>
            </div>
        </section>
        </>
    )
}

export default FeaturedBlogs