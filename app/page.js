import LandingFooter from "./components/LandingFooter";
import LandingHeader from "./components/LandingHeader";
import HeroTransition from "./components/HeroTransition";
import SummarySection from "./components/SummarySection";
import IntelligenceSection from "./components/IntelligenceSection";
import ExecutiveSummary from "./components/ExecutiveSummary";
import CapabilitiesSection from "./components/CapabilitiesSection";
import ClosingVisionSection from "./components/ClosingVisionSection";

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
      <CapabilitiesSection />
      <ClosingVisionSection />

      <LandingFooter />
    </main>
  );
}
