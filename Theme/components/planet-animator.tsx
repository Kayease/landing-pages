"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Usage:
// - Wrap your section background planets in a container with class "stage-3d"
// - Mark each planet element with data-planet and optional:
//   data-depth (number, px of z-depth), data-float (px), data-rot (deg), data-speed (seconds), data-parallax (0..1)
// Example:
// <div className="stage-3d">
//   <div className="planet" data-planet data-depth="300" data-float="12" data-rot="8" data-speed="8"></div>
// </div>
export function PlanetAnimator() {
  useEffect(() => {
    const stages = Array.from(document.querySelectorAll<HTMLElement>(".stage-3d"));
    if (!stages.length) return;

    const cleanups: Array<() => void> = [];

    stages.forEach(stage => {
      // Ensure stage is 3D-capable
      gsap.set(stage, {
        perspective: 1000,
        transformStyle: "preserve-3d",
        willChange: "transform",
      });

      const planets = Array.from(stage.querySelectorAll<HTMLElement>("[data-planet]"));
      if (!planets.length) return;

      // Entrance animation with stagger
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      entranceTl.from(planets, {
        opacity: 0,
        y: 60,
        z: (i, el: HTMLElement) => Number(el.dataset.depth ?? 0) * 0.6,
        rotationY: () => gsap.utils.random(-12, 12),
        rotationX: () => gsap.utils.random(-6, 6),
        duration: 1,
        stagger: 0.08,
      });

      // Micro floating + rotation per planet
      planets.forEach((p, idx) => {
        const floatAmp = Number(p.dataset.float ?? 10);
        const rotAmp = Number(p.dataset.rot ?? 6);
        const speed = Number(p.dataset.speed ?? 6) + (idx % 3) * 0.7;
        // Base set
        gsap.set(p, {
          transformStyle: "preserve-3d",
          z: Number(p.dataset.depth ?? 0),
          willChange: "transform",
        });
        gsap.to(p, {
          y: `-=${floatAmp}`,
          rotationZ: `+=${rotAmp}`,
          yoyo: true,
          repeat: -1,
          duration: speed,
          ease: "sine.inOut",
        });
      });

      // Scroll-based parallax with momentum feel
      planets.forEach((p) => {
        const depth = Number(p.dataset.depth ?? 0);
        const parallax = Number(p.dataset.parallax ?? 1); // 0..1 multiplier
        const yRange = gsap.utils.clamp(-200, 200, depth * 0.2) * parallax;
        const rotRange = gsap.utils.clamp(-10, 10, depth * 0.02) * parallax;

        ScrollTrigger.create({
          trigger: stage,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          onUpdate: (self) => {
            const prog = self.progress; // 0..1 through stage
            const eased = 1 - Math.pow(1 - prog, 2); // easeOutQuad
            gsap.to(p, {
              y: (1 - eased) * yRange - yRange * 0.5,
              rotationY: (eased - 0.5) * rotRange,
              duration: 0.2,
              ease: "power1.out",
              overwrite: true,
            });
          },
        });
      });

      // Mouse tilt with damping on the whole stage
      let targetRX = 0; // target rotationX
      let targetRY = 0; // target rotationY
      const onMove = (e: MouseEvent) => {
        const rect = stage.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width; // -0.5 .. 0.5
        const dy = (e.clientY - cy) / rect.height; // -0.5 .. 0.5
        // Rotate around center: X tilt from dy, Y from dx
        targetRX = gsap.utils.clamp(-6, 6, -dy * 10);
        targetRY = gsap.utils.clamp(-8, 8, dx * 14);
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      const ticker = gsap.ticker.add(() => {
        const current = gsap.getProperty(stage, "rotationX") as number;
        const currentY = gsap.getProperty(stage, "rotationY") as number;
        // Lerp toward target for smooth damping
        const rx = current + (targetRX - current) * 0.08;
        const ry = currentY + (targetRY - currentY) * 0.08;
        gsap.set(stage, { rotationX: rx, rotationY: ry, transformPerspective: 1000 });
      });

      cleanups.push(() => {
        entranceTl.kill();
        window.removeEventListener("mousemove", onMove as EventListener);
        gsap.ticker.remove(ticker as any);
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}