# Floema Home Reference Investigation

## 기본 정보

- Site ID: floema-home
- 원본 URL: https://www.floema.com/en/
- 적용 대상: `/` 히어로 3단 전환
- 현재 완료 단계: R0
- Desktop viewport: 시각 측정 대기
- Mobile viewport: 시각 측정 대기
- Document height: 시각 측정 대기
- 조사일: 2026-07-30

## 1. 구현 전략

- [x] 직접 재구현
- [ ] 원본 런타임 미러링
- [ ] Hybrid
- 선택 근거: 전체 사이트 복제가 아니라 NEXT 랜딩의 3개 히어로 배경 전환 패턴만 적용한다.
- iframe은 사용하지 않는다.

## 2. 대상 섹션

| 순서 | 원본 섹션 | NEXT 매핑 | layout | sticky/pin |
|---:|---|---|---|---|
| 1 | Collections CTA | Cloud / Compliance / Intelligence | 긴 스크롤 부모 + 고정 viewport | `top top`부터 `bottom bottom` |

## 3. 런타임 조사

- Nuxt SSR이며 GSAP, ScrollTrigger, SplitText, Lenis를 사용한다.
- 대상 모듈: `/_nuxt/CA3aR9dB.js`
- 컬렉션 수가 `N`일 때 부모 높이는 `(N + 1) * 150vh`이다.
- 전체 진행률을 `1 / (N - 1)` 간격으로 나누고 가장 가까운 인덱스를 활성화한다.
- 첫 이미지는 완전히 노출하고 다음 이미지는 CSS 변수 `--reveal: 100%`에서 시작한다.
- 다음 장면은 진행률에 따라 `--reveal`을 `100% → 0%`로 바꾸는 마스크 전환이다.
- 각 이미지 내부는 전환 중 `scale: 1 → 1.03`, `y: 0 → -180px`로 움직인다.
- 텍스트 행/단어는 `yPercent`, `opacity` 기반으로 퇴장·진입한다.
- 인덱스 변경 후 새 콘텐츠 진입은 약 `0.25s` 지연된다.
- 텍스트 진입은 주로 `expo.out`, 이미지 공개는 scrub 기반 연속 진행이다.
- 역방향 스크롤에서는 이전 타임라인을 reverse하고 이전 이미지를 다시 준비한다.

## 4. NEXT 적용안

| 패널 | 배경 | 전환 |
|---:|---|---|
| 1 | `/landing/hero-cloud.png` | 초기 완전 노출 |
| 2 | `/landing/hero-compliance.png` | 아래쪽 마스크에서 위로 공개 |
| 3 | `/landing/hero-intelligence.png` | 아래쪽 마스크에서 위로 공개 |

- 세 패널을 단순히 세로로 쌓지 않고 하나의 sticky viewport에 겹친다.
- 이미지 마스크와 이미지 내부 parallax를 분리한다.
- 텍스트는 이미지보다 짧은 지연 후 교체한다.
- 빠른 스크롤에서도 인덱스만 즉시 튀지 않도록 연속 진행률을 사용한다.
- `prefers-reduced-motion`에서는 마스크 이동량과 내부 확대를 줄인다.

## 5. 미확인 항목

- 실제 viewport 기준 sticky 시작·종료 scrollY
- 전환 시작, 중앙, 종료의 정확한 프레임
- 빠른/느린 휠 입력에서 Lenis 감쇠량
- 모바일 레이아웃과 전환 방식
- 브라우저 세션 연결 후 동일 viewport 캡처 필요

## 6. 현재 게이트

- [ ] R1: 원본 visual baseline
- [ ] R7: 동일 viewport 프레임 및 역방향 인터랙션 비교

현재는 공개 SSR과 런타임 모듈을 분석한 R0 단계이며 시각적 동일성을 검증하지 않았다.
