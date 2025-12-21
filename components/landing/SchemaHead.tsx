import React from "react";

export default function SchemaHead() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "VeterinaryCare",
        "name": "East West Vets – Glen Waverley Clinic",
        "url": "https://www.eastwestvets.com/glen-waverley",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "[Address TBC]",
            "addressLocality": "Glen Waverley",
            "addressRegion": "VIC",
            "postalCode": "3150",
            "addressCountry": "AU"
        },
        "telephone": "+61 412 345 678",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Saturday"],
                "opens": "09:00",
                "closes": "16:00"
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
