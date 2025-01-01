import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import ManageEventsComponent from "@/components/dashboard/ManageEvents";

const ManageEvents = () => {
  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      
      <main className="container-padding pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <ManageEventsComponent />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ManageEvents;