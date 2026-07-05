import { DishItem } from "../types/DishItem"

export default function DishCardComponent({ dish, index }: { dish: DishItem; index: number }) {
    return (
        <div className="dish-card" id={`dish-card${(index % 4) + 1}`}>
            <div className="dish-card__img">
                {dish.src && <img src={dish.src} alt={dish.alt} />}
            </div>
            <div className="dish-card__body">
                <h4>{dish.titre}</h4>
                <p>{dish.description}</p>
            </div>
        </div>
    )
}