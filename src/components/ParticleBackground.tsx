"use client";
import React from "react";
import { Particles } from "@tsparticles/react";

const ParticleBackground: React.FC = () => {
  const options = {
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: 60,
    particles: {
      number: { value: 40 },
      color: { value: ["#0ea5e9", "#f97316", "#fff"] },
      shape: { type: "circle" },
      opacity: { value: 0.15 },
      size: { value: 3 },
      move: {
        enable: true,
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      links: {
        enable: true,
        distance: 120,
        color: "#0ea5e9",
        opacity: 0.08,
        width: 1,
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      options={options as any}
      style={{ position: "absolute", inset: 0, zIndex: 1 }}
    />
  );
};

export default ParticleBackground;
