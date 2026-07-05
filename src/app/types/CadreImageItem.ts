import { StaticImageData } from "next/image";

export interface CadreImageItem {
    src: string ;  // accepte un path string OU un import d'image local
    alt: string;
    titre: string;
    description: string;
}