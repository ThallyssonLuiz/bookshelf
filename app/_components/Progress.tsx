"use client";
import { useState, useEffect } from "react";

export function Progress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <progress value={progress} max={100} className="w-[60%]" />
  );
}
