export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Zenith Events & Financial Consultancy",
    image: "https://www.zefc.in/assets/zefc_logo_black.png",
    url: "https://www.zefc.in",
    telephone: "+918582888324",
    email: "reachus@zefcin",
    address: {
      "@type": "PostalAddress",
      streetAddress: "9 Deshapriya Park Road, Lake Market",
      addressLocality: "Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700026",
      addressCountry: "IN"
    },
    areaServed: "Kolkata",
    priceRange: "₹₹",
    sameAs: [
      "https://www.google.com/maps/place/Zenith+Events+%26+Financial+Consultancy/@22.5181057,88.3499057,17z/data=!3m1!4b1!4m6!3m5!1s0x3a0277003d8bf90f:0x5d8b2d61836b4695!8m2!3d22.5181057!4d88.3499057!16s%2Fg%2F11zcy3q0cn?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
      "https://www.facebook.com/profile.php?id=61573672451352",
      "https://www.instagram.com/zenith_eventsandfc",
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}