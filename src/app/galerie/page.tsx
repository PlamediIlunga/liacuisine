import type { Metadata } from "next";
import GalerieClient from "./GalerieClient";

export const metadata: Metadata = {
  title: "Galerie — Lia Cuisine | Photos de notre restaurant à Gatineau",
  description:
    "Découvrez l'ambiance chaleureuse de Lia Cuisine à Gatineau : notre salle, nos plats " +
    "et les moments partagés avec notre communauté.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "Galerie — Lia Cuisine",
    description: "L'ambiance et les plats de Lia Cuisine en images.",
    url: "https://liacuisine.ca/galerie",
  },
};

export default function Page() {
  return <GalerieClient />;
}