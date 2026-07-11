import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Lia Cuisine | Gatineau, QC",
  description:
    "Contactez Lia Cuisine : (819) 576-4927 · 693 Bd Saint-Joseph, Gatineau, QC J8Y 4B4. " +
    "Réservations, questions, livraison et commandes à emporter.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Lia Cuisine",
    description: "Écrivez-nous ou appelez-nous au (819) 576-4927.",
    url: "https://liacuisine.ca/contact",
  },
};

export default function Page() {
  return <ContactClient />;
}