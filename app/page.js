const concepts = [
  {
    number: "01",
    title: "Living Financial Topology",
    reference: "Peachweb Creative Marketing",
    description: "고정 WebGL 캔버스와 스크롤 기반 3D 모델 전환을 적용한 NEXT 증권 B2B 콘셉트.",
    href: "/concepts/peach"
  },
  {
    number: "02",
    title: "AI Financial Operator",
    reference: "Mercury Command",
    description: "긴 sticky 시퀀스와 파티클 캔버스, 수평 스토리텔링을 결합한 NEXT Command 콘셉트.",
    href: "/concepts/mercury-command"
  },
  {
    number: "03",
    title: "Living Financial System",
    reference: "Sleep Well Creatives",
    description: "고정 Canvas와 장기 sticky 구간으로 금융 데이터와 AI 판단을 서사적으로 재해석한 콘셉트.",
    href: "/concepts/sleep-well"
  },
  {
    number: "04",
    title: "NEXT Everywhere",
    reference: "Shopify Editions — Spring ’26",
    description: "실제 MDPC 포인트클라우드, 장면별 모델, 마우스 반응과 에디토리얼 레이아웃을 결합한 금융 Editions.",
    href: "/concepts/active-theory"
  },
  {
    number: "05",
    title: "Immersive Financial Journey",
    reference: "Lusion",
    description: "실시간 터널, 연속형 모델, 모핑 카드와 스토리라인을 재생성한 NEXT 증권 시네마틱 콘셉트.",
    href: "/concepts/lusion"
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
        <h1>Five directions.<br />One financial standard.</h1>
        <p className="index-intro">서로 다른 글로벌 레퍼런스를 독립적인 Next.js 라우트로 구현하고, 하나의 NEXT 증권 메시지를 다양한 시각 언어로 탐색합니다.</p>
      </section>
      <section className="concept-list">
        {concepts.map(concept => (
          <a className="concept-card concept-card--active" href={concept.href} key={concept.number}>
            <span className="concept-number">{concept.number}</span>
            <div>
              <p className="concept-reference">{concept.reference}</p>
              <h2>{concept.title}</h2>
              <p className="concept-description">{concept.description}</p>
            </div>
            <span className="concept-status">VIEW CONCEPT →</span>
          </a>
        ))}
      </section>
      <footer className="index-footer"><span>© 2026 NEXT SECURITIES</span><span>5 CONCEPT ROUTES</span></footer>
    </main>
  );
}
