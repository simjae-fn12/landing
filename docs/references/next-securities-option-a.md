# NEXT Securities Option A — FHD typography reference

## 기본 정보

- Site ID: `next-securities-option-a`
- 원본 URL: 사용자 제공 FHD 전체 페이지 시안
- 로컬 route: `/`, `/option-a`
- 현재 완료 단계: R5
- Desktop viewport: 1920px 기준
- 조사일: 2026-07-31

## 구현 전략

- 로컬 컴포넌트와 에셋을 유지하는 직접 재구현
- iframe 미사용
- 기준 루트 폰트 크기: `1rem = 16px`

## FHD 타이포 변환

| 역할 | FHD px 범위 | rem 범위 |
|---|---:|---:|
| Hero display | 52–104px | 3.25–6.5rem |
| Section display large | 44–72px | 2.75–4.5rem |
| Section display medium | 36–56px | 2.25–3.5rem |
| Title | 23–34px | 1.4375–2.125rem |
| Small title | 19–24px | 1.1875–1.5rem |
| Large body | 16–20px | 1–1.25rem |
| Body | 14px | .875rem |
| Label | 11px | .6875rem |

`vw` 중간값은 FHD에서 유동적인 시안 비율을 유지하고, `clamp()`의 최소·최대
폰트 크기만 rem으로 변환했다. 폰트 이외의 레이아웃 치수는 시안의 픽셀 정렬을
보존하기 위해 변경하지 않았다.

## 섹션 순서

1. 고정 헤더
2. 3단계 sticky hero
3. Executive summary
4. AI-Native Intelligence Engine
5. Media-Pipeline / First Trading 전환
6. Capability rows
7. Core Strengths
8. Closing vision
9. Footer

## 검증 상태

- R5: 콘텐츠와 타이포 토큰을 로컬 소스에서 수정 가능
- R6: 오프라인 전체 동작 검증 필요
- R7: 제공 이미지와 1920px 전체 프레임 오버레이 비교 필요
- 외부 runtime/API/proxy 의존성: 없음
- 로컬 이미지와 동영상 에셋 사용
