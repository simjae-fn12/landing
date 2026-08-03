const news = [
  {
    title: "3대 차별점",
    description: "콘텐츠가 매매로 이어지는 트레이딩 파이프라인 AI-Native 초개인화 인텔리전스를 구축",
    crop: "summary-crop--green",
  },
  {
    title: "3대 핵심 역량",
    description: "메인프레임 부채 없는 아키텍처로 무장애 연속성과 정밀 리스크 케어 엔진을 실현",
    crop: "summary-crop--orange",
  },
];

export default function SummarySection() {
  return (
    <section className="summary-section" id="vision" data-scroll-cursor="down">
      <header className="summary-section__header">
        <p>STRENGTHS AND KEY ADVANTAGES</p>
      </header>

      <div className="summary-section__body">
        <div className="summary-section__statement">
          <div className="summary-crop summary-crop--lead" role="img" aria-label="빛이 들어오는 건축 공간" />
          <p>
            <strong>Built natively on cloud technology, not legacy</strong>
            <span>
              기존 시스템에 기술을 덧붙이는 방식을 넘어, 기술 위에 금융을 새로 정립합니다.
              <br className="summary-copy-break" />
              구조적 기술 부채가 없는 클라우드 아키텍처와 지능형 미디어 트레이딩 파이프라인을 통해
              <br className="summary-copy-break" />
              사용자 중심의 무마찰 거래 경험과 대한민국 차세대 테크 증권사의 표준을 증명하겠습니다.
            </span>
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
