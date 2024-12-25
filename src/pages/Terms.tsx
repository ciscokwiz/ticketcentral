import Footer from "@/components/landing/Footer";
import Navigation from "@/components/landing/Navigation";

const Terms = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <div className="container-padding py-12 max-w-4xl mx-auto">
        <h1 className="heading-lg mb-8">Terms and Conditions</h1>
        
        <div className="space-y-8 text-neutral-700">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using TixCentral, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must notify us immediately of any unauthorized access</li>
              <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Ticket Purchases</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All ticket sales are final unless an event is cancelled</li>
              <li>Tickets may not be resold without explicit permission</li>
              <li>We are not responsible for lost or stolen tickets</li>
              <li>Refunds are subject to event organizer policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Event Organizer Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Organizers must provide accurate event information</li>
              <li>Cancellation policies must be clearly stated</li>
              <li>Commission fees apply to ticket sales</li>
              <li>Payouts are processed according to our payment schedule</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Prohibited Activities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Creating fraudulent events or tickets</li>
              <li>Harassment of users or staff</li>
              <li>Unauthorized scraping of content</li>
              <li>Any illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
            <p>TixCentral is not liable for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Event cancellations or changes</li>
              <li>Actions of event organizers or attendees</li>
              <li>Technical issues beyond our control</li>
              <li>Indirect or consequential damages</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;