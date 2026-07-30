import TradingHeader from "../components/TradingHeader";

export const metadata = {
  title: "Trading Portal | NEXT Securities",
  description: "NEXT Securities 고객센터와 투자 정보를 한곳에서 확인하세요.",
};

export default function TradingLayout({ children }) {
  return (
    <div className="trading-portal">
      <TradingHeader />
      {children}
    </div>
  );
}
