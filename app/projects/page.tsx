import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata = {
  title: "Projects - Vedang",
  description: "View my AI/ML projects and technical work",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <div className="pt-20 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold gradient-text mb-6">My Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore a collection of my AI/ML projects and technical work
          </p>
        </div>
        <ProjectsGrid />
      </div>
    </div>
  );
}
