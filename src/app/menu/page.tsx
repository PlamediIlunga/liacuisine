import type { Metadata } from "next";
import MenuClient from "./MenuClient";

export const metadata: Metadata = {
  title: "Notre Menu — Lia Cuisine | Cuisine Congolaise Gatineau",
  description:
    "Découvrez notre menu : Poulet Moambé, Garba, Attièké, Poulet Braisé, Chèvre Grillée et plus. " +
    "Cuisine authentique d'Afrique centrale, préparée avec des recettes traditionnelles.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu — Lia Cuisine",
    description: "Nos plats congolais authentiques, préparés avec passion.",
    url: "https://liacuisine.ca/menu",
  },
};

export default function Page() {
  return <MenuClient />;
}