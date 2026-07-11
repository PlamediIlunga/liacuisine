'use client'
import { useEffect, useState } from 'react'
import '../scss/galerie.scss'
import MyPictureBox from '../component/CadreImageComponent'
import { CadreImageItem } from '../types/CadreImageItem'

export default function GalerieClient() {
    const [cadreImages, setCadreImage] = useState<CadreImageItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCadreImages = async () => {
            try {
                setIsLoading(true);

                const response = await fetch('/api/galerie');

                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }

                const data: CadreImageItem[] = await response.json();
                setCadreImage(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des images de la galerie :", error);
            } finally {
                setIsLoading(false);
            }
        };
        getCadreImages();
    }, []);

    return (
        <section className="galerie">
            <div className="galerie__header">
                <p className="section-eyebrow galerie__eyebrow">Notre univers</p>
                <h2>Notre Galerie</h2>
                <p>
                    Plongez dans l'ambiance de Lia Cuisine à travers nos plats,
                    notre salle et les moments partagés avec notre communauté.
                </p>
            </div>

            {isLoading ? (
                <div className="galerie-loading">
                    <svg className="galerie-loading__spinner" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.2" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" opacity="0.85" />
                    </svg>
                    <span>Chargement de la galerie...</span>
                </div>
            ) : cadreImages.length > 0 ? (
                <div className="galerie__grid">
                    {cadreImages.map((cadreImage, index) => (
                        <MyPictureBox key={index} cadreImage={cadreImage} index={index} />
                    ))}
                </div>
            ) : (
                <p className="galerie-empty">Aucune image disponible pour le moment.</p>
            )}
        </section>
    )
}