import IconList from '../blocks/IconList.js';
import { article, lists, paraItem, titleCards } from '../../../data/services/LogoDesign.js'; 
import './LogoDesignSection.css'
import Brands from '../../../components/shared/Brands.js'
import { brands} from '../../../data/home/Brands.js';
import logoImage from '/images/service/email.webp';
import TitleList from '../blocks/TitleList.js';
import '../../services/blocks/TitleList.css';

export default function LogoDesignSection(){
    return(
        <>
        <section>
            <div className='section-division'>
                <div className='logo-section'>
                    {/* Intro */}
                    <div>
                        <h2>{article.title}</h2>
                        <div className='title-list'>
                            <h3>{article.descriptions[0]}</h3>
                            <p>{article.descriptions[1]}</p>
                        </div>
                    </div>

                    <img src={logoImage} className='logo-image' alt="Logo Avatar" />
                    {titleCards.map((list,index)=>(
                        <TitleList key={index} title={list.title} description={list.description} />
                    ))}

                </div>
            </div>

            <div className="list-grid section-division">
                {lists.map((list,index) => (
                    <IconList key={index} icon={list.icon} title={list.title} description={list.description} />
                ))}
            </div>

            <div className='section-division paragraph justified-text'>
                {paraItem.map((item,index)=>(
                    <p key={index}>{item.description}</p>
                ))}
            </div>
            
            <div className='section-division'>
                <Brands title={""} description={""} brands={brands} />
            </div>

        </section>
        </>

    )
}