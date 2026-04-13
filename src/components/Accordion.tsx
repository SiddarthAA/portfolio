"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionProps {
  title: string;
  role: string;
  children: React.ReactNode;
}

const mono: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), 'Fira Code', monospace",
};

export function Accordion({ title, role, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-expanded={open}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
          <span
            style={{
              ...mono,
              fontSize: "13.5px",
              fontWeight: 600,
              color: "var(--fg)",
              letterSpacing: "0.01em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </span>
          <span
            style={{
              ...mono,
              fontSize: "11px",
              fontWeight: 400,
              color: "var(--muted)",
              flexShrink: 0,
            }}
          >
            {role}
          </span>
        </div>
        <span
          style={{
            ...mono,
            fontSize: "18px",
            fontWeight: 300,
            color: "var(--muted)",
            flexShrink: 0,
            marginLeft: "12px",
            lineHeight: 1,
            display: "inline-block",
            transition: "transform 0.18s ease, color 0.12s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                ...mono,
                fontSize: "13px",
                lineHeight: 1.7,
                color: "var(--fg-dim)",
                paddingBottom: "16px",
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

