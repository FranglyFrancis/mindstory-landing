import './FAQ.css';

function FAQ({faqs}){
    return(
        <>
        <section>
            <h2>Frequently Asked Questions</h2>
            <div className="frequentlySect1">
                {faqs.map(item=>(
                    <div className='quest-ans' key={item.id}>
                        <h5 className='justified-text'>{item.question}</h5>
                        <p className='justified-text'>{item.answer}</p>       
                    </div>
                ))}
                
            </div>
            
        </section>
        </>
    )
}

export default FAQ