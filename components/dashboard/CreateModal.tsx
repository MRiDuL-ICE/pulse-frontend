"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Plus,
  Copy,
  CheckCircle,
  AlertTriangle,
  X,
  Terminal,
} from "lucide-react";
import { apiKeys, type ApiKey } from "@/lib/api";
import { toast } from "sonner";

function CreateModal({
  onClose,
  token,
}: {
  onClose: () => void;
  token: string;
}) {
  const [name, setName] = useState("");
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const qc = useQueryClient();

  const mut = useMutation({
    mutationFn: () => apiKeys.create(token, name),
    onSuccess: (data) => {
      setCreatedKey(data.key);
      qc.invalidateQueries({ queryKey: ["apiKeys"] });
    },
    onError: (e: any) => toast.error(`// ERROR: ${e.message}`),
  });

  const copy = () => {
    if (!createdKey) return;
    navigator.clipboard.writeText(createdKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("// KEY_COPIED_TO_CLIPBOARD");
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FFF72F]/40 pointer-events-none" />
      <div className="fixed top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-electric/40 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-electric/40 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FFF72F]/40 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-black border border-[#FFF72F]/40 relative clip-brutal"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFF72F] to-transparent" />

        <div className="flex items-center justify-between px-6 py-4 border-b border-[#FFF72F]/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#FFF72F]/50" />
            <span className="text-[#FFF72F] font-mono text-sm font-bold tracking-widest">
              {createdKey ? "// KEY_GENERATED" : "// NEW_API_KEY"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#FFF72F]/70 hover:text-[#FFF72F] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {!createdKey ? (
            <>
              <div className="mb-5">
                <label className="block text-[#FFF72F]/80 font-mono text-[10px] tracking-widest mb-2">
                  {">"} KEY_DESIGNATION
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="PRODUCTION_WEBSITE"
                  className="cyber-input w-full px-4 py-3 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && name && mut.mutate()}
                />
              </div>
              <button
                onClick={() => mut.mutate()}
                disabled={!name || mut.isPending}
                className="cyber-btn w-full flex items-center justify-center gap-2 py-3 bg-[#FFF72F] text-black font-bold font-mono text-sm tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {mut.isPending ? (
                  <>
                    <div className="w-3 h-3 border border-black/30 border-t-black rounded-full animate-spin" />{" "}
                    GENERATING...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> GENERATE_KEY
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Warning */}
              <div className="flex items-start gap-3 border border-yellow-toxic/30 bg-yellow-toxic/5 px-4 py-3 mb-5">
                <AlertTriangle className="w-4 h-4 text-yellow-toxic flex-shrink-0 mt-0.5" />
                <p className="text-yellow-toxic font-mono text-xs leading-relaxed">
                  {">"} WARNING: KEY_DISPLAYED_ONCE_ONLY
                  <br />
                  {">"} STORE_IMMEDIATELY. CANNOT_BE_RECOVERED.
                </p>
              </div>

              {/* Key */}
              <div className="bg-black border border-[#FFF72F]/30 p-4 mb-5 font-mono text-xs text-[#FFF72F] break-all leading-relaxed">
                {createdKey}
              </div>

              <button
                onClick={copy}
                className="cyber-btn w-full flex items-center justify-center gap-2 py-3 border border-[#FFF72F]/30 text-[#FFF72F]/70 hover:text-[#FFF72F] hover:border-[#FFF72F] font-mono text-xs tracking-widest transition-all mb-3"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-[#FFF72F]" />{" "}
                    COPIED_TO_CLIPBOARD
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> COPY_KEY
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="cyber-btn w-full py-3 bg-[#FFF72F] text-black font-bold font-mono text-xs tracking-widest clip-brutal-sm hover:shadow-neon-green transition-all"
              >
                CONFIRM_SAVED
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default CreateModal;
