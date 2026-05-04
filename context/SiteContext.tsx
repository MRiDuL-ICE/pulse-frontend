"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { sites, Site } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

interface SiteContextType {
  activeSite: Site | null;
  allSites: Site[];
  setActiveSite: (site: Site) => void;
  loading: boolean;
  refresh: () => void;
}

const SiteContext = createContext<SiteContextType>({
  activeSite: null,
  allSites: [],
  setActiveSite: () => {},
  loading: true,
  refresh: () => {},
});

export function SiteProvider({ children }: { children: ReactNode }) {
  const [allSites, setAllSites] = useState<Site[]>([]);
  const [activeSite, setActiveSiteState] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (typeof window === "undefined") return; // Don't load during SSR/build
    const token = getAccessToken();
    if (!token) return;
    try {
      const data = await sites.list(token);
      setAllSites(data || []);
      // Restore last selected site from localStorage
      const savedId = localStorage.getItem("pulse_active_site");
      const found =
        (data || []).find((s) => s.id === savedId) ?? (data || [])[0] ?? null;
      setActiveSiteState(found);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setActiveSite = (site: Site) => {
    setActiveSiteState(site);
    localStorage.setItem("pulse_active_site", site.id);
  };

  return (
    <SiteContext.Provider
      value={{ activeSite, allSites, setActiveSite, loading, refresh: load }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export const useSite = () => useContext(SiteContext);
