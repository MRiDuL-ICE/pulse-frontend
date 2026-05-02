"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface SnippetModalProps {
  onClose?: () => void;
}

const SnippetModal = ({ onClose }: SnippetModalProps) => {
  const [copied, setCopied] = useState(false);
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://your-pulse-instance.com";

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal container - responsive sizing */}
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black border border-cyan-400 rounded-lg">
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-400/30 sticky top-0 bg-black">
          <div className="text-cyan-400 font-mono text-sm font-bold">
            // EMBED_SNIPPET
          </div>
          <button
            onClick={onClose}
            className="p-1 text-cyan-400/60 hover:text-cyan-400 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-4">
          <p className="text-[#FFF72F]/80 font-mono text-xs md:text-sm leading-relaxed">
            {">"} EMBED_SNIPPET_IN_HTML // REPLACE_KEY_WITH_YOUR_VALUE
            <br />
            {">"} USES_X-API-KEY_HEADER // WRITE_ONLY // SAFE_TO_EXPOSE
          </p>

          {/* Code snippet with copy button */}
          <div className="relative group">
            <button
              onClick={() => {
                navigator.clipboard.writeText(`<script>
(function() {
  var URL = "${API_URL}";
  var KEY = "pk_live_xxxxxxxxxxxx";

  function track(type, props) {
    fetch(URL + "/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": KEY
      },
      body: JSON.stringify({
        event_type: type,
        url: location.pathname,
        referrer: document.referrer,
        properties: props || {}
      })
    }).catch(function(){});
  }

  // AUTO: pageview on load
  window.addEventListener("load", function() {
    track("pageview", { title: document.title });
  });

  // MANUAL: window.pulse.track("click", { id: "btn" })
  window.pulse = { track: track };
})();
</script>`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="absolute top-3 right-3 p-1.5 rounded border border-[#FFF72F]/20 bg-black hover:border-[#FFF72F]/50 hover:bg-[#FFF72F]/5 transition-all duration-150 z-10"
              title="Copy snippet"
            >
              {copied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#FFF72F]"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#FFF72F] group-hover:text-[#FFF72F] transition-colors"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
            <pre className="bg-black border border-[#FFF72F]/10 p-4 font-mono text-[11px] md:text-xs text-[#FFF72F]/80 overflow-x-auto max-w-full rounded leading-relaxed whitespace-pre-wrap break-words">{`<script>
(function() {
  var URL = "${API_URL}";
  var KEY = "pk_live_xxxxxxxxxxxx";

  function track(type, props) {
    fetch(URL + "/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": KEY
      },
      body: JSON.stringify({
        event_type: type,
        url: location.pathname,
        referrer: document.referrer,
        properties: props || {}
      })
    }).catch(function(){});
  }

  // AUTO: pageview on load
  window.addEventListener("load", function() {
    track("pageview", { title: document.title });
  });

  // MANUAL: window.pulse.track("click", { id: "btn" })
  window.pulse = { track: track };
})();
</script>`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetModal;
