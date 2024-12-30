import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import EventForm from "@/components/events/EventForm";

const CreateEvent = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container-padding pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="heading-lg mb-8">Create New Event</h1>
          <div className="glass-panel p-6 rounded-lg">
            <EventForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateEvent;