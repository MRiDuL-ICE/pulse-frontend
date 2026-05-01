"use client";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Key, Trash2, Terminal } from "lucide-react";
import { apiKeys, type ApiKey } from "@/lib/api";
import { getAccessToken } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import CreateModal from "@/components/dashboard/CreateModal";
import SnippetModal from "@/components/dashboard/SnippetModal";

export default function ApiKeysPage() {
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSnippet, setShowSnippet] = useState(false);

  const qc = useQueryClient();
  useEffect(() => {
    setToken(getAccessToken() || "");
  }, []);

  const { data: keys, isLoading } = useQuery<ApiKey[]>({
    queryKey: ["apiKeys", token],
    queryFn: () => apiKeys.list(token),
    enabled: !!token,
  });

  const revoke = useMutation({
    mutationFn: (id: string) => apiKeys.revoke(token, id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["apiKeys"] });
      toast.success("// KEY_REVOKED");
    },
    onError: (e: any) => toast.error(`// ERROR: ${e.message}`),
  });

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://your-pulse-instance.com";

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <AnimatePresence>
        {showModal && token && (
          <CreateModal onClose={() => setShowModal(false)} token={token} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSnippet && <SnippetModal onClose={() => setShowSnippet(false)} />}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between gap-2 flex-wrap"
      >
        <div>
          <div className="data-tag mb-1 inline-block">
            // API_KEY_MANAGEMENT
          </div>
          <div className="neon-green font-mono text-2xl font-bold">
            API_KEYS
          </div>
          <div className="text-[#FFF72F]/70 font-mono text-xs mt-1">
            {">"} WRITE_ONLY // BCRYPT_HASHED // PREFIX_INDEXED
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="cyber-btn flex items-center gap-2 px-4 py-2.5 bg-[#FFF72F] text-black font-bold font-mono text-xs tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> NEW_KEY
        </button>
      </motion.div>

      <div className="flex md:flex-row flex-col gap-6">
        {/* Snippet guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black border border-cyan-electric/30 relative w-full md:w-2/5"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-cyan-electric" />
          <div className="px-5 py-4 border-b border-cyan-electric/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-electric/50" />
              <span className="text-cyan-electric font-mono text-sm font-bold tracking-widest">
                // INTEGRATION_GUIDE
              </span>
            </div>
          </div>
          <div className="px-5 py-4 text-[#FFF72F]/70 font-mono text-xs">
            <p className="mb-3">
              {">"} Copy the snippet below and add it to your HTML
            </p>
            <button
              onClick={() => setShowSnippet(true)}
              className="px-3 py-2 border border-cyan-electric/30 text-cyan-electric hover:bg-cyan-electric/10 transition-all rounded text-xs font-mono font-bold"
            >
              {">"} SHOW_SNIPPET
            </button>
          </div>
        </motion.div>

        {/* Keys table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black border border-[#FFF72F]/20 relative flex-1 overflow-hidden w-full"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F]/50 to-transparent" />
          <div className="px-5 py-4 border-b border-[#FFF72F]/10 flex items-center justify-between">
            <div className="text-[#FFF72F] font-mono text-sm font-bold">
              ACTIVE_KEYS
            </div>
            <div className="text-[#FFF72F]/60 font-mono text-xs">
              {keys?.length ?? 0}_TOTAL
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border border-[#FFF72F]/30 border-t-[#FFF72F] rounded-full animate-spin" />
            </div>
          ) : keys?.length ? (
            <div className="divide-y divide-[#FFF72F]/5">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-[#FFF72F]/3 transition-colors gap-4 flex-wrap md:flex-nowrap"
                >
                  {/* Key info */}
                  <div className="flex items-center gap-3 min-w-0 overflow-hidden flex-1">
                    <div
                      className={`w-2 h-2 flex-shrink-0 ${key.is_active ? "bg-[#FFF72F] animate-pulse" : "bg-[#FFF72F]/10"}`}
                    />
                    <div className="min-w-0">
                      <div className="text-[#FFF72F] font-mono text-xs font-bold truncate">
                        {key.name.toUpperCase()}
                      </div>
                      <div className="text-[#FFF72F]/70 font-mono text-[10px] mt-0.5">
                        {key.key_prefix}••••••••
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end text-[10px] font-mono text-[#FFF72F]/60 gap-0.5">
                    <span>CREATED: {formatDate(key.created_at)}</span>
                    {key.last_used_at && (
                      <span className="text-[#FFF72F]/80">
                        LAST_USE: {formatDate(key.last_used_at)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div
                      className={`font-mono text-[10px] tracking-widest px-2 py-0.5 border ${
                        key.is_active
                          ? "border-[#FFF72F]/30 text-[#FFF72F]/70 bg-[#FFF72F]/5"
                          : "border-[#FFF72F]/10 text-[#FFF72F]/60"
                      }`}
                    >
                      {key.is_active ? "ACTIVE" : "REVOKED"}
                    </div>

                    {key.is_active && (
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `REVOKE "${key.name}"? THIS_ACTION_IS_PERMANENT.`,
                            )
                          ) {
                            revoke.mutate(key.id);
                          }
                        }}
                        className="w-7 h-7 border border-[#FFF72F]/10 flex items-center justify-center text-[#FFF72F]/60 hover:text-pink-hot hover:border-pink-hot/40 transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center gap-5">
              <div className="w-12 h-12 border border-[#FFF72F]/20 flex items-center justify-center">
                <Key className="w-5 h-5 text-[#FFF72F]/70" />
              </div>
              <div className="text-center">
                <div className="text-[#FFF72F]/50 font-mono text-sm mb-1">
                  NO_API_KEYS_FOUND
                </div>
                <div className="text-[#FFF72F]/60 font-mono text-xs">
                  {">"} GENERATE_FIRST_KEY_TO_BEGIN_TRACKING
                </div>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="cyber-btn flex items-center gap-2 px-5 py-2.5 bg-[#FFF72F] text-black font-bold font-mono text-xs tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> GENERATE_KEY
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
