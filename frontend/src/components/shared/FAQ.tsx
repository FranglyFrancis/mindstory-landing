import './FAQ.css';
import './FAQNumbers.css';   // keep this after FAQ.css
import { Faq } from '../../types';

type FaqProps = {
    faqs: Faq[]
}

// The question number you set in the admin panel. Works even if your Faq type does not list it.
const orderOf = (f: Faq) => (f as Faq & { order?: number }).order ?? 0;

export default function FAQ({faqs}: FaqProps){
    // same order as the admin panel: lowest number first, ties keep the order the API sent them in
    const sorted = [...faqs].sort((a, b) => orderOf(a) - orderOf(b));
    return(
        <>
        <section>
            <h2>Frequently Asked Questions</h2>
            <div className="frequentlySect1">
                {sorted.map((item,index)=>(
                    <div className='quest-ans' key={index}>
                        <h5 className='justified-text faq-question'>
                            <span className="faq-num" aria-hidden="true">{index + 1}.</span>
                            <span className="faq-sr">Question {index + 1}: </span>
                            <span className="faq-text">{item.question}</span>
                        </h5>
                        <p className='justified-text'>{item.answer}</p>       
                    </div>
                ))}
            </div>
        </section>
        </>
    )
}
