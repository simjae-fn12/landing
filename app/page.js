const concepts = [
  {
    number: "01",
    title: "Living Financial Topology",
    reference: "Peachweb Creative Marketing",
    description: "고정 WebGL 캔버스와 스크롤 기반 3D 모델 전환을 적용한 NEXT 증권 B2B 콘셉트.",
    href: "/concepts/peach",
    status: "VIEW CONCEPT"
  },
  {
    number: "02",
    title: "AI Financial Operator",
    reference: "Mercury Command",
    description: "긴 Sticky 여정과 파티클 Canvas, 수평 스토리텔링을 결합한 NEXT Command 콘셉트.",
    href: "/concepts/mercury-command",
    status: "VIEW CONCEPT"
  },
  {
    number: "03",
    title: "Living Financial System",
    reference: "Sleep Well Creatives",
    description: "19개 장면, 고정 Canvas, 장기 Sticky 구간을 금융 데이터와 AI 판단의 여정으로 재해석한 콘셉트.",
    href: "/concepts/sleep-well",
    status: "VIEW CONCEPT"
  },
  {
    number: "04",
    title: "Reference Concept 04",
    reference: "Reference URL required",
    description: "네 번째 레퍼런스 사이트를 위한 독립 라우트입니다.",
    status: "PLANNED"
  }
];

export default function ConceptIndex() {
  return (
    <main className="concept-index">
      <header className="index-header">
        <a href="/" className="index-logo">NEXT</a>
        <p>NEXT SECURITIES<br />DESIGN CONCEPTS · 2026</p>
      </header>
      <section className="index-hero">
        <p className="index-kicker">REFERENCE-DRIVEN DESIGN SYSTEM</p>
        <h1>Four directions.<br />One financial standard.</h1>
        <p className="index-intro">서로 다른 글로벌 레퍼런스를 독립적인 Next.js 라우트로 구현하고, 하나의 NEXT 증권 메시지를 다양한 시각 언어로 탐색합니다.</p>
      </section>
      <section className="concept-list">
        {concepts.map(concept => {
          const content = <>
            <span className="concept-number">{concept.number}</span>
            <div><p className="concept-reference">{concept.reference}</p><h2>{concept.title}</h2><p className="concept-description">{concept.description}</p></div>
            <span className="concept-status">{concept.status}{concept.href ? " →" : ""}</span>
          </>;
          return concept.href
            ? <a className="concept-card concept-card--active" href={concept.href} key={concept.number}>{content}</a>
            : <article className="concept-card" key={concept.number}>{content}</article>;
        })}
      </section>
      <footer className="index-footer"><span>© 2026 NEXT SECURITIES</span><span>4 CONCEPT ROUTES</span></footer>
    </main>
  );
}
