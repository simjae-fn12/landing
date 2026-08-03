const news = [
  {
    title: "넥스트증권의 3대 결정적 차별점",
    description: "콘텐츠가 매매로 이어지는 트레이딩 파이프라인 AI-Native 초개인화 인텔리전스를 구축",
    crop: "summary-crop--green",
  },
  {
    title: "넥스트증권의 3대 핵심 기술 역량",
    description: "메인프레임 부채 없는 아키텍처로 무장애 연속성과 정밀 리스크 케어 엔진을 실현",
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
            <strong>전통 증권사가 '기존 금융 시스템에 기술을 덧붙일 때, 넥스트증권은</strong>
            <span>
              넥스트증권은 기술 위에 금융을 새롭게 정의합니다.구조적 기술 부채가 없는 클라우드
              <br className="summary-copy-break" />
              네이티브 아키텍처와 글로벌 레볼루트·캐쉬앱 수준의 100% 자동화 통합 CMS를 통해
              <br className="summary-copy-break" />
              대한민국 차세대 테크 증권사의 표준을 완성하겠습니다.
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
