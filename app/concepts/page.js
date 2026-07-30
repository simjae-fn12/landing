const concepts = [
  { number: "01", title: "Living Financial Topology", reference: "Peachweb Creative Marketing", description: "고정 WebGL 캔버스와 스크롤 기반 3D 모델 전환을 적용한 NEXT 증권 B2B 콘셉트.", href: "/concepts/peach" },
  { number: "02", title: "AI Financial Operator", reference: "Mercury Command", description: "긴 스티키 시퀀스와 파티클 캔버스, 수평 스토리텔링을 결합한 Command 콘셉트.", href: "/concepts/mercury-command" },
  { number: "03", title: "Living Financial System", reference: "Sleep Well Creatives", description: "고정 Canvas와 장기 스티키 구간으로 금융 데이터와 AI 판단을 서사적으로 재해석한 콘셉트.", href: "/concepts/sleep-well" },
  { number: "04", title: "NEXT Everywhere", reference: "Active Theory", description: "인터랙티브 3D 장면과 포인터 반응, 에디토리얼 레이아웃을 결합한 금융 경험.", href: "/concepts/active-theory" },
  { number: "05", title: "Immersive Financial Journey", reference: "Lusion", description: "실시간 터널, 연속된 모델, 몰입형 카드와 스토리라인을 재생성한 NEXT 콘셉트.", href: "/concepts/lusion" },
];

export const metadata = { title: "NEXT Securities | Concept Lab", description: "NEXT Securities의 인터랙션 및 기술 콘셉트 아카이브." };

export default function ConceptIndex() {
  return (
    <main className="concept-index">
      <header className="index-header"><a href="/" className="index-logo">NEXT</a><p>NEXT SECURITIES<br />CONCEPT LAB · 2026</p></header>
      <section className="index-hero">
        <p className="index-kicker">REFERENCE-DRIVEN DESIGN SYSTEM</p>
        <h1>Five directions.<br />One financial standard.</h1>
        <p className="index-intro">서로 다른 인터랙션과 시각 언어를 독립적인 Next.js 라우트로 구현한 NEXT 증권의 기술 및 디자인 실험 아카이브입니다.</p>
      </section>
      <section className="concept-list">
        {concepts.map((concept) => (
          <a className="concept-card concept-card--active" href={concept.href} key={concept.number}>
            <span className="concept-number">{concept.number}</span>
            <div><p className="concept-reference">{concept.reference}</p><h2>{concept.title}</h2><p className="concept-description">{concept.description}</p></div>
            <span className="concept-status">VIEW CONCEPT ↗</span>
          </a>
        ))}
      </section>
      <footer className="index-footer"><span>© 2026 NEXT SECURITIES</span><a href="/">BACK TO LANDING ↗</a></footer>
    </main>
  );
}
