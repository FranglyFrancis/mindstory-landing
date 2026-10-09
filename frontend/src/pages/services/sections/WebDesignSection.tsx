import IconList from '../blocks/IconList.js';
import { intro,services,titleItem } from '../../../data/services/WebDesignSection.js';
import './WebDesignSection.css';
import imgLeftt from '/images/service/web1.webp';
import imgRight from '/images/service/web2.webp';

export default function WebDesignSection(){
    
    return(
        <section className='section-division'>

            {/* 1st */}
            <div className="web-division">
                    <div  className='web-left'>
                        <h2>{intro.title}</h2>
                        <p className='justified-text'>{intro.left}</p>
                    </div>
                    <div className='web-right'>
                        <p>{intro.right}</p>
                    </div>
            </div>

            {/* 2nd */}
            <div className='list-item'>
                {services.map((list,index)=>(
                    <IconList key={index} title={list.title} icon={list.icon} description={list.description} />
                ))}
            </div>

            {/* 3rd */}
            <div className="web-division">
                <div className='image-wrapper'>
                <img src={titleItem[0].image} className='left-image' alt={titleItem[0].title} />

                </div>
                <div>
                    <h2>{titleItem[0].title}</h2>
                    <p className='justified-text'>{titleItem[0].description}</p>
                </div>
            </div>

            {/* 4th */}
            <div className="web-division">
                <div>
                    <h2>{titleItem[0].title}</h2>
                    <p className='justified-text'>{titleItem[0].description}</p>
                </div>
                <div className="image-wrapper">
                    <img src={titleItem[0].image} className='right-image' alt={titleItem[0].title} />
                </div>
            </div>

        </section>
    )
}