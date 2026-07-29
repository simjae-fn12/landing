# 04 — Shopify Editions Spring ’26 / Everywhere

## Reference

- Original: `https://www.shopify.com/editions/spring2026`
- Current route: `/concepts/active-theory`
- Local runtime route: `/editions/spring2026`
- Concept route: `/concepts/active-theory` redirects to the local runtime; no iframe is used.
- Runtime mirror builder: `scripts/mirror-shopify-s26.mjs`
- Offline fallback runtime: `/legacy/shopify-s26/index.html`
- Content direction: Shopify Spring ’26의 인터랙션 문법을 NEXT 증권의 B2B 메시지로 치환

## 구현 원칙

1. 카피를 바꾸기 전에 원본의 섹션 순서, 고정 구간, 캔버스 레이어, 장면 전환을 먼저 복원한다.
2. WebGL 캔버스는 페이지 전체에서 하나만 고정하고 DOM 콘텐츠를 그 위에 배치한다.
3. 섹션마다 별도 모델을 사용하며, 하나의 히어로 모델을 전 구간에서 반복하지 않는다.
4. 현재 장면과 다음 장면만 활성화하고 섹션 후반 22%에서 분해 및 교차 전환한다.
5. 마우스 이동은 카메라와 포인트 반발에, 스크롤 속도는 포인트 분산량에 반영한다.
6. 원본 자산을 외부 네트워크에 의존하지 않도록 로컬에 보존한다.

## 확인된 원본 구조

- 단일 fixed WebGL canvas가 전체 페이지의 분위기, MDPC 포인트클라우드, 장면 전환을 담당한다.
- DOM은 내비게이션, 타이포그래피, 정보 카드, 링크와 접근성 인터랙션을 담당한다.
- 스크롤 값은 React 재렌더링이 아니라 shader uniform, 카메라, 장면 가시성에 직접 전달된다.
- 원본 MDPC는 deflate 스트림, 12-bit 양자화 좌표, Y/Cb/Cr 색상 데이터로 구성된다.
- 원본은 Hero 이후에도 서로 다른 포인트클라우드 자산과 에디토리얼 콘텐츠 그룹을 교차 배치한다.

## 현재 구현

- 기본 4번 라우트는 로컬에 미러링한 원본 SSR HTML과 Oxygen 런타임 청크를 `/editions/spring2026`에서 실행한다.
- `scripts/mirror-shopify-s26.mjs`는 원본 HTML에서 시작해 JavaScript import와 CSS URL을 재귀 탐색하고 로컬 자산 경로로 변환한다.
- Hydrogen 런타임의 동일-origin 데이터 요청은 `/shopify-upstream`을 통해 Shopify의 허용된 경로로만 전달한다.
- 원본 서버에 접근할 수 없는 환경을 위한 독립형 WebGL 구현은 `/legacy/shopify-s26/index.html`에 보존한다.

- 원본 Shopify 배포 데이터에서 확보한 MDPC 포인트클라우드 7종을 로컬 자산으로 사용한다.
- 히어로는 360vh sticky 구간이며, 거대한 `Everywhere` 타이포와 원형 반복 타이포, 중앙 포인트 모델을 독립적으로 움직인다.
- 후속 장면은 Forest, Mini point cloud, Submerged Arches, Globe, Retail, Shop App 자산으로 분리했다.
- WebGL 장면 사이에 밝고 어두운 에디토리얼 카드 그리드를 배치해 원본 Editions의 정보 밀도와 리듬을 재현했다.
- NEXT 콘텐츠는 AI-Native, Media-First, Headless, Compliance-by-Design, Global R&D, Enterprise 강점으로 구성했다.
- 로더는 모든 로컬 MDPC 자산의 디코딩 완료율을 실제로 표시한다.

## 정밀 QA 체크리스트

1. 원본과 로컬을 동일한 viewport와 동일한 정규화 scroll progress에서 비교한다.
2. 각 섹션의 0%, 25%, 50%, 75%, 100% 프레임을 캡처한다.
3. 히어로 타이포 크기, 모델 점유율, 하단 정보선, 네비게이션 기준선을 먼저 맞춘다.
4. 섹션별 sticky 시작점과 해제점, absolute 요소의 기준 부모, z-index 순서를 기록한다.
5. 느린 휠, 빠른 휠, 트랙패드 관성, 마우스 네 모서리 이동을 각각 검증한다.
6. 로컬호스트와 LAN IP에서 MDPC, Worker, Three.js가 모두 200으로 로드되는지 확인한다.
7. 콘솔 예외 0건, WebGL canvas 1개, 로더 완료, 전체 스크롤 높이를 자동 검사한다.
