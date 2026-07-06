'use client'
import { useEffect, useState } from 'react'
import '../scss/menu.scss'
import DishCardComponent from '../component/DishCardComponent'
import { DishItem } from '../types/DishItem'
import Reveal from '../component/Reveal'

export default function Menu() {
    const [dishes, setDishes]     = useState<DishItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getDishes = async () => {
            try {
                setIsLoading(true);

                const response = await fetch('/api/menu');

                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }

                const data: DishItem[] = await response.json();
                setDishes(data);

            } catch (error) {
                console.error("Erreur lors de la récupération des plats :", error);
            } finally {
                setIsLoading(false);
            }
        };

        getDishes();
    }, []);

    return (
        <section className="specials">
            <Reveal variant="up">
                <div className="specials__header">
                    <h2>NOS PLATS SAVOUREUX</h2>
                    <p>
                        Plongez au cœur de la cuisine congolaise authentique, où chaque plat
                        raconte une histoire transmise de génération en génération. Des épices
                        soigneusement choisies, des produits frais et un savoir-faire fidèle
                        aux traditions d&apos;Afrique centrale, pour une expérience qui éveille
                        tous vos sens.
                    </p>
                </div>
            </Reveal>

            {isLoading ? (
                <div className="specials-loading">
                    <svg className="specials-loading__spinner" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.85" />
                    </svg>
                    <span>Chargement du menu...</span>
                </div>
            ) : dishes.length > 0 ? (
                <div className="specials__grid">
                    {dishes.map((dish, index) => (
                        <Reveal key={index} variant="up" delay={(index % 4) * 100}>
                            <DishCardComponent dish={dish} index={index} />
                        </Reveal>
                    ))}
                </div>
            ) : (
                <p className="specials-empty">Aucun plat disponible pour le moment.</p>
            )}
        </section>
    )
}