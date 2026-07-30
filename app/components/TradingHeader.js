export default function TradingHeader() {
  return (
    <header className="trading-header">
      <a className="trading-header__logo" href="/trading" aria-label="NEXT Securities Trading Portal">
        <img src="/landing/logo.svg" alt="Next Securities" />
      </a>

      <nav aria-label="Trading Portal navigation">
        <a href="/trading">회사소개</a>
        <a href="/trading">국내/해외 시장</a>
        <a href="/trading">거래시스템</a>
        <a href="/trading/notices">고객센터</a>
        <a href="/trading/notices">투자정보</a>
      </nav>

      <div className="trading-header__actions">
        <a href="/trading" lang="en">EN</a>
        <a href="/">Main Portal</a>
      </div>
    </header>
  );
}
