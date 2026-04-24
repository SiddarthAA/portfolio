"use client";

import { useEffect, useRef } from "react";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  /** RGB components as a comma-separated string, e.g. "165,180,252" */
  color?: string;
  maxOpacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FlickeringGrid({
  squareSize = 3,
  gridGap = 7,
  flickerChance = 0.25,
  color = "165,180,252",
  maxOpacity = 0.75,
  className,
  style,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let cols = 0;
    let rows = 0;
    let squares: Float32Array;
    let animId: number;

    function init() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      if (!w || !h) return;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      cols = Math.floor(w / (squareSize + gridGap));
      rows = Math.floor(h / (squareSize + gridGap));
      squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
    }

    let lastTime = 0;
    function draw(time: number) {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() < flickerChance * delta) {
            squares[i * rows + j] = Math.random() * maxOpacity;
          }
          const a = squares[i * rows + j];
          if (a > 0.001) {
            ctx!.fillStyle = `rgba(${color},${a.toFixed(3)})`;
            ctx!.fillRect(
              i * (squareSize + gridGap) * dpr,
              j * (squareSize + gridGap) * dpr,
              squareSize * dpr,
              squareSize * dpr
            );
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }

    init();
    animId = requestAnimationFrame(draw);

    const observer = new ResizeObserver(init);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", ...style }}
    />
  );
}
