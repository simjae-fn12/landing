export default function LandingHeader() {
  return (
    <header className="landing-nav">
      <a className="landing-logo" href="/" aria-label="NEXT Securities 홈">
        <img src="/landing/logo.svg" alt="Next Securities" />
      </a>
      <nav aria-label="주요 메뉴">
        <a href="#vision">비전</a>
        <a href="#services">서비스</a>
        <a href="#technology">기술</a>
      </nav>
      <a className="nav-cta" href="#contact">
        시작하기
      </a>
    </header>
  );
}
