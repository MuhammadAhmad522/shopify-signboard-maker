# AI Context & Development Guide

This file provides architectural context, tech stack details, and critical implementation learnings for this 3D Logo Maker application to assist future AI coding agents.

## Project Overview
A web-based 3D configurator for custom signage (like Neon or 3D LED letters). Users can input text, customize dimensions, select front/side PBR materials (Acrylic, Metal, Wood), choose mounting styles (Flush vs. Bolt), and toggle lighting effects. Ensure that any new UI additions match the existing dark-mode, glassmorphic Tailwind CSS design.

## Tech Stack
- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS (Dark Mode / Glassmorphism)
- **State Management**: Zustand (`src/store/useStore.ts`)
- **3D Engine**: Three.js (v183+), `@react-three/fiber` (R3F), `@react-three/drei`

## Key Files & Architecture
- `src/App.tsx`: Main entry point. Defines full-screen layout and mounts UI + Scene.
- `src/components/Scene.tsx`: The WebGL Canvas host. Contains lighting, shadows, and the core WebGL capability checks. 
- `src/components/ExtrudedText.tsx`: Core 3D component. Uses Drei's `<Text3D>`. Handles geometry, multi-materials, emissive glowing, and mounting standoffs.
- `src/components/ConfiguratorUI.tsx`: The control panel. Tied directly to Zustand.
- `src/components/CSSFallback.tsx`: A pure-CSS representation of 3D text used when a device fails to acquire a WebGL context.
- `src/configs/config.ts`: Centralized configuration (e.g., PBR properties for different materials).

## Critical Quirks & Implementation Details (Read Before Modifying)

### 1. WebGL Context Fallback (Silent R3F Failures)
React Three Fiber's standard `<Canvas fallback={...}>` prop is meant for handling `Suspense` loading states, **not** low-level GPU driver crashes. On certain integrated HD graphics (e.g., Intel HD Graphics 3000), `Three.js` will quietly fail to create a context and simply log an error (`THREE.WebGLRenderer: A WebGL context could not be created`), leaving a blank screen.
- **The Fix**: `Scene.tsx` heavily relies on a custom `console.error` interceptor to catch this specific string and manually mount the `<CSSFallback />`. **Do not remove this interceptor**, or older computers will see a blank screen.

### 2. Suspense & `<Text3D>`
The `@react-three/drei` `<Text3D>` component fetches its font `.json` file asynchronously. 
- **The Quirk**: It MUST be wrapped in a `<Suspense fallback={null}>` boundary. If it is not, React will suspend the *entire WebGL Canvas* until the font loads. If there's a network delay, the canvas remains completely black with no console errors.

### 3. Canvas Container Sizing
R3F's `<Canvas>` mathematically shrinks to fit its parent container.
- **The Fix**: The global `src/index.css` explicitly forces `html, body, #root` to `width: 100%; height: 100%; overflow: hidden;`. If adding wrapper divs in `App.tsx`, ensure they always have explicit dimensions or WebGL will render at `0px by 0px`.

### 4. Tailwind Configuration
The project uses strict Tailwind. To maintain the aesthetic, use classes like `bg-black/85 backdrop-blur-lg border-white/10` for panels, and `text-cyan-400` for active accents. Drop shadows use custom values like `shadow-[0_0_15px_rgba(0,229,255,0.4)]`. Avoid standard blue/red generic colors.
