const sideMenu = [
  "공지사항",
  "이벤트/세미나 일정",
  "온라인 업무",
  "약관 및 위험고지",
  "개인신용정보동의",
  "인증센터",
  "투자자정보확인서",
  "금융소비자보호",
  "약관 및 위험고지",
  "Q&A 게시판",
  "자료실",
  "사업공고",
];

const sideNotices = [
  { image: "notice-sprite--side-1", title: "넥스트증권 MTS/HTS 시스템 정기 점검 안내" },
  { image: "notice-sprite--side-2", title: "개인신용정보 이용 및 제공 내역 조회 서비스 안내" },
  { image: "notice-sprite--side-3", title: "해외주식 거래 약관 개정 및 서비스 변경 사전 안내" },
];

const gridNotices = [
  { image: "notice-sprite--grid-1", title: "넥스트증권 MTS/HTS 시스템 정기 점검 안내" },
  { image: "notice-sprite--grid-2", title: "넥스트증권 MTS/HTS 시스템 정기 점검 안내" },
  { image: "notice-sprite--grid-3", title: "넥스트증권 MTS/HTS 시스템 정기 점검 안내" },
  { image: "notice-sprite--grid-4", title: "넥스트증권 MTS/HTS 시스템 정기 점검 안내" },
];

function NoticeMeta() {
  return <p className="notice-meta"><strong>DATE</strong><i />2026.07.27</p>;
}

export default function TradingNoticesPage() {
  return (
    <main className="trading-notices">
      <aside className="notice-sidebar">
        <nav aria-label="고객센터 메뉴">
          {sideMenu.map((item, index) => (
            <a className={index === 0 ? "is-active" : ""} href="#newsroom" key={`${item}-${index}`}>{item}</a>
          ))}
        </nav>

        <div className="notice-subscribe">
          <h2>공지사항 알림 신청</h2>
          <p>서비스 점검, 약관 개정, 유상증자 등 주요 공지사항을 이메일로 빠르게 받아보세요.</p>
          <form>
            <input type="email" placeholder="이메일 주소 입력" aria-label="공지사항 수신 이메일" />
            <button type="submit" aria-label="공지사항 알림 신청">→</button>
          </form>
        </div>
      </aside>

      <section className="notice-content" id="newsroom">
        <header>
          <h1>뉴스룸</h1>
          <button type="button">Share <span aria-hidden="true">⌘</span></button>
        </header>

        <div className="notice-feature-layout">
          <article className="notice-feature">
            <div className="notice-sprite notice-sprite--feature" />
            <span>공지사항</span>
            <h2>한화솔루션 유상증자에 따른 주식선물 옵션 시장 조치 안내</h2>
            <NoticeMeta />
          </article>

          <div className="notice-side-list">
            {sideNotices.map((notice) => (
              <article key={notice.title}>
                <div className={`notice-sprite ${notice.image}`} />
                <div>
                  <span>공지사항</span>
                  <h2>{notice.title}</h2>
                  <NoticeMeta />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="notice-grid">
          {gridNotices.map((notice, index) => (
            <article key={`${notice.title}-${index}`}>
              <div className={`notice-sprite ${notice.image}`} />
              <span>공지사항</span>
              <h2>{notice.title}</h2>
              <NoticeMeta />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
