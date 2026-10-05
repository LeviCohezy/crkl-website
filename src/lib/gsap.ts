import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * One place that registers GSAP's plugins, so every component imports the
 * same configured instance.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media query every scroll scene is wrapped in. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
