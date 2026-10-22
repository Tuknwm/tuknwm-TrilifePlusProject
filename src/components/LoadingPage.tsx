"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { TriangleAlert } from "lucide-react";

function Clock() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const update = () => { const now = new Date(); setTime(now.toLocaleTimeString("en-US", { hour12: false })); setDate(now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })); };
    update(); const id = window.setInterval(update, 1000); return () => window.clearInterval(id);
  }, []);
  return <div className="loading-clock"><div>{date || "Loading..."}</div><strong>{time || "00:00:00"}</strong></div>;
}

export function LoadingPage() {
  const [visible, setVisible] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [closingNotice, setClosingNotice] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sessionStorage.getItem("hasVisited")) setVisible(true);
  }, []);
  useEffect(() => {
    if (!visible) return;
    const svg = svgRef.current; const overlay = overlayRef.current; if (!svg || !overlay) return;
    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    const preventScroll = (event: Event) => event.preventDefault();
    const preventKeys = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", "Space"].includes(event.code)) event.preventDefault();
    };
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys);
    const latin = svg.querySelector("#kurokyu-stroke"); const curve = overlay.querySelector("#curvePath"); const emoji = overlay.querySelector("#emoji-exit");
    const length = (latin as SVGTextElement | null)?.getComputedTextLength?.() * 2 || 1200;
    const tl = gsap.timeline({ onComplete: () => {
      window.setTimeout(() => {
        sessionStorage.setItem("hasVisited", "1");
        window.dispatchEvent(new Event("loading-complete"));
        setVisible(false);
        setShowNotice(true);
      }, 0);
    } });
    gsap.set("#text-group", { scale: 2, opacity: 0 }); if (latin) gsap.set(latin, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
    tl.to("#text-group", { scale: 1, opacity: 1, duration: 1.5, ease: "expo.out" });
    tl.fromTo(".text-path", { strokeDasharray: 450, strokeDashoffset: 450 }, { strokeDashoffset: 0, duration: 1.5, stagger: 0.1, ease: "power2.inOut" }, "-=0.5");
    const flicker = (el: Element, delay: number) => gsap.timeline({ delay }).to(el, { opacity: 0.7, duration: 0.05 }).to(el, { opacity: 0.1, duration: 0.04 }).to(el, { opacity: 1, duration: 0.1, filter: "drop-shadow(0 0 25px #fff)" });
    tl.addLabel("neon"); overlay.querySelectorAll(".left-side .char-fill").forEach((el, i) => tl.add(flicker(el, i * 0.1), "neon")); Array.from(overlay.querySelectorAll(".right-side .char-fill")).reverse().forEach((el, i) => tl.add(flicker(el, i * 0.1), "neon"));
    if (latin) { tl.addLabel("latin", "-=0.3"); tl.to(latin, { opacity: 1, duration: 0.1 }, "latin"); tl.to(latin, { strokeDashoffset: 0, duration: 2.5, ease: "power3.inOut" }, "latin"); tl.to(latin, { opacity: 0.18, duration: 1.5 }, "-=0.5"); }
    if (emoji) tl.to(emoji, { opacity: 1, y: 0, duration: 0.5, ease: "back.out" }, "+=0.5");
    tl.addLabel("exit", "+=1.5"); tl.to(".loading-footer, #emoji-exit, .loader-container", { opacity: 0, y: -20, duration: 0.5, stagger: 0.05 }, "exit"); if (curve) tl.to(curve, { attr: { d: "M 0,0 L 1,0 L 1,0 Q 0.5,-0.2 0,0 Z" }, duration: 1.5, ease: "expo.inOut" }, "exit");
    return () => {
      tl.kill();
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
    };
  }, [visible]);
  const chars = [{ char: "く", x: -180, side: "left" }, { char: "ろ", x: -90, side: "left" }, { char: "き", x: 0, side: "right" }, { char: "ゅ", x: 90, side: "right" }, { char: "う", x: 180, side: "right" }];
  return <>{visible && <div ref={overlayRef} className="loading-page"><svg className="loading-clip-defs"><defs><clipPath id="curveClip" clipPathUnits="objectBoundingBox"><path id="curvePath" d="M 0,0 L 1,0 L 1,1 Q 0.5,1 0,1 Z" /></clipPath></defs></svg><Clock /><div className="loading-footer">Tuknwm</div><div id="emoji-exit" className="loading-emoji">＞︿＜</div><div className="loader-container"><svg ref={svgRef} viewBox="0 0 1000 300" className="loading-svg"><g id="text-group" transform="translate(500, 150)">{chars.map(({ char, x, side }) => <g key={char} className={`char-unit ${side}-side`} transform={`translate(${x}, 0)`}><text textAnchor="middle" dominantBaseline="middle" fontSize="90" fontWeight="bold" className="text-path">{char}</text><text textAnchor="middle" dominantBaseline="middle" fontSize="90" fontWeight="bold" className="char-fill">{char}</text></g>)}</g><g transform="translate(500, 150) scale(1, 0.85)"><text id="kurokyu-stroke" textAnchor="middle" dominantBaseline="middle" className="font-stroke-row">KUROKYU</text></g></svg></div></div>}
    {showNotice && <div className={`legacy-notice-backdrop ${closingNotice ? "is-closing" : ""}`}><div className="legacy-notice" style={{ backgroundColor: "#F9FAFC", opacity: 1 }} role="dialog" aria-modal="true" aria-labelledby="demo-notice-title"><div className="legacy-notice-icon"><TriangleAlert size={48} strokeWidth={2} /></div><h2 id="demo-notice-title">Demo Notice</h2><p>This website was redesign from the old project and also for demonstration and educational purposes only, not a real insurance service. Information entered is temporary, not stored, and not used for real transactions.</p><button type="button" onClick={() => { setClosingNotice(true); window.setTimeout(() => setShowNotice(false), 200); }}>Understand</button></div></div>}
  </>;
}
