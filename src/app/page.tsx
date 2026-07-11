import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Lia Cuisine — Restaurant Congolais Authentique à Gatineau",
  description:
    "Cuisine congolaise et d'Afrique centrale à Gatineau. Poulet Moambé, Garba, Attièké. " +
    "Sur place, à emporter et livraison. Note 4,6/5 sur Google. 693 Bd Saint-Joseph, Gatineau QC.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lia Cuisine — Saveurs d'Afrique · Gatineau",
    description: "Cuisine congolaise authentique au cœur de Gatineau.",
    url: "https://liacuisine.ca/",
    siteName: "Lia Cuisine",
    locale: "fr_CA",
    type: "website",
  },
};

export default function Page() {
  return <HomeClient />;
}