
export default function ServiceCard({ service }){
        return(
                <div className='cards-container'>
                    <div className='service-card'>
                        <img src={service.image} alt="" />
                        <h2>{service.title}</h2>
                        <p>{service.description}</p>
                        <a href="">LEARN MORE</a>
                    </div>
                </div>
        )
}