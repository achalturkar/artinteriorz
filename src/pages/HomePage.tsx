import { useEffect } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { setPageSeo } from "@/lib/seo";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { HowItWorks } from "@/components/site/HowItWorks";
import { HappyClients } from "@/components/site/HappyClients";
import { Portfolio } from "@/components/site/Portfolio";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";

export default function HomePage() {
  useEffect(() => {
    setPageSeo({
      title: "Best Interior Designer in Nagpur | Art Interiorz",
      description: "Nagpur's leading interior design studio since 2017. 600+ happy clients, 650+ projects. Residential, modular kitchen & turnkey interiors. Get a free quote today.",
      canonicalUrl: "https://www.artinteriorz.com/",
    });
  }, []);

  return (
    <SiteShell>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <HappyClients />
      {/* <Portfolio /> */}
      <Testimonials />
      <Contact fullWidthMap />
    </SiteShell>
  );
}
