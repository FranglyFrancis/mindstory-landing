import { useEffect, useState, type ComponentType } from "react";
import { useParams } from "react-router-dom";
import Contact from "./blocks/Contact";
import CommonHero from "./CommonHero";
import { NotFound } from "../NotFound";
import WebDesignSection from "./sections/WebDesignSection";
import type { ServiceData } from "../../types";
import SocialMediaSection from "./sections/SocialMediaSection";
import SeoSection from "./sections/SeoSection";
import LogoDesignSection from "./sections/LogoDesignSection";
import EmailMarketingSection from "./sections/EmailMarketingSection";
import BrandSection from "./sections/BrandSection";

// slug -> component (components can't be stored in MongoDB)
const sections: Record<string, ComponentType<{ service: ServiceData }>> = {
    'social-media-marketing': SocialMediaSection,
    'seo-optimisation': SeoSection,
    'logo-design': LogoDesignSection,
    'email-marketing': EmailMarketingSection,
    'brand-identity': BrandSection,
    'web-development': WebDesignSection,
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<ServiceData | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "notfound">("loading");

  useEffect(() => {
    setStatus("loading");
    fetch(`${import.meta.env.VITE_API_URL}/api/services/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: ServiceData) => {
        setService(data);
        setStatus("ok");
      })
      .catch(() => setStatus("notfound"));
  }, [slug]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "notfound" || !service) return <NotFound />;

  const Section = sections[service.slug];
  if (!Section) return <NotFound />;

  return (
    <>
      <CommonHero
        image={service.hero.image}
        title={service.hero.title}
        description={service.hero.description}
      />
      <Section service={service} />
      <Contact />
    </>
  );
}