export default function brandCard({image,title}){
    return(
         <div className="card">
            <img src={image} className="card-img-top" alt={title} />
         </div>
    )
}