# Fitosauna Info Blocks Reference

## 기본 정보

- Site ID: fitosauna-info-blocks
- 원본 URL: https://fitosauna.com/
- 적용 대상: `/`의 `IntelligenceSection`
- 현재 완료 단계: R0
- 조사일: 2026-07-30

## 데스크톱 구조

- `.info-blocks .outer`가 전체 2열 컨테이너다.
- `.inner-left`만 고정되며 ScrollTrigger 범위는 `start: "top 156px"`, `end: "bottom bottom"`이다.
- `pinSpacing: false`, `anticipatePin: 1`을 사용한다.
- 우측 카드는 일반적인 세로 문서 흐름으로 스크롤된다.
- 카드 이미지는 `top 85%`에서 공개를 시작한다.
- 초기 이미지 상태는 `clip-path: inset(0 0 100%)`, `scale: 1.1`이다.
- 공개 상태는 `clip-path: inset(0 0 -5%)`, `scale: 1`이며 `power2.out`, `1s`이다.
- 별도의 scrub 타임라인으로 이미지가 카드 통과 중 `y: 0 → -10%` 이동한다.
- 역스크롤 시 이미지 공개 애니메이션도 reverse된다.

## 모바일 구조

- 전체 섹션을 pin하고 세로 스크롤을 가로 카드 이동으로 변환한다.
- ScrollTrigger 길이는 `카드 수 * 35%`이다.
- `scrub: 0.2`이며 카드 래퍼를 최대 가로 이동 거리까지 이동한다.
- 현재 인덱스와 누적 progress bar를 표시한다.

## NEXT 매핑

| 원본 | NEXT |
|---|---|
| Relaxation / Sleep / Recovery | Compliance / Disclosure / Personalization |
| 7 cards | 3 cards |
| sauna benefit copy | 금융 데이터 탐색 및 준법 카피 |

## 미확인

- 동일 viewport에서 실제 프레임 비교
- SplitText의 정확한 줄 전환 타이밍
- 모바일 터치와 scroll-hijack 충돌 여부

현재는 원본 HTML, CSS 상태 및 공개 `app.js`의 ScrollTrigger 설정을 조사한 R0 단계다.
