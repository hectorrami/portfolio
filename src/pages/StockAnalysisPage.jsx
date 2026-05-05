import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/nav/Nav';

const DARK = {
  bg: '#080808',
  surface: '#0e0e0e',
  border: '#222222',
  accent: '#e2d9c8',
  text: '#f0ece4',
  muted: '#4a4a4a',
  mutedText: '#888880',
  green: '#22c55e',
  red: '#ef4444',
  yellow: '#eab308',
  orange: '#f97316',
  rangeTrack: '#1c1c1c',
  newsItem: '#111111',
};

const LIGHT = {
  bg: '#f5f0e8',
  surface: '#fefaf4',
  border: '#ddd5c6',
  accent: '#0a0a0a',
  text: '#0a0a0a',
  muted: '#ddd5c6',
  mutedText: '#8a8070',
  green: '#16a34a',
  red: '#dc2626',
  yellow: '#b45309',
  orange: '#c2410c',
  rangeTrack: '#ddd5c6',
  newsItem: '#f0ebe0',
};

const WATCHLIST = [
  { ticker: 'NVDA', name: 'NVIDIA', price: '$875.40', change: '+2.4%', positive: true },
  { ticker: 'RKLB', name: 'Rocket Lab', price: '$23.18', change: '+5.1%', positive: true },
  { ticker: 'HIMS', name: "Hims & Hers", price: '$31.44', change: '-1.2%', positive: false },
  { ticker: 'AXON', name: 'Axon Enterprise', price: '$412.90', change: '+0.8%', positive: true },
  { ticker: 'PLTR', name: 'Palantir', price: '$89.22', change: '+3.7%', positive: true },
];

const SCORECARD = [
  { label: 'Business Quality', rating: '✅', note: 'Dominant AI infrastructure moat with pricing power' },
  { label: 'Financial Health', rating: '✅', note: 'Net cash positive, FCF expanding at extraordinary rate' },
  { label: 'Valuation', rating: '⚠️', note: 'Premium priced — justified only if AI capex cycle sustains' },
  { label: 'Growth Prospects', rating: '✅', note: 'Multi-year AI build-out across cloud, enterprise, sovereign' },
  { label: 'Management', rating: '✅', note: 'Jensen Huang — visionary founder with long execution track record' },
  { label: 'Risk Level', rating: '⚠️', note: 'Concentration risk in data center; China export restrictions loom' },
  { label: 'Chart Timing', rating: '⚠️', note: 'Extended from breakout — better entry below $820 on pullbacks' },
];

const NEWS = [
  { headline: 'NVIDIA Q1 2025 earnings crush estimates — Data Center revenue up 427% YoY', sentiment: 'Bullish', impact: 'High', time: '2h ago' },
  { headline: 'US considers further chip export restrictions to China and Middle East', sentiment: 'Bearish', impact: 'High', time: '5h ago' },
  { headline: 'Blackwell GPU production ramp on track for H2 2025, supply constraints easing', sentiment: 'Bullish', impact: 'Medium', time: '1d ago' },
  { headline: 'Morgan Stanley raises NVDA price target to $1,100 citing accelerating inference demand', sentiment: 'Bullish', impact: 'Medium', time: '2d ago' },
  { headline: 'AMD challenges NVIDIA with new MI350 accelerators — market share claims disputed', sentiment: 'Neutral', impact: 'Low', time: '3d ago' },
];

const RISKS = [
  'Export control escalation — any tightening of US chip restrictions to China (~$5B revenue exposure) would compress near-term earnings and weaken the bull thesis on global AI adoption.',
  'Customer concentration — Microsoft, Meta, Google, and Amazon together represent ~40%+ of data center revenue. A capex pullback or in-house silicon success at any hyperscaler would hurt.',
  'Valuation compression — trading at 35x forward earnings, NVDA has minimal margin for error. Any growth slowdown or multiple de-rating could cause a 30–50% drawdown even without an earnings miss.',
  "AMD and custom silicon competition — while NVIDIA's software moat (CUDA) is real, sustained AMD progress or hyperscaler custom chips (TPUs, Trainium) could erode pricing power over 3–5 years.",
];

const MONO = 'DM Mono, ui-monospace, monospace';
const SANS = 'Space Grotesk, system-ui, sans-serif';

function label10(C, extra = {}) {
  return { fontFamily: MONO, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: C.mutedText, ...extra };
}

function SectionLabel({ children, withAi, C }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={label10(C)}>{children}</span>
        {withAi && (
          <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.mutedText, borderLeft: `2px solid ${C.muted}`, paddingLeft: '7px' }}>
            AI generated
          </span>
        )}
      </div>
      <div style={{ height: '1px', background: C.border }} />
    </div>
  );
}

function SentimentBadge({ sentiment, C }) {
  const colors = { Bullish: C.green, Bearish: C.red, Neutral: C.mutedText };
  const color = colors[sentiment];
  return (
    <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, color, borderLeft: `2px solid ${color}`, paddingLeft: '6px' }}>
      {sentiment}
    </span>
  );
}

function ImpactBadge({ impact, C }) {
  const map = { High: C.orange, Medium: C.yellow, Low: C.mutedText };
  return (
    <span style={{ color: map[impact], fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      {impact}
    </span>
  );
}

function MetricRow({ label, value, note, valueColor, C }) {
  return (
    <div style={{ padding: '14px 0', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: note ? '4px' : '0' }}>
        <span style={{ color: C.mutedText, fontSize: '13px', fontFamily: SANS }}>{label}</span>
        <span style={{ fontFamily: MONO, fontSize: '15px', fontWeight: 600, color: valueColor || C.text }}>{value}</span>
      </div>
      {note && <span style={{ fontSize: '11px', color: C.mutedText, fontFamily: SANS }}>{note}</span>}
    </div>
  );
}

function ScorecardRow({ label, rating, note, C }) {
  const map = { '✅': { word: 'STRONG', color: C.green }, '⚠️': { word: 'MIXED', color: C.yellow }, '❌': { word: 'WEAK', color: C.red } };
  const r = map[rating] || { word: '—', color: C.mutedText };
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px', padding: '14px 0', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: SANS, fontSize: '13px', fontWeight: 600, color: C.text, marginBottom: '3px' }}>{label}</div>
        <div style={{ fontSize: '12px', color: C.mutedText, fontFamily: SANS, lineHeight: 1.5 }}>{note}</div>
      </div>
      <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: r.color, flexShrink: 0, paddingTop: '2px', borderBottom: `1px solid ${r.color}` }}>
        {r.word}
      </span>
    </div>
  );
}

export default function StockAnalysisPage() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains('dark'));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const C = dark ? DARK : LIGHT;
  const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: '2px', padding: '28px' };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: '100vh', fontFamily: SANS }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <Nav />

      {/* App subheader */}
      <div style={{ position: 'sticky', top: '64px', zIndex: 40, background: C.surface, borderBottom: `1px solid ${C.border}`, padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: '15px', letterSpacing: '-0.03em', color: C.accent }}>
            stockanalysis
          </span>
          <span style={label10(C)}>mockup</span>
        </div>
        <Link
          to="/"
          style={{ color: C.mutedText, fontSize: '11px', textDecoration: 'none', fontFamily: MONO, letterSpacing: '0.06em', transition: 'color 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.color = C.text; }}
          onMouseLeave={e => { e.currentTarget.style.color = C.mutedText; }}
        >
          ← portfolio
        </Link>
      </div>

      <div style={{ display: 'flex', maxWidth: '1360px', margin: '0 auto' }}>
        {/* Sidebar */}
        <aside style={{ width: '196px', flexShrink: 0, borderRight: `1px solid ${C.border}`, minHeight: 'calc(100vh - 108px)', padding: '28px 0', position: 'sticky', top: '108px', alignSelf: 'flex-start' }}>
          <div style={{ padding: '0 20px 16px', ...label10(C) }}>Watchlist</div>
          {WATCHLIST.map((stock, i) => (
            <div
              key={stock.ticker}
              style={{ padding: '12px 20px', cursor: 'pointer', borderLeft: i === 0 ? `2px solid ${C.accent}` : '2px solid transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: '13px', color: i === 0 ? C.accent : C.text, letterSpacing: '-0.01em' }}>{stock.ticker}</div>
                <div style={{ fontSize: '10px', color: C.mutedText, marginTop: '2px' }}>{stock.name}</div>
              </div>
              <div style={{ fontFamily: MONO, fontSize: '11px', color: stock.positive ? C.green : C.red }}>{stock.change}</div>
            </div>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: '32px 36px', minWidth: 0 }}>
          {/* Disclaimer */}
          <div style={{ marginBottom: '28px', padding: '11px 0', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ color: C.orange, fontFamily: MONO, fontSize: '11px' }}>!</span>
            <span style={{ fontSize: '11px', color: C.mutedText, fontFamily: SANS, letterSpacing: '0.01em' }}>
              Not financial advice. Always consult a professional before investing.
            </span>
          </div>

          {/* Stock hero */}
          <div style={{ ...card, marginBottom: '16px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', marginBottom: '28px' }}>
              <div>
                <div style={{ ...label10(C), marginBottom: '10px' }}>Technology · Semiconductors</div>
                <h1 style={{ fontFamily: SANS, fontSize: '48px', fontWeight: 700, letterSpacing: '-0.05em', margin: '0 0 6px', color: C.text, lineHeight: 1 }}>
                  NVIDIA
                </h1>
                <div style={{ fontSize: '13px', color: C.mutedText, fontFamily: SANS, letterSpacing: '0.02em' }}>
                  NVIDIA Corporation · NVDA
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: MONO, fontSize: '52px', fontWeight: 600, color: C.text, lineHeight: 1, letterSpacing: '-0.02em' }}>
                  $875.40
                </div>
                <div style={{ fontFamily: MONO, fontSize: '13px', color: C.green, marginTop: '8px', letterSpacing: '0.02em' }}>
                  ▲ +$20.58 · +2.41%
                </div>
                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', color: C.green, border: `1px solid ${C.green}`, padding: '5px 12px', borderRadius: '2px' }}>
                    ★ STRONG BUY
                  </span>
                </div>
              </div>
            </div>

            {/* 52-week range */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={label10(C)}>LOW $395.80</span>
                <span style={label10(C)}>52-WEEK RANGE</span>
                <span style={label10(C)}>HIGH $974.00</span>
              </div>
              <div style={{ height: '3px', background: C.rangeTrack, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, width: '83%', height: '100%', background: C.accent, opacity: 0.25 }} />
                <div style={{ position: 'absolute', left: '83%', transform: 'translateX(-50%)', top: '-5px', width: '13px', height: '13px', background: C.accent, border: `2px solid ${C.bg}` }} />
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px', ...label10(C) }}>
                83% OF RANGE — <span style={{ color: C.yellow }}>UPPER BAND</span>
              </div>
            </div>

            {/* Price target */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0 0', borderTop: `1px solid ${C.border}` }}>
              <div>
                <div style={{ ...label10(C), marginBottom: '6px' }}>Analyst Consensus Target · 42 analysts</div>
                <div style={{ fontFamily: MONO, fontSize: '28px', fontWeight: 600, color: C.text }}>$1,024.00</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ ...label10(C), marginBottom: '6px' }}>Upside from current</div>
                <div style={{ fontFamily: MONO, fontSize: '28px', fontWeight: 600, color: C.green }}>+17.0%</div>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div style={card}>
              <SectionLabel C={C}>Business Quality</SectionLabel>
              <MetricRow C={C} label="Annual Revenue" value="$130.5B" note="↑ +122% YoY — data center hypergrowth" valueColor={C.green} />
              <MetricRow C={C} label="Net Income" value="$72.9B" note="Expanding margins; operating leverage exceptional" valueColor={C.green} />
              <MetricRow C={C} label="Gross Margin" value="75.1%" note="Among the highest in semiconductors" valueColor={C.green} />
              <MetricRow C={C} label="Free Cash Flow" value="$60.8B" note="Remarkably strong FCF conversion" valueColor={C.green} />
            </div>
            <div style={card}>
              <SectionLabel C={C}>Health &amp; Valuation</SectionLabel>
              <MetricRow C={C} label="Forward P/E" value="35.2x" note="Reasonable — watch for multiple compression" valueColor={C.yellow} />
              <MetricRow C={C} label="PEG Ratio" value="1.2x" note="Below 1.5 — growth-adjusted valuation attractive" valueColor={C.green} />
              <MetricRow C={C} label="Price / Sales" value="31.8x" note="Elevated — priced for sustained dominance" valueColor={C.yellow} />
              <MetricRow C={C} label="Cash on Hand" value="$34.8B" note="Fortress balance sheet" valueColor={C.green} />
              <MetricRow C={C} label="Total Debt" value="$8.5B" note="Modest vs cash — net cash positive" valueColor={C.green} />
              <MetricRow C={C} label="Share Dilution YoY" value="−1.2%" note="Active buybacks — shareholder friendly" valueColor={C.green} />
            </div>
          </div>

          {/* Scorecard */}
          <div style={{ ...card, marginBottom: '16px' }}>
            <SectionLabel C={C} withAi>Investment Scorecard</SectionLabel>
            {SCORECARD.map(item => (
              <ScorecardRow key={item.label} C={C} label={item.label} rating={item.rating} note={item.note} />
            ))}
          </div>

          {/* Risks + Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div style={card}>
              <SectionLabel C={C} withAi>Key Risks</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {RISKS.map((risk, i) => (
                  <div key={i} style={{ display: 'flex', gap: '18px' }}>
                    <span style={{ fontFamily: MONO, fontSize: '10px', color: C.muted, flexShrink: 0, paddingTop: '4px', letterSpacing: '0.05em', borderTop: `1px solid ${C.muted}`, width: '18px' }}>0{i + 1}</span>
                    <p style={{ fontSize: '13px', color: C.mutedText, lineHeight: 1.7, margin: 0 }}>{risk}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={card}>
              <SectionLabel C={C} withAi>Long-Term Investor Summary</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: C.text, margin: 0 }}>
                  NVIDIA has built the defining infrastructure layer of the AI era. Its combination of CUDA software lock-in, GB200/Blackwell hardware dominance, and expanding software stack creates a compounding moat that most competitors cannot replicate within a 3–5 year horizon.
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: C.text, margin: 0 }}>
                  The core risk for a long-term holder is not competition — it is valuation. At 35x forward earnings, the market is pricing in sustained hypergrowth. A slowdown in AI capex or geopolitical shock could cause a painful multiple de-rating even without any earnings miss.
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: C.text, margin: 0 }}>
                  Size modestly (5–8% of portfolio) and add on pullbacks below $820. The 3–5 year thesis remains compelling if you can tolerate 30–40% drawdowns.
                </p>
              </div>
            </div>
          </div>

          {/* News */}
          <div style={card}>
            <SectionLabel C={C}>News &amp; Catalysts</SectionLabel>
            <div>
              {NEWS.map((item, i) => {
                const sentColor = { Bullish: C.green, Bearish: C.red, Neutral: C.border }[item.sentiment];
                return (
                  <div
                    key={i}
                    style={{ padding: '18px 0 18px 18px', borderBottom: i < NEWS.length - 1 ? `1px solid ${C.border}` : 'none', borderLeft: `2px solid ${sentColor}` }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
                      <SentimentBadge sentiment={item.sentiment} C={C} />
                      <ImpactBadge impact={item.impact} C={C} />
                      <span style={{ ...label10(C), marginLeft: 'auto' }}>{item.time}</span>
                    </div>
                    <p style={{ fontSize: '13px', color: C.text, margin: 0, lineHeight: 1.6 }}>{item.headline}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between' }}>
            <span style={label10(C)}>Mockup preview · figures are illustrative</span>
            <span style={{ ...label10(C), color: C.accent }}>stockanalysis</span>
          </div>
        </main>
      </div>
    </div>
  );
}
