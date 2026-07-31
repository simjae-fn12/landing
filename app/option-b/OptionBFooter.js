const menuLinks = ["Service", "MarketLens", "WtS/MTs", "Research"];
const socialLinks = ["LinkedIn", "Facebook", "Instagram", "X"];

export default function OptionBFooter() {
  return (
    <footer className="option-b-footer" id="option-b-contact">
      <div className="option-b-footer__inner">
        <div className="option-b-footer__identity">
          <a className="option-b-footer__logo" href="/option-b" aria-label="Next Securities B안 홈">
            <img src="/landing/logo.svg" alt="Next Securities" />
          </a>
          <a className="option-b-footer__mail" href="mailto:master@nextsecurities.com">
            MASTER@NEXTSECURITIES.COM
          </a>
        </div>

        <div className="option-b-footer__navigation">
          <nav className="option-b-footer__column" aria-label="B안 푸터 메뉴">
            <strong>MENU</strong>
            {menuLinks.map((label) => (
              <a key={label} href="#option-b-contact">{label}</a>
            ))}
          </nav>

          <nav className="option-b-footer__column" aria-label="B안 소셜 미디어">
            <strong>SOCIAL MEDIA</strong>
            {socialLinks.map((label) => (
              <a key={label} href="#option-b-contact">{label}</a>
            ))}
          </nav>
        </div>

        <div className="option-b-footer__legal">
          <address>서울특별시 영등포구 국제금융로 10 THREE IFC 15층</address>
          <p>COPYRIGHT © 2026 NEXT SECURITIES. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
