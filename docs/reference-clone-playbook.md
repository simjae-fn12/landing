# Reference Runtime Clone Playbook

새 레퍼런스 랜딩을 구현할 때 모든 에이전트가 따라야 하는 기본 절차다. 목표는 “비슷한 재구현”이 아니라 수정 가능한 로컬 런타임으로 원본의 레이아웃·스크롤·WebGL·미디어를 재현하는 것이다.

## 완료 단계

| 단계 | 상태 | 의미 |
|---|---|---|
| R0 | Reference only | 원본 URL과 캡처만 확보 |
| R1 | Visual baseline | iframe으로 원본을 표시해 정답 화면 확보 |
| R2 | Runtime mirrored | SSR HTML과 JS/CSS 모듈 그래프를 로컬화 |
| R3 | Assets mirrored | 모델·텍스처·영상·폰트·WASM·Worker까지 로컬화 |
| R4 | Services replaced | 원본 API·CMS·Hydrogen 요청을 로컬 데이터 또는 제한 프록시로 대체 |
| R5 | Editable clone | 콘텐츠와 장면 설정을 로컬 소스에서 수정 가능 |
| R6 | Offline verified | 인터넷 차단 상태에서 전체 페이지와 인터랙션 정상 작동 |
| R7 | Fidelity verified | 원본/로컬 프레임 비교와 기능 검증 완료 |

`R1` iframe을 클론 완료로 보고하지 않는다. 최종 완료 기준은 최소 `R6 + R7`이다.

## 1. 원본을 정답지로 확보

1. 원본을 동일한 데스크톱·모바일 viewport로 연다.
2. 전체 문서 높이와 섹션 경계를 기록한다.
3. sticky/pinned 구간은 시작·25%·50%·75%·종료 프레임을 캡처한다.
4. DOM, Canvas, SVG, 영상, fixed 레이어를 구분한다.
5. iframe이 허용되면 비교용 기준 화면으로만 사용한다.

## 2. 런타임 구조 판별

- 프레임워크와 SSR 데이터 포맷을 확인한다.
- `<script>`, `<link>`, module preload와 manifest를 수집한다.
- JS의 정적 import, 동적 import, Worker, WASM 경로를 재귀 탐색한다.
- CSS `url()`, preload, `srcset`, 영상 source를 수집한다.
- global canvas인지 section canvas인지 확인한다.
- WebGL 장면 레지스트리, 모델 설정, 카메라, shader uniform, scroll store를 찾는다.

## 3. 로컬 미러 생성

1. 원본 HTML을 로컬에 저장한다.
2. 동일 CDN 빌드 루트의 JS/CSS 의존성을 재귀 다운로드한다.
3. CDN 런타임 경로를 `/vendor/<site-id>/assets/`로 변경한다.
4. basename 충돌 여부를 검사한다. 충돌하면 원래 디렉터리 구조 또는 URL 해시를 보존한다.
5. `<base>` 태그를 함부로 추가하지 않는다. 로컬 absolute path가 외부 origin으로 해석될 수 있다.
6. 로컬 route에서 미러 HTML을 제공한다.

## 4. 전체 자산 로컬화

다음을 모두 asset manifest에 포함한다.

- GLB/GLTF/DRACO
- MDPC/point cloud
- KTX2/HDR/EXR/texture
- MP4/WebM/HLS/transparent video
- PNG/JPEG/WebP/AVIF/SVG
- WOFF/WOFF2
- WASM
- Worker와 shader source
- scene JSON, Theatre/GSAP 설정 데이터

각 URL에 로컬 경로, 크기, hash, 사용 장면을 기록한다. 외부 CDN URL 수가 `0`이 될 때까지 반복한다.

## 5. 원본 서비스 의존성 제거

- 초기 렌더에 필요한 데이터는 정적 JSON으로 저장한다.
- CMS·Hydrogen·Remix loader 요청은 가능한 한 로컬 fixture로 대체한다.
- 프록시가 꼭 필요하면 upstream origin을 하드코딩하고 임의 URL 요청을 금지한다.
- `/vendor/`, `/_next/`, 로컬 미디어 요청은 프록시하지 않는다.
- 인증·결제·개인정보 기능은 복제하지 않고 비활성 데모로 대체한다.

## 6. 콘텐츠 치환

1. 먼저 원본 런타임이 정확히 작동하는 상태를 보존한다.
2. 섹션 ID, 장면 키, 모델 레지스트리, scroll timeline을 유지한다.
3. SSR 데이터 또는 CMS fixture의 출력 카피만 교체한다.
4. split-text는 원문 문자열뿐 아니라 문자 배열 생성 데이터를 확인한다.
5. WebGL 텍스트는 shader/SDF/glyph atlas/Three Text 중 무엇인지 확인한다.
6. 번들 패치가 필요하면 미러 생성 스크립트에 결정적 패치로 포함한다.
7. 패치 대상 signature가 없으면 즉시 실패시켜 원본 업데이트를 감지한다.

## 7. 자주 발생한 실패

### iframe을 완성본으로 보고

원본을 그대로 볼 수 있지만 로컬 수정, 오프라인 실행, 납품이 불가능하다. 오직 visual baseline이다.

### 원본 자산 일부만 가져와 새 장면 작성

모델이 같아도 카메라·shader·scroll range·레이어 구조가 달라진다. 원본 런타임 미러링을 먼저 검토한다.

### `<base href>` 사용

`/vendor/...`가 외부 도메인의 `/vendor/...`로 해석되어 module CORS 오류가 발생할 수 있다.

### 모든 same-origin fetch를 프록시

로컬 모델·WASM·Worker까지 upstream으로 전달되어 로더가 멈춘다. 프록시 경로를 데이터 요청으로 제한한다.

### HTML 문자열만 교체

split-text, WebGL SDF, canvas texture 문구는 그대로 남는다. 실제 글자 배열·glyph 데이터·texture 생성 코드를 찾아야 한다.

### HTTP 200만 확인

빌드 성공과 asset 200은 시각적 성공이 아니다. 콘솔, 네트워크, 로더 완료, 스크롤 프레임을 함께 검증한다.

## 8. 필수 검증

### 네트워크

- [ ] 로컬 HTML 200
- [ ] 모든 JS/CSS module 200
- [ ] Worker/WASM 200
- [ ] 모델·텍스처·영상 200
- [ ] module CORS 오류 0
- [ ] 실패 요청 0
- [ ] 외부 런타임 URL 0
- [ ] 최종 단계에서 외부 미디어 URL 0

### 런타임

- [ ] 콘솔 예외 0
- [ ] 로더 완료
- [ ] Canvas 개수와 크기 일치
- [ ] WebGL context 정상
- [ ] 새로고침과 직접 URL 진입 정상
- [ ] localhost와 LAN IP 모두 정상
- [ ] 인터넷 차단 상태 정상

### 시각 및 인터랙션

- [ ] 동일 viewport와 DPR
- [ ] 전체 섹션 순서와 높이 일치
- [ ] sticky/fixed/absolute 구조 일치
- [ ] z-index, mask, blend, overlap 일치
- [ ] 섹션별 모델과 카메라 일치
- [ ] 1% 간격 또는 주요 프레임 비교
- [ ] 느린/빠른 스크롤과 관성 검증
- [ ] pointer, hover, click, drag 검증
- [ ] 모바일 전체 페이지 검증

## 9. 보고 규칙

- 현재 R 단계를 명시한다.
- 남은 외부 URL과 원격 서비스 의존성 수를 공개한다.
- iframe 상태를 로컬 복제라고 표현하지 않는다.
- 검증하지 않은 항목을 “완료”라고 표현하지 않는다.
- 원본 사이트의 코드·자산 라이선스와 사용 허가를 별도로 확인한다.
