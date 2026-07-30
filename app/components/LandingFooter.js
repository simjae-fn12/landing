export default function LandingFooter() {
  return (
    <footer className="landing-footer" id="contact">
      <div className="landing-footer__brand">
        <a className="landing-logo" href="/option-a">
          <img src="/landing/logo.svg" alt="Next Securities" />
        </a>
      </div>

      <div className="landing-footer__columns">
        <div className="landing-footer__column">
          <strong>COMPANY</strong>
          <a href="#services">SERVICE</a>
          <a href="#services">MARKETLENS</a>
          <a href="#services">WTS/MTS</a>
          <a href="#services">RESEARCH</a>
        </div>
        <div className="landing-footer__column">
          <strong>SOCIAL MEDIA</strong>
          <a href="#contact">LINKEDIN</a>
          <a href="#contact">FACEBOOK</a>
          <a href="#contact">INSTAGRAM</a>
          <a href="#contact">X</a>
        </div>
        <div className="landing-footer__column landing-footer__contact">
          <strong>CONTACT</strong>
          <address>서울특별시 영등포구 국제금융로 10 THREE IFC 15층</address>
          <a href="mailto:master@nextsecurities.com">MASTER@NEXTSECURITIES.COM</a>
        </div>
      </div>

      <p className="landing-footer__copyright">
        COPYRIGHT © 2026 NEXT SECURITIES. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}
