import { CadreImageItem } from "../types/CadreImageItem"

export default function CadreImageComponent({ cadreImage, index }: { cadreImage: CadreImageItem; index: number }) {
    return (
        <div className={`galerie-card${index % 5 === 0 ? ' galerie-card--large' : ''}`}>
            <div className="galerie-card__img">
                <img src={cadreImage.src} alt={cadreImage.alt} />
            </div>
            <div className="galerie-card__overlay">
                <h3>{cadreImage.titre}</h3>
                <p>{cadreImage.description}</p>
            </div>
        </div>
    )
}