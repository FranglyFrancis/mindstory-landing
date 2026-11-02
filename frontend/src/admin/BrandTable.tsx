import { imgSrc } from "../utils/imgSrc";
import type { Brand } from "./brandTypes";

const formatDate = (iso?: string): string =>
  iso ? new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "-";

type BrandTableProps = {
  brands: Brand[];
  editingId: string | null; // the row being edited in the panel, if any
  busyId: string | null; // the row being deleted, if any
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
};

export default function BrandTable({ brands, editingId, busyId, onEdit, onDelete }: BrandTableProps) {
  return (
    <div className="br-card br-table-wrap">
      <table className="br-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Brand name</th>
            <th>Added</th>
            <th>
              <span className="br-sr">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr key={brand._id} className={editingId === brand._id ? "is-editing" : ""}>
              <td>
                <img className="br-thumb" src={imgSrc(brand.logo)} alt="" />
              </td>
              <td className="br-name">{brand.name || <span className="br-muted">Untitled</span>}</td>
              <td className="br-muted">{formatDate(brand.createdAt)}</td>
              <td>
                <div className="br-row-actions">
                  <button type="button" className="br-link" disabled={busyId === brand._id} onClick={() => onEdit(brand)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="br-link danger"
                    disabled={busyId === brand._id}
                    onClick={() => onDelete(brand)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}