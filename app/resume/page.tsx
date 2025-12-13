import ResumeSection from "@/components/ResumeSection";

export const metadata = {
  title: "Resume - Vedang",
  description: "My professional resume and experience",
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-dark-950 pt-20 pb-20">
      <ResumeSection />
    </div>
  );
}
