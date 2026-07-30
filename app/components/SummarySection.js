const news = [
  {
    title: "NEXT의 3대 결정적 차별점",
    description: "콘텐츠와 데이터가 이어지는 거래 경험과 AI-Native 정보 탐색 구조",
    crop: "summary-crop--green",
  },
  {
    title: "NEXT의 핵심 기술 역량",
    description: "메인프레임의 부채를 최소화하고 변화와 안정성을 함께 고려한 설계",
    crop: "summary-crop--orange",
  },
];

export default function SummarySection() {
  return (
    <section className="summary-section" id="vision">
      <header className="summary-section__header">
        <p>STRENGTHS AND KEY ADVANTAGES</p>
        <span>Recent News ↓</span>
      </header>

      <div className="summary-section__body">
        <div className="summary-section__statement">
          <div className="summary-crop summary-crop--lead" role="img" aria-label="빛이 들어오는 건축 공간" />
          <p>
            <strong>전통 증권사가 기존 금융 시스템에 기술을 덧붙일 때,</strong>
            NEXT Securities는 Compliance-by-Design 기술 위에서 금융 경험을
            새롭게 정의합니다. 구조적 기술 부채를 최소화하도록 설계된
            클라우드 네이티브 아키텍처와 글로벌 레귤러토리 기준, 미디어와
            투자를 연결하는 경험을 통해 차세대 테크 증권사의 새로운 기준을
            만들어갑니다.
          </p>
        </div>

        <div className="summary-section__news">
          {news.map((item) => (
            <article className="summary-news-card" key={item.title}>
              <div className={`summary-crop ${item.crop}`} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
