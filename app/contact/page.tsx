import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact - Vedang",
  description: "Get in touch with me for collaboration or inquiries",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-950 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-400">
            Have a project in mind? Let&apos;s collaborate and create something amazing
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
