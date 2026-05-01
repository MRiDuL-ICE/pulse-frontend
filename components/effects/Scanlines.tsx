export default function Scanlines() {
  return (
    <>
      {/* Static scanlines */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9997,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
        }}
      />
      {/* Moving sweep */}
      <div
        className="fixed left-0 right-0 pointer-events-none"
        style={{
          zIndex: 9998,
          height: "3px",
          background: "linear-gradient(90deg, transparent, rgba(0,255,65,0.3), rgba(0,255,255,0.2), transparent)",
          animation: "scanline 8s linear infinite",
          top: 0,
        }}
      />
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9996,
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </>
  )
}
