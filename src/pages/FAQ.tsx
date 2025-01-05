import Navigation from "@/components/landing/Navigation";
import Footer from "@/components/landing/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I purchase tickets?",
      answer: "You can purchase tickets by browsing our events page, selecting your desired event, and clicking the 'Add to Cart' button. Follow the checkout process to complete your purchase."
    },
    {
      question: "Can I get a refund?",
      answer: "Yes, refunds are available up to 48 hours before the event. Please contact our support team for assistance with refunds."
    },
    {
      question: "How do I receive my tickets?",
      answer: "After purchase, your tickets will be emailed to you and also available in your account dashboard. You can print them or show them on your mobile device at the event."
    },
    {
      question: "What happens if an event is cancelled?",
      answer: "If an event is cancelled, you will automatically receive a full refund to your original payment method within 5-10 business days."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navigation />
      <main className="container-padding py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-lg mb-8">Frequently Asked Questions</h1>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;