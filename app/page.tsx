import HeroSection from "@/components/HeroSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsSection from "@/components/SkillsSection";
import GithubProjects from "@/components/GithubProjects";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects />
      <GithubProjects />
      <CTASection />
    </>
  );
}
