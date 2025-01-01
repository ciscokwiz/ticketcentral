
const TrustedBy = () => {
  const companies = [
    { name: "Stripe", logo: "/company-logos/stripe.svg" },
    { name: "HubSpot", logo: "/company-logos/hubspot.svg" },
    { name: "Intercom", logo: "/company-logos/intercom.svg" },
    { name: "Asana", logo: "/company-logos/asana.svg"},
   
  ];

  return (
    <section className="py-24 bg-neutral-200/50">
      <div className="container-padding">
        <p className="text-center text-neutral-600 mb-12">
          Trusted by 
        </p>
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-8 max-w-4xl mx-auto justify-items-center">
          {companies.map((company) => (
            <div
              key={company.name}
              className={` h-10 w-20 lg:w-28 bg-neutral-400/20 rounded-lg hover:bg-accent-purple text-accent-purple hover:text-neutral-400/20 font-medium transition-colors cursor-pointer flex items-center justify-center`}
            >
              <span className="  text-sm font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
