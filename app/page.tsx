import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { AssistantSection } from "@/components/sections/assistant-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="flex flex-1 flex-col">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <ProjectsSection />
        <AssistantSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
