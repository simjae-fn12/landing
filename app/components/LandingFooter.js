export default function LandingFooter() {
  return (
    <footer className="landing-footer">
      <div>
        <a className="landing-logo" href="/">
          <img src="/landing/logo.svg" alt="Next Securities" />
        </a>
        <p>
          NEXT Securities Co., Ltd.
          <br />
          Seoul, Republic of Korea
        </p>
      </div>
      <div className="footer-links">
        <a href="/concepts">Concept Lab</a>
        <a href="#vision">Vision</a>
        <a href="#services">Services</a>
      </div>
      <p className="legal">
        제공되는 정보는 투자 판단을 위한 참고 자료이며 투자 권유 또는 수익을
        보장하지 않습니다.
      </p>
    </footer>
  );
}
