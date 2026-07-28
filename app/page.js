const concepts = [
  {
    number: "01",
    title: "Living Financial Topology",
    reference: "Peachweb Creative Marketing",
    description: "고정 WebGL 장면과 스크롤 기반 3D 모델 전환을 적용한 NEXT 증권 B2B 콘셉트.",
    href: "/concepts/peach",
    status: "VIEW CONCEPT"
  },
  {
    number: "02",
    title: "AI Financial Operator",
    reference: "Mercury Command",
    description: "긴 Sticky Hero와 파티클 Canvas, 자연어 금융 업무 UI를 적용한 NEXT Command 콘셉트.",
    href: "/concepts/mercury-command",
    status: "VIEW CONCEPT"
  },
  {
    number: "03",
    title: "Reference Concept 03",
    reference: "Reference URL required",
    description: "세 번째 레퍼런스 사이트를 위한 독립적인 디자인 및 WebGL 구현 슬롯입니다.",
    status: "PLANNED"
  },
  {
    number: "04",
    title: "Reference Concept 04",
    reference: "Reference URL required",
    description: "네 번째 레퍼런스 사이트를 위한 독립적인 디자인 및 WebGL 구현 슬롯입니다.",
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
        <p className="index-intro">서로 다른 글로벌 레퍼런스를 독립된 Next.js 라우트로 구현하고, 동일한 NEXT 증권 메시지를 다양한 시각 언어로 탐색합니다.</p>
      </section>

      <section className="concept-list">
        {concepts.map(concept => {
          const content = (
            <>
              <span className="concept-number">{concept.number}</span>
              <div>
                <p className="concept-reference">{concept.reference}</p>
                <h2>{concept.title}</h2>
                <p className="concept-description">{concept.description}</p>
              </div>
              <span className="concept-status">{concept.status}{concept.href ? " ↗" : ""}</span>
            </>
          );
          return concept.href
            ? <a className="concept-card concept-card--active" href={concept.href} key={concept.number}>{content}</a>
            : <article className="concept-card" key={concept.number}>{content}</article>;
        })}
      </section>

      <footer className="index-footer">
        <span>© 2026 NEXT SECURITIES</span>
        <span>4 CONCEPT ROUTES</span>
      </footer>
    </main>
  );
}
