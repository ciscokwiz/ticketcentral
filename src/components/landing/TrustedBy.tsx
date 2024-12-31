
const TrustedBy = () => {
  const companies = [
    { name: "Stripe", logo: "/company-logos/stripe.svg", className: "w-28" },
    { name: "HubSpot", logo: "/company-logos/hubspot.svg", className: "w-28" },
    { name: "Intercom", logo: "/company-logos/intercom.svg", className: "w-28" },
    { name: "Asana", logo: "/company-logos/asana.svg", className: "w-28" },
    { name: "Slack", logo: "/company-logos/slack.svg", className: "w-28" },
    { name: "Notion", logo: "/company-logos/notion.svg", className: "w-28" }
  ];

  return (
    <section className="py-24 bg-neutral-200/50">
      <div className="container-padding">
        <p className="text-center text-neutral-600 mb-12">
          Trusted by popular startups you know
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto justify-items-center">
          {companies.map((company) => (
            <div
              key={company.name}
              className={`${company.className} h-12 bg-neutral-400/20 rounded-lg hover:bg-neutral-400/30 transition-colors cursor-pointer flex items-center justify-center`}
            >
              <span className="sr-only">{company.logo}</span>
              <span className="sr-only">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
