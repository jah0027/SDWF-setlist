import { colors } from "../theme";

function parseChordLine(line) {
  const tokens = [];
  const matcher = /\[([^\]]*)\]([^[]*)/g;
  let match;
  let lastIndex = 0;

  while ((match = matcher.exec(line)) !== null) {
    const lead = line.slice(lastIndex, match.index);
    if (lead) tokens.push({ chord: "", text: lead });
    tokens.push({ chord: match[1].trim(), text: match[2] || " " });
    lastIndex = matcher.lastIndex;
  }

  const tail = line.slice(lastIndex);
  if (tail) tokens.push({ chord: "", text: tail });
  if (!tokens.length) tokens.push({ chord: "", text: line || " " });
  return tokens;
}

function isSectionLine(line) {
  const match = line.trim().match(/^\[([^\]]+)\]\s*$/);
  if (!match) return null;
  const label = match[1];
  const isChord = /^[A-G][#b]?(?:maj|min|m|dim|aug|sus|add|M)?\d*(?:sus\d|add\d|[#b]\d+)*(?:\/[A-G][#b]?)?$/.test(label);
  return isChord ? null : label;
}

function ChartText({ chart, note }) {
  const lines = String(chart || "").split("\n").slice(1);
  if (note && lines[0] === note) lines.shift();

  if (!lines.some(line => line.trim())) {
    return <p style={{ color:colors.textMuted, fontStyle:"italic" }}>No chart has been added yet.</p>;
  }

  return (
    <div style={{ fontFamily:"ui-monospace, SFMono-Regular, Menlo, Consolas, monospace", fontSize:"clamp(14px, 2vw, 18px)", lineHeight:1.65 }}>
      {lines.map((line, index) => {
        if (!line.trim()) return <div key={index} style={{ height:12 }} />;
        const section = isSectionLine(line);
        if (section) {
          return (
            <div key={index} style={{ margin:"18px 0 8px", color:colors.teal, borderLeft:`3px solid ${colors.teal}`, padding:"3px 10px", fontFamily:"'Inter', system-ui, sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.1em" }}>
              {section}
            </div>
          );
        }
        return (
          <div key={index} style={{ display:"flex", alignItems:"flex-end", flexWrap:"wrap", minHeight:"1.65em" }}>
            {parseChordLine(line).map((token, tokenIndex) => (
              <span key={tokenIndex} style={{ display:"inline-flex", flexDirection:"column", whiteSpace:"pre" }}>
                <span style={{ color:colors.coral, fontWeight:700, minHeight:"1.3em", paddingRight:"0.35em" }}>{token.chord || "\u00a0"}</span>
                <span>{token.text || " "}</span>
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default function SingleChartView({ song, songNumber, songCount, note, onBack, onNext, hasNext }) {
  return (
    <main style={{
      height:"100dvh", minHeight:0, overflowY:"auto", WebkitOverflowScrolling:"touch",
      overscrollBehaviorY:"contain", touchAction:"pan-y",
      background:colors.bgPage, color:colors.textPrimary,
      fontFamily:"'Inter', system-ui, sans-serif", padding:"clamp(12px, 3vw, 28px)",
    }}>
      <div style={{ maxWidth:900, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap", marginBottom:18 }}>
          <button type="button" onClick={onBack} style={{
            minHeight:42, padding:"9px 14px", border:`1px solid ${colors.borderMed}`,
            background:"transparent", color:colors.textPrimary, borderRadius:6, cursor:"pointer",
          }}>← Back to set list</button>
          <span style={{ color:colors.textMuted, fontSize:13 }}>Song {songNumber} of {songCount}</span>
          <button type="button" onClick={onNext} disabled={!hasNext} style={{
            minHeight:42, padding:"9px 14px", border:"none",
            background:hasNext ? colors.teal : colors.bgPanel,
            color:hasNext ? colors.onAccent : colors.textFaint, borderRadius:6,
            cursor:hasNext ? "pointer" : "default", fontWeight:700,
          }}>Next song →</button>
        </div>

        <article style={{ background:colors.bgCard, border:`1px solid ${colors.borderMed}`, borderRadius:10, overflow:"hidden" }}>
          <header style={{ padding:"20px clamp(16px, 4vw, 28px)", borderBottom:`1px solid ${colors.borderLight}` }}>
            <div style={{ color:colors.coral, fontSize:11, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", fontFamily:"'Poppins', sans-serif" }}>
              Sick Day with Ferris · Set list chart
            </div>
            <h1 style={{ color:colors.textPrimary, fontSize:"clamp(24px, 5vw, 38px)", lineHeight:1.15, margin:"8px 0 6px", fontFamily:"'Poppins', sans-serif" }}>{song.title}</h1>
            <div style={{ color:colors.textSecondary, fontSize:15 }}>{song.artist}</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:14 }}>
              {song.key && <span style={{ padding:"4px 10px", borderRadius:99, background:"rgba(78,205,196,0.12)", color:colors.teal, fontSize:12, fontWeight:700 }}>Key {song.key}</span>}
              {song.bpm && <span style={{ padding:"4px 10px", borderRadius:99, background:colors.bgPanel, color:colors.textSecondary, fontSize:12, fontWeight:700 }}>{song.bpm} BPM</span>}
              {song.capo > 0 && <span style={{ padding:"4px 10px", borderRadius:99, background:colors.bgPanel, color:colors.textSecondary, fontSize:12, fontWeight:700 }}>Capo {song.capo}</span>}
            </div>
          </header>
          {note && <div style={{ padding:"10px clamp(16px, 4vw, 28px)", color:colors.gold, background:"rgba(244,189,98,0.1)", borderBottom:`1px solid ${colors.borderGold}`, fontSize:13 }}>{note}</div>}
          <div style={{ padding:"clamp(16px, 4vw, 28px)", overflowWrap:"anywhere" }}>
            <ChartText chart={song.chart} note={note} />
          </div>
        </article>

        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
          <button type="button" onClick={onNext} disabled={!hasNext} style={{
            minHeight:46, padding:"10px 18px", border:"none",
            background:hasNext ? colors.coral : colors.bgPanel,
            color:hasNext ? colors.onAccent : colors.textFaint, borderRadius:6,
            cursor:hasNext ? "pointer" : "default", fontWeight:700,
          }}>Next song →</button>
        </div>
      </div>
    </main>
  );
}
