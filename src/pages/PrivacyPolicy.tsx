import Footer from "@/components/landing/Footer";
import Navigation from "@/components/landing/Navigation";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <div className="container-padding py-12 max-w-4xl mx-auto">
        <h1 className="heading-lg mb-8">Privacy Policy</h1>
        
        <div className="space-y-8 text-neutral-700">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">When you use TixCentral, we collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal information (name, email address, phone number)</li>
              <li>Payment information (processed securely through our payment providers)</li>
              <li>Transaction history and ticket purchases</li>
              <li>Information about events you create or attend</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process your ticket purchases and event registrations</li>
              <li>Send you important updates about events you're attending</li>
              <li>Improve our services and develop new features</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
            <p>We do not sell your personal information. We share your information only with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Event organizers (limited to necessary attendance information)</li>
              <li>Service providers who assist in operating our platform</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">Email: privacy@tixcentral.com</p>
            <p>Phone: 1-800-TICKETS</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;