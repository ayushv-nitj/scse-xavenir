// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface Event {
//   _id: string;
//   name: string;
//   description: string;
//   logo: string;
//   prizepool: number;
//   regFees: number;
//   more: string;
//   rules: string;
//   minPart: number;
//   maxPart: number;
//   eventDate?: string;
//   isTechEvent?: boolean;
// }

// const toPath = (name: string) => encodeURIComponent(name);
// const fakeHex = () =>
//   "0x" + Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");

// /* ── Event Card ── */
// function EventCard({ event, index }: { event: Event; index: number }) {
//   const router = useRouter();
//   const [hovered, setHovered] = useState(false);
//   const [hexAddr] = useState(fakeHex);
//   const [decryptLabel, setDecryptLabel] = useState("DECRYPT");

//   const handleHover = () => {
//     setHovered(true);
//     const target = "DECRYPTED";
//     const chars = "ABCDEF0123456789#@$%";
//     let i = 0;
//     const iv = setInterval(() => {
//       setDecryptLabel(target.split("").map((c, idx) =>
//         idx < i ? c : chars[Math.floor(Math.random() * chars.length)]
//       ).join(""));
//       if (++i > target.length) { clearInterval(iv); setDecryptLabel("DECRYPTED"); }
//     }, 38);
//   };
//   const handleLeave = () => { setHovered(false); setDecryptLabel("DECRYPT"); };
//   const handleClick = () => router.push(`/eventDetails/${toPath(event.name)}`);

//   return (
//     <div
//       className={`ev-card${hovered ? " hov" : ""}`}
//       style={{ animationDelay: `${index * 0.09}s` }}
//       onMouseEnter={handleHover} onMouseLeave={handleLeave}
//       onClick={handleClick} role="button" tabIndex={0}
//       onKeyDown={(e) => e.key === "Enter" && handleClick()}
//     >
//       <div className="c-top">
//         <span className="c-buf">BUF.STREAM</span>
//         <span className="c-bars"><b/><b/><b/></span>
//         <span className="c-hex">{hexAddr}</span>
//       </div>
//       <div className="c-img-wrap">
//         {event.logo
//           ? <img src={event.logo} alt={event.name} className="c-img" />
//           : <div className="c-img-ph"><span>⬡</span></div>
//         }
//         <div className="c-scanlines" />
//         <div className={`c-decrypt-ov${hovered ? " show" : ""}`}>
//           <span className="c-eye">◉</span>
//           <span className="c-nd">NODE OPEN</span>
//         </div>
//         <span className="hud tl"/><span className="hud tr"/>
//         <span className="hud bl"/><span className="hud br"/>
//         <div className="c-date-badge">
//           {formatDayMonth(event.eventDate)}
//           {event.name === "AI ML Hackathon" && " - Presentation"}
//         </div>
//       </div>
//       <div className="c-status">
//         <span className="c-decrypt-lbl">{decryptLabel}</span>
//         <div className="c-prog"><div className={`c-prog-fill${hovered ? " full" : ""}`}/></div>
//         <span className="c-clr">CLR // OK</span>
//       </div>
//       <div className="c-info">
//         <h3 className="c-name">{event.name}</h3>
//         <span className="c-apr">APR, 2026</span>
//       </div>

//       <style>{`

      

//         .ev-card{display:flex;flex-direction:column;cursor:pointer;animation:cIn .55s ease both;transition:transform .25s}
//         .ev-card:hover{transform:translateY(-5px)}
//         @keyframes cIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
//         .c-top{display:flex;align-items:center;gap:8px;padding:5px 10px;background:rgba(0,8,26,.9);border:1px solid rgba(0,255,240,.2);border-bottom:none;font-family:'Share Tech Mono',monospace;font-size:.6rem}
//         .c-buf{color:#00fff0;letter-spacing:.1em}
//         .c-bars{display:flex;gap:3px;flex:1}
//         .c-bars b{display:block;width:9px;height:8px;background:rgba(0,255,240,.4);clip-path:polygon(0 0,100% 0,100% 55%,0 55%)}
//         .c-hex{color:#ff2d78;font-size:.58rem}
//         .c-img-wrap{position:relative;overflow:hidden;aspect-ratio:16/10;border:1px solid rgba(0,255,240,.2);border-top:none;border-bottom:none;background:#050012}
//         .c-img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.85) saturate(1.1);transition:transform .45s,filter .3s}
//         .ev-card:hover .c-img{transform:scale(1.07);filter:brightness(1) saturate(1.3)}
//         .c-img-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;color:rgba(0,255,240,.15)}
//         .c-scanlines{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,240,.018) 2px,rgba(0,255,240,.018) 4px);pointer-events:none}
//         .c-decrypt-ov{position:absolute;inset:0;background:rgba(0,5,22,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;opacity:0;transition:opacity .3s;pointer-events:none}
//         .c-decrypt-ov.show{opacity:1}
//         .c-eye{font-size:2rem;color:#00fff0;animation:eyePulse 1s ease infinite}
//         @keyframes eyePulse{0%,100%{text-shadow:0 0 10px #00fff0}50%{text-shadow:none}}
//         .c-nd{font-family:'Orbitron',sans-serif;font-size:.65rem;letter-spacing:.25em;color:#fff}
//         .hud{position:absolute;width:11px;height:11px;border-color:#00fff0;border-style:solid}
//         .hud.tl{top:6px;left:6px;border-width:2px 0 0 2px}
//         .hud.tr{top:6px;right:6px;border-width:2px 2px 0 0}
//         .hud.bl{bottom:22px;left:6px;border-width:0 0 2px 2px}
//         .hud.br{bottom:22px;right:6px;border-width:0 2px 2px 0}
//         .c-date-badge{position:absolute;top:10px;right:10px;font-family:'Share Tech Mono',monospace;font-size:.58rem;letter-spacing:.12em;color:#fff;background:linear-gradient(135deg,#7b2ff7,#ff2d78);padding:3px 9px;border-radius:1px;z-index:2}
//         .c-status{display:flex;align-items:center;gap:8px;padding:5px 10px;background:rgba(0,8,26,.9);border:1px solid rgba(0,255,240,.2);border-top:none;border-bottom:none;font-family:'Share Tech Mono',monospace;font-size:.6rem}
//         .c-decrypt-lbl{color:#00fff0;min-width:72px;letter-spacing:.08em}
//         .c-prog{flex:1;height:3px;background:rgba(0,255,240,.1);border-radius:2px;overflow:hidden}
//         .c-prog-fill{height:100%;width:0;background:linear-gradient(90deg,#00fff0,#ff2d78);transition:width .55s ease}
//         .c-prog-fill.full{width:100%}
//         .c-clr{color:#ff2d78;font-size:.57rem}
//         .c-info{padding:12px 14px 14px;border:1px solid rgba(0,255,240,.15);border-top:none;background:rgba(4,6,20,.96);display:flex;flex-direction:column;gap:5px}
//         .c-name{font-family:'Orbitron',sans-serif;font-size:1.05rem;font-weight:700;color:#fff;letter-spacing:.02em;line-height:1.2}
//         .c-apr{font-family:'Share Tech Mono',monospace;font-size:.72rem;color:#ff2d78;letter-spacing:.12em}
//       `}</style>
//     </div>
//   );
// }
// // Add this helper near the top of your component
// const formatDayMonth = (date:any) => {
//   if (!date) return "";
//   const d = new Date(date);
//   return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase();
//   // Output: "08 APR"
// };
// function SkeletonCard() {
//   return (
//     <div style={{display:"flex",flexDirection:"column",opacity:.4,animation:"skP 1.5s ease infinite"}}>
//       <div style={{height:28,background:"rgba(0,255,240,.07)",border:"1px solid rgba(0,255,240,.12)",borderBottom:"none"}}/>
//       <div style={{aspectRatio:"16/10",background:"rgba(0,255,240,.04)",border:"1px solid rgba(0,255,240,.1)",borderTop:"none",borderBottom:"none"}}/>
//       <div style={{height:24,background:"rgba(0,255,240,.07)",border:"1px solid rgba(0,255,240,.12)",borderTop:"none",borderBottom:"none"}}/>
//       <div style={{height:70,background:"rgba(2,0,14,.9)",border:"1px solid rgba(0,255,240,.12)",borderTop:"none"}}/>
//       <style>{`@keyframes skP{0%,100%{opacity:.25}50%{opacity:.5}}`}</style>
//     </div>
//   );
// }

// /* ── Ticker items ── */
// const TICKER_ITEMS = [
//   "XAVENIR 2026", "NIT JAMSHEDPUR", "SCSE OPS ACTIVE",
//   "16 EVENTS LIVE", "APR 17-19", "CYBER WORLD", "CODE // CREATE // CONQUER",
//   "REGISTER NOW", "PRIZE POOL ₹75K+", "500+ PARTICIPANTS",
// ];

// /* ── Page ── */
// export default function EventsPage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [tick, setTick] = useState(0);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const [dateFilter, setDateFilter] = useState("all"); // "all" | "17" | "18" | "19"
//   const [typeFilter, setTypeFilter] = useState("all"); // "all" | "tech" | "cultural"

//   useEffect(() => {
//     fetch("/api/events")
//       .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
// .then(d => { 
//   const arr = Array.isArray(d) ? d : d.events ?? [];
//   setEvents([...arr].reverse()); 
//   setLoading(false); 
// })      .catch(e => { setError(e.message); setLoading(false); });
//   }, []);

//   // Ticker pulse
//   useEffect(() => {
//     const iv = setInterval(() => setTick(t => t + 1), 60);
//     return () => clearInterval(iv);
//   }, []);

//   const count = events.length;
//  const today = new Date(); today.setHours(0,0,0,0);
// const filtered = events
//   .filter(e => search.trim() ? e.name.toLowerCase().includes(search.toLowerCase()) : true)
//   .filter(e => {
//     if (filter === "completed") {
//       // show all completed regardless of date/type filters
//       if (!e.eventDate) return false;
//       return new Date(e.eventDate) < today;
//     }
//     if (filter === "upcoming" && e.eventDate) {
//       if (new Date(e.eventDate) < today) return false;
//     }
//     if (dateFilter !== "all") {
//       if (!e.eventDate) return false;
//       if (String(new Date(e.eventDate).getDate()) !== dateFilter) return false;
//     }
//     if (typeFilter !== "all") {
//       if (typeFilter === "tech" && e.isTechEvent !== true) return false;
//       if (typeFilter === "cultural" && e.isTechEvent !== false) return false;
//     }
//     return true;
//   });

    

//   return (
//     <>
//       <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>

//       <div className="root">
//         {/* ── Backgrounds ── */}
//         <div className="bg-city"/>
//         <div className="bg-overlay"/>
//         <div className="bg-grid"/>
//         <div className="bg-glow c"/>
//         <div className="bg-glow m"/>

//         {/* ══════════════════════════════════════
//             HERO — completely redesigned
//         ══════════════════════════════════════ */}
//         <section className="hero">

//           {/* ── Top strip: eyebrow + live indicator ── */}
//           <div className="hero-topstrip">
//             <div className="hts-left">
//               <span className="hts-dash">—</span>
//               <span className="hts-org">NIT JAMSHEDPUR</span>
//               <span className="hts-sep">//</span>
//               <span className="hts-dept">CSE</span>
//               <span className="hts-sep">//</span>
//               <span className="hts-dept">XAVENIR</span>
//             </div>
//             <div className="hts-right">
//               <span className="live-dot"/>
//               <span className="live-txt">SYSTEM ONLINE</span>
//               <span className="hts-sep">//</span>
//               <span className="hts-dept">APR 17-19, 2026</span>
//             </div>
//           </div>

//           {/* ── Main title block ── */}
//           <div className="hero-title-block">
//             <div className="htb-left">
//               <div className="htb-corner-tl"/>
//               <h1 className="h-title">
//                 <span className="ht-c">EVENTS</span>
//                 <br/>
//                 {/* <span className="ht-m">ARCHIVE</span> */}
//               </h1>
//               <p className="h-tagline">// events.archive()</p>
//             </div>

//             {/* ── Right: OPS console + badge ── */}
//             <div className="htb-right">
//               {/* OPS Console */}
//               <div className="ops-panel">
//                 <div className="ops-panel-bar">
//                   <span className="ops-buf">OPS.CONSOLE</span>
//                   <span className="ops-bars"><b/><b/><b/></span>
//                 </div>
//                 <div className="ops-body">
//                   <p className="ops-l"><span className="ok">HOVER</span> // DECRYPT</p>
//                   <p className="ops-l"><span className="ok">CLICK</span> // OPEN NODE</p>
//                   <p className="ops-l"><span className="ok">ESC</span> // CLOSE</p>
//                   <div className="ops-div"/>
//                   <div className="ops-stats">
//                     <div className="ops-stat">
//                       <span className="sn c">{count || "—"}</span>
//                       <span className="sl">ACTIVE NODES</span>
//                     </div>
//                     <div className="ops-stat">
//                       <span className="sn m">{count || "—"}</span>
//                       <span className="sl">EVENT FRAMES</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* SCSE badge */}
//               <div className="scse-b">
//                 <div className="scse-b-topbar">
//                   <span className="sb-buf">SCSE.NODE</span>
//                   <span className="sb-status">EVENTS // READY</span>
//                 </div>
//                <div className="sb-main-row">
//                   <span className="sb-s">SCSE</span>
//                   <br/>
//                   <span className="sb-a">ARCHIVE</span>
//                 </div>
//                 <div className="sb-sub-row">
//                   <span className="sb-sub">CYBER WORLD</span>
//                   <span className="sb-divider">|</span>
//                   <span className="sb-sub">SELECTION</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── Description + data bars row ── */}
//           <div className="hero-info-row">
//             <div className="hir-left">
//               <p className="h-sub">
//                 Encrypted event frames from <span className="h-sub-hl">XAVENIR</span> &amp; <span className="h-sub-hl">SCSE</span> ops.
//                 Hover to decrypt details. Click to open a node.
//               </p>
//             </div>
//             <div className="hir-right">
//               <div className="data-bar">
//                 <span className="db-key">PARTICIPANTS</span>
//                 <div className="db-track"><div className="db-fill" style={{width:"82%"}}/></div>
//                 <span className="db-val">500+</span>
//               </div>
//               <div className="data-bar">
//                 <span className="db-key">PRIZE POOL</span>
//                 <div className="db-track"><div className="db-fill magenta" style={{width:"68%"}}/></div>
//                 <span className="db-val db-val-m">₹75K+</span>
//               </div>
//               <div className="data-bar">
//                 <span className="db-key">EVENTS</span>
//                 <div className="db-track"><div className="db-fill" style={{width:`${Math.min((count/16)*100,100)}%`}}/></div>
//                 <span className="db-val">{count || 16}</span>
//               </div>
//             </div>
//           </div>

//           {/* ── Scrolling ticker ── */}
//           <div className="hero-ticker">
//             <span className="ticker-prefix">// SYS.FEED</span>
//             <div className="ticker-track">
//               <div className="ticker-inner">
//                 {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
//                   <span key={i} className="ticker-item">
//                     <span className="ticker-dot">◆</span> {item}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//         </section>

//         {/* ── Grid section ── */}
//         <section className="gsec">
//           <div className="gh">
//             <div className="gh-corner"/>
//             <span className="ghl"/>
//             <span className="gh-lbl">// ACTIVE.EVENT.NODES</span>
//             <span className="ghl r"/>
//             <div className="gh-corner r"/>
//           </div>

//           {/* Search bar */}
//           <div className="ev-search-wrap">
//             <span className="ev-search-icon">⌕</span>
//             <input
//               className="ev-search-input"
//               type="text"
//               placeholder="SEARCH EVENTS..."
//               value={search}
//               onChange={e => setSearch(e.target.value)}
//             />
//             {search && (
//               <button className="ev-search-clear" onClick={() => setSearch("")}>✕</button>
//             )}
//           </div>


//           {/* ── All Filters — single row ── */}
// <div className="ev-filter-wrap">
//   <button
//     className={`ev-filter-btn${filter === "upcoming" ? " active-upcoming" : ""}`}
//     onClick={() => setFilter("upcoming")}
//   >
//     <span className="efb-dot upcoming" />
//     UPCOMING
//   </button>
//   <button
//     className={`ev-filter-btn${filter === "completed" ? " active-completed" : ""}`}
//     onClick={() => setFilter("completed")}
//   >
//     <span className="efb-dot completed" />
//     COMPLETED
//   </button>

//   <span className="efb-sep" />

//   {(["17","18","19"] as const).map(d => (
//     <button
//       key={d}
//       className={`ev-filter-btn${dateFilter === d ? " active-upcoming" : ""}`}
//       onClick={() => setDateFilter(prev => prev === d ? "all" : d)}
//     >
//       <span className="efb-dot" style={{background: dateFilter===d ? "#00fff0" : "rgba(200,220,255,.25)"}}/>
//       {`APR ${d}`}
//     </button>
//   ))}

//   <span className="efb-sep" />

//   {([
//     { key:"tech",     label:"⚙ TECH" },
//     { key:"cultural", label:"★ CULTURAL" },
//   ] as const).map(t => (
//     <button
//       key={t.key}
//       className={`ev-filter-btn${typeFilter === t.key ? (t.key==="cultural" ? " active-completed" : " active-upcoming") : ""}`}
//       onClick={() => setTypeFilter(prev => prev === t.key ? "all" : t.key)}
//     >
//       <span className="efb-dot" style={{background: typeFilter===t.key ? (t.key==="cultural" ? "#ff2d78" : "#00fff0") : "rgba(200,220,255,.25)"}}/>
//       {t.label}
//     </button>
//   ))}
// </div>

//           {/* ── Dynamic heading ── */}
//           {(() => {
//             const typePart = typeFilter === "tech" ? "TECH EVENTS" : typeFilter === "cultural" ? "CULTURAL EVENTS" : "ALL EVENTS";
//             const datePart = dateFilter !== "all" ? ` · APR ${dateFilter}` : "";
//             const color = typeFilter === "cultural" ? "#ff2d78" : "#00fff0";
//             return (
//               <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,marginBottom:28,textAlign:"center"}}>
//                 <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(1.8rem,4vw,3rem)",fontWeight:900,letterSpacing:"0.08em",color,textShadow:`0 0 30px ${color}55`,lineHeight:1}}>
//                   {typePart}
//                 </span>
//                 {datePart && (
//                   <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"clamp(1rem,2vw,1.4rem)",fontWeight:600,letterSpacing:"0.2em",color:"rgba(200,220,255,0.45)"}}>
//                     {datePart}
//                   </span>
//                 )}
//                 <span style={{fontFamily:"'Share Tech Mono',monospace",fontSize:"0.6rem",letterSpacing:"0.14em",color:"rgba(200,220,255,0.2)",marginTop:2}}>
//                   {filtered.length} NODE{filtered.length !== 1 ? "S" : ""} FOUND
//                 </span>
//               </div>
//             );
//           })()}

//           <div className="egrid">
//             {loading
//               ? Array.from({length:6}).map((_,i)=><SkeletonCard key={i}/>)
//               : error
//               ? <div className="serr">⚠ SYSTEM ERROR: {error}</div>
//               : filtered.length === 0
//               ? <div className="serr">// NO MATCHES FOUND</div>
//               : filtered.map((ev,i)=><EventCard key={ev._id} event={ev} index={i}/>)
//             }
//           </div>




//           {/* <div className="egrid">
//   <div className="coming-soon">
//     <div className="cs-icon">◎</div>
//     <h2 className="cs-title">EVENTS COMING SOON</h2>
//     <p className="cs-sub">// Encrypted event nodes are being prepared. Stand by.</p>
//     <div className="cs-bar"><div className="cs-bar-fill"/></div>
//   </div>
// </div> */}





//         </section>
//       </div>

//       <style>{`



// .ev-filter-wrap {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
//   margin-bottom: 24px;
//   align-items: center;
// }
// .efb-sep {
//   width: 1px;
//   height: 20px;
//   background: rgba(0,255,240,0.18);
//   flex-shrink: 0;
//   margin: 0 2px;
// }
// @media (min-width: 768px) {
//   .ev-filter-wrap { flex-wrap: nowrap; }
// }
// .ev-filter-btn {
//   display: flex;
//   align-items: center;
//   gap: 7px;
//   padding: 7px 18px;
//   background: rgba(0, 8, 26, 0.85);
//   border: 1px solid rgba(0, 255, 240, 0.15);
//   font-family: 'Share Tech Mono', monospace;
//   font-size: 0.7rem;
//   letter-spacing: 0.15em;
//   color: rgba(200, 220, 255, 0.4);
//   cursor: pointer;
//   transition: all 0.2s;
// }
// .ev-filter-btn:hover {
//   border-color: rgba(0, 255, 240, 0.4);
//   color: rgba(200, 220, 255, 0.75);
// }
// .efb-dot {
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   flex-shrink: 0;
// }
// .efb-dot.all      { background: rgba(200, 220, 255, 0.35); }
// .efb-dot.upcoming { background: #00fff0; }
// .efb-dot.completed{ background: #ff2d78; }

// /* Active states */
// .ev-filter-btn.active-all {
//   border-color: rgba(200, 220, 255, 0.45);
//   color: #fff;
//   background: rgba(200, 220, 255, 0.06);
// }
// .ev-filter-btn.active-upcoming {
//   border-color: #00fff0;
//   color: #00fff0;
//   background: rgba(0, 255, 240, 0.07);
//   box-shadow: 0 0 12px rgba(0, 255, 240, 0.1);
// }
// .ev-filter-btn.active-completed {
//   border-color: #ff2d78;
//   color: #ff2d78;
//   background: rgba(255, 45, 120, 0.07);
//   box-shadow: 0 0 12px rgba(255, 45, 120, 0.1);
// }

// //events coming soon styles

// .coming-soon{
//   grid-column:1/-1;
//   display:flex;flex-direction:column;align-items:center;justify-content:center;
//   padding:80px 20px;gap:18px;text-align:center;
// }
// .cs-icon{
//   font-size:3rem;color:rgba(0,255,240,.25);
//   animation:eyePulse2 2s ease infinite;
// }
// @keyframes eyePulse2{0%,100%{text-shadow:0 0 20px #00fff0;opacity:.4}50%{text-shadow:none;opacity:1}}
// .cs-title{
//   font-family:'Orbitron',sans-serif;font-size:clamp(1.4rem,3vw,2rem);
//   font-weight:900;letter-spacing:.2em;
//   color:#00fff0;text-shadow:0 0 28px rgba(0,255,240,.4),2px 2px 0px rgba(255,45,120,.2);
// }
// .cs-sub{
//   font-size:.78rem;letter-spacing:.14em;
//   color:rgba(200,220,255,.35);
// }
// .cs-bar{
//   width:280px;height:3px;
//   background:rgba(0,255,240,.08);border-radius:2px;overflow:hidden;margin-top:8px;
// }
// .cs-bar-fill{
//   height:100%;width:60%;
//   background:linear-gradient(90deg,#00fff0,#ff2d78);
//   animation:csFill 2.5s ease infinite alternate;
//   border-radius:2px;
// }
// @keyframes csFill{from{width:20%}to{width:85%}}





//         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

//         .root{
//           position:relative;min-height:100vh;
//           background:#060818;
//           font-family:'Share Tech Mono',monospace;
//           overflow-x:hidden;
//         }

//         /* ── Backgrounds ── */
//         .bg-city{
//           position:fixed;inset:0;
//           background:
//             linear-gradient(rgba(0,4,12,0.72) 0%, rgba(0,8,20,0.68) 100%),
//             url('/contact/cyberpunk-bg.jpeg') center top/cover;
//           opacity:1;pointer-events:none;z-index:0;
//         }
//         .bg-overlay{
//           position:fixed;inset:0;
//           background:linear-gradient(180deg,rgba(6,8,24,.8) 0%,rgba(6,8,24,.5) 40%,rgba(6,8,24,.92) 100%);
//           pointer-events:none;z-index:0;
//         }
//         .bg-grid{
//           position:fixed;inset:0;
//           background-image:
//             linear-gradient(rgba(0,255,240,.038) 1px,transparent 1px),
//             linear-gradient(90deg,rgba(0,255,240,.038) 1px,transparent 1px);
//           background-size:55px 55px;
//           pointer-events:none;z-index:0;
//         }
//         .bg-glow{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(140px)}
//         .bg-glow.c{width:700px;height:700px;top:-150px;left:-250px;background:#00fff0;opacity:.07}
//         .bg-glow.m{width:800px;height:800px;bottom:-250px;right:-250px;background:#ff2d78;opacity:.07}

//         /* ════════════════════════════════
//            HERO
//         ════════════════════════════════ */
//         /* ════════════════════════════════
//            HERO — proper spacing, no navbar overlap
//            Navbar assumed ~64px height, we clear it with padding-top
//         ════════════════════════════════ */
//         .hero{
//           position:relative;z-index:1;
//           padding: 28px 5vw 0;          /* 28px breathing room below navbar */
//           display:flex;flex-direction:column;gap:0;
//         }

//         /* ── Top strip ── */
//         .hero-topstrip{
//           display:flex;align-items:center;justify-content:space-between;
//           padding:7px 20px;
//           background:rgba(0,255,240,.035);
//           border:1px solid rgba(0,255,240,.12);
//           border-bottom:none;
//         }
//         .hts-left,.hts-right{display:flex;align-items:center;gap:10px;font-size:.72rem;letter-spacing:.14em}
//         .hts-dash{color:#ff2d78;font-size:1rem;margin-right:2px}
//         .hts-org{color:rgba(255,255,255,.85);font-weight:600}
//         .hts-dept{color:rgba(0,255,240,.7)}
//         .hts-sep{color:rgba(0,255,240,.28)}
//         .live-dot{
//           width:7px;height:7px;border-radius:50%;flex-shrink:0;
//           background:#00ff80;box-shadow:0 0 8px #00ff80;
//           animation:livePulse 1.5s ease infinite;
//         }
//         @keyframes livePulse{0%,100%{opacity:1;box-shadow:0 0 8px #00ff80}50%{opacity:.35;box-shadow:none}}
//         .live-txt{color:#00ff80;font-size:.68rem;letter-spacing:.1em}

//         /* ── Title block: title left, panels right, vertically centered ── */
//         .hero-title-block{
//           display:flex;
//           align-items:center;           /* panels sit at vertical center of title */
//           justify-content:space-between;
//           gap:32px;
//           border:1px solid rgba(0,255,240,.12);
//           border-bottom:none;
//           padding:32px 28px 32px 28px;
//           position:relative;
//           background:rgba(0,4,18,.25);
//           min-height:0;                 /* don't stretch unnecessarily */
//         }
//         .hero-title-block::before{
//           content:'';position:absolute;left:0;top:0;bottom:0;width:3px;
//           background:linear-gradient(180deg,#00fff0 0%,#ff2d78 60%,transparent 100%);
//         }

//         .htb-left{
//           position:relative;
//           flex:1;
//           min-width:0;                  /* allow shrink */
//         }
//         .htb-corner-tl{
//           position:absolute;top:-4px;left:-4px;
//           width:14px;height:14px;
//           border-top:2px solid #00fff0;border-left:2px solid #00fff0;
//         }
//         .h-title{
//           font-family:'Orbitron',sans-serif;
//           font-size:clamp(3rem,6.5vw,6.5rem);   /* slightly smaller so it fits comfortably */
//           font-weight:900;line-height:.92;
//           margin-bottom:14px;
//         }
// .ht-c{color:#00fff0;text-shadow:0 0 28px rgba(0,255,240,.6),0 0 70px rgba(0,255,240,.2),0 0 120px rgba(255,45,120,.15),2px 2px 0px rgba(255,45,120,.2)}        .ht-m{color:#ff2d78;text-shadow:0 0 28px rgba(255,45,120,.5),0 0 70px rgba(255,45,120,.15)}
//         .h-tagline{color:rgba(0,255,240,.32);font-size:.8rem;letter-spacing:.15em}

//         /* ── Right panels: side-by-side, not stacked ── */
//         .htb-right{
//           display:flex;
//           flex-direction:row;           /* OPS + SCSE side by side */
//           gap:16px;
//           flex-shrink:0;
//           align-items:stretch;
//         }

//         /* OPS panel */
//         .ops-panel{
//           border:1px solid rgba(0,255,240,.2);
//           background:rgba(0,8,26,.88);
//           overflow:hidden;
//           width:220px;
//           flex-shrink:0;
//         }
//         .ops-panel-bar{
//           display:flex;align-items:center;gap:8px;
//           padding:5px 12px;
//           background:rgba(0,255,240,.06);
//           border-bottom:1px solid rgba(0,255,240,.12);
//           font-size:.6rem;
//         }
//         .ops-buf{color:#00fff0;letter-spacing:.1em;flex:1}
//         .ops-bars{display:flex;gap:3px}
//         .ops-bars b{display:block;width:8px;height:7px;background:rgba(0,255,240,.4);clip-path:polygon(0 0,100% 0,100% 55%,0 55%)}
//         .ops-body{padding:12px 14px}
//         .ops-l{font-size:.78rem;color:rgba(200,220,255,.6);margin-bottom:5px;letter-spacing:.04em}
//         .ok{color:#00fff0;font-weight:600}
//         .ops-div{height:1px;background:rgba(0,255,240,.12);margin:10px 0}
//         .ops-stats{display:flex;gap:18px}
//         .ops-stat{display:flex;flex-direction:column;gap:2px}
//         .sn{font-family:'Orbitron',sans-serif;font-size:1.9rem;font-weight:700;display:block;line-height:1}
//         .sn.c{color:#00fff0;text-shadow:0 0 12px rgba(0,255,240,.5)}
//         .sn.m{color:#ff2d78;text-shadow:0 0 12px rgba(255,45,120,.5)}
//         .sl{font-size:.56rem;letter-spacing:.13em;color:rgba(200,220,255,.32);display:block;margin-top:3px}

//         /* SCSE badge */
//         .scse-b{
//           border:2px solid #00fff0;
//           box-shadow:0 0 20px rgba(0,255,240,.12),inset 0 0 20px rgba(0,255,240,.03);
//           overflow:hidden;
//           width:210px;
//           flex-shrink:0;
//           display:flex;flex-direction:column;
//         }
//         .scse-b-topbar{
//           display:flex;align-items:center;justify-content:space-between;
//           padding:5px 12px;
//           background:rgba(0,255,240,.06);
//           border-bottom:1px solid rgba(0,255,240,.14);
//           font-size:.56rem;
//         }
//         .sb-buf{color:#00fff0;letter-spacing:.1em}
//         .sb-status{color:rgba(200,220,255,.38);letter-spacing:.08em}
//         .sb-main-row{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:10px 14px 4px;flex:1;gap:2px;}
//         .sb-s{font-family:'Orbitron',sans-serif;font-size:1.8rem;font-weight:900;color:#00fff0;text-shadow:0 0 18px rgba(0,255,240,.55)}
//         .sb-a{font-family:'Orbitron',sans-serif;font-size:1.8rem;font-weight:900;color:#ff2d78;text-shadow:0 0 18px rgba(255,45,120,.55)}
//         .sb-sub-row{
//           display:flex;align-items:center;gap:8px;
//           padding:2px 14px 10px;
//         }
//         .sb-sub{font-size:.58rem;letter-spacing:.12em;color:rgba(200,220,255,.32)}
//         .sb-divider{color:rgba(0,255,240,.22);font-size:.65rem}

//         /* ── Info row ── */
//         .hero-info-row{
//           display:flex;align-items:center;justify-content:space-between;gap:40px;
//           border:1px solid rgba(0,255,240,.12);
//           border-bottom:none;
//           padding:18px 28px;
//           background:rgba(0,2,12,.35);
//         }
//         .hir-left{flex:1;max-width:500px}
//         .h-sub{font-size:.86rem;color:rgba(200,220,255,.5);line-height:1.75}
//         .h-sub-hl{color:#00fff0;font-weight:600}
//         .hir-right{display:flex;flex-direction:column;gap:9px;flex-shrink:0;min-width:270px}
//         .data-bar{display:flex;align-items:center;gap:10px;font-size:.64rem;letter-spacing:.1em}
//         .db-key{color:rgba(0,255,240,.42);min-width:96px}
//         .db-track{flex:1;height:3px;background:rgba(0,255,240,.08);border-radius:2px;overflow:hidden}
//         .db-fill{height:100%;background:linear-gradient(90deg,#00fff0,rgba(0,255,240,.35));border-radius:2px}
//         .db-fill.magenta{background:linear-gradient(90deg,#ff2d78,rgba(255,45,120,.35))}
//         .db-val{color:#00fff0;font-family:'Orbitron',sans-serif;font-size:.72rem;font-weight:700;min-width:44px;text-align:right}
//         .db-val-m{color:#ff2d78}

//         /* ── Ticker ── */
//         .hero-ticker{
//           display:flex;align-items:center;
//           border:1px solid rgba(0,255,240,.12);
//           overflow:hidden;
//           background:rgba(0,4,16,.55);
//         }
//         .ticker-prefix{
//           flex-shrink:0;padding:8px 16px;
//           background:rgba(0,255,240,.08);
//           border-right:1px solid rgba(0,255,240,.14);
//           color:#00fff0;font-size:.63rem;letter-spacing:.14em;white-space:nowrap;
//         }
//         .ticker-track{flex:1;overflow:hidden;padding:0 8px}
//         .ticker-inner{
//           display:flex;animation:tickerScroll 32s linear infinite;white-space:nowrap;
//         }
//         @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
//         .ticker-item{
//           display:inline-flex;align-items:center;gap:8px;
//           padding:8px 22px;font-size:.63rem;letter-spacing:.11em;
//           color:rgba(200,220,255,.48);white-space:nowrap;
//         }
//         .ticker-dot{font-size:.42rem}
//         .ticker-item:nth-child(odd) .ticker-dot{color:#00fff0}
//         .ticker-item:nth-child(even) .ticker-dot{color:#ff2d78}

//         /* ── Grid section ── */
//         .gsec{position:relative;z-index:1;padding:40px 5vw 80px}
//         .gh{display:flex;align-items:center;gap:10px;margin-bottom:28px}
//         .gh-corner{width:10px;height:10px;border-top:2px solid #00fff0;border-left:2px solid #00fff0;flex-shrink:0}
//         .gh-corner.r{border-top:2px solid #00fff0;border-right:2px solid #00fff0;border-left:none}
//         .ghl{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(0,255,240,.28))}
//         .ghl.r{background:linear-gradient(90deg,rgba(0,255,240,.28),transparent)}
//         .gh-lbl{font-family:'Orbitron',sans-serif;font-size:.7rem;letter-spacing:.2em;color:rgba(0,255,240,.5);white-space:nowrap;padding:0 4px}

//         /* Strict 3-column */
//         .egrid{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
//         @media(max-width:1100px){.egrid{grid-template-columns:repeat(2,1fr)}}
//         @media(max-width:580px){.egrid{grid-template-columns:1fr}}

//         /* Search bar */
//         .ev-search-wrap{display:flex;align-items:center;gap:10px;margin-bottom:24px;background:rgba(0,8,26,.85);border:1px solid rgba(0,255,240,.2);padding:8px 14px;position:relative}
//         .ev-search-wrap:focus-within{border-color:rgba(0,255,240,.55);box-shadow:0 0 14px rgba(0,255,240,.1)}
//         .ev-search-icon{color:rgba(0,255,240,.5);font-size:1.1rem;flex-shrink:0}
//         .ev-search-input{flex:1;background:transparent;border:none;outline:none;font-family:'Share Tech Mono',monospace;font-size:.78rem;letter-spacing:.1em;color:#e0e8ff;caret-color:#00fff0}
//         .ev-search-input::placeholder{color:rgba(0,255,240,.25);letter-spacing:.15em}
//         .ev-search-clear{background:transparent;border:none;color:rgba(255,45,120,.6);cursor:pointer;font-size:.8rem;padding:2px 6px;transition:color .2s}
//         .ev-search-clear:hover{color:#ff2d78}
//         @media(max-width:960px){
//           .hero-title-block{flex-direction:column;align-items:flex-start;padding:24px 20px}
//           .htb-right{flex-direction:column;width:100%}
//           .ops-panel,.scse-b{width:100%}
//           .hero-info-row{flex-direction:column;align-items:flex-start;padding:16px 20px}
//           .hts-right{display:none}
//         }

//         .serr{grid-column:1/-1;font-family:'Orbitron',sans-serif;font-size:.82rem;letter-spacing:.12em;color:#ff2d78;text-align:center;padding:60px 0}
//       `}</style>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Event {
  _id: string;
  name: string;
  description: string;
  logo: string;
  prizepool: number;
  regFees: number;
  more: string;
  rules: string;
  minPart: number;
  maxPart: number;
  eventDate?: string;
  isTechEvent?: boolean;
}

const toPath = (name: string) => encodeURIComponent(name);

/* ── Extract time from "more" field ── */
const extractTime = (more: string): string | null => {
  if (!more) return null;
  const match = more.match(/\b(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)|\d{2}:\d{2})\b/);
  return match ? match[0].toUpperCase() : null;
};

const fakeHex = () =>
  "0x" + Math.floor(Math.random() * 0xffffffff).toString(16).toUpperCase().padStart(8, "0");

const formatDayMonth = (date: any) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase();
};

/* ── Event Card ── */
function EventCard({ event, index, showTime = true }: { event: Event; index: number; showTime?: boolean }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => router.push(`/eventDetails/${toPath(event.name)}`);
  const eventTime = extractTime(event.more);

  return (
    <div
      className={`ev-card${hovered ? " hov" : ""}`}
      style={{ animationDelay: `${index * 0.09}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="ec-img-wrap">
        {event.logo
          ? <img src={event.logo} alt={event.name} className="ec-img" />
          : <div className="ec-img-ph"><span>⬡</span></div>
        }
        <div className="ec-scanlines" />
        {/* LARGE DATE BADGE */}
        <div className="ec-date-badge">{formatDayMonth(event.eventDate)}{event.name === "AI ML Hackathon" && " - Presentation"}</div>
        
      </div>

      {/* Title bar */}
      <div className="ec-title-bar">
        <span className="ec-name">{event.name}</span>
      </div>

      {/* Body */}
      <div className="ec-body">
        <div className="ec-prize-row">
          <span className="ec-prize-lbl">Prize Pool:</span>
          <span className="ec-prize-val">₹{event.prizepool?.toLocaleString("en-IN")}</span>
        </div>

        <div className="ec-team-row">
          <span className="ec-team-lbl">Team Size:</span>
          <span className="ec-team-val">
            {event.minPart === event.maxPart
              ? `${event.minPart} participant${event.minPart !== 1 ? "s" : ""}`
              : `${event.minPart} to ${event.maxPart} participants`}
          </span>
        </div>

        {showTime && eventTime && (
          <div className="ec-time-row">
            <span className="ec-time-lbl">Time:</span>
            <span className="ec-time-val">{eventTime}</span>
          </div>
        )}
      </div>

      {/* Button */}
      <button className="ec-btn" onClick={handleClick}>
        Get Details
      </button>

      <style>{`
        .ev-card{
          display:flex;flex-direction:column;
          background:rgba(10,14,40,0.92);
          border:1.5px solid rgba(0,255,240,0.22);
          border-radius:12px;
          overflow:hidden;
          cursor:pointer;
          animation:cIn .55s ease both;
          transition:transform .25s, border-color .25s, box-shadow .25s;
          box-shadow: 0 4px 28px rgba(0,0,0,0.5);
        }
        .ev-card:hover{
          transform:translateY(-7px);
          border-color:rgba(0,255,240,0.55);
          box-shadow: 0 8px 48px rgba(0,255,240,0.13), 0 0 0 1px rgba(0,255,240,0.15);
        }
        @keyframes cIn{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}

        .ec-img-wrap{
          position:relative;overflow:hidden;
          aspect-ratio:16/10;
          background:#050012;
        }
        .ec-img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.88) saturate(1.1);transition:transform .45s,filter .3s}
        .ev-card:hover .ec-img{transform:scale(1.06);filter:brightness(1) saturate(1.25)}
        .ec-img-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3.5rem;color:rgba(0,255,240,.15);background:linear-gradient(135deg,rgba(0,255,240,0.15),rgba(0,8,26,0.9))}
        .ec-scanlines{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,240,.015) 2px,rgba(0,255,240,.015) 4px);pointer-events:none}

        /* BIG DATE BADGE */
        .ec-date-badge{
          position:absolute;top:12px;right:12px;
          font-family:'Orbitron',sans-serif;
          font-size:1rem;
          font-weight:800;
          letter-spacing:.18em;
          color:#060818;
          background:linear-gradient(135deg,#00fff0,#00d4c8);
          padding:7px 16px;
          border-radius:24px;
          z-index:2;
          box-shadow:0 0 18px rgba(0,255,240,0.6), 0 2px 8px rgba(0,0,0,0.4);
          text-shadow: none;
        }

        /* TITLE BAR */
        .ec-title-bar{
          background:linear-gradient(90deg,#0a1a3a,#0d2040);
          border-top:2px solid #00fff0;
          padding:13px 18px;
        }
        .ec-name{
          font-family:'Orbitron',sans-serif;
          font-size:1.15rem;
          font-weight:700;
          color:#00fff0;
          letter-spacing:.03em;
          line-height:1.3;
          display:block;
          text-shadow: 0 0 14px rgba(0,255,240,0.4);
        }

        /* BODY */
        .ec-body{
          padding:16px 18px 6px;
          display:flex;flex-direction:column;gap:11px;
          flex:1;
          background:rgba(4,10,30,0.96);
        }

        .ec-prize-row,.ec-team-row,.ec-time-row{
          display:flex;align-items:center;gap:8px;
          background:rgba(0,255,240,0.05);
          border:1px solid rgba(0,255,240,0.15);
          border-radius:7px;
          padding:9px 14px;
          font-family:'Share Tech Mono',monospace;
          font-size:.88rem;
        }
        .ec-prize-lbl{color:#00fff0;font-weight:600;letter-spacing:.05em}
        .ec-prize-val{color:#fff;font-weight:700;margin-left:auto;font-size:.9rem}
        .ec-team-lbl{color:#00d4c8;font-weight:600;letter-spacing:.05em}
        .ec-team-val{color:rgba(200,240,255,.85);margin-left:auto;font-size:.84rem}
        .ec-time-lbl{color:#00fff0;font-weight:600;letter-spacing:.05em}
        .ec-time-val{color:rgba(200,240,255,.85);margin-left:auto;font-size:.84rem}

        /* BUTTON */
        .ec-btn{
          margin:16px 18px 18px;
          padding:13px 0;
          background:linear-gradient(90deg,#00d4c8,#00fff0,#00b8b0);
          border:none;border-radius:7px;
          font-family:'Orbitron',sans-serif;font-size:.85rem;font-weight:800;
          letter-spacing:.14em;color:#060818;cursor:pointer;
          transition:opacity .2s, transform .15s, box-shadow .2s;
          box-shadow: 0 4px 16px rgba(0,255,240,0.3);
        }
        .ec-btn:hover{opacity:.9;transform:scale(1.02);box-shadow:0 6px 24px rgba(0,255,240,0.5)}
      `}</style>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div style={{display:"flex",flexDirection:"column",opacity:.4,animation:"skP 1.5s ease infinite",borderRadius:"12px",overflow:"hidden",border:"1.5px solid rgba(0,255,240,.1)"}}>
      <div style={{aspectRatio:"16/10",background:"rgba(0,255,240,.05)"}}/>
      <div style={{height:50,background:"rgba(0,8,26,.8)",borderTop:"2px solid rgba(0,255,240,.3)"}}/>
      <div style={{padding:"16px 18px",display:"flex",flexDirection:"column",gap:11,background:"rgba(4,10,30,.96)"}}>
        <div style={{height:38,background:"rgba(0,255,240,.06)",borderRadius:7}}/>
        <div style={{height:38,background:"rgba(0,255,240,.04)",borderRadius:7}}/>
      </div>
      <div style={{margin:"16px 18px 18px",height:44,background:"rgba(0,255,240,.15)",borderRadius:7}}/>
      <style>{`@keyframes skP{0%,100%{opacity:.25}50%{opacity:.5}}`}</style>
    </div>
  );
}

/* ── Section header ── */
function SectionHeader({ label, color = "#00fff0" }: { label: string; color?: string }) {
  return (
    <div className="sec-head">
      <div className="sh-corner" style={{borderColor:color}}/>
      <span className="sh-line" style={{background:`linear-gradient(90deg,transparent,${color}44)`}}/>
      <span className="sh-lbl" style={{color,textShadow:`0 0 20px ${color}55`}}>{label}</span>
      <span className="sh-line r" style={{background:`linear-gradient(90deg,${color}44,transparent)`}}/>
      <div className="sh-corner r" style={{borderColor:color}}/>
      <style>{`
        .sec-head{display:flex;align-items:center;gap:12px;margin-bottom:28px;margin-top:8px}
        .sh-corner{width:14px;height:14px;border-top:2px solid;border-left:2px solid;flex-shrink:0}
        .sh-corner.r{border-top:2px solid;border-right:2px solid;border-left:none}
        .sh-line{flex:1;height:1px}
        .sh-line.r{flex:1}
        .sh-lbl{font-family:'Orbitron',sans-serif;font-size:.85rem;letter-spacing:.22em;white-space:nowrap;padding:0 8px;font-weight:700}
      `}</style>
    </div>
  );
}

/* ── Ticker items ── */
const TICKER_ITEMS = [
  "XAVENIR 2026", "NIT JAMSHEDPUR", "SCSE OPS ACTIVE",
  "16 EVENTS LIVE", "APR 17-19", "CYBER WORLD", "CODE // CREATE // CONQUER",
  "REGISTER NOW", "PRIZE POOL ₹75K+", "500+ PARTICIPANTS",
];

/* ── Page ── */
export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api/events")
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(d => {
        const arr = Array.isArray(d) ? d : d.events ?? [];
        setEvents(arr);
        setCount(arr.length);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const today = new Date(); today.setHours(0, 0, 0, 0);

  const ongoingEvents = events.filter(e => e.name === "Social Media Challenge");

  const getDateEvents = (day: number) =>
    events.filter(e => {
      if (!e.eventDate) return false;
      const d = new Date(e.eventDate);
      return d.getDate() === day && d.getMonth() === 3;
    }).filter(e => e.name !== "Social Media Challenge");

  const apr17 = getDateEvents(17);
  const apr18 = getDateEvents(18);
  const apr19 = getDateEvents(19);

  const completedEvents = events.filter(e => {
    if (!e.eventDate) return false;
    return new Date(e.eventDate) < today && e.name !== "Social Media Challenge";
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet"/>

      <div className="root">
        {/* Backgrounds */}
        <div className="bg-city"/>
        <div className="bg-overlay"/>
        <div className="bg-grid"/>
        <div className="bg-glow c"/>
        <div className="bg-glow m"/>

        {/* HERO */}
        <section className="hero">
          <div className="hero-topstrip">
            <div className="hts-left">
              <span className="hts-dash">—</span>
              <span className="hts-org">NIT JAMSHEDPUR</span>
              <span className="hts-sep">//</span>
              <span className="hts-dept">CSE</span>
              <span className="hts-sep">//</span>
              <span className="hts-dept">XAVENIR</span>
            </div>
            <div className="hts-right">
              <span className="live-dot"/>
              <span className="live-txt">SYSTEM ONLINE</span>
              <span className="hts-sep">//</span>
              <span className="hts-dept">APR 17-19, 2026</span>
            </div>
          </div>

          <div className="hero-title-block">
            <div className="htb-left">
              <div className="htb-corner-tl"/>
              <h1 className="h-title">
                <span className="ht-c">EVENTS</span>
              </h1>
              <p className="h-tagline">// events.archive()</p>
            </div>
            <div className="htb-right">
              <div className="ops-panel">
                <div className="ops-panel-bar">
                  <span className="ops-buf">OPS.CONSOLE</span>
                  <span className="ops-bars"><b/><b/><b/></span>
                </div>
                <div className="ops-body">
                  <p className="ops-l"><span className="ok">APR 17</span> // DAY ONE</p>
                  <p className="ops-l"><span className="ok">APR 18</span> // DAY TWO</p>
                  <p className="ops-l"><span className="ok">APR 19</span> // DAY THREE</p>
                  <div className="ops-div"/>
                  <div className="ops-stats">
                    <div className="ops-stat">
                      <span className="sn c">{count || "—"}</span>
                      <span className="sl">TOTAL EVENTS</span>
                    </div>
                    <div className="ops-stat">
                      <span className="sn m">₹75K+</span>
                      <span className="sl">PRIZE POOL</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scse-b">
                <div className="scse-b-topbar">
                  <span className="sb-buf">SCSE.NODE</span>
                  <span className="sb-status">EVENTS // READY</span>
                </div>
                <div className="sb-main-row">
                  <span className="sb-s">SCSE</span>
                  <br/>
                  <span className="sb-a">ARCHIVE</span>
                </div>
                <div className="sb-sub-row">
                  <span className="sb-sub">CYBER WORLD</span>
                  <span className="sb-divider">|</span>
                  <span className="sb-sub">SELECTION</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-info-row">
            <div className="hir-left">
              <p className="h-sub">
                Encrypted event frames from <span className="h-sub-hl">XAVENIR</span> &amp; <span className="h-sub-hl">SCSE</span> ops.
                Click any event to open its node.
              </p>
            </div>
            <div className="hir-right">
              <div className="data-bar">
                <span className="db-key">PARTICIPANTS</span>
                <div className="db-track"><div className="db-fill" style={{width:"82%"}}/></div>
                <span className="db-val">500+</span>
              </div>
              <div className="data-bar">
                <span className="db-key">PRIZE POOL</span>
                <div className="db-track"><div className="db-fill cyan2" style={{width:"68%"}}/></div>
                <span className="db-val db-val-c2">₹75K+</span>
              </div>
              <div className="data-bar">
                <span className="db-key">EVENTS</span>
                <div className="db-track"><div className="db-fill" style={{width:`${Math.min((count/16)*100,100)}%`}}/></div>
                <span className="db-val">{count || 16}</span>
              </div>
            </div>
          </div>

          <div className="hero-ticker">
            <span className="ticker-prefix">// SYS.FEED</span>
            <div className="ticker-track">
              <div className="ticker-inner">
                {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                  <span key={i} className="ticker-item">
                    <span className="ticker-dot">◆</span> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Events Grid Section ── */}
        <section className="gsec">

          {loading ? (
            <>
              <SectionHeader label="// LOADING EVENTS..." color="#00fff0" />
              <div className="egrid">
                {Array.from({length:6}).map((_,i)=><SkeletonCard key={i}/>)}
              </div>
            </>
          ) : error ? (
            <div className="serr">⚠ SYSTEM ERROR: {error}</div>
          ) : (
            <>
              {/* ── ONGOING ── */}
              {ongoingEvents.length > 0 && (
  <div className="ev-section">
    {/* CENTERED HEADER (same style as APR 17) */}
    <div className="ev-day-header">
      <span className="edh-tag ongoing-tag flex items-center gap-2">
  <span className="text-green-400 font-semibold">LIVE</span>
</span>
      <h2 className="edh-title">Ongoing Events</h2>
      <span className="edh-sub">Happening Right Now</span>
    </div>

    {/* <SectionHeader label="// ONGOING // EVENT.NODES" color="#00ff80" /> */}

    <div className="egrid">
      {ongoingEvents.map((ev, i) => (
        <EventCard
          key={ev._id}
          event={ev}
          index={i}
          showTime={false}
        />
      ))}
    </div>
  </div>
)}

              {/* ── APRIL 17 ── */}
              {apr17.length > 0 && (
                <div className="ev-section">
                  {/* CENTERED DAY HEADER */}
                  <div className="ev-day-header">
                    <span className="edh-tag apr17-tag">APR 17</span>
                    <h2 className="edh-title">Xavenir Main Events</h2>
                    <span className="edh-sub">Day One — April 17, 2026</span>
                  </div>
                  <SectionHeader label="// APR.17 // EVENT.NODES" color="#00fff0" />
                  <div className="egrid">
                    {apr17.map((ev, i) => <EventCard key={ev._id} event={ev} index={i} />)}
                  </div>
                </div>
              )}

              {/* ── APRIL 18 ── */}
              {apr18.length > 0 && (
                <div className="ev-section">
                  <div className="ev-day-header">
                    <span className="edh-tag apr18-tag">APR 18</span>
                    <h2 className="edh-title">Xavenir Main Events</h2>
                    <span className="edh-sub">Day Two — April 18, 2026</span>
                  </div>
                  <SectionHeader label="// APR.18 // EVENT.NODES" color="#00d4ff" />
                  <div className="egrid">
                    {apr18.map((ev, i) => <EventCard key={ev._id} event={ev} index={i} />)}
                  </div>
                </div>
              )}

              {/* ── APRIL 19 ── */}
              {apr19.length > 0 && (
                <div className="ev-section">
                  <div className="ev-day-header">
                    <span className="edh-tag apr19-tag">APR 19</span>
                    <h2 className="edh-title">Xavenir Main Events</h2>
                    <span className="edh-sub">Day Three — April 19, 2026</span>
                  </div>
                  <SectionHeader label="// APR.19 // EVENT.NODES" color="#00ffcc" />
                  <div className="egrid">
                    {apr19.map((ev, i) => <EventCard key={ev._id} event={ev} index={i} />)}
                  </div>
                </div>
              )}

              {/* ── COMPLETED ── */}
              {completedEvents.length > 0 && (
                <div className="ev-section">
                  <div className="ev-day-header">
                    <span className="edh-tag" style={{background:"rgba(0,255,240,0.1)",color:"rgba(0,255,240,0.5)",border:"1px solid rgba(0,255,240,0.2)"}}>DONE</span>
                    <h2 className="edh-title" style={{color:"rgba(0,255,240,0.4)"}}>Completed Events</h2>
                    <span className="edh-sub">Events that have concluded</span>
                  </div>
                  <SectionHeader label="// COMPLETED.EVENT.NODES" color="rgba(0,255,240,0.3)" />
                  <div className="egrid ev-completed-grid">
                    {completedEvents.map((ev, i) => <EventCard key={ev._id} event={ev} index={i} />)}
                  </div>
                </div>
              )}

              {ongoingEvents.length === 0 && apr17.length === 0 && apr18.length === 0 && apr19.length === 0 && completedEvents.length === 0 && (
                <div className="serr">// NO EVENTS FOUND</div>
              )}
            </>
          )}
        </section>
      </div>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        .root{position:relative;min-height:100vh;background:#060818;font-family:'Share Tech Mono',monospace;overflow-x:hidden}

        /* Backgrounds */
        .bg-city{position:fixed;inset:0;background:linear-gradient(rgba(0,4,12,0.72) 0%,rgba(0,8,20,0.68) 100%),url('/contact/cyberpunk-bg.jpeg') center top/cover;opacity:1;pointer-events:none;z-index:0}
        .bg-overlay{position:fixed;inset:0;background:linear-gradient(180deg,rgba(6,8,24,.8) 0%,rgba(6,8,24,.5) 40%,rgba(6,8,24,.92) 100%);pointer-events:none;z-index:0}
        .bg-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(0,255,240,.038) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,240,.038) 1px,transparent 1px);background-size:55px 55px;pointer-events:none;z-index:0}
        .bg-glow{position:fixed;border-radius:50%;pointer-events:none;z-index:0;filter:blur(140px)}
        .bg-glow.c{width:700px;height:700px;top:-150px;left:-250px;background:#00fff0;opacity:.07}
        .bg-glow.m{width:800px;height:800px;bottom:-250px;right:-250px;background:#00d4ff;opacity:.06}

        /* Hero */
        .hero{position:relative;z-index:1;padding:28px 5vw 0;display:flex;flex-direction:column;gap:0}
        .hero-topstrip{display:flex;align-items:center;justify-content:space-between;padding:8px 22px;background:rgba(0,255,240,.04);border:1px solid rgba(0,255,240,.14);border-bottom:none}
        .hts-left,.hts-right{display:flex;align-items:center;gap:10px;font-size:.8rem;letter-spacing:.14em}
        .hts-dash{color:#00fff0;font-size:1rem;margin-right:2px}
        .hts-org{color:rgba(255,255,255,.9);font-weight:600}
        .hts-dept{color:rgba(0,255,240,.75)}
        .hts-sep{color:rgba(0,255,240,.3)}
        .live-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#00fff0;box-shadow:0 0 10px #00fff0;animation:livePulse 1.5s ease infinite}
        @keyframes livePulse{0%,100%{opacity:1;box-shadow:0 0 10px #00fff0}50%{opacity:.35;box-shadow:none}}
        .live-txt{color:#00fff0;font-size:.75rem;letter-spacing:.1em}

        .hero-title-block{display:flex;align-items:center;justify-content:space-between;gap:32px;border:1px solid rgba(0,255,240,.14);border-bottom:none;padding:36px 30px;position:relative;background:rgba(0,4,18,.3);min-height:0}
        .hero-title-block::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,#00fff0 0%,#00d4ff 60%,transparent 100%)}
        .htb-left{position:relative;flex:1;min-width:0}
        .htb-corner-tl{position:absolute;top:-4px;left:-4px;width:16px;height:16px;border-top:2px solid #00fff0;border-left:2px solid #00fff0}
        .h-title{font-family:'Orbitron',sans-serif;font-size:clamp(3rem,6.5vw,6.5rem);font-weight:900;line-height:.92;margin-bottom:16px}
        .ht-c{color:#00fff0;text-shadow:0 0 28px rgba(0,255,240,.7),0 0 70px rgba(0,255,240,.3),0 0 120px rgba(0,212,255,.2),2px 2px 0px rgba(0,180,200,.25)}
        .h-tagline{color:rgba(0,255,240,.38);font-size:.9rem;letter-spacing:.15em}

        .htb-right{display:flex;flex-direction:row;gap:16px;flex-shrink:0;align-items:stretch}
        .ops-panel{border:1px solid rgba(0,255,240,.22);background:rgba(0,8,26,.9);overflow:hidden;width:230px;flex-shrink:0}
        .ops-panel-bar{display:flex;align-items:center;gap:8px;padding:6px 14px;background:rgba(0,255,240,.07);border-bottom:1px solid rgba(0,255,240,.14);font-size:.68rem}
        .ops-buf{color:#00fff0;letter-spacing:.1em;flex:1}
        .ops-bars{display:flex;gap:3px}
        .ops-bars b{display:block;width:9px;height:8px;background:rgba(0,255,240,.4);clip-path:polygon(0 0,100% 0,100% 55%,0 55%)}
        .ops-body{padding:14px 16px}
        .ops-l{font-size:.85rem;color:rgba(200,240,255,.6);margin-bottom:6px;letter-spacing:.04em}
        .ok{color:#00fff0;font-weight:600}
        .ops-div{height:1px;background:rgba(0,255,240,.14);margin:12px 0}
        .ops-stats{display:flex;gap:18px}
        .ops-stat{display:flex;flex-direction:column;gap:2px}
        .sn{font-family:'Orbitron',sans-serif;font-size:2rem;font-weight:700;display:block;line-height:1}
        .sn.c{color:#00fff0;text-shadow:0 0 14px rgba(0,255,240,.5)}
        .sn.m{color:#00d4ff;text-shadow:0 0 14px rgba(0,212,255,.5);font-size:1.5rem}
        .sl{font-size:.6rem;letter-spacing:.13em;color:rgba(200,240,255,.35);display:block;margin-top:4px}

        .scse-b{border:2px solid #00fff0;box-shadow:0 0 24px rgba(0,255,240,.14),inset 0 0 20px rgba(0,255,240,.04);overflow:hidden;width:220px;flex-shrink:0;display:flex;flex-direction:column}
        .scse-b-topbar{display:flex;align-items:center;justify-content:space-between;padding:6px 14px;background:rgba(0,255,240,.07);border-bottom:1px solid rgba(0,255,240,.16);font-size:.62rem}
        .sb-buf{color:#00fff0;letter-spacing:.1em}
        .sb-status{color:rgba(200,240,255,.4);letter-spacing:.08em}
        .sb-main-row{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:10px 14px 4px;flex:1;gap:2px}
        .sb-s{font-family:'Orbitron',sans-serif;font-size:1.9rem;font-weight:900;color:#00fff0;text-shadow:0 0 20px rgba(0,255,240,.6)}
        .sb-a{font-family:'Orbitron',sans-serif;font-size:1.9rem;font-weight:900;color:#00d4ff;text-shadow:0 0 20px rgba(0,212,255,.6)}
        .sb-sub-row{display:flex;align-items:center;gap:8px;padding:2px 14px 10px}
        .sb-sub{font-size:.62rem;letter-spacing:.12em;color:rgba(200,240,255,.35)}
        .sb-divider{color:rgba(0,255,240,.25);font-size:.7rem}

        .hero-info-row{display:flex;align-items:center;justify-content:space-between;gap:40px;border:1px solid rgba(0,255,240,.14);border-bottom:none;padding:20px 30px;background:rgba(0,2,12,.35)}
        .hir-left{flex:1;max-width:520px}
        .h-sub{font-size:.95rem;color:rgba(200,240,255,.55);line-height:1.75}
        .h-sub-hl{color:#00fff0;font-weight:700}
        .hir-right{display:flex;flex-direction:column;gap:10px;flex-shrink:0;min-width:280px}
        .data-bar{display:flex;align-items:center;gap:10px;font-size:.7rem;letter-spacing:.1em}
        .db-key{color:rgba(0,255,240,.45);min-width:100px}
        .db-track{flex:1;height:3px;background:rgba(0,255,240,.08);border-radius:2px;overflow:hidden}
        .db-fill{height:100%;background:linear-gradient(90deg,#00fff0,rgba(0,255,240,.35));border-radius:2px}
        .db-fill.cyan2{background:linear-gradient(90deg,#00d4ff,rgba(0,212,255,.35))}
        .db-val{color:#00fff0;font-family:'Orbitron',sans-serif;font-size:.78rem;font-weight:700;min-width:46px;text-align:right}
        .db-val-c2{color:#00d4ff}

        .hero-ticker{display:flex;align-items:center;border:1px solid rgba(0,255,240,.14);overflow:hidden;background:rgba(0,4,16,.6)}
        .ticker-prefix{flex-shrink:0;padding:10px 18px;background:rgba(0,255,240,.08);border-right:1px solid rgba(0,255,240,.16);color:#00fff0;font-size:.7rem;letter-spacing:.14em;white-space:nowrap}
        .ticker-track{flex:1;overflow:hidden;padding:0 8px}
        .ticker-inner{display:flex;animation:tickerScroll 32s linear infinite;white-space:nowrap}
        @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .ticker-item{display:inline-flex;align-items:center;gap:8px;padding:10px 24px;font-size:.7rem;letter-spacing:.11em;color:rgba(200,240,255,.5);white-space:nowrap}
        .ticker-dot{font-size:.44rem}
        .ticker-item:nth-child(odd) .ticker-dot{color:#00fff0}
        .ticker-item:nth-child(even) .ticker-dot{color:#00d4ff}

        /* Grid section */
        .gsec{position:relative;z-index:1;padding:44px 5vw 90px}

        /* ── DAY HEADER — CENTERED ── */
        .ev-section{margin-bottom:64px}
        .ev-day-header{
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          gap:10px;
          margin-bottom:24px;
          padding:24px 30px;
          background:rgba(0,255,240,0.04);
          border:1px solid rgba(0,255,240,0.15);
          border-radius:10px;
          position:relative;
        }
        .ev-day-header::before{
          content:'';
          position:absolute;
          inset:0;
          border-radius:10px;
          background:linear-gradient(135deg,rgba(0,255,240,0.04) 0%,transparent 60%);
          pointer-events:none;
        }

        /* DATE TAG — LARGE & PROMINENT */
        .edh-tag{
          font-family:'Orbitron',sans-serif;
          font-size:1.1rem;
          font-weight:900;
          letter-spacing:.2em;
          padding:8px 24px;
          border-radius:30px;
          display:inline-block;
        }
        .apr17-tag{
          color:#060818;
          background:linear-gradient(135deg,#00fff0,#00d4c8);
          box-shadow:0 0 24px rgba(0,255,240,0.5), 0 4px 12px rgba(0,0,0,0.4);
        }
        .apr18-tag{
          color:#060818;
          background:linear-gradient(135deg,#00d4ff,#0096e0);
          box-shadow:0 0 24px rgba(0,212,255,0.5), 0 4px 12px rgba(0,0,0,0.4);
        }
        .apr19-tag{
          color:#060818;
          background:linear-gradient(135deg,#00ffcc,#00c8a0);
          box-shadow:0 0 24px rgba(0,255,204,0.5), 0 4px 12px rgba(0,0,0,0.4);
        }

        /* TITLE — LARGE */
        .edh-title{
          font-family:'Orbitron',sans-serif;
          font-size:clamp(1.6rem,3.5vw,2.4rem);
          font-weight:800;
          color:#fff;
          letter-spacing:.04em;
          text-shadow:0 0 30px rgba(0,255,240,0.2);
        }

        /* SUBTITLE */
        .edh-sub{
          font-family:'Share Tech Mono',monospace;
          font-size:.82rem;
          letter-spacing:.14em;
          color:rgba(0,255,240,.45);
        }

        /* Grid */
        .egrid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        @media(max-width:1100px){.egrid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:580px){.egrid{grid-template-columns:1fr}}

        .egrid-center{grid-template-columns:repeat(3,1fr);justify-items:center}
        .egrid-center > *{max-width:440px;width:100%}
        @media(max-width:1100px){.egrid-center{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:580px){.egrid-center{grid-template-columns:1fr}}

        .ev-completed-grid .ev-card{opacity:0.65;filter:saturate(0.5)}
        .ev-completed-grid .ev-card:hover{opacity:0.88;filter:saturate(0.8)}

        .serr{font-family:'Orbitron',sans-serif;font-size:.9rem;letter-spacing:.12em;color:#00fff0;text-align:center;padding:60px 0}

        @media(max-width:960px){
          .hero-title-block{flex-direction:column;align-items:flex-start;padding:24px 20px}
          .htb-right{flex-direction:column;width:100%}
          .ops-panel,.scse-b{width:100%}
          .hero-info-row{flex-direction:column;align-items:flex-start;padding:18px 20px}
          .hts-right{display:none}
        }
      `}</style>
    </>
  );
}