# Creative Marketing Peach — B안 인터랙션 재조사

조사일: 2026-07-31  
원본: https://creativemarketing.peachweb.io/  
로컬: `/option-b`

## 원본 런타임

- 원본은 `/script.js`와 `658`, `928`, `191`, `720` 런타임 청크를 로드한다.
- 데스크톱은 `ui-state.json` 기준 `smooth` 스크롤이며 duration은 `1200ms`다.
- 모바일은 별도 장면 카메라와 native scroll을 사용한다.
- 전역 WebGL 캔버스 `#ijsk` 하나가 고정되어 있고 위치 기반 타임라인으로
  카메라와 동전 모델 상태를 전환한다.
- 공개 에셋에는 `coin-single-angled-v2-optimize.glb`,
  `coin-single-angled-v3-optimize.glb`, 배경 및 normal/environment 텍스처가 있다.
- CSS에 3개의 sticky 소개 블록이 존재한다.
  - Key Features: `#i1lwz-2-6-2-3`
  - Solutions: `#i1lwz-2-6-2-4`
  - Benefits: `#i1lwz-2-6-2-3-2`

## 섹션별 복원 기준

1. Header
   - fixed glass navigation
   - 내부 앵커 smooth scroll
   - B안에는 실제 섹션 앵커와 현재 섹션 상태가 필요하다.
2. Hero
   - fixed WebGL, 포인터 감쇠 반응, 스크롤 카메라/모델 이동
   - B안 데스크톱은 구현되었고 모바일 카메라 보정은 추가 검증이 필요하다.
3. Solutions dashboard
   - 반투명 패널이 WebGL 장면 위에 겹친다.
   - 패널 진입 reveal과 내부 이미지 parallax가 필요하다.
4. Partners / Core Differences
   - 7열 glass tile과 캔버스 오브젝트가 중첩된다.
   - 타일 hover lift, 빛 번짐, stagger reveal이 필요하다.
5. Features index
   - 3열 이미지 카드다.
   - 이미지 hover scale과 카드별 stagger reveal이 필요하다.
6. Key Features / Core Strengths
   - 대형 이미지와 텍스트가 교차 배치된다.
   - 행 진입 시 이미지와 텍스트가 반대 방향에서 나타나야 한다.
   - `core_01`~`core_04`는 네 개 슬롯으로 유지한다.
   - `core_02`와 `core_03`의 바이너리가 같아도 임의로 제거하지 않는다.
7. Benefits / Quantitative Proofs
   - 좌측 소개는 sticky, 우측 수치 패널은 스크롤된다.
   - B안 전용 원화/달러 동전 장면과 카드 stagger/hover를 적용한다.
8. Final CTA / Footer
   - WebGL 장면이 종료되고 독립된 마감 장면으로 전환된다.
   - CTA 텍스트 reveal, 버튼 hover, 푸터 링크 hover가 필요하다.

## 현재 누락된 인터랙션

- 네 번째 Core Strengths 행
- 전체 섹션 공통 reveal/stagger 시스템
- Features 이미지 hover scale
- Core Differences glass tile hover
- Core Strengths 교차 방향 reveal 및 이미지 parallax
- Quantitative 카드 stagger 및 hover
- 헤더 메뉴 실제 앵커 이동과 active 상태
- CTA/푸터 진입 전환
- reduced-motion 정적 대체 상태
- 모바일 전용 WebGL 카메라 및 프레임 검증

## 현재 단계

- 런타임/에셋 로컬화: R5
- 오프라인 빌드: 통과
- 동일 뷰포트 프레임 비교: 미완료
- 인터랙션 충실도: R7 미완료
