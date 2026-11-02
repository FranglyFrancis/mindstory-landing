import ImageUpload from "./ImageUpload";
import { SERVICE_CATEGORIES } from "../utils/serviceCategories";
import type { Details } from "./serviceTypes";

const MAX_TITLE_LENGTH = 150;
const MAX_SLUG_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 1000; // the server cuts longer text, so stop it here

type ServiceDetailsPanelsProps = {
  details: Details;
  slugLocked: boolean; // hand-built page: the address is tied to the code
  onField: <K extends keyof Details>(field: K, value: Details[K]) => void;
  onTitleChange: (value: string) => void;
  onSlugChange: (value: string) => void;
};

export default function ServiceDetailsPanels({
  details,
  slugLocked,
  onField,
  onTitleChange,
  onSlugChange,
}: ServiceDetailsPanelsProps) {
  return (
    <>
      <section className="sv-panel">
        <h3>Expertise Card details</h3>
        <p className="sv-hint">Shown on the Expertise cards and used for the page address.</p>

        <div className="sv-two">
          <div className="ad-field">
            <label htmlFor="sv-title">
              Title<span aria-hidden="true">*</span>
            </label>
            <input
              id="sv-title"
              className="ad-input"
              maxLength={MAX_TITLE_LENGTH}
              value={details.title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>

          <div className="ad-field">
            <label htmlFor="sv-slug">
              Page address<span aria-hidden="true">*</span>
            </label>
            <div className="sv-prefix">
              <span>/services/</span>
              <input
                id="sv-slug"
                maxLength={MAX_SLUG_LENGTH}
                value={details.slug}
                disabled={slugLocked}
                onChange={(e) => onSlugChange(e.target.value)}
              />
            </div>
            {slugLocked && <small className="sv-hint">Locked: the hand-built page is tied to this address.</small>}
          </div>
        </div>

        <div className="sv-two">
          <div className="ad-field sv-order">
            <label htmlFor="sv-order">Order</label>
            <input
              id="sv-order"
              className="ad-input"
              type="number"
              value={details.order}
              onChange={(e) => onField("order", e.target.value)}
            />
            <small className="sv-hint">Lower numbers show first in the Expertise section.</small>
          </div>
          <ImageUpload label="Card image" required value={details.image} onChange={(url) => onField("image", url)} />
        </div>
      </section>

      <section className="sv-panel">
        <h3>Service Card details</h3>
        <p className="sv-hint">Shown on the Service Cards in Service page.</p>

        <div className="sv-two">
          <div className="ad-field">
            <label htmlFor="sv-card-title">
              Title<span aria-hidden="true">*</span>
            </label>
            <input
              id="sv-card-title"
              className="ad-input"
              maxLength={MAX_TITLE_LENGTH}
              value={details.cardTitle}
              onChange={(e) => onField("cardTitle", e.target.value)}
            />
          </div>

          <div className="ad-field">
            <label htmlFor="sv-cat">
              Category<span aria-hidden="true">*</span>
            </label>
            <select
              id="sv-cat"
              className="ad-input"
              value={details.category}
              onChange={(e) => onField("category", e.target.value)}
            >
              <option value="">Select a category</option>
              {SERVICE_CATEGORIES.map((category) => (
                <option key={category.key} value={category.key}>
                  {category.title}
                </option>
              ))}
            </select>
            <small className="sv-hint">Decides which column the service appears in under Services in the navbar.</small>
          </div>
        </div>

        <div className="ad-field">
          <label htmlFor="sv-desc">
            Short description (Service Card)<span aria-hidden="true">*</span>
          </label>
          <textarea
            id="sv-desc"
            className="ad-input sv-area"
            rows={2}
            maxLength={MAX_DESCRIPTION_LENGTH}
            value={details.description}
            onChange={(e) => onField("description", e.target.value)}
          />
        </div>

        <ImageUpload
          label="Service Card image"
          required
          value={details.cardImage}
          onChange={(url) => onField("cardImage", url)}
        />
      </section>
    </>
  );
}