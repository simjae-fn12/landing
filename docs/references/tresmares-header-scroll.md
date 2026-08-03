# Tresmares Capital — directional header reference

## 기본 정보

- Site ID: `tresmares-header-scroll`
- 원본 URL: `https://www.tresmarescapital.com/en/`
- 로컬 적용: `/` 및 `/option-a`의 `.landing-nav`
- 현재 완료 단계: R5
- 조사일: 2026-07-31

## 적용 동작

- GNB는 viewport 상단에 fixed 상태로 유지한다.
- 아래 방향 스크롤이 24px 이상 누적되면 헤더 전체를 위로 숨긴다.
- 위 방향 스크롤이 24px 이상 누적되면 헤더를 다시 표시한다.
- 방향이 전환되면 누적 거리를 초기화해 트랙패드의 작은 흔들림을 무시한다.
- 문서 상단 16px 범위에서는 헤더를 항상 표시한다.
- 키보드 포커스가 헤더 내부에 있으면 숨김 상태를 해제한다.
- 색상 전환과 스크롤 방향 노출 상태는 서로 독립적으로 유지한다.

## 검증 상태

- 원격 runtime/media/font/API/proxy 의존성: 없음
- 로컬 구현 단계: R5
- 동일 viewport 프레임 및 실제 트랙패드 비교: R7 미완료
