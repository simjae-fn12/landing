# Mercury Command Reference Investigation

## 기본 정보

- Site ID: `mercury-command`
- 원본 URL: `https://mercury.com/command`
- 조사 날짜: 2026-07-28
- 구현 경로: `/concepts/mercury-command`
- 직접 브라우저 캡처: 연결 가능한 브라우저가 없어 미완료
- 소스 조사: 공개 HTML, CSS, Next.js 페이지 Chunk 및 동적 Canvas Chunk 분석 완료
- 자산 사용: 로컬 구현에는 다운로드한 공개 비디오 2개를 디자인 스터디 목적으로 사용. 배포 권리는 별도 확인 필요.

## 1. 한 줄 정의

어두운 금융 데이터 파티클 공간에서 자연어 명령 UI가 등장하고, 긴 Sticky 스크롤을 통해 금융 업무가 실행되는 과정을 보여주는 AI 오퍼레이터 랜딩페이지.

## 2. 섹션 맵

| 순서 | 섹션 | 높이/구조 | Theme | Canvas |
|---|---|---|---|---|
| 1 | Hero Command Flow | 약 350lvh / Sticky 100lvh | Dark purple | Particle Canvas |
| 2 | Task Slideshow | 약 150lvh 이상 | Neutral dark | Hero와 연결 |
| 3 | Capabilities | Long cards | Light | 없음 |
| 4 | Command Universe | Marquee/list | Dark | 없음 |
| 5 | Trust | Two-column | Light | 없음 |
| 6 | Related Products | Card grid | Light | 이미지/비디오 |
| 7 | Final CTA/Footer | Large CTA | Dark/neutral | 없음 |

## 3. Canvas 구조

- 구조 유형: Hero Section Canvas
- Canvas 개수: Hero 핵심 Canvas 1개
- DOM 위치: `350lvh` Hero의 `sticky top-0 h-lvh` 내부
- GLB/GLTF 모델: 없음
- 파티클 데이터: 정적 Float32Array와 Seeded Random으로 생성
- 포인트 구성: 10개 수평 링, 약 9,000개 이상의 링 포인트, 별도 Scatter 약 400개
- 모드: Sphere/Circle 구조에서 Flow 형태로 스크롤 변형
- 배경: 짙은 네이비·퍼플 그라디언트와 노이즈

## 4. 주요 인터랙션

- Hero 높이: 약 `350lvh`
- Sticky viewport 안에서 CTA, 타이틀, 파티클과 Command UI가 스크롤 값으로 전환
- 파티클에 Sine, Noise, Pulse 설정 적용
- 채팅 슬라이드는 Intersection Observer로 중앙 통과 시 활성화
- 데스크톱은 가로 흐름, 일부 뷰포트는 세로 흐름
- Hero 마지막에 대형 마스크 타이포와 채팅 UI가 결합
- `prefers-reduced-motion` 대응 존재

## 5. 시각 언어

- 배경: `#161625`에 가까운 네이비 블랙
- 파티클: 아이보리 화이트 및 퍼플
- UI 패널: 반투명 블랙, 퍼플 경계선과 내부 Glow
- Light 섹션: 따뜻한 아이보리/그레이
- 타이포: 매우 큰 산세리프 Display와 작은 UI 텍스트 조합
- 모서리: 큰 Radius의 채팅 패널과 Pill CTA

## 6. 로컬 자산

| 자산 | 로컬 경로 | 용도 |
|---|---|---|
| OG reference | `/assets/mercury-command/og.jpg` | 조사 참고 |
| Unusual transaction | `/assets/mercury-command/unusual-transaction.mp4` | 제품 카드 모션 |
| Confirm payment | `/assets/mercury-command/confirm-payment.mp4` | 제품 카드 모션 |

## 7. NEXT 증권 콘텐츠 매핑

| Mercury 역할 | NEXT 증권 역할 |
|---|---|
| Command financial operator | NEXT AI 금융 오퍼레이터 |
| Natural language task execution | 자연어 기반 금융 업무 탐색·실행 지원 |
| Review and approve | Compliance-by-Design 승인 흐름 |
| Insights | AI-Native Intelligence |
| Mercury universe | NEXT 엔터프라이즈 금융 기능 |
| Accuracy/control | 데이터 출처·권한·감사 추적 |
| Open account CTA | B2B 파트너십 문의 |

## 8. 구현 체크리스트

- [x] 공개 HTML과 페이지 콘텐츠 조사
- [x] Next.js Page Chunk 조사
- [x] 동적 Canvas Chunk 및 파티클 설정 조사
- [x] Hero `350lvh` 및 Sticky 구조 확인
- [x] 비디오 자산 로컬화
- [ ] 원본 데스크톱 직접 캡처 비교
- [ ] 원본 모바일 직접 캡처 비교
- [ ] 포인터·트랙패드 체감 비교
- [ ] 배포 자산 사용 권한 확인

