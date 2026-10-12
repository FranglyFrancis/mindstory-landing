import { HomeList } from "../../types"

type ServiceItemProps = {
    item: HomeList
}
function ServiceItem({ item }: ServiceItemProps){
    return(
            <div className="grid-item">
                <img src={item.image} alt={item.title} className='grid-image'/>
                <h4>{item.title}</h4>
                <p className="justified-text centered-desc">{item.description}</p>
            </div>
    )
}

export default ServiceItem