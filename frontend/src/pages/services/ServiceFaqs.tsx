import { useFaqs } from "../../hooks/useFaqs";
import "../../components/shared/FAQ/FAQ.css";
import "../../components/shared/FAQ/FAQNumbers.css"; // keep this after FAQ.css

const TITLE = "Frequently Asked Questions";

type ServiceFaqsProps = {
  page: string; // the FAQ page name, which is the service slug
};

export default function ServiceFaqs({ page }: ServiceFaqsProps) {
  const { faqs, loading } = useFaqs(page);

  if (loading || faqs.length === 0) return null;

  return (
    <section>
      <h2>{TITLE}</h2>
      <div className="frequentlySect1">
        {faqs.map((faq, index) => (
          <div className="quest-ans" key={index}>
            <h5 className="justified-text faq-question">
              <span className="faq-num" aria-hidden="true">
                {index + 1}.
              </span>
              <span className="faq-sr">Q {index + 1}: </span>
              <span className="faq-text">{faq.question}</span>
            </h5>
            <p className="justified-text">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}