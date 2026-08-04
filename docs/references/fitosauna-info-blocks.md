# Fitosauna Info Blocks Reference

## 기본 정보

- Site ID: fitosauna-info-blocks
- 원본 URL: https://fitosauna.com/
- 적용 대상: `/`의 `IntelligenceSection`
- 현재 완료 단계: R5 (대상 interaction 범위)
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

## 2026-08-04 순차 텍스트 리빌 매핑

- 기존 3단계 sticky/pin 구간과 가로 진행선의 scroll scrub은 유지한다.
- 새 단계가 시작되면 이전 카드를 아래 레이어에 유지한 채 새 이미지가 `clip-path`로 먼저 교체된다.
- 이미지 교체 뒤 제목, 영문 부제, 한글 설명을 각각 독립된 진행률로 나누어 아래에서 위로 순차 공개한다.
- 단계별 local progress 매핑은 이미지 `0–18%`, 제목 `18–36%`, 영문 부제 `36–52%`, 한글 설명 `52–72%`다.
- 첫 번째 카드는 섹션 진입 시 이미지가 이미 보이며, 제목부터 동일한 순서로 공개된다.
- 역방향 스크롤에서는 동일한 local progress를 역산하므로 텍스트와 이미지가 반대 순서로 자연스럽게 복원된다.
- `prefers-reduced-motion`에서는 텍스트 마스크와 이동을 제거해 즉시 읽을 수 있게 한다.

## 미확인

- 동일 viewport에서 실제 프레임 비교
- SplitText의 정확한 줄 전환 타이밍
- 모바일 터치와 scroll-hijack 충돌 여부

원본 HTML, CSS 상태 및 공개 `app.js`의 ScrollTrigger 설정을 기준으로 로컬 scroll progress에 연결한 R5 단계다. 동일 viewport의 프레임 비교는 아직 미완료다.
