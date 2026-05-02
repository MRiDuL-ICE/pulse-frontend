"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sites } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { Plus, Globe, Key, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSite } from "@/context/SiteContext";

export default function SitesPage() {
  const token = getAccessToken() || "";
  const { setActiveSite, refresh } = useSite();
  const qc = useQueryClient();
  const [form, setForm] = useState({ name: "", domain: "" });
  const [showForm, setShowForm] = useState(false);

  const { data: allSites = [] } = useQuery({
    queryKey: ["sites", token],
    queryFn: () => sites.list(token),
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: () => sites.create(token, form.name, form.domain),
    onSuccess: (site) => {
      toast.success(`// SITE_ADDED: ${site.name}`);
      setForm({ name: "", domain: "" });
      setShowForm(false);
      qc.invalidateQueries({ queryKey: ["sites"] });
      refresh();
    },
    onError: (e: any) => toast.error(`// ERROR: ${e.message}`),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => sites.remove(token, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sites"] });
      refresh();
      toast.success("// SITE_DEACTIVATED");
    },
  });

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 flex-wrap">
        <div>
          <div className="data-tag mb-1 inline-block">// SITE_MANAGEMENT</div>
          <div className="neon-green font-mono text-2xl font-bold">SITES</div>
          <div className="text-[#FFF72F] font-mono text-xs mt-1">
            {">"} MULTI_TENANT // ANALYTICS_ENABLED // RATE_LIMITED
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="cyber-btn flex items-center gap-2 px-4 py-2.5 bg-[#FFF72F] text-black font-bold font-mono text-xs tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> ADD_SITE
        </button>
      </div>

      {/* Create form */}
      {showForm && (
        <div className="bg-black border border-cyan-electric/30 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-cyan-electric" />
          <div className="px-5 py-4 border-b border-cyan-electric/10">
            <span className="text-cyan-electric font-mono text-sm font-bold tracking-widest">
              // NEW_SITE
            </span>
          </div>
          <div className="px-5 py-4 space-y-3">
            <input
              className="w-full bg-black border border-[#FFF72F]/20 text-[#FFF72F] placeholder-[#FFF72F]/40 font-mono text-xs px-3 py-2.5 focus:outline-none focus:border-[#FFF72F]/50 transition-colors"
              placeholder="SITE_NAME"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <input
              className="w-full bg-black border border-[#FFF72F]/20 text-[#FFF72F] placeholder-[#FFF72F]/40 font-mono text-xs px-3 py-2.5 focus:outline-none focus:border-[#FFF72F]/50 transition-colors"
              placeholder="DOMAIN"
              value={form.domain}
              onChange={(e) =>
                setForm((f) => ({ ...f, domain: e.target.value }))
              }
            />
            <div className="flex gap-2">
              <button
                onClick={() => createMutation.mutate()}
                className="cyber-btn flex-1 px-3 py-2 bg-[#FFF72F] text-black font-bold font-mono text-xs tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all disabled:opacity-50"
                disabled={
                  !form.name || !form.domain || createMutation.isPending
                }
              >
                {createMutation.isPending ? "CREATING..." : "CREATE_SITE"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-[#FFF72F]/20 text-[#FFF72F] font-mono text-xs font-bold hover:bg-[#FFF72F]/5 transition-colors"
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sites list */}
      <div className="space-y-3">
        {allSites.length > 0 ? (
          allSites.map((site) => (
            <div
              key={site.id}
              className="bg-black border border-[#FFF72F]/20 relative hover:border-[#FFF72F]/40 transition-colors"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/30 to-transparent" />
              <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-2 h-2 bg-[#FFF72F] animate-pulse flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[#FFF72F] font-mono text-sm font-bold truncate">
                      {site.name.toUpperCase()}
                    </div>
                    <div className="text-[#FFF72F]/70 font-mono text-[10px] mt-0.5">
                      {site.domain}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap md:flex-nowrap flex-shrink-0">
                  <button
                    onClick={() => setActiveSite(site)}
                    className="px-3 py-1.5 border border-cyan-electric/30 text-cyan-electric hover:bg-cyan-electric/10 transition-all rounded text-[10px] font-mono font-bold tracking-widest"
                  >
                    ANALYTICS
                  </button>
                  <a
                    href={`/dashboard/api-keys?site_id=${site.id}`}
                    className="px-3 py-1.5 border border-[#FFF72F]/30 text-[#FFF72F] hover:bg-[#FFF72F]/5 transition-all rounded text-[10px] font-mono font-bold tracking-widest flex items-center gap-1"
                  >
                    <Key className="w-3 h-3" /> KEYS
                  </a>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `DEACTIVATE "${site.name}"? THIS_ACTION_IS_PERMANENT.`,
                        )
                      ) {
                        removeMutation.mutate(site.id);
                      }
                    }}
                    className="w-8 h-8 border border-[#FFF72F]/10 flex items-center justify-center text-[#FFF72F] hover:text-pink-hot hover:border-pink-hot/40 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-black border border-[#FFF72F]/20 relative py-16">
            <div className="absolute top-0 left-0 right-0 h-px bg-[#FFF72F]" />
            <div className="flex flex-col items-center justify-center gap-5 px-5">
              <div className="w-12 h-12 border border-[#FFF72F]/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-[#FFF72F]" />
              </div>
              <div className="text-center">
                <div className="text-[#FFF72F]/50 font-mono text-sm mb-1">
                  NO_SITES_FOUND
                </div>
                <div className="text-[#FFF72F] font-mono text-xs">
                  {">"} ADD_YOUR_FIRST_SITE_TO_BEGIN_TRACKING
                </div>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="cyber-btn flex items-center gap-2 px-5 py-2.5 bg-[#FFF72F] text-black font-bold font-mono text-xs tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> ADD_SITE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
