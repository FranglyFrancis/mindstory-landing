import "./ServiceCards.css";
import ServiceCard from "./ServiceCard";
import { useServices } from "../../hooks/useServices";

export default function ServiceCards() {
  const { services, status } = useServices();

  if (status === "loading") {
    return <p role="status">Loading services…</p>;
  }

  if (status === "error") {
    return <p role="alert">Unable to load services right now.</p>;
  }

  if (services.length === 0) {
    return <p>No services to show yet.</p>;
  }

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