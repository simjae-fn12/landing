# Reference Site Investigation Template

## 기본 정보

- Site ID:
- 원본 URL:
- 조사일:
- Desktop viewport:
- Mobile viewport:
- Document height:
- 캡처 간격:
- 캡처 프레임 수:

## 1. 한 줄 정의

사이트의 핵심 시각 전략과 스크롤 경험을 한 문장으로 작성한다.

## 2. 전체 섹션 맵

| 순서 | 섹션 | top | height | theme | layout | pin/sticky | Canvas/Video |
|---:|---|---:|---:|---|---|---|---|
| 1 | Hero | 0 |  | Dark | centered | sticky | Canvas 0 |

## 3. 레이어와 stacking context

| 요소 | 부모/containing block | position | bounds | z-index | context 원인 | overflow/mask |
|---|---|---|---|---:|---|---|
|  |  |  |  |  |  |  |

## 4. 섹션 overlap과 handoff

| from | to | scroll range | overlap 방식 | visible layers | 종료 상태 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 5. 프레임 타임라인

| frame | global scroll | section progress | scene | visible copy | layout 변화 | Canvas 변화 |
|---:|---:|---:|---|---|---|---|
| 0 | 0 | 0 | Opening |  |  |  |

## 6. Canvas / WebGL 구조

- 유형: Global / Section / Hybrid
- Canvas 개수:
- DOM 위치:
- 활성 범위:
- pixel ratio:
- offscreen pause:

| scene/group | objects | asset/procedural | camera | transform | active range | DOM overlay |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 7. Asset manifest

| asset | URL | type | size | compression | usage | license |
|---|---|---|---:|---|---|---|
|  |  |  |  |  |  |  |

## 8. Material / Lighting / Post-processing

- Material:
- Environment:
- Lights:
- Tone mapping:
- Exposure:
- Bloom:
- SSAO:
- DOF:
- Noise:
- Vignette:
- Color correction:

## 9. Scroll mechanics

- progress 기준:
- pin distance:
- smoothing/lerp:
- velocity response:
- horizontal rail distance:
- active index boundaries:
- entry handoff:
- exit handoff:

## 10. Pointer / Touch / Keyboard

| input | target | response | range | easing | accessibility fallback |
|---|---|---|---|---|---|
| Pointer |  |  |  |  |  |

## 11. Responsive 차이

### Desktop

### Tablet

### Mobile

- DOM 교체:
- Canvas 교체/비활성화:
- section height:
- typography:
- touch behavior:

## 12. NEXT증권 콘텐츠 매핑

| 원본 섹션 역할 | NEXT 역할 | 적용 카피 | 유지할 인터랙션 |
|---|---|---|---|
|  |  |  |  |

## 13. 현재 구현과의 차이

- [ ] 섹션 높이
- [ ] grid/layout bounds
- [ ] sticky/fixed 구조
- [ ] z-index/stacking context
- [ ] overlap/handoff
- [ ] Canvas scene
- [ ] scroll timing
- [ ] mask/clip
- [ ] slider/accordion
- [ ] pointer/hover
- [ ] mobile

## 14. 검증 체크리스트

- [ ] 전체 페이지 1% 프레임 캡처
- [ ] 모든 섹션 bounds 기록
- [ ] sticky/fixed/absolute 목록 작성
- [ ] stacking context 기록
- [ ] overlap/handoff 기록
- [ ] Canvas/asset manifest 작성
- [ ] 데스크톱 원본/로컬 비교
- [ ] 모바일 원본/로컬 비교
- [ ] hover/click/drag/keyboard 검증
- [ ] 콘솔 및 네트워크 오류 없음
- [ ] 프로덕션 빌드 통과

## 15. Model and camera calibration

| scene | model/node | authored scale | runtime scale | rotation | position | camera FOV/z | screen bounds |
|---|---|---:|---:|---|---|---|---|
|  |  |  |  |  |  |  |  |

- GLB normalization used: yes / no
- If yes, evidence that the original normalizes:
- Clone/reveal material:
- Shader uniforms:
- Animation clips or GSAP timeline:
- Model load completion wait:

## 16. Original/local frame delta

| global % | scrollY | section progress | original state | local state | size delta | timing delta | fix |
|---:|---:|---:|---|---|---:|---:|---|
|  |  |  |  |  |  |  |  |

- [ ] Same viewport and devicePixelRatio
- [ ] Same scroll position and settled smoothing
- [ ] Object width/height/center measured in pixels
- [ ] Camera FOV, z, target verified
- [ ] Child-node transforms verified
- [ ] Scene entry and exit verified
- [ ] No stale model from previous section
- [ ] No unintended simultaneous scene groups
- [ ] All non-hero sections checked independently
- [ ] Full 1% comparison rerun after final adjustment
