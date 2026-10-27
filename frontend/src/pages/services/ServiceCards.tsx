import ServiceCard from "./ServiceCard";
import "./ServiceCards.css";
import { useServices } from "../../hooks/useServices";

export default function ServiceCards() {
  const { services, status } = useServices();

  if (status === "loading") return <p>Loading services…</p>;
  if (status === "error") return <p>Unable to load services right now.</p>;

  return (
    <section className="services-list">
      <div className="services-grid">
        {services.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}