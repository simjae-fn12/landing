# Reference Site Investigation

## 기본 정보

- Site ID: fitosauna-home-accordion
- 원본 URL: https://fitosauna.com/ (확인 가능한 동일 런타임: https://dev.fitosauna.com/)
- 로컬 route: `/`의 `Next-Strengths`
- 현재 완료 단계: R1
- Desktop viewport: 1920 × 900
- Mobile viewport: 원본 CSS breakpoint 768px
- Document height: 20,921px (2026-08-03 공개 런타임), 대상 accordion은 900px/100dvh + 80vh pin
- 조사일: 2026-08-03

## 1. 구현 전략

- [x] 직접 재구현
- [ ] 원본 런타임 미러링
- [x] Hybrid
- 선택 근거: 전체 사이트 복제가 아니라 Next-Strengths에 accordion의 진행선·이미지 리빌 타이밍만 이식한다.
- iframe은 비교용으로만 사용하는가: 예

## 2. 섹션 지도

| 순서 | 섹션 | layout | sticky/pin | Canvas/Video |
|---:|---|---|---|---|
| 1 | Hero | full viewport | sequence | video/image sequence |
| 2 | Text blocks | stacked | no | DOM |
| 3 | Info blocks | cards | no | image |
| 4 | Video | full width | no | video |
| 5 | European homes accordion | 50/50 image + copy | desktop `top top`, `+=80%` pin | DOM background images |
| 6 | Comparison table | grid | no | DOM |
| 7 | Certificates | grid | no | image/SVG |
| 8 | Testimonials | carousel | no | image |
| 9 | CTA | footer CTA | no | image |

## 3. 레이어와 stacking context

| 요소 | position | z-index | mask/overflow |
|---|---|---:|---|
| `.accordion-section .image-block` | relative | auto | overflow hidden |
| `.image` | absolute | 1 | `clip-path: inset(100% 0 0)` |
| `.image.was-active` | absolute | 2 | 완성 프레임 유지 |
| `.image.is-active` | absolute | 3 | `clip-path: inset(0)` |
| `.accordion-item .progress` | absolute | auto | 1px width progress |

## 4. 스크롤 및 장면 전환

| from | to | local range | visible layers | 종료 상태 |
|---|---|---|---|---|
| section enter | pinned | `top top` | 50/50 accordion | desktop pin 시작 |
| pinned | exit | `+=80%` | 동일 | pin 종료 |
| item start | item end | 5000ms linear | 현재 진행선 + 현재 이미지 | 진행선 100% |
| image change | reveal end | 1000ms | 이전 이미지 + 신규 이미지 | 신규 이미지 scale 1, clip 0 |

원본은 스크롤 중 섹션을 pin하지만 항목 전환 자체는 IntersectionObserver 진입 후 5초 자동 타이머다. 1920×900 실측에서 첫 상태의 진행선은 144.141px까지 채워졌고, 5초 뒤 두 번째 상태가 활성화되며 두 번째 진행선은 252.609px까지 채워졌다. 사용자는 스크롤에 따른 진행을 요청했으므로 로컬에서는 동일한 선형 진행선과 이미지 리빌을 scroll scrub에 매핑한다.

## 5. 런타임 모듈

| module | 원본 URL | patch 필요 | 역할 |
|---|---|---|---|
| global runtime | `/wp-content/uploads/siteground-optimizer-assets/global.min.js` | 분석만 | 5초 타이머, 항목/이미지 활성화 |
| compiled CSS | `/wp-content/themes/fitosauna-theme/dist/css/custom.min.css` | 분석만 | 1px 진행선, clip-path/scale 전환 |
| GSAP | jsdelivr GSAP 3.14.1 | 로컬 미사용 | pin과 split text |

## 6. Asset manifest

- 원본 이미지는 복제하지 않는다.
- NEXT의 기존 `/landing/content-strengths.png` 크롭 이미지만 사용한다.
- 로컬 구현의 외부 runtime URL 수: 0
- 로컬 구현의 외부 media URL 수: 0
- Worker/WASM 누락 수: 0

## 7. 콘텐츠 매핑

| 원본 역할 | NEXT 역할 | 변경 위치 |
|---|---|---|
| 5개 accordion item | 3개 strength 단계 | `CapabilitiesSection.js` |
| active line progress | 세 카드의 같은 순번 실선을 동시에 채움 | `CapabilitiesSection.js`, `globals.css` |
| active image wipe | 중앙 카드 이미지를 아래→위 마스크로 교체 | `CapabilitiesSection.js`, `globals.css` |
| active copy panel | 중앙 카드 회색 패널을 유지 | `globals.css` |

## 8. 원본/로컬 프레임 비교

| section progress | original | local 목표 |
|---:|---|---|
| 0% | 첫 행 progress 시작 | 세 카드의 첫 번째 실선 시작, 중앙 첫 이미지 |
| 33% | 다음 accordion state | 첫 실선 3개 완료, 중앙 두 번째 이미지 리빌 |
| 66% | 다음 accordion state | 두 번째 실선 3개 완료, 중앙 세 번째 이미지 리빌 |
| 100% | 마지막 state 완료 | 세 카드의 세 번째 실선까지 완료 |

## 9. 완료 게이트

- [x] R1: 사용자 프레임과 공개 SSR/CSS/JS로 기준 확보
- [ ] R5: 로컬 scroll scrub 구현
- [ ] R7: 동일 viewport 시작·중간·종료 프레임 및 역방향 검증

## 제약 및 의도적 차이

- 원본 항목은 5초 자동 순환이지만 NEXT는 사용자 요청에 따라 스크롤 위치가 곧 진행률이 되도록 변경한다.
- 원본은 좌측 이미지 한 장을 교체하지만 NEXT는 3열 구성을 유지하고 중앙 카드의 이미지만 교체한다.
- 공개 원본의 미디어를 내려받거나 연결하지 않고 저장소의 기존 strength 스프라이트만 재사용한다.
- 이 문서는 전체 Fitosauna 사이트 복제가 아니라 대상 interaction의 R1 조사 기록이다.
