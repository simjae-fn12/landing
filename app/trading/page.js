"use client";

import { useState } from "react";

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
        <div className="trading-search__symbol" aria-hidden="true"><i /></div>
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
          <button type="submit"><b aria-hidden="true">⌁</b> Search</button>
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
