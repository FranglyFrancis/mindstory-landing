type brandCard = {
    image: string;
    brand: string;
}

export default function brandCard({
    image,
    brand
}: brandCard) {
    return(
         <div className="card">
            <img src={image} className="card-img-top" alt={brand} />
         </div>
    )
}