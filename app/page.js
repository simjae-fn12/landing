import LandingFooter from "./components/LandingFooter";
import LandingHeader from "./components/LandingHeader";
import HeroTransition from "./components/HeroTransition";
import SummarySection from "./components/SummarySection";
import IntelligenceSection from "./components/IntelligenceSection";
import ExecutiveSummary from "./components/ExecutiveSummary";

const services = [
  { number: "01", title: "AI 시장 인사이트", description: "방대한 시장 데이터를 구조화해 중요한 변화와 리스크 신호를 이해하기 쉬운 정보로 제공합니다." },
  { number: "02", title: "투자 커뮤니티", description: "서로 다른 투자자의 생각과 경험을 연결해 하나의 데이터만으로는 얻기 어려운 관점을 만듭니다." },
  { number: "03", title: "개인화 콘텐츠", description: "관심 자산과 탐색 흐름에 따라 지금 필요한 정보의 우선순위와 깊이를 조정합니다." },
];

const principles = ["Media-First", "AI-Native", "Compliance-by-Design", "Headless Architecture"];

export const metadata = {
  title: "NEXT Securities | AI가 만드는 새로운 투자 경험",
  description: "데이터와 콘텐츠, 커뮤니티가 연결되는 차세대 금융 투자 플랫폼 NEXT Securities.",
};

export default function Home() {
  return (
    <main className="landing">
      <LandingHeader />

      <HeroTransition />

      <SummarySection />
      <IntelligenceSection />
      <ExecutiveSummary />

      <section className="landing-services" id="services">
        <div className="section-heading">
          <p className="section-label">CONNECTED EXPERIENCE</p>
          <h2>탐색에서 판단까지, 하나의 흐름으로.</h2>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-technology" id="technology">
        <div><p className="section-label">BUILT DIFFERENT</p><h2>금융 경험을 처음부터 다시 설계합니다.</h2></div>
        <div className="principle-list">
          {principles.map((principle, index) => <div key={principle}><span>0{index + 1}</span><strong>{principle}</strong></div>)}
        </div>
      </section>

      <section className="landing-contact" id="contact">
        <p className="section-label">THE NEXT STANDARD</p>
        <h2>투자의 다음을,<br />함께.</h2>
        <a className="primary-cta primary-cta--light" href="mailto:recruit@nextsecurities.com">NEXT 시작하기 <span aria-hidden="true">↗</span></a>
      </section>

      <LandingFooter />
    </main>
  );
}
