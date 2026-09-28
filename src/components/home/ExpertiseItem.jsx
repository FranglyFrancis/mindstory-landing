export default function ExpertiseItem({image,alt,title}){
    <div className="card-expertise">
        <img src={image} alt={alt} className="card-img" />
        <h4>{title}</h4>
    </div>
}