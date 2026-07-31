const options = [
  {
    id: "A",
    status: "READY",
    title: "Connected\nPortal System",
    description: "브랜드 메인 포탈과 정보형 트레이딩 포탈을 하나의 디자인 시스템으로 연결한 A안입니다.",
    className: "proposal-card--a",
    links: [
      { label: "Main Portal", href: "/option-a" },
      { label: "Trading Portal", href: "/trading" },
    ],
  },
  {
    id: "B",
    status: "READY",
    title: "AI Creative\nMarketing",
    description: "AI 기반 캠페인 자동화와 크리에이티브 인텔리전스를 몰입형 WebGL 경험으로 구성한 B안입니다.",
    className: "proposal-card--b",
    links: [{ label: "Explore Option B", href: "/option-b" }],
  },
  {
    id: "C",
    status: "CONCEPT LAB",
    title: "Experimental\nConcepts",
    description: "초기 기술 레퍼런스와 인터랙션 실험을 모아둔 컨셉 아카이브입니다.",
    className: "proposal-card--c",
    links: [{ label: "Explore Concepts", href: "/concepts" }],
  },
];

export const metadata = {
  title: "NEXT Securities — Design Proposals",
  description: "NEXT Securities 디지털 포탈 디자인 시안 선택",
};

export default function ProposalIndexPage() {
  return (
    <main className="proposal-index">
      <header className="proposal-index__header">
        <p>NEXT SECURITIES · DIGITAL EXPERIENCE</p>
        <span>DESIGN PROPOSALS · 2026</span>
      </header>

      <section className="proposal-index__intro">
        <p>SELECT A DIRECTION</p>
        <h1>
          A new standard for
          <br />
          financial experience.
        </h1>
        <div>
          <span>세 가지 방향 중 확인할 시안을 선택해 주세요.</span>
          <strong>01 / 03</strong>
        </div>
      </section>

      <section className="proposal-grid" aria-label="디자인 시안 목록">
        {options.map((option) => (
          <article className={`proposal-card ${option.className}`} key={option.id}>
            <div className="proposal-card__visual" aria-hidden="true">
              <span>{option.id}</span>
              <i />
            </div>
            <div className="proposal-card__meta">
              <span>OPTION {option.id}</span>
              <strong>{option.status}</strong>
            </div>
            <h2>
              {option.title.split("\n").map((line) => <span key={line}>{line}</span>)}
            </h2>
            <p>{option.description}</p>
            <div className="proposal-card__links">
              {option.links.length > 0 ? option.links.map((link) => (
                <a href={link.href} key={link.href}>
                  {link.label}<span aria-hidden="true">↗</span>
                </a>
              )) : <span>Coming Soon</span>}
            </div>
          </article>
        ))}
      </section>

      <footer className="proposal-index__footer">
        <span>Prepared for presentation</span>
        <span>© 2026 NEXT Securities</span>
      </footer>
    </main>
  );
}
