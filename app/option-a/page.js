import LandingFooter from "../components/LandingFooter";
import LandingHeader from "../components/LandingHeader";
import LandingCursor from "../components/LandingCursor";
import HeroTransition from "../components/HeroTransition";
import SummarySection from "../components/SummarySection";
import IntelligenceSection from "../components/IntelligenceSection";
import ExecutiveSummary from "../components/ExecutiveSummary";
import CapabilitiesSection from "../components/CapabilitiesSection";
import ClosingVisionSection from "../components/ClosingVisionSection";

export const metadata = {
  title: "Option A | NEXT Securities",
  description: "Compliance-by-Design 기반 NEXT Securities 메인 포탈 시안",
};

export default function OptionAPage() {
  return (
    <main className="landing">
      <LandingHeader />
      <LandingCursor />
      <HeroTransition />
      <ExecutiveSummary />
      <div className="executive-summary-gap" data-scroll-cursor="down" aria-hidden="true" />
      <SummarySection />
      <CapabilitiesSection>
        <IntelligenceSection />
      </CapabilitiesSection>
      <ClosingVisionSection />
      <LandingFooter />
    </main>
  );
}
