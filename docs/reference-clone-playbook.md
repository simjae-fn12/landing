# 레퍼런스 사이트 3종 클론 제작 플레이북

## 1. 목적

앞으로 제작할 약 3개의 레퍼런스 기반 랜딩페이지를 동일한 방식과 품질 기준으로 구현하기 위한 작업 절차다. 새 에이전트는 대화 기록보다 이 문서를 우선적인 작업 맥락으로 사용한다.

핵심 원칙은 `먼저 완전하게 조사하고, 다음에 구조를 복제하고, 마지막에 NEXT 증권 콘텐츠를 적용한다`이다.

## 2. 사이트별 산출물

각 레퍼런스마다 다음 파일을 만든다.

```text
docs/references/
  01-<site-id>.md
  02-<site-id>.md
  03-<site-id>.md
```

각 문서에는 다음 정보를 포함한다.

- 원본 URL
- 조사 날짜와 화면 크기
- 전체 섹션 맵
- 고정, Sticky 및 Pin 구조
- Canvas 개수와 DOM 위치
- 3D 장면 및 그룹 목록
- 모델과 텍스처 자산 목록
- 스크롤 타임라인
- 포인터 및 클릭 인터랙션
- 후처리 효과
- 모바일 차이
- NEXT 증권 콘텐츠 매핑
- 구현 상태와 검증 결과

## 3. Phase A — 원본 조사

### A1. 화면 조사

다음 위치를 캡처한다.

1. 페이지 진입 직후
2. Hero 25%
3. Hero 50%
4. Hero 종료
5. 중간 3D 섹션 시작·중간·종료
6. Footer 3D 섹션 시작·중간·종료
7. 메뉴, 모달, Hover 등 별도 상태

### A2. 구조 조사

- 섹션별 높이
- `position: fixed`
- `position: sticky`
- Pin 구간의 실제 스크롤 길이
- Canvas가 문서 전체에 고정되는지 섹션 내부에 존재하는지
- DOM 콘텐츠와 Canvas의 Z-index 관계
- 배경이 Canvas인지 CSS/이미지/비디오인지

### A3. 3D 자산 조사

자산마다 다음 필드를 기록한다.

| 필드 | 내용 |
|---|---|
| URL | 실제 네트워크 URL |
| 형식 | GLB, GLTF, Texture, Video 등 |
| 압축 | Draco, Meshopt, KTX2 등 |
| 크기 | 파일 크기 |
| 사용 장면 | Hero, Middle, Footer 등 |
| 인스턴스 수 | 장면에 배치되는 개수 |
| Transform | Position, Rotation, Scale |
| Material | Physical, Standard, Shader 등 |
| 권리 상태 | 사용 가능, 확인 필요, 대체 필요 |

### A4. 애니메이션 조사

- 타임라인 기준이 문서 전체 진행률인지 섹션 내부 진행률인지 확인한다.
- 키프레임 Position, Rotation, Scale, Opacity와 Visibility를 기록한다.
- 스크롤 관성, Scrub 및 Easing 값을 기록한다.
- 포인터 반응의 최대 회전각과 감속 시간을 기록한다.
- 장면 그룹의 등장과 퇴장 시점을 별도로 기록한다.

## 4. Phase B — 기술 복제

### B1. 정적 구조

먼저 Canvas를 제외한 DOM 구조를 구현한다.

- Container 폭
- 타이포그래피
- 섹션 높이
- Sticky 콘텐츠
- 색상 전환
- 카드와 CTA

### B2. Canvas 구조

원본 구조에 따라 다음 중 하나를 선택한다.

#### Global Canvas

하나의 고정 Canvas 안에서 여러 장면 그룹이 스크롤에 따라 교대한다.

#### Section Canvas

각 섹션에 독립 Canvas가 있고 해당 섹션 진입 시에만 렌더링된다.

#### Hybrid Canvas

전역 배경 Canvas와 특정 섹션의 독립 Canvas가 함께 존재한다.

구조는 반드시 원본 조사 결과로 결정한다.

### B3. 재질과 후처리

다음 순서로 맞춘다.

1. 모델 Geometry와 Scale
2. 카메라 FOV와 위치
3. 기본 조명
4. Material 속성
5. Environment Map
6. Tone Mapping과 Exposure
7. Bloom, SSAO, DOF
8. Noise, Vignette, Color Correction

모델 배치가 틀린 상태에서 후처리로 유사하게 보이게 만들지 않는다.

### B4. 입력 연결

- Scroll: 섹션별 정규화 진행률
- Pointer: 제한된 Pitch/Yaw
- Drag: 명시된 장면에서만 활성화
- Keyboard: 3D 탐색의 접근성 대체 입력
- Touch: 포인터 효과를 그대로 복제하지 않고 모바일 원본 동작을 따른다.

## 5. Phase C — NEXT 증권 콘텐츠 적용

시각적 복제가 안정된 뒤 다음 순서로 콘텐츠를 교체한다.

1. Hero: Compliance-by-Design 위에서 금융을 새롭게 설계
2. Difference: Media-First / AI-Native / Global RegTech
3. Architecture: Headless Enterprise Architecture
4. Visualization: Living Financial Topology
5. Operations: Governed CMS와 승인 워크플로
6. Trust: 데이터 출처, 준법, 보안 및 성능
7. CTA: 차세대 금융 경험을 함께 설계

레퍼런스 원문과 NEXT 증권 원고를 혼합하지 않는다.

## 6. Phase D — 비교 검증

### 스크린샷 비교표

| 구간 | 원본 캡처 | 구현 캡처 | 차이 | 상태 |
|---|---|---|---|---|
| Hero 0% |  |  |  |  |
| Hero 50% |  |  |  |  |
| Hero 100% |  |  |  |  |
| Middle 50% |  |  |  |  |
| Footer 50% |  |  |  |  |

### 인터랙션 비교표

| 입력 | 원본 | 구현 | 상태 |
|---|---|---|---|
| Wheel scroll |  |  |  |
| Trackpad scroll |  |  |  |
| Pointer move |  |  |  |
| Drag |  |  |  |
| Hover |  |  |  |
| Touch |  |  |  |
| Keyboard |  |  |  |

## 7. 현재 프로젝트에서 얻은 교훈

### Peachweb 레퍼런스 분석

- HTML에는 하나의 고정 `.pwb-scene` Canvas가 존재했다.
- 장면 상태 JSON에는 `Hero Coin`, `Middle Coin`, `Footer Coin` 그룹이 분리되어 있었다.
- 모델 파일은 V2와 V3 두 개였지만 장면 인스턴스는 여러 개였다.
- Hero에만 Canvas를 넣는 구현은 원본 구조와 달랐다.
- 문서 전체 진행률을 현재 페이지에 그대로 적용하면 Hero 모델이 다른 섹션까지 반복됐다.
- 현재 페이지의 실제 섹션 경계에 맞춰 각 그룹의 타임라인을 다시 매핑해야 했다.
- 빌드 성공과 HTTP 200은 3D 장면이 올바르게 보인다는 증거가 아니었다.
- Draco 모델은 런타임 디코더 연결 여부를 실제 브라우저 콘솔에서 확인해야 했다.

### 다음 작업에서 개선할 점

- 첫 구현 전에 장면 JSON과 자산 목록을 완전히 추출한다.
- Canvas 구조를 확정하기 전에는 3D 코드를 작성하지 않는다.
- 원본 화면을 직접 비교할 수 없는 상태에서는 시각적 완료를 선언하지 않는다.
- 섹션별 시작·중간·종료 상태를 먼저 정의한 후 스크롤 코드를 작성한다.

## 8. 품질 우선순위

1. Canvas 구조의 정확성
2. 모델과 카메라의 정확성
3. 스크롤 타임라인
4. 재질, 조명 및 후처리
5. DOM 레이아웃과 타이포그래피
6. 포인터와 세부 마이크로 인터랙션
7. 성능과 접근성
8. NEXT 증권 콘텐츠 적용

