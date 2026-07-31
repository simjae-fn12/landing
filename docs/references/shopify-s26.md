# Shopify Spring 2026 reference

## 기본 정보

- Site ID: `shopify-s26`
- 원본: `https://www.shopify.com/editions/spring2026`
- 로컬 route: `/editions/spring2026`
- 조사일: 2026-07-30
- 구현: 원본 SSR/runtime/module graph 로컬 미러
- 현재 게이트: R7 완료

## 런타임 구조

- React Router SSR 문서와 Oxygen 배포 `4097102`의 실행 모듈 그래프
- Three.js 계열 공용 WebGL renderer
- hero 및 각 섹션의 pointcloud, KTX2, GLB, Rive, 영상, sticky scroll timeline
- 로컬 미러 파일 1,829개, Oxygen asset 315개, 원격 미디어/모델/폰트 1,395개
- Rive WASM과 API 응답은 로컬 fixture로 제공

## 검증 결과

- production build: 통과
- 정적 R6 검사: 외부 runtime URL 0, proxy 0, 누락 참조 0
- 오프라인 desktop 1440×900: 전체 38,953px
- 오프라인 mobile 390×844: 전체 56,912px
- 중간 스크롤을 포함한 21개 지점에서 500 페이지 0
- console error 0, exception 0, 외부 요청 0
- 원본 문서 높이와 로컬 문서 높이가 desktop/mobile 모두 일치
- 원본/로컬 0·25·50·75·100% 프레임 비교 완료
- desktop 25% 이후 변경 픽셀 비율 0.09~1.64%, mobile 25% 이후 0~0.01%
- desktop hero는 시간 기반 파티클 캡처 위상 차이로 변경 픽셀 21.77%였으나 HDR/KTX2, camera, scene config와 레이아웃은 일치
- pointer/hover/click/wheel/keyboard 및 mobile touch drag 후 경로 유지, 오류 0

## 장애 및 예방 기록

| 증상 | 실제 원인 | 처리 |
|---|---|---|
| 중간 스크롤에서 500 | 지연 마운트된 섹션이 아직 원격 API/미디어와 upstream proxy에 의존 | API fixture, Rive WASM, 미디어/모델/폰트와 모듈 그래프를 전부 로컬화하고 upstream proxy 제거 |
| desktop hero 검은 화면 | pointcloud loader가 로컬 URL을 내부 ID로 판단해 `.mdpc`를 중복 추가 | 로컬 vendor URL을 직접 자산 URL로 처리하고 pointcloud 호환 route 추가 |
| hero가 금색 기본 자세로 표시 | 프리셋 목록이 pointcloud URL의 `https://` prefix만 허용해 `/vendor/`로 로컬화된 hero preset을 제외 | 로컬 vendor URL도 유효한 preset source로 인정. URL 형태가 선택 조건에 쓰이는 모든 필터를 미러 검증 대상으로 추가 |
| Rive WASM이 다시 외부 요청 | 새 배포에서 URL 생성식이 문자열 연결에서 template literal로 변경 | 두 형식 모두 로컬 fixture로 치환하고 오프라인 runtime 검사에서 외부 요청 0을 강제 |
| Rive 이미지 404 (`.webp&width=`) | query가 없는 로컬 URL에도 `&width=`를 덧붙임 | 로컬 미디어 리사이즈 query의 첫 구분자를 `?`로 치환 |
| 한글 문구 mojibake/hydration mismatch | SSR HTML과 hydration stream을 문자열 치환 | hydration 데이터 사전 치환을 중단. 브랜딩은 hydration 후 별도 레이어에서 처리하도록 전환 |

## 외부 의존성과 라이선스

- 실행 중 필요한 외부 runtime/media/API/proxy: 0
- 원본 갱신은 `npm run mirror:shopify` 명령에서만 수행하며 `prebuild`에서는 수행하지 않음
- 외부 사이트로 이동하는 일반 링크는 남아 있을 수 있으나 실행 의존성은 아님
- Shopify 코드·그래픽·영상·모델·폰트의 재배포 라이선스는 확인되지 않았으며 Shopify의 저작권과 이용약관 검토가 필요

## 게이트

- [x] R1 원본 시각 baseline
- [x] R2 SSR/runtime graph
- [x] R3 미디어·모델·폰트·Worker·WASM 로컬화
- [x] R4 API/CMS/data fixture
- [x] R5 로컬 자산 인벤토리와 무결성 manifest
- [x] R6 네트워크 차단 상태 전체 스크롤 실행
- [x] R7 전체 프레임·상호작용 비교

잔여 실행 의존성은 없다. 시간 기반 WebGL 파티클은 캡처 시점에 따라 픽셀 단위 차이가 발생한다.
