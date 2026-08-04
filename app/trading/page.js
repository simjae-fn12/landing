"use client";

import { useState } from "react";

const searchMagicIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAMKADAAQAAAABAAAAMAAAAADbN2wMAAACt0lEQVRoBe2VgXHbMAxF014H8AjcoCt0hIzgEbIBuUG7QUbRCB4BI6QbuO9TxAUXS6ksK0f5zrj7BAyI4CNNy09PD7vTEzifz0nqjf/9BoAX5kpd7ccNq/9k7uGG+f2mtuuDq9Z1E2uv0K9wfMcQ30fIudt4+HUc7oO6UYJ8DPAePt/FJqDVq/PNqYNXLu16EwA+oyl434dqx11tAqADekEDWmrGg7pmfb4RLYx+oxO61QYaqNeXbWbuNfqNq/B3g+ug/wj16mM6OaTrYGipDTyoa3f1HxxztN6AZLoBabOd00wbeUNzptrq1ylzBW8omvFh001okalNKLd6Ic1FhqbMSK7uffEN0kyv0492vHhwYYJGn8H7Otv+29N18M54W8h68Rhzl8DXpS4m35Kgo36kbsc1vZi8GJ5nT2vWmJ1Dw4PTC2T2wZmC5iBDblO/K68ZwdVrzCz9nqbpCV19NwWDDLkVAh2I+n00I7E9vLZB4z/S+5b+HwkGGXIrPouENmFeaHHy+uaeBQSzeIH2vOHdSoQimb2AN7S4d+zzJbFgGhSuWokLkcljuo7GmGK9aywYJCi3EoFIZi/gDaVY7xoLpkHhqpUIRCaP6ToaY4r1rrFgkKDcSgQimb2AN5RivWssmAaFq1YiEJk8putojCnWu8aCQYJyKxGIZPYC3lCK9a6xYBoUrlqJQGTymK6jMaZY7xoLBgnKrUQgktkLeEMp1rvGgmlQuGolApHJY7qOxphivWssGCQotxKBSGYv4A2lWO8aC6ZB4aqVCEQmj+k6GmOK9a6xYJCg3EoEIpm9gDeUYr173KBw1UoEIpPHdB2NMcX6LuIA+BqByOdQM+L9wQs4QBZ9lpHLIW/EqRb2OATQgbigV+RmBPuF14E66YTfP/wnG7gPeG3gYY8TeJzA4wQ2OYF/1xLbzIDGkTkAAAAASUVORK5CYII=";

const suggestions = [
  "💳 수수료 안내",
  "💰 예탁금 안내",
  "🔒 개인신용정보 동의",
  "📋 투자자정보확인서",
  "📈 실시간 시가지수",
];

export default function TradingPortalHome() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const submitSearch = (event) => {
    event.preventDefault();
    const nextQuery = query.trim();
    if (nextQuery) setSubmittedQuery(nextQuery);
  };

  return (
    <main className="trading-home">
      <div className="trading-home__aurora" aria-hidden="true" />
      <section className="trading-search">
        <div className="trading-search__symbol" aria-hidden="true">
          <img src="/trading/customer-search-symbol.png" alt="" />
        </div>
        <h1>고객센터 통합 검색</h1>
        <p>무엇을 도와드릴까요? 원하는 금융 업무를 말씀해 보세요</p>
        <span>메뉴 이동부터 수수료 조회, 투자 정보 탐색까지 한 번에 처리하세요.</span>

        <form onSubmit={submitSearch}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="원하는 메뉴나 업무를 입력해 보세요. (예: 수수료 안내, 예탁금 조회)"
            aria-label="고객센터 통합 검색"
          />
          <button type="submit">
            <img src={searchMagicIcon} alt="" aria-hidden="true" />
            <span>Search</span>
          </button>
        </form>

        <div className="trading-search__suggestions">
          {suggestions.map((suggestion) => (
            <button
              type="button"
              key={suggestion}
              onClick={() => {
                setQuery(suggestion.slice(2));
                setSubmittedQuery(suggestion.slice(2));
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {submittedQuery && (
          <a className="trading-search__result" href="/trading/notices">
            “{submittedQuery}” 관련 고객센터 안내 보기 <span>→</span>
          </a>
        )}
      </section>
    </main>
  );
}
