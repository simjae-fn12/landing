const navigation = [
  { label: "Service", target: "#ilwyn" },
  { label: "MarketLens", target: "#ilwyn-2-2-2-2" },
  { label: "WTS/MTS", target: "#ilwyn-2-2" },
  { label: "Research", target: "#option-b-core-strengths-slot" },
];

export default function OptionBHeader() {
  return (
    <header className="option-b-header">
      <a className="option-b-header__logo" href="/option-b" aria-label="Next Securities B안 홈">
        <img src="/landing/logo.svg" alt="Next Securities" />
      </a>

      <nav className="option-b-header__nav" aria-label="B안 주요 메뉴">
        {navigation.map(({ label, target }) => (
          <a key={label} href={target} data-option-b-target={target}>
            {label}
          </a>
        ))}
      </nav>

      <a className="option-b-header__portal" href="/trading">
        <span>Trading Portal</span>
        <span className="option-b-arrow" aria-hidden="true">→</span>
      </a>
    </header>
  );
}
