import { useEffect, useRef, useState } from "react";
import type { AdminUser } from "./api";
import { PageCrumbContext } from "./adminPage";
import { MenuIcon } from "./AdminIcons";
import { NAV_ITEMS } from "./AdminNav";
import type { NavItem } from "./AdminNav";
import { defaultSidebarOpen, useHashRoute, useNarrow, writeSidebarPref } from "./adminHooks";

type AdminLayoutProps = {
  user: AdminUser;
  onLogout: () => void;
};

/* ---------- sidebar ---------- */
type SidebarProps = {
  items: NavItem[];
  currentId: string;
  open: boolean;
  onNavigate: (id: string) => void;
};

function Sidebar({ items, currentId, open, onNavigate }: SidebarProps) {
  return (
    <aside className="ad-side" aria-label="Dashboard">
      <div className="ad-side-brand">Dashboard</div>
      <nav>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`ad-nav ${item.id === currentId ? "active" : ""}`}
            aria-current={item.id === currentId ? "page" : undefined}
            tabIndex={open ? 0 : -1}
            onClick={() => onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

/* ---------- top bar ---------- */
type TopBarProps = {
  user: AdminUser;
  current: NavItem;
  extraCrumb: string | null;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onLogout: () => void;
};

function TopBar({ user, current, extraCrumb, menuOpen, onToggleMenu, onLogout }: TopBarProps) {
  return (
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
          type="button"
          className="ad-icon-btn"
          aria-label={menuOpen ? "Close dashboard menu" : "Open dashboard menu"}
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          <MenuIcon />
        </button>
        <button type="button" className="ad-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </header>
  );
}

/* ---------- layout ---------- */
export default function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const items = NAV_ITEMS.filter((item) => !item.superOnly || user.role === "superadmin");
  const narrow = useNarrow();
  const route = useHashRoute();

  const [open, setOpen] = useState(() => defaultSidebarOpen(narrow));
  const [extraCrumb, setExtraCrumb] = useState<string | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  const current = items.find((item) => item.id === route[0]) ?? items[0];
  const path = route[0] === current.id ? route.slice(1) : [];
  const Page = current.page;

  // Keep the address bar honest when the hash is empty or unknown.
  useEffect(() => {
    if (route[0] !== current.id) window.history.replaceState(null, "", `#${current.id}`);
  }, [route, current.id]);

  // Phones: menu closed by default and after every navigation. Desktop: remember the last choice.
  useEffect(() => {
    setOpen(defaultSidebarOpen(narrow));
  }, [narrow]);

  useEffect(() => {
    if (narrow) setOpen(false);
  }, [route, narrow]);

  // Escape closes the menu on phones.
  useEffect(() => {
    if (!narrow || !open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [narrow, open]);

  // New section: scroll to top and move focus to the content (helps keyboard and screen-reader users).
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [current.id]);

  useEffect(() => {
    document.title = `${current.label} · Dashboard`;
  }, [current.label]);

  const navigateTo = (id: string) => {
    window.location.hash = id;
  };

  const toggleMenu = () => {
    const next = !open;
    setOpen(next);
    if (!narrow) writeSidebarPref(next ? "open" : "closed");
  };

  return (
    <div className={`ad-shell ${open ? "is-open" : "is-closed"}`}>
      <Sidebar items={items} currentId={current.id} open={open} onNavigate={navigateTo} />

      {open && narrow && <div className="ad-scrim" aria-hidden="true" onClick={() => setOpen(false)} />}

      <div className="ad-body">
        <TopBar
          user={user}
          current={current}
          extraCrumb={extraCrumb}
          menuOpen={open}
          onToggleMenu={toggleMenu}
          onLogout={onLogout}
        />

        <main className="ad-content" ref={mainRef} tabIndex={-1}>
          <PageCrumbContext.Provider value={setExtraCrumb}>
            <Page user={user} path={path} />
          </PageCrumbContext.Provider>
        </main>
      </div>
    </div>
  );
}