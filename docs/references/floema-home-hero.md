# Floema Home Hero Reference

## 기본 정보

- Site ID: floema-home-hero
- 원본 URL: https://www.floema.com/en
- 로컬 route: `/` 및 `/option-a`
- 현재 완료 단계: R5
- Desktop viewport: 1920 × 950 (사용자 제공 기준 이미지)
- Mobile viewport: 미확인
- Document height: 미확인
- 조사일: 2026-08-03

## 1. 구현 전략

- [x] 직접 재구현
- [ ] 원본 런타임 미러링
- [ ] Hybrid
- 선택 근거: 전체 사이트 복제가 아니라 히어로 영문 메인 카피의 진입 모션 수치만 기존 로컬 히어로에 적용한다.
- iframe은 비교용으로만 사용하는가: 예

## 2. 섹션 지도

| 순서 | 섹션 | top | height | layout | sticky/pin | Canvas/Video | scene key |
|---:|---|---:|---:|---|---|---|---|
| 1 | Intro | 0 | 100vh | fullscreen | pinned | background media | intro |
| 2 | Collections CTA | intro 다음 | `(collections + 1) × 150vh` | fullscreen slides | 101vh sticky | background media | collection index |

## 3. 레이어와 stacking context

| 요소 | containing block | position | bounds | z-index | context 원인 | mask/overflow |
|---|---|---|---|---:|---|---|
| Main English copy | `.collections-wrapper` | relative DOM overlay | 화면 중앙 하단 | slide content | sticky 부모 | SplitText line/word |

## 4. 스크롤 및 장면 전환

| from | to | global range | local range | visible layers | 종료 상태 |
|---|---|---|---|---|---|
| Previous collection | New collection selected | collection threshold | 0–250ms | previous copy | 250ms fade out |
| New title hidden | New title visible | selection + 250ms | 350–1190ms | split words | yPercent 0 / opacity 1 |

## 5. 런타임 모듈

| module | 원본 URL | local path | imports mirrored | patch 필요 | 역할 |
|---|---|---|---|---|---|
| `CollectionsCta` | `https://www.floema.com/_nuxt/C92lDrdn.js` | 없음 | 해당 없음 | 해당 없음 | Collection hero 및 title reveal |

## 6. Asset manifest

이번 작업은 원본 미디어를 복제하지 않으며 기존 NEXT 로컬 에셋을 유지한다.

- 외부 runtime URL 수: 0 (로컬 결과물 기준)
- 외부 media URL 수: 0
- 외부 font URL 수: 0
- Worker/WASM 누락 수: 0

## 7. 서비스 의존성

없음.

## 8. WebGL 구조

- Canvas 구조: 메인 카피는 DOM이며 이 작업 범위에서 Canvas 불필요
- renderer: DOM + GSAP
- pixel ratio: 해당 없음
- tone mapping: 해당 없음
- post-processing: 해당 없음
- scene registry: collection index
- scroll store: GSAP ScrollTrigger (`scrub: true`)
- pointer store: 메인 카피 진입에는 사용하지 않음

## 9. 콘텐츠 매핑

| 원본 역할 | NEXT 역할 | 적용 카피 | 변경 위치 | runtime key 유지 |
|---|---|---|---|---|
| Floema hero main copy reveal | NEXT 3개 hero main copy reveal | 기존 NEXT 영문 카피 | `HeroTransition` | 예 |

### 특수 텍스트

- split-text: GSAP SplitText `type: "lines,words"`, `linesClass: "split-line"`, `wordsClass: "split-word"`
- WebGL/SDF text: 조사 중
- canvas texture text: 조사 중
- glyph 제한: 없음
- 번들 patch signature: `set(words,{yPercent:20,opacity:0})` → `to(words,{yPercent:0,opacity:1,duration:.8,ease:"expo.out",stagger:.02})`

### 확인된 진입 타임라인

- 이전 타이틀은 `duration: .25`, `power1.out`으로 사라진다.
- 새 collection 활성화는 `delayedCall(.25)` 뒤 시작한다.
- 타이틀 컨테이너는 `duration: .4`, `expo.out`으로 페이드된다.
- SplitText 단어 모션은 추가 `0.1초` 뒤 시작한다.
- 각 단어는 `yPercent: 20`, `opacity: 0`에서 `yPercent: 0`, `opacity: 1`로 이동한다.
- 단어 모션은 `duration: .8`, `ease: expo.out`, `stagger: .02`다.
- blur, clip-path, scale 애니메이션은 메인 카피에 적용하지 않는다.

## 10. 원본/로컬 프레임 비교

동일 viewport 자동 캡처 환경이 없어 조사 후 수동 비교 상태를 기록한다.

- 원본 runtime 수치와 로컬 CSS 타임라인의 코드 레벨 비교 완료
- 로컬 SSR에서 세 타이틀 모두 line/word DOM 분리 및 접근성 label 출력 확인
- 동일 viewport의 동영상 프레임 단위 비교는 미완료

## 11. 실패 기록

| 증상 | 실제 원인 | 수정 | 재발 방지 |
|---|---|---|---|
| 조사 전 임의의 blur/clip 모션 적용 위험 | 원본 타임라인 미확인 | 원본 런타임 수치 확인 후 적용 | 번들 내 split 및 tween 설정을 먼저 기록 |

## 12. 완료 게이트

- [x] R1: 원본 visual baseline
- [ ] R2: SSR HTML과 runtime module 로컬화
- [ ] R3: 모든 모델·텍스처·영상·폰트·Worker·WASM 로컬화
- [ ] R4: API/CMS/data 의존성 대체
- [x] R5: 콘텐츠와 장면을 로컬 소스에서 수정 가능
- [ ] R6: 인터넷 차단 상태에서 정상 작동
- [ ] R7: 전체 프레임과 인터랙션 비교 완료

## 13. 최종 검증

- [x] production build 성공
- [ ] 동일 viewport 프레임 비교
- [x] 세 히어로 장면의 진입 및 역방향 전환용 동일 상태 전환 구현 확인
