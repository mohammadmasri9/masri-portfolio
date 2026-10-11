"use client";

import { useEffect, useState } from "react";

/** "⌘" on Apple devices, "Ctrl" elsewhere. */
export function useModKey() {
  const [mod, setMod] = useState("Ctrl");
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)) setMod("⌘");
  }, []);
  return mod;
}
