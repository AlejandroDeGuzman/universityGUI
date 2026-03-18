import "./ImageText.css";


export function ImageText({image,text}) => {
    return (
        <div className="img-text">
        <img src={image} alt="" />
        <span>{text}</span>
        </div>
    )

}