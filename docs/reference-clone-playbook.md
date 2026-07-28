# 전체 랜딩 레퍼런스 복제 플레이북

## 1. 목표

레퍼런스의 분위기를 참고하는 수준이 아니라, 페이지 전체의 레이아웃 시스템과 스크롤 시퀀스를 재현한다. 조사 순서는 다음과 같다.

1. 전체 페이지 구조
2. 섹션과 그룹 레이아웃
3. stacking context와 overlap
4. scroll/pin/sticky timeline
5. Canvas/WebGL scene
6. 미세 인터랙션
7. 반응형 차이
8. NEXT증권 콘텐츠 치환

## 2. 조사 산출물

사이트마다 다음 파일을 만든다.

```text
docs/references/<site-id>.md
reference-captures/<site-id>/original/
reference-captures/<site-id>/local/
reference-captures/<site-id>/layout.json
reference-captures/<site-id>/timeline.json
scripts/capture-<site-id>-reference.mjs
scripts/capture-<site-id>-local.mjs
```

캡처 이미지는 로컬 QA 자료이며 기본적으로 Git에 포함하지 않는다. 문서와 재현 스크립트는 저장소에 포함한다.

## 3. Phase A — 전체 페이지 계측

### A1. 문서 좌표

다음을 자동 추출한다.

- viewport width/height
- document scrollHeight
- header/footer bounds
- 모든 section과 주요 wrapper의 top, height, bottom
- sticky/fixed/absolute 요소 목록
- Canvas, SVG, video, image bounds
- overflow가 hidden/clip인 컨테이너
- z-index가 auto가 아닌 요소
- transform/filter/opacity로 stacking context를 만드는 요소

### A2. 전 프레임 캡처

- 전체 문서를 1% 또는 50~100px 간격으로 캡처한다.
- 각 섹션은 최소 시작·25%·50%·75%·종료 프레임을 확보한다.
- pinned animation은 1%보다 촘촘하게 캡처한다.
- 캡처와 동시에 가시 DOM 텍스트·좌표·opacity를 timeline JSON에 기록한다.

### A3. 레이아웃 그룹 분해

각 섹션을 다음 단위로 분해한다.

```text
Section
├─ Flow layer
├─ Sticky/Fixed layer
├─ Absolute decoration layer
├─ Canvas/Video layer
├─ Mask/Overlay layer
└─ Interaction layer
```

화면에 같이 보인다는 이유로 같은 컨테이너라고 가정하지 않는다. DOM 조상과 containing block을 확인한다.

## 4. Phase B — 레이아웃과 stacking context

### B1. Position 표

| 요소 | 부모 | position | bounds | z-index | stacking context 원인 | overflow |
|---|---|---|---|---:|---|---|
| Header | body | fixed | 0,0,100vw,72px | 100 | backdrop-filter | visible |

### B2. 섹션 overlap 표

| 이전 섹션 | 다음 섹션 | overlap 길이 | 방식 | 전환 프레임 |
|---|---|---:|---|---|
| Hero | Product rail | 600px | sticky + absolute translate | 44~54% |

확인 항목:

- 음수 margin
- absolute bottom overflow
- sticky가 다음 섹션까지 유지되는지
- clip-path/mask로 가려진 영역
- fixed canvas 위를 DOM 배경이 덮는 시점
- z-index가 같지만 DOM 순서로 앞뒤가 결정되는 경우

## 5. Phase C — 스크롤 타임라인

섹션마다 독립적인 progress를 사용한다.

| scene | section progress | scroll px | 진입 | 유지 | 이탈 | 주요 속성 |
|---|---:|---:|---|---|---|---|
| Opening copy | 0~0.09 | 0~560 | fade in | center | up/fade | opacity, y |
| Ring | 0.10~0.31 | 620~1930 | converge | rotate | mask | geometry |

반드시 기록할 속성:

- position / rotation / scale
- opacity / visibility
- clip-path / mask position
- blur / filter
- background color
- camera parameters
- horizontal rail translate
- active index
- text content change

## 6. Phase D — Canvas와 미디어

### D1. 구조 판정

- Global Canvas: 하나의 fixed/sticky Canvas가 여러 섹션 scene을 전환
- Section Canvas: 섹션별 Canvas가 독립적으로 존재
- Hybrid: 전역 배경 Canvas와 섹션별 Canvas가 함께 존재

### D2. scene manifest

| scene | Canvas | objects | asset | camera | active range | DOM overlay |
|---|---|---|---|---|---|---|
| Hero | canvas-0 | particles/rings | procedural | FOV 45 | 0~31% | copy/labels |

### D3. 미디어 동기화

- 영상이 autoplay loop인지 scroll-scrub인지 확인한다.
- image sequence라면 frame 수와 preload 방식을 확인한다.
- Canvas와 DOM mask가 결합되는 경우 어느 레이어가 구멍인지 확인한다.
- viewport 밖에서 렌더링을 중지하는지 확인한다.

## 7. Phase E — 비스크롤 인터랙션

각 입력을 별도 기록한다.

| 입력 | 대상 | 시작 상태 | 반응 | easing | 종료/복귀 |
|---|---|---|---|---|---|
| Pointer move | Hero Canvas | center | yaw/pitch | lerp | center return |
| Hover | Card | idle | media reveal | ease-out | reverse |
| Click | Accordion | closed | panel swap | 400ms | persistent |

Wheel과 trackpad의 차이, touch swipe, keyboard focus, reduced motion도 확인한다.

## 8. Phase F — 구현 순서

1. 전체 섹션 DOM과 높이
2. fixed/sticky/absolute 레이어
3. z-index와 overflow
4. 섹션 overlap과 handoff
5. 기본 타이포그래피와 grid
6. scroll progress와 scene state
7. Canvas/WebGL
8. mask/clip/filter
9. slider/accordion/menu
10. 모바일
11. NEXT증권 콘텐츠 치환

Canvas를 먼저 만들지 않는다. 컨테이너 높이와 pin 구간이 틀리면 모든 scene 타이밍이 틀어진다.

## 9. Phase G — 검증 루프

1. 원본과 로컬을 같은 viewport로 캡처
2. 같은 scroll px 또는 section progress끼리 비교
3. 다음 순서로 차이를 수정
   - 섹션 높이와 경계
   - 레이아웃 bounds
   - z-index/overlap
   - 타이포그래피
   - Canvas camera/geometry
   - 색상과 후처리
   - 미세 easing
4. 수정 후 전체 프레임을 다시 캡처
5. 한 구간 수정으로 다른 구간이 깨지지 않았는지 확인

## 10. 금지 사항

- 히어로만 보고 전체 랜딩을 추정하지 않는다.
- 최소 5장 캡처만으로 완료하지 않는다.
- 원본을 확인하지 않고 임의 Canvas 효과를 만들지 않는다.
- 모든 섹션에 같은 3D scene을 반복하지 않는다.
- `position:absolute`를 좌표 맞추기 용도로 무분별하게 사용하지 않는다.
- z-index 숫자를 임의로 키워 문제를 숨기지 않는다.
- 빌드 성공만으로 완료 처리하지 않는다.

## 11. 미세 보정 필수 게이트

미세 보정은 구현 후 선택적으로 다듬는 작업이 아니라 레퍼런스 복제의 필수 완료 조건이다.

### 동일 좌표 비교

- 원본과 로컬은 같은 viewport, 같은 `scrollY`, 같은 section progress에서 비교한다.
- 전역 퍼센트만 맞추지 말고 `sectionStart`, `sectionEnd`, `pinDistance`로 local progress를 계산한다.
- 전역 1% 프레임 전체와 각 장면의 진입·25%·50%·75%·이탈 프레임을 비교한다.
- 모델 로딩과 scroll smoothing이 안정된 뒤 캡처한다.

### 모델과 카메라

- GLB를 bounding box 기준으로 임의 정규화하지 않는다. 원본의 authored scale 사용 여부를 먼저 확인한다.
- 원본 카메라의 `FOV`, position, near/far, target을 번들 또는 런타임에서 추출한다.
- scene root뿐 아니라 하위 node별 position·rotation·scale·visibility와 material 교체 여부를 기록한다.
- 모델 화면 점유율을 픽셀로 비교한다: 좌우 폭, 상단, 하단, 중심점, 주요 인물/제품 높이.
- 원본이 clone, reveal material, dissolve shader를 사용하면 기본 GLB 재질만 표시한 상태를 완료로 인정하지 않는다.
- 여러 모델의 active range를 각각 기록하고 이전 장면 잔류와 의도하지 않은 동시 노출을 검사한다.

### 오차 기록

| 항목 | 원본 | 로컬 | 오차 | 조치 |
|---|---:|---:|---:|---|
| 모델 화면 폭 | px | px | % | camera/scale |
| 주요 인물 높이 | px | px | % | node transform |
| 타이포 top | px | px | px | layout |
| 배경 전환 | scroll px | scroll px | px | active range |
| sticky 종료 | scroll px | scroll px | px | section height |

### 완료 조건

- 히어로만 맞고 후속 장면이 근사 상태인 구현은 완료가 아니다.
- 모든 섹션의 모델, 영상, 타이포, 배경, sticky handoff를 비교한다.
- HTTP 200, 빌드 성공, 모델 표시 여부만으로 시각 QA를 통과했다고 판단하지 않는다.
- 사용자가 특정 장면 캡처만 제공해도 작업 범위는 랜딩 전체이며 나머지 장면은 에이전트가 직접 확인한다.
