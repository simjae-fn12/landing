const companyLinks = ["Service", "MarketLens", "WTS/MTS", "Research"];
const socialLinks = ["LinkedIn", "Facebook", "Instagram", "X"];

export default function OptionBFooter() {
  return (
    <footer className="option-b-footer" id="option-b-contact">
      <div className="option-b-footer__main">
        <a className="option-b-footer__logo" href="/option-b" aria-label="Next Securities B안 홈">
          <img src="/landing/logo.svg" alt="Next Securities" />
        </a>

        <div className="option-b-footer__columns">
          <div className="option-b-footer__column">
            <strong>COMPANY</strong>
            {companyLinks.map((label) => (
              <a key={label} href="#option-b-contact">{label}</a>
            ))}
          </div>

          <div className="option-b-footer__column">
            <strong>SOCIAL MEDIA</strong>
            {socialLinks.map((label) => (
              <a key={label} href="#option-b-contact">{label}</a>
            ))}
          </div>

          <div className="option-b-footer__column option-b-footer__contact">
            <strong>CONTACT</strong>
            <address>서울특별시 영등포구 국제금융로 10 THREE IFC 15층</address>
            <a href="mailto:master@nextsecurities.com">MASTER@NEXTSECURITIES.COM</a>
          </div>
        </div>
      </div>

      <p className="option-b-footer__copyright">
        COPYRIGHT © 2026 NEXT SECURITIES. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
}
