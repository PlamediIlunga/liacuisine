export default function RestaurantJsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Lia Cuisine",
        "image": "https://liacuisine.ca/image/unnamed.webp",
        "url": "https://liacuisine.ca",
        "telephone": "+18195764927",
        "servesCuisine": ["Congolaise", "Africaine", "Afrique centrale"],
        "priceRange": "20-30 $ CAD",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "693 Bd Saint-Joseph",
            "addressLocality": "Gatineau",
            "addressRegion": "QC",
            "postalCode": "J8Y 4B4",
            "addressCountry": "CA"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.6",
            "reviewCount": "233",
            "bestRating": "5"
        },
        "acceptsReservations": "False",
        "paymentAccepted": "Cartes de débit, Cartes de crédit, Paiements mobiles",
        "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Stationnement accessible en fauteuil roulant", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Stationnement gratuit", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Toilettes", "value": true }
        ],
        "hasDeliveryMethod": ["https://schema.org/OnSitePickup", "https://schema.org/DeliveryModeMail"],
        "openingHoursSpecification": [
            { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Wednesday"], "opens": "11:30", "closes": "22:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Thursday", "opens": "12:00", "closes": "22:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "11:30", "closes": "23:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "12:00", "closes": "23:00" },
            { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "11:00", "closes": "21:00" }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}