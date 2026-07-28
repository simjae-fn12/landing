# Reference Landing Clone Rules

이 저장소에서 레퍼런스 랜딩 페이지를 구현하는 모든 에이전트는 아래 절차를 따른다.

## 핵심 원칙

- 복제 대상은 히어로 하나가 아니라 페이지 전체의 레이아웃과 스크롤 경험이다.
- 구현 전에 원본 전체 페이지를 직접 스크롤하며 조사한다.
- DOM의 정상 흐름, sticky, fixed, absolute, z-index, mask, clip, transform을 구분한다.
- Canvas/WebGL 장면이 섹션마다 별도인지, 전역 Canvas에서 그룹만 교체하는지 확인한다.
- 원본의 섹션 경계와 스크롤 타이밍을 조사하지 않은 상태에서 코드를 작성하지 않는다.
- 시각 구조와 인터랙션은 원본에 맞추고 문구만 NEXT증권 콘텐츠로 치환한다.
- 빌드 성공이나 HTTP 200은 시각적 완료의 증거가 아니다.

## 구현 전 필수 조사

1. 데스크톱 전체 문서 높이와 모든 주요 섹션의 시작점·높이를 측정한다.
2. 전체 문서를 최소 1% 또는 50~100px 간격으로 캡처한다.
3. 변화가 많은 pinned 구간은 더 작은 간격으로 재캡처한다.
4. 각 프레임에서 가시 텍스트, 이미지, 영상, Canvas, SVG, sticky 요소의 좌표와 크기를 기록한다.
5. 각 섹션의 `position`, containing block, overflow, z-index stacking context를 기록한다.
6. 섹션 사이의 음수 margin, transform overlap, absolute overlap 여부를 기록한다.
7. 마우스 이동, hover, drag, click, 메뉴, 모달, 아코디언, 슬라이더를 별도로 테스트한다.
8. 모바일에서 동일한 장면이 축소되는지, 다른 DOM·Canvas·영상으로 교체되는지 확인한다.
9. 네트워크에서 GLB/GLTF, texture, video, SVG, shader, scene JSON을 조사한다.
10. 조사 결과를 `docs/references/<site-id>.md`에 먼저 작성한다.

## 레이아웃 조사 규칙

각 주요 요소에 아래 값을 기록한다.

- 부모 섹션과 실제 containing block
- `position`: static / relative / sticky / fixed / absolute
- top / right / bottom / left
- width / height / min-height
- margin / padding / gap
- transform과 transform-origin
- overflow / clip-path / mask
- z-index와 새 stacking context 생성 원인
- blend mode, backdrop filter, opacity
- 진입 전·활성·이탈 후 상태

DOM 순서와 화면의 시각적 순서를 혼동하지 않는다. absolute 요소가 다음 섹션 위에 겹치거나 sticky 요소가 여러 섹션을 관통하면 그 범위를 픽셀 단위로 기록한다.

## 스크롤 시스템 조사 규칙

- 페이지 전체 진행률만 사용하지 않는다.
- 각 섹션에 대해 `localProgress = (scrollY - sectionStart) / pinDistance`를 측정한다.
- pinned 구간의 실제 scroll distance와 sticky viewport 높이를 따로 기록한다.
- scene별 시작·유지·종료 구간을 구분한다.
- opacity만 바뀌는지, display/visibility가 교체되는지 확인한다.
- scrub smoothing, lerp, easing과 scroll velocity 반응을 확인한다.
- 수평 레일은 translate 거리, 카드 폭, gap, 앞뒤 카드 노출량을 측정한다.
- 섹션 종료 시 일반 문서 흐름으로 넘어가는 handoff 프레임을 반드시 확인한다.

## Canvas / WebGL 조사 규칙

- Canvas 개수와 DOM 위치를 확인한다.
- Global / Section / Hybrid 구조를 추측하지 말고 실제 DOM과 네트워크로 판별한다.
- 동일 모델의 반복인지 서로 다른 scene group인지 구분한다.
- 모델, 파티클, 라인, 스프라이트, 텍스트가 어느 레이어에서 그려지는지 기록한다.
- 카메라 FOV, pitch/yaw, scale, center offset, clipping을 프레임별로 비교한다.
- bloom, DOF, SSAO, noise, vignette, tone mapping 순서를 기록한다.
- pointer 반응 범위, 감쇠 시간, 최대 회전량을 측정한다.
- 원본에 없는 3D 모델이나 임의 효과를 추가하지 않는다.
- Canvas 출력은 원본과 동일한 스크롤 지점의 스크린샷으로 검증한다.

## 완료 기준

- 데스크톱 전체 랜딩을 시작부터 footer까지 비교한다.
- 모든 pinned/sticky 구간을 시작·중간·종료 프레임으로 비교한다.
- 섹션마다 최소 3프레임, 변화가 많은 구간은 1% 간격으로 비교한다.
- z-index, overlap, mask, sticky handoff가 원본과 동일하게 동작한다.
- hover, drag, click, slider, accordion, menu 동작을 확인한다.
- 모바일 전체 페이지를 별도로 비교한다.
- 콘솔·네트워크 오류가 없다.
- 프로덕션 빌드와 LAN 주소에서 모두 확인한다.

