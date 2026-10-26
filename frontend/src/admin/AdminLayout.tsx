import { useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import ServicesPage from "./ServicesPage";
import UsersPage from "./UsersPage";
import SuccessStoriesPage from "./SuccessStoriesPage";
import type { AdminUser } from "./api";
import { PageCrumbContext } from "./adminPage";
import type { PageProps } from "./adminPage";
import BrandsPage from "./BrandsPage";
import FaqsPage from "./FaqsPage";
import BlogsPage from "./BlogsPage";

/* ---------- icons ---------- */
const Svg = ({ children }: { children: ReactNode }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);
const StoriesIcon = () => (
  <Svg><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" /></Svg>
);
const ServicesIcon = () => (
  <Svg><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></Svg>
);
const UsersIcon = () => (
  <Svg><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.4c2 .7 3.5 2.4 3.5 5.6" /></Svg>
);
const BrandsIcon = () => (
  <Svg><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.2" /></Svg>
);
const BlogIcon = () => (
  <Svg>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h6M9 17h6" />
  </Svg>
);
const FaqIcon = () => (
  <Svg>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7" />
    <path d="M12 17h.01" />
  </Svg>
);
const MenuIcon = () => (
  <Svg><path d="M4 6h16M4 12h16M4 18h16" /></Svg>
);

/* ---------- sidebar sections ----------
   To add a new dashboard section later:
   1. create a page component (e.g. BlogPage.tsx)
   2. add ONE line to this list. Nothing else changes. */
type NavItem = {
  id: string;
  label: string;
  icon: ReactNode;
  page: ComponentType<PageProps>;
  superOnly?: boolean; // visible to super admins only
};

const NAV: NavItem[] = [
  { id: "stories", label: "Success Stories", icon: <StoriesIcon />, page: SuccessStoriesPage },
  { id: "services", label: "Services", icon: <ServicesIcon />, page: ServicesPage },
  { id: "brands", label: "Brands", icon: <BrandsIcon />, page: BrandsPage },
  { id: "blogs", label: "Blogs", icon: <BlogIcon />, page: BlogsPage }, // <-- 3. the menu entry
  { id: "faqs", label: "FAQs", icon: <FaqIcon />, page: FaqsPage },
  { id: "users", label: "Users", icon: <UsersIcon />, page: UsersPage, superOnly: true },
];

/* ---------- helpers ---------- */
const NARROW = "(max-width: 800px)";

// "#stories/edit/42" -> ["stories", "edit", "42"]
const readHash = () => window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);

const readPref = () => { try { return localStorage.getItem("ad-sidebar"); } catch { return null; } };
const writePref = (v: string) => { try { localStorage.setItem("ad-sidebar", v); } catch { /* storage unavailable */ } };

function useNarrow(): boolean {
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW).matches);
  useEffect(() => {
    const mq = window.matchMedia(NARROW);
    const onChange = () => setNarrow(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return narrow;
}

export default function AdminLayout({ user, onLogout }: { user: AdminUser; onLogout: () => void }) {
  const items = NAV.filter((n) => !n.superOnly || user.role === "superadmin");
  const narrow = useNarrow();
  const [route, setRoute] = useState(readHash);
  const [open, setOpen] = useState(() => !window.matchMedia(NARROW).matches && readPref() !== "closed");
  const [extraCrumb, setExtraCrumb] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // The page lives in the URL hash (#stories, #stories/new) so refresh and the back button keep your place.
  useEffect(() => {
    const onHash = () => setRoute(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const current = items.find((n) => n.id === route[0]) ?? items[0];
  const path = route[0] === current.id ? route.slice(1) : [];
  const Page = current.page;

  // Keep the address bar honest when the hash is empty or unknown.
  useEffect(() => {
    if (route[0] !== current.id) window.history.replaceState(null, "", `#${current.id}`);
  }, [route, current.id]);

  // Phones: menu closed by default and after every navigation. Desktop: remember the last choice.
  useEffect(() => { setOpen(narrow ? false : readPref() !== "closed"); }, [narrow]);
  useEffect(() => { if (narrow) setOpen(false); }, [route, narrow]);

  // Escape closes the menu on phones.
  useEffect(() => {
    if (!narrow || !open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [narrow, open]);

  // New section: scroll to top and move focus to the content (helps keyboard and screen-reader users).
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (firstRender.current) { firstRender.current = false; return; }
    mainRef.current?.focus({ preventScroll: true });
  }, [current.id]);

  useEffect(() => { document.title = `${current.label} · Dashboard`; }, [current.label]);

  const go = (id: string) => { window.location.hash = id; };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (!narrow) writePref(next ? "open" : "closed");
  };

  return (
    <div className={`ad-shell ${open ? "is-open" : "is-closed"}`}>
      <aside className="ad-side" aria-label="Dashboard">
        <div className="ad-side-brand">Dashboard</div>
        <nav>
          {items.map((n) => (
            <button
              key={n.id}
              className={`ad-nav ${n.id === current.id ? "active" : ""}`}
              aria-current={n.id === current.id ? "page" : undefined}
              tabIndex={open ? 0 : -1}
              onClick={() => go(n.id)}
            >
              {n.icon}
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {open && narrow && <div className="ad-scrim" onClick={() => setOpen(false)} />}

      <div className="ad-body">
        <header className="ad-top">
          <nav className="ad-crumbs" aria-label="Breadcrumb">
            <span>Dashboard</span>
            <span aria-hidden="true">/</span>
            {extraCrumb ? (
              <>
                <a href={`#${current.id}`}>{current.label}</a>
                <span aria-hidden="true">/</span>
                <strong aria-current="page">{extraCrumb}</strong>
              </>
            ) : (
              <strong aria-current="page">{current.label}</strong>
            )}
          </nav>

          <div className="ad-top-right">
            <span className="ad-who">{user.name || user.email}</span>
            <button
              className="ad-icon-btn"
              aria-label={open ? "Close dashboard menu" : "Open dashboard menu"}
              aria-expanded={open}
              onClick={toggle}
            >
              <MenuIcon />
            </button>
            <button className="ad-btn" onClick={onLogout}>Log out</button>
          </div>
        </header>

        <main className="ad-content" ref={mainRef} tabIndex={-1}>
          <PageCrumbContext.Provider value={setExtraCrumb}>
            <Page user={user} path={path} />
          </PageCrumbContext.Provider>
        </main>
      </div>
    </div>
  );
}
