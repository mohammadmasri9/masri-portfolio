/**
 * A dark planet whose rim catches the light. `glow` tints the rim, `haze` tints the wide halo.
 * Size and position come from `className`; the sphere is always a perfect circle.
 */
export function Horizon({
  glow = "var(--color-accent)",
  haze = "var(--color-violet)",
  className = "",
  children,
}: {
  glow?: string;
  haze?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute left-1/2 aspect-square -translate-x-1/2 ${className}`}>
      {/* Wide halo above the rim */}
      <div
        className="absolute inset-x-[8%] -top-[12%] h-[40%] rounded-[50%] opacity-60 blur-[60px]"
        style={{ background: `radial-gradient(closest-side, ${haze}, transparent)` }}
      />
      {/* The sphere */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 0%, #15161b 0%, var(--color-ink) 45%)",
          boxShadow: `0 -1px 0 0 color-mix(in srgb, ${glow} 70%, white), 0 -8px 30px -4px ${glow}, 0 -40px 120px -20px ${haze}, inset 0 18px 40px -20px color-mix(in srgb, ${glow} 60%, transparent)`,
        }}
      />
      {children}
    </div>
  );
}
