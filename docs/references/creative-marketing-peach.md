# Creative Marketing — Option B reference

## 대상

- Reference: `https://creativemarketing.peachweb.io/`
- Local route: `/option-b`
- 조사일: 2026-07-31
- 구현: 원본 SSR DOM/CSS 로컬화 + 로컬 Three.js 장면

## 전체 섹션 순서

1. 고정 내비게이션
2. Hero
3. Solutions
4. Partners
5. Features
6. Key Features
7. Solutions by business size
8. Benefits
9. Testimonials
10. Pricing
11. CTA / Footer

원본은 각 섹션마다 서로 다른 최대 폭, 내부 그리드, 상하 여백을 사용한다.
따라서 공통 2열 컴포넌트로 재해석하지 않고 원본 DOM 계층과 반응형 CSS를
그대로 로컬 기준선으로 사용한다.

## 레이아웃과 장면

- 내비게이션은 뷰포트 상단에 고정된다.
- Hero는 100vh 장면 뒤에 약 50vh의 전환 여백을 둔다.
- Key Features는 교차 배치되는 텍스트/이미지 행을 사용한다.
- Features, Solutions, Pricing은 서로 다른 카드 그리드와 간격을 사용한다.
- 고정 WebGL 캔버스 한 개가 Hero, 중간 기능 구간, 하단 CTA에서 장면 상태를
  전환한다.
- 스크롤과 포인터 입력은 목표값과 현재값을 분리해 감쇠 보간한다.

## 로컬화 범위

- 공개 SSR 본문과 `website-base.css`, `styles.css`를 명시적 캡처 명령으로
  가져온다.
- 원격 이미지, SVG, WebP와 폰트는 `/assets/option-b/` 아래 로컬 경로로
  변환한다.
- PeachWeb 로딩 화면, 배지, 상태 JSON, 실행 스크립트는 포함하지 않는다.
- iframe을 사용하지 않는다.
- 원본의 빈 WebGL 마운트 요소는 제거하고 로컬 Three.js 캔버스로 대체한다.
- 갱신 명령: `npm run prepare:option-b`

## 반응형과 대체 동작

- 원본 CSS의 데스크톱/태블릿/모바일 미디어 쿼리를 유지한다.
- WebGL 로딩 실패 시에도 모든 텍스트와 일반 이미지 콘텐츠는 DOM으로
  표시된다.
- 캔버스 DPR 상한, ResizeObserver, 자원 dispose를 적용한다.

## 검증 상태

- `next build`: 통과
- 원격 PeachWorlds 미디어 URL: 실행 산출물에서 제거
- PeachWeb 실행 스크립트 및 “Made in PeachWeb” 배지: 제거
- 시각 비교: 현재 연결된 브라우저 세션이 없어 자동 스크린샷 비교는 미완료
- 원본 WebGL 런타임은 로컬 Three.js로 대체되어 3D 타임라인은 추가 미세
  보정 대상이다.
