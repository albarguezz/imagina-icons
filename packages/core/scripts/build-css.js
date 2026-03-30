// scripts/build-css.js
// Genera dist/imagina-icons.css + dist/index.html (preview)

import { icons } from '../dist/icons/index.js'
import { writeFileSync, mkdirSync } from 'fs'

mkdirSync('dist', { recursive: true })

// ─── Helpers ────────────────────────────────────────────────────────────────

function toDataURI(svgContent, variant) {
  const baseAttrs = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ${baseAttrs}>${svgContent.trim()}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

// ─── 1. CSS ──────────────────────────────────────────────────────────────────

let css = `/* =============================================
   @imagina-icons/core — generado automáticamente
   ============================================= */

:root {
  --mi-size: 1em;
  --mi-color: currentColor;
  --mi-stroke-width: 2;
  --mi-secondary-color: currentColor;
  --mi-secondary-opacity: 0.3;
}
[class^="mi-"],
[class*=" mi-"] {
  display: inline-block;
  width: var(--mi-size);
  height: var(--mi-size);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  vertical-align: middle;
}

.mi-xs  { --mi-size: 0.75em;  }
.mi-sm  { --mi-size: 0.875em; }
.mi-md  { --mi-size: 1em;     }
.mi-lg  { --mi-size: 1.25em;  }
.mi-xl  { --mi-size: 1.5em;   }
.mi-2x  { --mi-size: 2em;     }
.mi-3x  { --mi-size: 3em;     }
.mi-4x  { --mi-size: 4em;     }

.mi-spin   { animation: mi-spin   1s linear infinite; }
.mi-pulse  { animation: mi-spin   1s steps(8) infinite; }
.mi-bounce { animation: mi-bounce 1s ease infinite; }
.mi-ping   { animation: mi-ping   1.5s cubic-bezier(0,0,0.2,1) infinite; }

@keyframes mi-spin   { to { transform: rotate(360deg); } }
@keyframes mi-bounce { 0%,100%{transform:translateY(-20%)} 50%{transform:none} }
@keyframes mi-ping   { 75%,100%{transform:scale(1.8);opacity:0} }

`

for (const [name, variants] of Object.entries(icons)) {
  for (const [variant, paths] of Object.entries(variants)) {
    const suffix = variant === 'outline' ? '' : `-${variant}`
    css += `.mi-${name}${suffix} { background-image: ${toDataURI(paths, variant)}; }\n`
  }
}

writeFileSync('dist/imagina-icons.css', css)
console.log(`✓ CSS generado — ${Object.keys(icons).length} iconos × 3 variantes`)

// ─── 2. HTML preview ────────────────────────────────────────────────────────

const iconsJSON = JSON.stringify(
  Object.fromEntries(
    Object.entries(icons).map(([name, variants]) => [
      name,
      Object.fromEntries(
        Object.entries(variants).map(([v, paths]) => [v, paths.trim()])
      )
    ])
  )
)

const totalIcons = Object.keys(icons).length

// ─── CATEGORY_MAP (opcional) ─────────────────────────────────────────────────
// Asigna manualmente cada icono a su categoría visual.
// Si un icono no aparece aquí, se agrupa automáticamente por prefijo de nombre.
// Ejemplo:
//   'home': 'UI General',
//   'search': 'UI General',
//   'arrow-up': 'Flechas',
const CATEGORY_MAP = {
  // Edita aquí tus categorías:
  // 'nombre-icono': 'Nombre Categoría',
}

const html = /* html */`<!DOCTYPE html>
<html lang="es" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ImaginaIcons — Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="imagina-icons.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --accent: #2563eb;
      --radius: 12px; --radius-sm: 8px; --radius-xs: 5px;
      --mono: 'JetBrains Mono', monospace;
      --sans: 'Inter', sans-serif;
      --serif: 'Fraunces', serif;
      --tr: 0.18s cubic-bezier(0.4,0,0.2,1);
    }
    [data-theme="light"] {
      --bg: #f8f7f4; --bg2: #f0ede8; --surface: #ffffff; --surface2: #fafaf9;
      --border: #e5e2dc; --border2: #d4d0c9;
      --text: #1a1916; --text2: #6b6760; --text3: #9b9791;
      --code-bg: #f3f1ec; --code-text: #374151;
      --shadow: 0 1px 3px rgba(0,0,0,0.06),0 4px 16px rgba(0,0,0,0.04);
      --shadow-lg: 0 8px 40px rgba(0,0,0,0.10);
      --accent-light: #eff6ff; --accent-dim: rgba(37,99,235,0.08);
    }
    [data-theme="dark"] {
      --bg: #0e0e11; --bg2: #141418; --surface: #1a1a1f; --surface2: #1f1f26;
      --border: #2a2a33; --border2: #363642;
      --text: #f0eff0; --text2: #8a8a96; --text3: #5a5a66;
      --code-bg: #131318; --code-text: #c9cce0;
      --shadow: 0 1px 3px rgba(0,0,0,0.3),0 4px 16px rgba(0,0,0,0.2);
      --shadow-lg: 0 8px 40px rgba(0,0,0,0.4);
      --accent-light: rgba(37,99,235,0.12); --accent-dim: rgba(37,99,235,0.10);
    }
    html { scroll-behavior: smooth; font-size: 15px; }
    body { font-family: var(--sans); background: var(--bg); color: var(--text); min-height: 100vh; transition: background var(--tr), color var(--tr); -webkit-font-smoothing: antialiased; }
    .layout { display: flex; min-height: 100vh; }
    .sidebar { width: 230px; flex-shrink: 0; background: var(--surface); border-right: 1px solid var(--border); position: sticky; top: 0; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; transition: background var(--tr), border-color var(--tr); z-index: 50; }
    .sidebar-logo { padding: 1.5rem 1.25rem 1.1rem; border-bottom: 1px solid var(--border); }
    .logo-mark { font-family: var(--serif); font-size: 1.5rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1; }
    .logo-mark em { font-style: italic; font-weight: 300; color: var(--accent); }
    .logo-ver { margin-top: 0.3rem; font-size: 0.67rem; color: var(--text3); font-family: var(--mono); }
    .sidebar-search { padding: 0.75rem 1rem; border-bottom: 1px solid var(--border); }
    .srch { position: relative; }
    .srch svg { position: absolute; left: 0.6rem; top: 50%; transform: translateY(-50%); width: 13px; height: 13px; stroke: var(--text3); fill: none; stroke-width: 2; stroke-linecap: round; pointer-events: none; }
    #search { width: 100%; background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.42rem 0.65rem 0.42rem 1.9rem; color: var(--text); font-family: var(--sans); font-size: 0.8rem; outline: none; transition: border-color var(--tr); }
    #search:focus { border-color: var(--accent); }
    #search::placeholder { color: var(--text3); }
    .sidebar-nav { flex: 1; padding: 0.75rem 0.625rem; }
    .nav-label { font-size: 0.61rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text3); padding: 0.5rem 0.625rem 0.2rem; margin-top: 0.5rem; }
    .nav-label:first-child { margin-top: 0; }
    .nav-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.42rem 0.625rem; border-radius: var(--radius-xs); font-size: 0.82rem; color: var(--text2); cursor: pointer; text-decoration: none; transition: background var(--tr), color var(--tr); white-space: nowrap; }
    .nav-item:hover { background: var(--bg2); color: var(--text); }
    .nav-item.active { background: var(--accent-dim); color: var(--accent); font-weight: 500; }
    .nav-item svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; flex-shrink: 0; }
    .nav-count { margin-left: auto; font-size: 0.64rem; background: var(--bg2); color: var(--text3); border-radius: 999px; padding: 1px 6px; font-family: var(--mono); }
    .nav-item.active .nav-count { background: var(--accent-dim); color: var(--accent); }
    .sidebar-footer { padding: 0.875rem 1rem; border-top: 1px solid var(--border); }
    .theme-btn { display: flex; align-items: center; gap: 0.4rem; background: var(--bg2); border: 1px solid var(--border); border-radius: 999px; padding: 0.3rem 0.75rem; font-size: 0.72rem; color: var(--text2); cursor: pointer; font-family: var(--sans); transition: all var(--tr); }
    .theme-btn:hover { border-color: var(--accent); color: var(--accent); }
    .theme-btn svg { width: 12px; height: 12px; stroke: currentColor; fill: none; stroke-width: 2; }
    .main { flex: 1; min-width: 0; }
    .topbar { position: sticky; top: 0; z-index: 40; background: rgba(248,247,244,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid var(--border); padding: 0.6rem 1.75rem; display: flex; align-items: center; gap: 0.875rem; flex-wrap: wrap; transition: background var(--tr); }
    [data-theme="dark"] .topbar { background: rgba(14,14,17,0.9); }
    .seg { display: flex; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 3px; gap: 2px; }
    .seg button { background: none; border: none; color: var(--text2); font-family: var(--sans); font-size: 0.75rem; font-weight: 500; padding: 0.28rem 0.875rem; border-radius: 5px; cursor: pointer; transition: all var(--tr); white-space: nowrap; }
    .seg button:hover { color: var(--text); }
    .seg button.active { background: var(--surface); color: var(--text); box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .tctrl { display: flex; align-items: center; gap: 0.5rem; }
    .tctrl-lbl { font-size: 0.71rem; color: var(--text3); white-space: nowrap; }
    input[type="range"] { -webkit-appearance: none; width: 70px; height: 3px; border-radius: 2px; background: var(--border2); outline: none; cursor: pointer; }
    input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 13px; height: 13px; border-radius: 50%; background: var(--accent); cursor: pointer; border: 2px solid var(--surface); box-shadow: 0 0 0 1px var(--accent); }
    #sizeVal { font-size: 0.71rem; color: var(--accent); min-width: 2ch; font-family: var(--mono); }
    input[type="color"] { width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--border2); background: none; cursor: pointer; padding: 2px; }
    input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
    input[type="color"]::-webkit-color-swatch { border-radius: 3px; border: none; }
    #secCtrl { display: none; }
    .topbar-r { margin-left: auto; }
    #resultCount { font-size: 0.71rem; color: var(--text3); font-family: var(--mono); }
    .page { display: none; }
    .page.active { display: block; }
    .icons-wrap { padding: 1.75rem; }
    .cat-block { margin-bottom: 2.25rem; }
    .cat-hdr { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.875rem; }
    .cat-title { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text3); }
    .cat-line { flex: 1; height: 1px; background: var(--border); }
    .cat-count { font-size: 0.64rem; color: var(--text3); font-family: var(--mono); }
    .icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(98px,1fr)); gap: 5px; }
    .icon-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 1rem 0.5rem 0.7rem; display: flex; flex-direction: column; align-items: center; gap: 0.45rem; cursor: pointer; position: relative; transition: border-color var(--tr), box-shadow var(--tr), transform var(--tr); animation: fup 0.2s ease both; }
    @keyframes fup { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: none; } }
    .icon-card:hover { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim), var(--shadow); transform: translateY(-1px); }
    .icon-card:active { transform: scale(0.97); }
    .icon-prev { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; }
    .icon-prev svg { display: block; transition: transform var(--tr); }
    .icon-card:hover .icon-prev svg { transform: scale(1.12); }
    .icon-name { font-size: 0.59rem; color: var(--text3); text-align: center; word-break: break-all; line-height: 1.3; transition: color var(--tr); }
    .icon-card:hover .icon-name { color: var(--text2); }
    .copy-flash { position: absolute; inset: 0; border-radius: var(--radius); background: var(--accent-light); border: 1px solid var(--accent); display: flex; align-items: center; justify-content: center; font-size: 0.61rem; color: var(--accent); font-weight: 500; opacity: 0; pointer-events: none; transition: opacity 0.12s; }
    .icon-card.copied .copy-flash { opacity: 1; }
    #empty { display: none; text-align: center; padding: 5rem 2rem; color: var(--text3); font-size: 0.9rem; }
    #empty.show { display: block; }
    #empty strong { color: var(--text2); }
    .install-wrap { max-width: 740px; margin: 0 auto; padding: 2.5rem 2rem 4rem; }
    .install-hero { margin-bottom: 2.75rem; }
    .install-hero h1 { font-family: var(--serif); font-size: 2.1rem; font-weight: 600; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 0.65rem; }
    .install-hero h1 em { font-style: italic; font-weight: 300; color: var(--accent); }
    .install-hero p { font-size: 0.93rem; color: var(--text2); line-height: 1.7; max-width: 500px; }
    .itabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
    .itab { padding: 0.55rem 1.1rem; font-size: 0.82rem; font-weight: 500; color: var(--text3); cursor: pointer; border: none; background: none; font-family: var(--sans); border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all var(--tr); }
    .itab:hover { color: var(--text); }
    .itab.active { color: var(--accent); border-bottom-color: var(--accent); }
    .icontent { display: none; }
    .icontent.active { display: block; }
    .istep { margin-bottom: 2rem; }
    .step-n { display: inline-flex; align-items: center; justify-content: center; width: 21px; height: 21px; border-radius: 50%; background: var(--accent); color: white; font-size: 0.63rem; font-weight: 600; margin-bottom: 0.55rem; }
    .istep h3 { font-size: 0.93rem; font-weight: 600; color: var(--text); margin-bottom: 0.45rem; letter-spacing: -0.01em; }
    .istep p { font-size: 0.84rem; color: var(--text2); line-height: 1.65; margin-bottom: 0.65rem; }
    code { font-family: var(--mono); font-size: 0.83em; background: var(--code-bg); padding: 1px 5px; border-radius: 3px; }
    .cblock { position: relative; background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin: 0.45rem 0; }
    .chdr { display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 1rem; border-bottom: 1px solid var(--border); background: var(--bg2); }
    .clang { font-size: 0.63rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text3); font-family: var(--mono); }
    .cbtn { display: flex; align-items: center; gap: 0.3rem; background: none; border: 1px solid var(--border); border-radius: var(--radius-xs); padding: 0.18rem 0.5rem; font-size: 0.64rem; color: var(--text3); cursor: pointer; font-family: var(--sans); transition: all var(--tr); }
    .cbtn:hover { border-color: var(--accent); color: var(--accent); }
    .cbtn svg { width: 10px; height: 10px; stroke: currentColor; fill: none; stroke-width: 1.8; }
    .cbtn.ok { color: #16a34a; border-color: #16a34a; }
    pre { padding: 0.875rem 1rem; font-family: var(--mono); font-size: 0.77rem; line-height: 1.65; color: var(--code-text); overflow-x: auto; tab-size: 2; }
    .kw { color: #7c3aed; } .str { color: #16a34a; } .tg { color: #0369a1; } .at { color: #b45309; } .cm { color: #6b7280; font-style: italic; }
    [data-theme="dark"] .kw { color: #a78bfa; } [data-theme="dark"] .str { color: #4ade80; } [data-theme="dark"] .tg { color: #38bdf8; } [data-theme="dark"] .at { color: #fbbf24; }
    .callout { display: flex; gap: 0.7rem; background: var(--accent-light); border: 1px solid rgba(37,99,235,0.2); border-radius: var(--radius); padding: 0.8rem 0.9rem; margin: 0.65rem 0; }
    .callout svg { width: 15px; height: 15px; stroke: var(--accent); fill: none; stroke-width: 2; flex-shrink: 0; margin-top: 1px; }
    .callout p { font-size: 0.81rem; color: var(--text2); line-height: 1.55; }
    .callout strong { color: var(--accent); font-weight: 500; }
    .divider { height: 1px; background: var(--border); margin: 1.75rem 0; }
    .ugrid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.875rem; margin-top: 0.65rem; }
    @media (max-width: 560px) { .ugrid { grid-template-columns: 1fr; } }
    .ucard { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
    .ucard-hdr { padding: 0.5rem 0.875rem; background: var(--bg2); border-bottom: 1px solid var(--border); font-size: 0.66rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text3); font-family: var(--mono); }
    .ucard pre { padding: 0.7rem 0.875rem; font-size: 0.73rem; }
    #panel { position: fixed; right: -350px; top: 0; bottom: 0; width: 330px; background: var(--surface); border-left: 1px solid var(--border); z-index: 200; transition: right 0.28s cubic-bezier(0.16,1,0.3,1); display: flex; flex-direction: column; overflow: hidden; box-shadow: var(--shadow-lg); }
    #panel.open { right: 0; }
    .phdr { padding: 0.9rem 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .ptitle { font-size: 0.93rem; font-weight: 600; letter-spacing: -0.01em; font-family: var(--mono); }
    .pclose { background: none; border: 1px solid var(--border); border-radius: var(--radius-xs); cursor: pointer; color: var(--text3); width: 26px; height: 26px; display: flex; align-items: center; justify-content: center; font-size: 0.82rem; transition: all var(--tr); }
    .pclose:hover { border-color: var(--accent); color: var(--accent); }
    .pprev { padding: 1.25rem 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: center; gap: 1.75rem; background: var(--surface2); }
    .pprev-item { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
    .pprev-lbl { font-size: 0.59rem; color: var(--text3); font-family: var(--mono); }
    .pbody { padding: 0.875rem; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.75rem; }
    .pvbtns { display: flex; gap: 0.35rem; }
    .pvbtn { flex: 1; background: var(--bg2); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.5rem 0.2rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.3rem; transition: all var(--tr); }
    .pvbtn:hover, .pvbtn.active { border-color: var(--accent); background: var(--accent-light); }
    .pvbtn span { font-family: var(--mono); font-size: 0.57rem; color: var(--text3); }
    .pvbtn.active span { color: var(--accent); }
    .slbl { font-size: 0.61rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.09em; color: var(--text3); }
    .snippet { background: var(--code-bg); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 0.6rem 0.7rem; font-size: 0.71rem; color: var(--text2); cursor: pointer; word-break: break-all; font-family: var(--mono); display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; transition: border-color var(--tr), background var(--tr); }
    .snippet:hover { border-color: var(--accent); background: var(--accent-light); color: var(--text); }
    .sicn { flex-shrink: 0; width: 11px; height: 11px; stroke: currentColor; fill: none; stroke-width: 1.5; opacity: 0.4; }
    .snippet:hover .sicn { opacity: 1; }
    #toast { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%) translateY(10px); background: var(--text); color: var(--bg); padding: 0.48rem 1rem; border-radius: 999px; font-size: 0.73rem; font-family: var(--mono); opacity: 0; transition: all 0.2s ease; pointer-events: none; z-index: 9999; white-space: nowrap; box-shadow: var(--shadow-lg); }
    #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }
    @media (max-width: 680px) { .sidebar { display: none; } .install-wrap { padding: 1.5rem 1rem 3rem; } .icons-wrap { padding: 1rem; } .topbar { padding: 0.6rem 1rem; } }
  </style>
</head>
<body>
<div class="layout">

  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">Imagina<em>Icons</em></div>
      <div class="logo-ver">v1.0.0 · ${totalIcons} iconos</div>
    </div>
    <div class="sidebar-search">
      <div class="srch">
        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="search" placeholder="Buscar… ( / )" autocomplete="off" spellcheck="false">
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-label">Páginas</div>
      <a class="nav-item active" href="#" data-page="icons">
        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        Iconos
      </a>
      <a class="nav-item" href="#" data-page="install">
        <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Instalación
      </a>
      <div class="nav-label" id="catNavLabel" style="display:none">Categorías</div>
      <div id="catNavItems"></div>
    </nav>
    <div class="sidebar-footer">
      <button class="theme-btn" id="themeBtn">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <span id="themeLbl">Oscuro</span>
      </button>
    </div>
  </aside>

  <main class="main">
    <div class="topbar" id="topbar">
      <div class="seg" id="varSeg">
        <button class="active" data-v="outline">Outline</button>
        <button data-v="solid">Solid</button>
        <button data-v="duotone">Duotone</button>
      </div>
      <div class="tctrl">
        <span class="tctrl-lbl">Tamaño</span>
        <input type="range" id="sizeSlider" min="16" max="48" value="24" step="2">
        <span id="sizeVal">24</span>
      </div>
      <div class="tctrl">
        <span class="tctrl-lbl">Color</span>
        <input type="color" id="colorPicker" value="#2563eb">
      </div>
      <div class="tctrl" id="secCtrl">
        <span class="tctrl-lbl">2º</span>
        <input type="color" id="secPicker" value="#93c5fd">
      </div>
      <div class="topbar-r"><span id="resultCount"></span></div>
    </div>

    <div class="page active" id="page-icons">
      <div class="icons-wrap">
        <div id="cats"></div>
        <div id="empty">No se encontraron iconos para "<strong id="emptyTerm"></strong>"</div>
      </div>
    </div>

    <div class="page" id="page-install">
      <div class="install-wrap">
        <div class="install-hero">
          <h1>Instalar y usar<br><em>ImaginaIcons</em></h1>
          <p>Librería de iconos SVG con soporte para Vue 3 y HTML puro. Sin dependencias de runtime.</p>
        </div>
        <div class="itabs">
          <button class="itab active" data-itab="vue">Vue 3</button>
          <button class="itab" data-itab="html">HTML / CDN</button>
        </div>

        <div class="icontent active" id="itab-vue">
          <div class="istep">
            <div class="step-n">1</div>
            <h3>Instalar el paquete</h3>
            <div class="cblock">
              <div class="chdr"><span class="clang">bash</span><button class="cbtn" data-copy="npm install @imagina-icons/vue @imagina-icons/core"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copiar</button></div>
              <pre>npm install @imagina-icons/vue @imagina-icons/core</pre>
            </div>
          </div>
          <div class="istep">
            <div class="step-n">2</div>
            <h3>Registrar en <code>main.ts</code></h3>
            <div class="cblock">
              <div class="chdr"><span class="clang">typescript</span><button class="cbtn" data-copy="import { ImaginaIconsPlugin } from '@imagina-icons/vue'&#10;import '@imagina-icons/core/css'&#10;app.use(ImaginaIconsPlugin)"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copiar</button></div>
<pre><span class="kw">import</span> { createApp } <span class="kw">from</span> <span class="str">'vue'</span>
<span class="kw">import</span> { ImaginaIconsPlugin } <span class="kw">from</span> <span class="str">'@imagina-icons/vue'</span>
<span class="kw">import</span> <span class="str">'@imagina-icons/core/css'</span>

createApp(App).use(ImaginaIconsPlugin).mount(<span class="str">'#app'</span>)</pre>
            </div>
          </div>
          <div class="istep">
            <div class="step-n">3</div>
            <h3>Usar en cualquier componente</h3>
            <div class="ugrid">
              <div class="ucard"><div class="ucard-hdr">Clase CSS</div>
<pre><span class="tg">&lt;span</span> <span class="at">class</span>=<span class="str">"mi-home"</span><span class="tg">&gt;&lt;/span&gt;</span>
<span class="tg">&lt;span</span> <span class="at">class</span>=<span class="str">"mi-home-solid mi-lg"</span><span class="tg">&gt;&lt;/span&gt;</span>
<span class="tg">&lt;span</span> <span class="at">class</span>=<span class="str">"mi-refresh-duotone mi-spin"</span><span class="tg">&gt;&lt;/span&gt;</span></pre></div>
              <div class="ucard"><div class="ucard-hdr">Componente</div>
<pre><span class="tg">&lt;mi-icon</span> <span class="at">name</span>=<span class="str">"home"</span> <span class="tg">/&gt;</span>
<span class="tg">&lt;mi-icon</span>
  <span class="at">name</span>=<span class="str">"heart"</span>
  <span class="at">variant</span>=<span class="str">"solid"</span>
  <span class="at">color</span>=<span class="str">"#e11d48"</span>
<span class="tg">/&gt;</span></pre></div>
            </div>
          </div>
          <div class="divider"></div>
          <div class="istep">
            <div class="step-n">4</div>
            <h3>Modificadores CSS</h3>
            <div class="ugrid">
              <div class="cblock"><div class="chdr"><span class="clang">tamaños</span></div><pre>.mi-xs → 0.75em    .mi-sm → 0.875em
.mi-lg → 1.25em    .mi-2x → 2em
.mi-3x → 3em       .mi-4x → 4em</pre></div>
              <div class="cblock"><div class="chdr"><span class="clang">animaciones</span></div><pre>.mi-spin   → rotación continua
.mi-pulse  → pasos (8)
.mi-bounce → rebote
.mi-ping   → pulso expansivo</pre></div>
            </div>
          </div>
          <div class="callout">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <p><strong>Tree-shaking:</strong> Importa directamente desde <code>@imagina-icons/core</code> para que Vite solo incluya los iconos que uses.</p>
          </div>
        </div>

        <div class="icontent" id="itab-html">
          <div class="istep">
            <div class="step-n">1</div>
            <h3>Incluir el CSS</h3>
            <div class="cblock">
              <div class="chdr"><span class="clang">html</span><button class="cbtn" data-copy='&lt;link rel="stylesheet" href="/assets/imagina-icons.css"&gt;'><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copiar</button></div>
              <pre><span class="tg">&lt;link</span> <span class="at">rel</span>=<span class="str">"stylesheet"</span> <span class="at">href</span>=<span class="str">"/assets/imagina-icons.css"</span><span class="tg">&gt;</span></pre>
            </div>
          </div>
          <div class="istep">
            <div class="step-n">2</div>
            <h3>Usar con clases CSS</h3>
            <div class="cblock"><div class="chdr"><span class="clang">html</span></div>
<pre><span class="tg">&lt;span</span> <span class="at">class</span>=<span class="str">"mi-home"</span><span class="tg">&gt;&lt;/span&gt;</span>
<span class="tg">&lt;span</span> <span class="at">class</span>=<span class="str">"mi-home-solid mi-2x"</span><span class="tg">&gt;&lt;/span&gt;</span>
<span class="tg">&lt;span</span> <span class="at">class</span>=<span class="str">"mi-refresh-duotone mi-spin"</span><span class="tg">&gt;&lt;/span&gt;</span></pre></div>
          </div>
          <div class="istep">
            <div class="step-n">3</div>
            <h3>Color con CSS variables</h3>
            <div class="cblock"><div class="chdr"><span class="clang">css + html</span></div>
<pre>:root { --mi-size: 1.25em; }

<span class="tg">&lt;span</span> <span class="at">class</span>=<span class="str">"mi-heart-solid"</span>
  <span class="at">style</span>=<span class="str">"color:#e11d48;--mi-size:1.5em"</span><span class="tg">&gt;&lt;/span&gt;</span></pre></div>
          </div>
          <div class="divider"></div>
          <div class="istep">
            <div class="step-n">4</div>
            <h3>Sprite SVG (alternativa)</h3>
            <div class="cblock"><div class="chdr"><span class="clang">html</span></div>
<pre><span class="tg">&lt;div</span> <span class="at">style</span>=<span class="str">"display:none"</span><span class="tg">&gt;</span><span class="cm">&lt;!-- sprite --&gt;</span><span class="tg">&lt;/div&gt;</span>
<span class="tg">&lt;svg</span> <span class="at">width</span>=<span class="str">"24"</span> <span class="at">height</span>=<span class="str">"24"</span><span class="tg">&gt;</span>
  <span class="tg">&lt;use</span> <span class="at">href</span>=<span class="str">"#mi-home"</span><span class="tg">/&gt;</span>
<span class="tg">&lt;/svg&gt;</span></pre></div>
            <div class="callout">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <p>IDs disponibles: <code>mi-{nombre}</code>, <code>mi-{nombre}-solid</code>, <code>mi-{nombre}-duotone</code>. El color se controla con la propiedad CSS <strong>color</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<div id="panel">
  <div class="phdr">
    <div class="ptitle" id="panelName">—</div>
    <button class="pclose" id="panelClose">✕</button>
  </div>
  <div class="pprev" id="panelPrev"></div>
  <div class="pbody">
    <div class="slbl">Variante</div>
    <div class="pvbtns" id="pvBtns"></div>
    <div class="slbl">Clase CSS</div>
    <div class="snippet" id="snipClass"><span id="snipClassTxt"></span><svg class="sicn" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></div>
    <div class="slbl">Componente Vue</div>
    <div class="snippet" id="snipVue"><span id="snipVueTxt"></span><svg class="sicn" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></div>
    <div class="slbl">SVG inline</div>
    <div class="snippet" id="snipSvg"><span id="snipSvgTxt"></span><svg class="sicn" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg></div>
  </div>
</div>

<div id="toast"></div>

<script>
const ICONS = ${iconsJSON};
const ICON_NAMES = Object.keys(ICONS);

// ── CATEGORY_MAP ─────────────────────────────────────────────────────────────
// Inyectado desde build-css.js. Para definir categorías manualmente,
// edita el objeto CATEGORY_MAP en scripts/build-css.js.
const CATEGORY_MAP = ${JSON.stringify(CATEGORY_MAP)};

// Agrupa iconos en categorías (mapa manual → prefijo automático → 'General')
const _cats = {};
ICON_NAMES.forEach(name => {
  let cat = CATEGORY_MAP[name];
  if (!cat) {
    const prefix = name.split('-')[0];
    cat = name.includes('-') ? prefix.charAt(0).toUpperCase() + prefix.slice(1) : 'General';
  }
  if (!_cats[cat]) _cats[cat] = [];
  _cats[cat].push(name);
});
const CATEGORIES = Object.entries(_cats).map(([label, icons]) => ({
  id: label.toLowerCase().replace(/\\s+/g, '-'),
  label, icons
}));

let S = { v:'outline', size:24, color:'#2563eb', sec:'#93c5fd', q:'', sel:null, pv:'outline' };
const $ = id => document.getElementById(id);

function svg(name,v,sz,c,sc,sop=0.25){
  const d=ICONS[name]?.[v]??ICONS[name]?.outline??'';
  const o=v==='outline';
  return \`<svg width="\${sz}" height="\${sz}" viewBox="0 0 24 24" fill="\${o?'none':c}" stroke="\${o?c:'none'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--mi-sc:\${sc};--mi-so:\${sop}">\${d}</svg>\`;
}

function buildCatNav(){
  if(CATEGORIES.length<=1)return;
  $('catNavLabel').style.display='';
  const nav=$('catNavItems');
  nav.innerHTML=CATEGORIES.map(cat=>\`
    <a class="nav-item" href="#" data-page="icons" data-scroll="\${cat.id}">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
      \${cat.label}<span class="nav-count" id="nc-\${cat.id}">\${cat.icons.length}</span>
    </a>\`).join('');
  nav.querySelectorAll('.nav-item').forEach(item=>item.addEventListener('click',e=>{
    e.preventDefault(); showPage('icons');
    setTimeout(()=>{ const el=$('cat-'+item.dataset.scroll); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); },50);
  }));
}

function renderCats(){
  const q=S.q.toLowerCase().trim(), container=$('cats');
  container.innerHTML=''; $('empty').classList.remove('show'); $('resultCount').textContent='';
  let total=0;
  CATEGORIES.forEach(cat=>{
    const list=q?cat.icons.filter(n=>n.includes(q)&&ICONS[n]):cat.icons.filter(n=>ICONS[n]);
    const nc=$('nc-'+cat.id); if(nc) nc.textContent=list.length;
    if(!list.length)return;
    total+=list.length;
    const blk=document.createElement('div'); blk.className='cat-block'; blk.id='cat-'+cat.id;
    blk.innerHTML=\`<div class="cat-hdr"><span class="cat-title">\${cat.label}</span><span class="cat-line"></span><span class="cat-count">\${list.length}</span></div>\`;
    const grid=document.createElement('div'); grid.className='icon-grid';
    list.forEach((name,i)=>{
      const card=document.createElement('div'); card.className='icon-card'; card.dataset.name=name;
      card.style.animationDelay=Math.min(i*15,240)+'ms';
      card.innerHTML=\`<div class="icon-prev">\${svg(name,S.v,S.size,S.color,S.sec)}</div><div class="icon-name">\${name}</div><div class="copy-flash">✓ copiado</div>\`;
      card.addEventListener('click',()=>{ const cls='mi-'+name+(S.v!=='outline'?'-'+S.v:''); navigator.clipboard?.writeText(cls).catch(()=>{}); toast('✓  '+cls); card.classList.add('copied'); setTimeout(()=>card.classList.remove('copied'),900); });
      card.addEventListener('dblclick',()=>openPanel(name));
      grid.appendChild(card);
    });
    blk.appendChild(grid); container.appendChild(blk);
  });
  if(!total&&q){ $('empty').classList.add('show'); $('emptyTerm').textContent=q; }
  if(q) $('resultCount').textContent=total+' resultado'+(total!==1?'s':'');
}

function updateCards(){ document.querySelectorAll('.icon-card').forEach(c=>c.querySelector('.icon-prev').innerHTML=svg(c.dataset.name,S.v,S.size,S.color,S.sec)); }

function openPanel(name){ S.sel=name; S.pv=S.v; $('panel').classList.add('open'); renderPanel(); }
function renderPanel(){
  const name=S.sel; if(!name)return; const v=S.pv;
  $('panelName').textContent=name;
  $('panelPrev').innerHTML=['outline','solid','duotone'].map(vv=>\`<div class="pprev-item">\${svg(name,vv,28,S.color,S.sec)}<span class="pprev-lbl">\${vv}</span></div>\`).join('');
  $('pvBtns').innerHTML=['outline','solid','duotone'].map(vv=>\`<button class="pvbtn\${v===vv?' active':''}" data-pv="\${vv}">\${svg(name,vv,18,S.color,S.sec)}<span>\${vv}</span></button>\`).join('');
  $('pvBtns').querySelectorAll('.pvbtn').forEach(b=>b.addEventListener('click',()=>{ S.pv=b.dataset.pv; renderPanel(); }));
  const suf=v!=='outline'?'-'+v:'', cls='mi-'+name+suf;
  $('snipClassTxt').textContent=cls; $('snipClass').onclick=()=>copyT(cls);
  $('snipVueTxt').textContent=\`<mi-icon name="\${name}" variant="\${v}" />\`; $('snipVue').onclick=()=>copyT(\`<mi-icon name="\${name}" variant="\${v}" />\`);
  $('snipSvgTxt').textContent=\`<svg viewBox="0 0 24 24">…</svg>\`; $('snipSvg').onclick=()=>copyT(\`<svg viewBox="0 0 24 24">\${(ICONS[name]?.[v]??'').trim()}</svg>\`);
}
$('panelClose').addEventListener('click',()=>$('panel').classList.remove('open'));

let toastT;
function toast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),2200); }
function copyT(text){ navigator.clipboard?.writeText(text).catch(()=>{}); toast('✓  '+text.substring(0,42)); }

function showPage(pid){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  $('page-'+pid).classList.add('active');
  $('topbar').style.display=pid==='icons'?'':'none';
  document.querySelectorAll('.nav-item[data-page]').forEach(n=>n.classList.toggle('active',n.dataset.page===pid&&!n.dataset.scroll));
}
document.querySelectorAll('.nav-item[data-page]:not([data-scroll])').forEach(item=>
  item.addEventListener('click',e=>{ e.preventDefault(); showPage(item.dataset.page); })
);
document.querySelectorAll('.itab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.itab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.icontent').forEach(x=>x.classList.remove('active'));
  t.classList.add('active'); $('itab-'+t.dataset.itab).classList.add('active');
}));
document.querySelectorAll('.cbtn[data-copy]').forEach(btn=>btn.addEventListener('click',()=>{
  navigator.clipboard?.writeText(btn.dataset.copy.replace(/&#10;/g,'\\n')).catch(()=>{});
  const orig=btn.innerHTML; btn.classList.add('ok');
  btn.innerHTML='<svg viewBox="0 0 24 24" style="width:10px;height:10px;stroke:currentColor;fill:none;stroke-width:2"><polyline points="20 6 9 17 4 12"/></svg> Copiado';
  setTimeout(()=>{ btn.classList.remove('ok'); btn.innerHTML=orig; },2000);
}));
$('search').addEventListener('input',()=>{ S.q=$('search').value; renderCats(); });
document.querySelectorAll('#varSeg button').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('#varSeg button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); S.v=btn.dataset.v;
  $('secCtrl').style.display=S.v==='duotone'?'flex':'none'; updateCards();
}));
$('sizeSlider').addEventListener('input',()=>{ S.size=+$('sizeSlider').value; $('sizeVal').textContent=S.size; updateCards(); });
$('colorPicker').addEventListener('input',()=>{ S.color=$('colorPicker').value; updateCards(); if(S.sel)renderPanel(); });
$('secPicker').addEventListener('input',()=>{ S.sec=$('secPicker').value; updateCards(); if(S.sel)renderPanel(); });
$('themeBtn').addEventListener('click',()=>{
  const dark=document.documentElement.dataset.theme==='dark';
  document.documentElement.dataset.theme=dark?'light':'dark';
  $('themeLbl').textContent=dark?'Oscuro':'Claro';
});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') $('panel').classList.remove('open');
  if(e.key==='/'&&document.activeElement!==$('search')&&document.activeElement.tagName!=='INPUT'){ e.preventDefault(); $('search').focus(); }
});
buildCatNav();
renderCats();
</script>
</body>
</html>`

writeFileSync('dist/index.html', html)
console.log(`✓ HTML preview generado: dist/index.html (${totalIcons} iconos)`)