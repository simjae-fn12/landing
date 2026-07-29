# Reference Site Investigation

## 기본 정보

- Site ID:
- 원본 URL:
- 로컬 route:
- 현재 완료 단계: R0 / R1 / R2 / R3 / R4 / R5 / R6 / R7
- Desktop viewport:
- Mobile viewport:
- Document height:
- 조사일:

## 1. 구현 전략

- [ ] 직접 재구현
- [ ] 원본 런타임 미러링
- [ ] Hybrid
- 선택 근거:
- iframe은 비교용으로만 사용하는가:

## 2. 섹션 지도

| 순서 | 섹션 | top | height | layout | sticky/pin | Canvas/Video | scene key |
|---:|---|---:|---:|---|---|---|---|
| 1 | Hero | 0 |  |  |  |  |  |

## 3. 레이어와 stacking context

| 요소 | containing block | position | bounds | z-index | context 원인 | mask/overflow |
|---|---|---|---|---:|---|---|
|  |  |  |  |  |  |  |

## 4. 스크롤 및 장면 전환

| from | to | global range | local range | visible layers | 종료 상태 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 5. 런타임 모듈

| module | 원본 URL | local path | imports mirrored | patch 필요 | 역할 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

## 6. Asset manifest

| asset | 원본 URL | local path | type | size | hash | usage |
|---|---|---|---|---:|---|---|
|  |  |  |  |  |  |  |

- 외부 runtime URL 수:
- 외부 media URL 수:
- 외부 font URL 수:
- Worker/WASM 누락 수:

## 7. 서비스 의존성

| request | 목적 | local fixture | proxy | offline 대체 |
|---|---|---|---|---|
|  |  |  |  |  |

## 8. WebGL 구조

- Canvas 구조: Global / Section / Hybrid
- renderer:
- pixel ratio:
- tone mapping:
- post-processing:
- scene registry:
- scroll store:
- pointer store:

| scene | model/group | asset | camera | transform | active range | DOM overlay |
|---|---|---|---|---|---|---|
|  |  |  |  |  |  |  |

## 9. 콘텐츠 매핑

| 원본 역할 | NEXT 역할 | 적용 카피 | 변경 위치 | runtime key 유지 |
|---|---|---|---|---|
|  |  |  |  |  |

### 특수 텍스트

- split-text:
- WebGL/SDF text:
- canvas texture text:
- glyph 제한:
- 번들 patch signature:

## 10. 원본/로컬 프레임 비교

| global % | scrollY | section progress | original | local | size delta | timing delta | fix |
|---:|---:|---:|---|---|---:|---:|---|
|  |  |  |  |  |  |  |  |

## 11. 실패 기록

| 증상 | 실제 원인 | 수정 | 재발 방지 |
|---|---|---|---|
|  |  |  |  |

## 12. 완료 게이트

- [ ] R1: 원본 visual baseline
- [ ] R2: SSR HTML과 runtime module 로컬화
- [ ] R3: 모든 모델·텍스처·영상·폰트·Worker·WASM 로컬화
- [ ] R4: API/CMS/data 의존성 대체
- [ ] R5: 콘텐츠와 장면을 로컬 소스에서 수정 가능
- [ ] R6: 인터넷 차단 상태에서 정상 작동
- [ ] R7: 전체 프레임과 인터랙션 비교 완료

## 13. 최종 검증

- [ ] console error 0
- [ ] failed request 0
- [ ] CORS error 0
- [ ] loader 완료
- [ ] localhost 정상
- [ ] LAN IP 정상
- [ ] offline 정상
- [ ] desktop 전체 페이지 정상
- [ ] mobile 전체 페이지 정상
- [ ] 모든 sticky/pinned 시작·중간·종료 비교
- [ ] pointer/hover/click/drag/keyboard 비교
- [ ] 외부 runtime URL 0
- [ ] 외부 media URL 0
- [ ] production build 성공
