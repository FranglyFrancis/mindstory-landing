import { API_URL } from "../../config"
import { useEffect, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import Contact from "./blocks/Contact";
import CommonHero from "./CommonHero";
import { NotFound } from "../NotFound";
import WebDesignSection from "./sections/WebDesignSection";
import SocialMediaSection from "./sections/SocialMediaSection";
import SeoSection from "./sections/SeoSection";
import LogoDesignSection from "./sections/LogoDesignSection";
import EmailMarketingSection from "./sections/EmailMarketingSection";
import BrandSection from "./sections/BrandSection";
import ServicePageView from "./ServicePageView";
import type { ServiceData } from "./ServicePageView";
import type { IService } from "../../api/services";

// slug -> hand-built page. These keep working exactly as before.
// Any service that is NOT listed here is built from the sections chosen in the admin panel.
const sections: Record<string, (s: IService) => ReactNode> = {
  "social-media-marketing": (s) => (
    <SocialMediaSection imageItem={s.imageItem} iconCards={s.iconCards} />
  ),
  "seo-optimisation": (s) => (
    <SeoSection
      heading={s.heading}
      titleCards={s.titleCards}
      iconCards={s.iconCards}
      faqs={s.faqs}
    />
  ),
  "logo-design": (s) => (
    <LogoDesignSection
      lists={s.lists}
      titleLists={s.titleCards}
      image={s.mainImage}
    />
  ),
  "email-marketing": (s) => (
    <EmailMarketingSection lists={s.lists} cards={s.iconCards} />
  ),
  "brand-identity": (s) => <BrandSection sections={s.sections} />,
  "web-development": (s) => (
    <WebDesignSection intro={s.intro} services={s.lists} titleItem={s.titleItem} />
  ),
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<IService | null>(null);
  const [status, setStatus] = useState<"loading" | "ok" | "notfound">("loading");
 
  useEffect(() => {
    setStatus("loading");
    fetch(`${API_URL}/api/services/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: IService) => {
        setService(data);
        setStatus("ok");
      })
      .catch((e) => {
        console.error("Service fetch failed:", e);
        setStatus("notfound");
      });
  }, [slug]);


  if (status === "loading") return <p>Loading Sections...</p>;
  if (status === "notfound" || !service) return <NotFound />;

  const renderSection = sections[service.slug];

  // a service created in the admin panel: hero + its sections in the saved order
  if (!renderSection) {
    return (
      <>
        <ServicePageView service={service as ServiceData} />
        <Contact />
      </>
    );
  }

  // one of the hand-built pages
  return (
    <>
      <CommonHero
        image={service.image}
        title={service.title}
        description={service.description}
      />
      { renderSection(service) }
      <Contact />
    </>
  );
}
