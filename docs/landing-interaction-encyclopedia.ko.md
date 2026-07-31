# 랜딩페이지 인터랙션 용어 백과사전

레퍼런스 사이트를 분석하거나 구현을 요청할 때 사용하는 디자인·레이아웃·스크롤·모션·WebGL 용어 설명집입니다.  
기본 표기 형식은 `명칭 : 설명`이며, 영문 검색과 개발자 전달을 위해 영문 명칭을 함께 적었습니다.

---

## 1. 페이지와 섹션 구조

Landing Page(랜딩페이지) : 제품, 서비스, 브랜드를 소개하고 특정 행동을 유도하도록 설계한 단일 목적 중심 페이지.

Hero Section(히어로 섹션) : 페이지 진입 직후 보이는 첫 번째 핵심 화면. 대표 문구, 이미지, 영상, 3D 장면과 주요 CTA를 배치함.

Above the Fold(폴드 상단) : 사용자가 스크롤하지 않고 처음 볼 수 있는 화면 영역.

Below the Fold(폴드 하단) : 첫 화면 아래에 있어 스크롤해야 볼 수 있는 영역.

Section(섹션) : 하나의 주제나 기능을 담당하는 페이지의 수직 구간.

Section Stack(섹션 스택) : 여러 섹션이 문서 흐름에 따라 위에서 아래로 쌓인 구조.

Section Sequence(섹션 시퀀스) : 사용자가 경험하는 섹션의 순서와 전환 흐름.

Section Boundary(섹션 경계) : 이전 섹션이 끝나고 다음 섹션이 시작되는 지점.

Transition Zone(전환 구간) : 두 섹션이 즉시 교체되지 않고 겹침, 마스크, 색상 변화 등으로 이어지는 범위.

Bridge Section(브리지 섹션) : 서로 다른 분위기나 콘텐츠 사이를 자연스럽게 연결하는 짧은 중간 섹션.

Interstitial Section(인터스티셜 섹션) : 주요 콘텐츠 사이에 삽입되는 강조 화면이나 메시지 구간.

Intro Section(인트로 섹션) : 본문에 진입하기 전 브랜드나 주제를 소개하는 영역.

Summary Section(서머리 섹션) : 전체 서비스의 핵심 가치나 기능을 짧게 요약하는 영역.

Feature Section(기능 섹션) : 제품의 개별 기능을 이미지, 제목, 설명으로 소개하는 영역.

Benefits Section(효익 섹션) : 기능 자체보다 사용자가 얻게 되는 결과와 장점을 설명하는 영역.

Proof Section(증명 섹션) : 수치, 사례, 인증, 고객사 등으로 신뢰를 제공하는 영역.

Quantitative Proofs(정량 증명) : 가동률, 속도, 자동화율처럼 숫자로 가치를 증명하는 콘텐츠.

Social Proof(사회적 증거) : 고객 로고, 후기, 사용자 수, 언론 보도 등 타인의 신뢰를 활용하는 콘텐츠.

Case Study Section(사례 연구 섹션) : 프로젝트의 문제, 해결 과정, 결과를 상세하게 보여주는 영역.

CTA Section(행동 유도 섹션) : 문의, 가입, 다운로드, 포털 이동 등 다음 행동을 요청하는 영역.

Final CTA(최종 CTA) : 푸터 직전에 배치하는 마지막 핵심 행동 유도 영역.

Footer(푸터) : 회사 정보, 연락처, 메뉴, 저작권 등을 담는 페이지 하단 영역.

Global Header(글로벌 헤더) : 페이지나 라우트가 바뀌어도 공통으로 사용되는 상단 내비게이션.

Local Navigation(로컬 내비게이션) : 특정 페이지나 섹션 내부에서만 사용하는 메뉴.

Portal(포털) : 여러 서비스나 하위 시스템으로 진입하는 상위 관문 화면.

Microsite(마이크로사이트) : 특정 캠페인이나 제품을 위해 별도로 구성한 작은 사이트.

One-page Site(원페이지 사이트) : 주요 콘텐츠를 한 페이지의 수직 스크롤 안에 구성한 사이트.

Long-form Landing(롱폼 랜딩) : 설명과 스토리텔링을 위해 긴 스크롤 길이를 사용하는 랜딩페이지.

Editorial Layout(에디토리얼 레이아웃) : 잡지나 편집 디자인처럼 비대칭 그리드, 큰 타이포, 여백을 활용한 구성.

Immersive Landing(몰입형 랜딩) : 전체 화면 영상, 3D, 사운드, 스크롤 전환 등으로 몰입감을 강조한 페이지.

---

## 2. 기본 레이아웃

Document Flow(문서 흐름) : 요소가 HTML 순서에 따라 자연스럽게 배치되는 기본 레이아웃 흐름.

Normal Flow(노멀 플로우) : `position`, float 등의 특수 배치가 없는 기본 문서 배치 방식.

Container(컨테이너) : 콘텐츠의 최대 폭과 좌우 여백을 관리하는 감싸는 요소.

Full Bleed(풀 블리드) : 이미지나 배경이 컨테이너를 벗어나 화면 양 끝까지 채우는 구성.

Max-width Container(최대 폭 컨테이너) : 큰 화면에서도 콘텐츠가 지나치게 넓어지지 않도록 폭을 제한한 영역.

Viewport(뷰포트) : 브라우저에서 실제로 보이는 화면 영역.

Viewport Unit(뷰포트 단위) : `vw`, `vh`, `dvh`, `svh`처럼 화면 크기를 기준으로 계산하는 CSS 단위.

100vh Section(100vh 섹션) : 화면 높이와 동일한 높이를 사용하는 섹션.

Dynamic Viewport Height(dvh) : 모바일 주소창 변화까지 반영하는 동적 화면 높이 단위.

Safe Viewport Height(svh) : 모바일 브라우저 UI가 나타난 상태를 기준으로 한 안정적인 화면 높이.

Grid(그리드) : 행과 열을 기준으로 요소를 정렬하는 레이아웃 시스템.

Column Grid(컬럼 그리드) : 페이지를 일정한 수의 세로 열로 분할한 정렬 기준.

Baseline Grid(베이스라인 그리드) : 텍스트의 줄 기준선을 일정하게 맞추는 수평 정렬 체계.

Modular Grid(모듈러 그리드) : 행과 열을 함께 사용해 반복 가능한 모듈 단위로 구성하는 그리드.

CSS Grid : CSS의 `display: grid`를 이용한 2차원 레이아웃 시스템.

Flexbox : CSS의 `display: flex`를 이용한 1차원 정렬 시스템.

Gap(갭) : 그리드나 플렉스 자식 사이의 일정한 간격.

Gutter(거터) : 컬럼과 컬럼 사이의 간격.

Margin(마진) : 요소 바깥쪽의 여백.

Padding(패딩) : 요소 경계와 내부 콘텐츠 사이의 여백.

Whitespace(화이트스페이스) : 콘텐츠를 분리하고 강조하기 위해 의도적으로 비워 둔 공간.

Negative Space(네거티브 스페이스) : 주요 오브젝트 주변의 비어 있는 시각적 공간.

Alignment(정렬) : 요소들의 시작점, 중심선, 끝점을 같은 기준에 맞추는 것.

Optical Alignment(시각적 정렬) : 수학적 좌표보다 사람이 보기 좋은 위치를 기준으로 보정하는 정렬.

Edge Alignment(에지 정렬) : 여러 요소의 외곽선을 같은 기준선에 맞추는 것.

Center Alignment(중앙 정렬) : 요소 중심을 공통 축에 맞추는 정렬.

Split Layout(분할 레이아웃) : 화면을 두 개 이상의 주요 영역으로 나누는 구성.

Two-column Layout(2열 레이아웃) : 텍스트와 이미지처럼 콘텐츠를 좌우 두 열로 나눈 구성.

Alternating Layout(교차 레이아웃) : 행마다 이미지와 텍스트의 좌우 위치를 번갈아 배치하는 구성.

Zigzag Layout(지그재그 레이아웃) : 콘텐츠가 좌우를 교차하며 아래로 이어지는 시각적 흐름.

Asymmetric Layout(비대칭 레이아웃) : 좌우 크기와 위치가 같지 않지만 시각적으로 균형을 이루는 구성.

Centered Composition(중앙 구도) : 주요 오브젝트와 텍스트를 화면 중앙에 집중시키는 구성.

Off-center Composition(비중앙 구도) : 주요 요소를 중앙에서 벗어나게 배치해 긴장감과 방향성을 만드는 구성.

Layered Layout(레이어드 레이아웃) : 여러 요소를 앞뒤로 겹쳐 깊이감을 만드는 구성.

Overlap(오버랩) : 두 요소가 일부 영역을 서로 겹치는 배치.

Intentional Overlap(의도적 겹침) : 타이포와 이미지 등이 설계된 위치에서 자연스럽게 겹치는 것.

Collision(충돌) : 의도하지 않게 요소가 겹쳐 가독성이나 기능을 해치는 상태.

Bleed(블리드) : 이미지나 색상 영역을 정해진 경계 바깥까지 확장하는 디자인 방식.

Crop(크롭) : 이미지 일부를 잘라 필요한 구도만 보여주는 것.

Object Fit : 이미지나 영상이 컨테이너 안에서 채워지는 방식을 지정하는 속성.

Cover : 비율을 유지하면서 컨테이너를 완전히 채우고 넘치는 부분을 자르는 방식.

Contain : 비율을 유지하면서 이미지 전체가 보이도록 컨테이너 안에 맞추는 방식.

Aspect Ratio(종횡비) : 요소의 가로와 세로 비율.

Square Media(정사각형 미디어) : `1:1` 비율로 고정된 이미지나 영상 영역.

Portrait Media(세로형 미디어) : 세로 길이가 긴 이미지나 영상.

Landscape Media(가로형 미디어) : 가로 길이가 긴 이미지나 영상.

Panoramic Layout(파노라마 레이아웃) : 매우 넓은 화면 점유율과 수평적인 구도를 강조하는 구성.

Masonry Layout(메이슨리 레이아웃) : 높이가 다른 카드가 벽돌처럼 빈틈을 채우며 배치되는 구성.

Bento Grid(벤토 그리드) : 크기가 다른 카드들을 정돈된 모듈형 그리드에 배치하는 구성.

Card Layout(카드 레이아웃) : 콘텐츠를 독립된 사각형 단위로 묶어 표현하는 방식.

Floating Card(플로팅 카드) : 배경 위에 떠 있는 것처럼 그림자, 블러, 위치 차이를 적용한 카드.

Glass Card(글래스 카드) : 반투명 배경과 블러를 사용한 유리 질감의 카드.

Sticky Sidebar(고정 사이드바) : 한쪽 열은 고정되고 반대쪽 콘텐츠만 스크롤되는 레이아웃.

Rail Layout(레일 레이아웃) : 콘텐츠가 일정한 선이나 축을 따라 연속적으로 배치되는 구성.

Horizontal Rail(수평 레일) : 카드나 이미지를 수평 방향으로 나열한 트랙.

---

## 3. CSS 위치와 레이어

Static Position : 기본 문서 흐름에 따라 배치되는 `position: static`.

Relative Position : 원래 위치를 유지하면서 자식 absolute 요소의 기준점이 되는 `position: relative`.

Absolute Position : 가장 가까운 positioned 조상을 기준으로 자유롭게 배치하는 `position: absolute`.

Fixed Position : 뷰포트를 기준으로 고정되어 스크롤해도 같은 위치에 남는 `position: fixed`.

Sticky Position : 지정된 스크롤 컨테이너 안에서 특정 위치에 도달하면 고정되는 `position: sticky`.

Containing Block(기준 컨테이너) : absolute나 percentage 크기 계산의 기준이 되는 상위 요소.

Scroll Container(스크롤 컨테이너) : 실제 스크롤 값을 가지는 요소.

Sticky Parent(스티키 부모) : sticky 요소가 움직이거나 고정될 수 있는 범위를 제공하는 부모.

Sticky Range(스티키 범위) : sticky 요소가 고정된 상태로 유지되는 스크롤 길이.

Sticky Offset(스티키 오프셋) : `top`, `bottom` 등으로 지정하는 고정 위치의 여백.

Stacking Context(스태킹 컨텍스트) : z-index가 비교되는 독립적인 레이어 그룹.

Z-index : 요소의 앞뒤 표시 순서를 지정하는 값.

Layer Order(레이어 순서) : 배경, 캔버스, 이미지, 타이포, 헤더 등의 시각적 앞뒤 관계.

Foreground(전경) : 사용자에게 더 가까이 보이는 앞쪽 레이어.

Background(배경) : 콘텐츠 뒤에 위치하는 색상, 이미지, 영상 또는 3D 장면.

Midground(중경) : 전경과 배경 사이의 깊이를 담당하는 중간 레이어.

Overlay(오버레이) : 기존 콘텐츠 위에 덮는 반투명 색상이나 UI 레이어.

Backdrop(백드롭) : 모달이나 패널 뒤에 깔리는 배경 레이어.

Backdrop Filter : 요소 뒤쪽 영역에 blur, brightness 등을 적용하는 CSS 효과.

Pointer Events : 요소가 마우스나 터치 입력을 받을지 지정하는 속성.

Hit Area(히트 영역) : 클릭이나 호버가 인식되는 실제 범위.

Clipping Context(클리핑 기준) : 어떤 경계를 기준으로 콘텐츠를 잘라낼지 결정하는 구조.

Overflow Hidden : 컨테이너 밖으로 나간 내용을 보이지 않게 자르는 설정.

Overflow Clip : 스크롤 영역을 만들지 않고 넘친 내용을 즉시 잘라내는 설정.

Portal Rendering(포털 렌더링) : 컴포넌트를 React 트리의 위치와 다른 실제 DOM 위치에 렌더링하는 방식.

---

## 4. 스크롤 기본 용어

Native Scroll(네이티브 스크롤) : 브라우저가 기본 제공하는 스크롤 동작.

Smooth Scroll(스무스 스크롤) : 스크롤 위치가 즉시 바뀌지 않고 부드럽게 보간되어 이동하는 동작.

Inertial Scroll(관성 스크롤) : 입력이 끝난 뒤에도 속도가 점차 줄어들며 이동하는 스크롤.

Momentum Scroll(모멘텀 스크롤) : 터치나 휠의 속도에 따라 이동량과 잔여 움직임이 결정되는 스크롤.

Scroll Smoothing(스크롤 스무딩) : 실제 스크롤 값을 목표값으로 사용하고 렌더링 값은 감쇠 보간하는 기법.

Virtual Scroll(가상 스크롤) : 실제 문서 스크롤과 별도의 내부 값을 사용해 화면을 변환하는 방식.

Scroll Hijacking(스크롤 하이재킹) : 기본 스크롤 입력을 가로채 다른 거리나 방향으로 재해석하는 방식.

Scroll Lock(스크롤 잠금) : 모달, 메뉴, 특정 연출 중 페이지 스크롤을 일시적으로 막는 것.

Scroll Snap(스크롤 스냅) : 스크롤이 끝날 때 가장 가까운 지정 지점에 자동 정렬되는 기능.

Snap Point(스냅 포인트) : 스크롤이 정렬되는 목표 위치.

Scroll Progress(스크롤 진행률) : 특정 범위에서 현재 스크롤 위치를 `0~1` 또는 `0~100%`로 정규화한 값.

Global Scroll Progress(전체 진행률) : 전체 문서 높이를 기준으로 계산한 진행률.

Section Progress(섹션 진행률) : 특정 섹션의 시작과 끝을 기준으로 계산한 진행률.

Timeline(타임라인) : 진행률에 따라 여러 속성의 변화를 시간 순서로 정의한 구조.

Scroll Timeline(스크롤 타임라인) : 시간 대신 스크롤 진행률을 사용하는 애니메이션 타임라인.

Scroll-driven Animation(스크롤 구동 애니메이션) : 스크롤 위치가 애니메이션 상태를 직접 결정하는 방식.

Scroll-linked Animation(스크롤 연동 애니메이션) : 스크롤과 애니메이션 진행도가 연속적으로 연결된 방식.

Scrub Animation(스크럽 애니메이션) : 스크롤을 앞뒤로 움직이면 애니메이션도 같은 비율로 앞뒤로 재생되는 방식.

Scrub Value(스크럽 값) : 스크롤 진행률과 애니메이션 진행률 사이의 추종 속도나 지연 정도.

Scroll-triggered Animation(스크롤 트리거 애니메이션) : 특정 위치에 진입했을 때 한 번 재생되는 애니메이션.

Trigger Point(트리거 지점) : 애니메이션이나 상태 변화가 시작되는 화면상의 기준 위치.

Start Offset(시작 오프셋) : 섹션 실제 시작점과 애니메이션 시작점 사이의 거리.

End Offset(종료 오프셋) : 섹션 실제 종료점과 애니메이션 종료점 사이의 거리.

Enter(진입) : 요소가 관찰 영역 안으로 들어오는 상태.

Leave(이탈) : 요소가 관찰 영역 밖으로 나가는 상태.

Enter Back(역방향 재진입) : 아래에서 위로 스크롤할 때 요소가 다시 들어오는 상태.

Leave Back(역방향 이탈) : 위로 스크롤하며 요소가 이전 영역으로 빠져나가는 상태.

Intersection Observer : 요소가 뷰포트나 지정 영역과 교차하는지 감지하는 브라우저 API.

Threshold(임계값) : 요소가 몇 퍼센트 보였을 때 교차로 판단할지 지정하는 값.

Root Margin : Intersection Observer의 감지 영역을 안쪽이나 바깥쪽으로 조정하는 값.

Scroll Direction(스크롤 방향) : 사용자가 현재 아래로 이동하는지 위로 이동하는지 나타내는 상태.

Scroll Velocity(스크롤 속도) : 단위 시간당 스크롤 위치 변화량.

Velocity-based Effect(속도 기반 효과) : 스크롤 속도에 따라 기울기, 블러, 왜곡 등이 강해지는 효과.

Scroll Acceleration(스크롤 가속도) : 스크롤 속도가 변화하는 정도.

Scroll Rest(스크롤 정지 상태) : 일정 시간 스크롤 값의 변화가 없는 상태.

Progress Mapping(진행률 매핑) : 특정 스크롤 범위를 애니메이션의 다른 값 범위로 변환하는 것.

Clamp(클램프) : 값이 지정한 최솟값과 최댓값을 넘지 않도록 제한하는 것.

Interpolation(보간) : 두 값 사이의 중간 값을 계산해 부드럽게 연결하는 것.

Linear Interpolation/Lerp(선형 보간) : 일정한 비율로 두 값 사이를 계산하는 보간 방식.

Damping(감쇠 보간) : 목표값을 즉시 적용하지 않고 프레임마다 점차 가까워지는 방식.

Easing(이징) : 애니메이션 속도가 시작과 끝에서 어떻게 변하는지 결정하는 곡선.

---

## 5. 고정 스크롤과 스크롤 스토리텔링

Pinned Section(핀 섹션) : 특정 스크롤 구간 동안 화면에 고정되어 내부 장면만 변화하는 섹션.

Pinned Scroll(핀드 스크롤) : 섹션을 고정한 상태에서 스크롤 입력으로 내부 타임라인을 진행하는 연출.

Sticky Section(스티키 섹션) : `position: sticky`를 이용해 구현한 고정형 섹션.

Sticky-based Pinning(스티키 기반 핀) : 별도 JavaScript 고정 처리 없이 sticky 속성으로 화면을 고정하는 방식.

JavaScript Pinning(JS 핀) : 스크립트가 요소의 위치와 spacer를 제어해 고정 상태를 만드는 방식.

Pin Spacer(핀 스페이서) : 고정된 요소가 차지해야 할 문서 스크롤 길이를 대신 제공하는 빈 공간.

Pin Duration(핀 지속 길이) : 섹션이 고정된 상태로 유지되는 스크롤 거리.

Pinned Timeline(핀드 타임라인) : 고정 구간 안에서 진행되는 단계 또는 연속 애니메이션.

Sticky Scrollytelling(스티키 스크롤리텔링) : 고정된 화면과 변화하는 콘텐츠로 이야기를 전달하는 구성.

Scrollytelling(스크롤리텔링) : 스크롤을 이야기 진행 수단으로 사용하는 인터랙티브 콘텐츠 방식.

Scroll-driven Storytelling(스크롤 기반 스토리텔링) : 스크롤 진행률에 따라 텍스트, 장면, 데이터가 순차적으로 변화하는 연출.

Chapter(챕터) : 스크롤리텔링 안의 큰 이야기 단위.

Step(스텝) : 한 챕터 안에서 전환되는 개별 상태.

Step-based Transition(단계형 전환) : 진행률을 여러 구간으로 나누어 상태를 한 단계씩 바꾸는 방식.

Continuous Transition(연속 전환) : 진행률에 따라 위치, 크기, 투명도 등이 끊김 없이 변하는 방식.

Discrete State(이산 상태) : 1번, 2번, 3번처럼 명확히 분리된 개별 상태.

Active Step(활성 단계) : 현재 스크롤 진행률이 선택한 단계.

Sticky Intro(고정 인트로) : 한쪽의 제목과 설명은 고정되고 반대쪽 콘텐츠만 변화하는 구성.

Sticky Left / Scrolling Right : 왼쪽 콘텐츠는 고정하고 오른쪽 목록만 스크롤하는 구성.

Sticky Media / Scrolling Copy : 이미지나 영상은 고정하고 텍스트 설명이 순차적으로 지나가는 구성.

Pinned Card Sequence(고정 카드 시퀀스) : 화면은 고정된 상태에서 카드의 활성 색상이나 내용이 순서대로 바뀌는 연출.

Card Activation(카드 활성화) : 현재 단계에 해당하는 카드를 강조 상태로 바꾸는 것.

Sequential Highlight(순차 강조) : 여러 항목을 스크롤 순서에 따라 하나씩 강조하는 연출.

Sticky Stack(스티키 스택) : 여러 카드가 같은 위치에 겹쳐 쌓이고 스크롤에 따라 교체되는 구성.

Stacked Card Reveal(스택 카드 공개) : 카드가 앞 카드 위로 올라오거나 뒤에서 나타나는 전환.

Card Pinning(카드 핀) : 각 카드가 특정 위치에 도달하면 잠시 고정되는 연출.

Layer Pinning(레이어 핀) : 여러 레이어를 서로 다른 기간 동안 고정하는 방식.

Scene Hold(장면 유지) : 변화가 끝난 뒤 다음 전환 전까지 현재 장면을 일정 구간 유지하는 것.

Exit Transition(종료 전환) : pinned 구간이 끝나고 다음 섹션으로 넘어가는 애니메이션.

Unpin(언핀) : 고정 상태가 해제되어 요소가 다시 문서 흐름과 함께 이동하는 순간.

Scroll Handoff(스크롤 핸드오프) : 한 pinned 섹션의 제어가 끝나고 다음 섹션으로 자연스럽게 넘어가는 과정.

Nested Pinning(중첩 핀) : 고정된 섹션 안에서 또 다른 요소가 별도의 범위로 고정되는 구조.

Horizontal Scroll Section(수평 스크롤 섹션) : 세로 스크롤 입력을 이용해 콘텐츠가 수평으로 이동하는 영역.

Horizontal Scroll Mapping(수평 매핑) : 세로 스크롤 진행률을 수평 위치 값으로 변환하는 방식.

Sticky Horizontal Gallery(고정 수평 갤러리) : 화면을 고정하고 이미지 트랙만 좌우로 이동시키는 구성.

Scroll-controlled Carousel(스크롤 제어 캐러셀) : 버튼이나 드래그 대신 스크롤로 슬라이드를 변경하는 캐러셀.

---

## 6. 섹션 전환 효과

Crossfade(크로스페이드) : 이전 요소가 사라지는 동시에 다음 요소가 나타나는 전환.

Fade In(페이드 인) : 투명도 0에서 1로 변하며 나타나는 효과.

Fade Out(페이드 아웃) : 투명도 1에서 0으로 변하며 사라지는 효과.

Reveal(리빌) : 숨겨진 콘텐츠가 마스크, 위치, 투명도 변화로 드러나는 효과.

Slide Reveal(슬라이드 리빌) : 요소가 이동하면서 나타나는 효과.

Mask Reveal(마스크 리빌) : 보이는 영역의 크기나 모양이 확장되며 콘텐츠가 나타나는 효과.

Clip-path Reveal(클립패스 리빌) : CSS `clip-path`를 애니메이션해 콘텐츠를 공개하는 방식.

Curtain Reveal(커튼 리빌) : 덮고 있던 레이어가 커튼처럼 열리는 효과.

Wipe Transition(와이프 전환) : 한 방향으로 화면을 쓸어내듯 다음 장면이 나타나는 효과.

Directional Wipe(방향성 와이프) : 위, 아래, 좌, 우 중 특정 방향을 가진 와이프 전환.

Iris Reveal(아이리스 리빌) : 원이나 타원 형태의 마스크가 열리며 장면이 나타나는 효과.

Circular Reveal(원형 리빌) : 원형 클립 영역이 확대되며 다음 콘텐츠를 보여주는 전환.

Scale Transition(스케일 전환) : 요소의 크기가 확대되거나 축소되며 장면이 바뀌는 효과.

Zoom Through(줌 스루) : 카메라가 오브젝트나 화면 안으로 통과하며 다음 장면으로 연결되는 효과.

Push Transition(푸시 전환) : 다음 섹션이 이전 섹션을 밀어내며 들어오는 효과.

Cover Transition(커버 전환) : 다음 섹션이 이전 섹션 위를 덮으며 나타나는 효과.

Underlay Reveal(언더레이 리빌) : 위 레이어가 이동해 아래에 있던 다음 장면이 드러나는 효과.

Section Overlap Transition(섹션 중첩 전환) : 두 섹션이 일정 범위 동안 동시에 화면에 존재하는 전환.

Layered Transition(레이어 전환) : 배경, 이미지, 타이포가 서로 다른 타이밍으로 바뀌는 복합 전환.

Background Color Transition(배경색 전환) : 스크롤 위치에 따라 섹션 배경색이 연속적으로 변하는 효과.

Theme Transition(테마 전환) : 배경, 글자, 헤더, 버튼 색상이 함께 전환되는 연출.

Header Theme Switch(헤더 테마 전환) : 지나가는 섹션 배경에 맞춰 헤더 로고와 글자색을 변경하는 효과.

Blend Transition(블렌드 전환) : blend mode를 이용해 두 장면의 색과 밝기를 혼합하는 전환.

Morph Transition(모프 전환) : 한 형태가 다른 형태로 연속 변형되는 효과.

Shape Morphing(도형 모핑) : SVG path나 3D geometry의 형태가 다른 모양으로 변하는 효과.

Match Cut(매치 컷) : 비슷한 위치나 형태의 오브젝트를 연결해 자연스럽게 장면을 교체하는 방식.

Parallax Transition(패럴랙스 전환) : 레이어마다 다른 속도로 이동해 깊이감을 만들며 섹션이 바뀌는 효과.

Depth Transition(깊이 전환) : z축 이동, 스케일, 블러로 앞뒤 공간을 이동하는 느낌을 주는 전환.

Blur Transition(블러 전환) : 장면이 흐려졌다가 다음 장면이 선명해지는 효과.

Defocus Transition(디포커스 전환) : 카메라 초점이 이동하는 것처럼 전경과 배경 선명도가 바뀌는 효과.

Pixel Transition(픽셀 전환) : 픽셀화나 디지털 노이즈를 이용해 화면을 바꾸는 효과.

Glitch Transition(글리치 전환) : 화면 찢김, 색 분리, 노이즈 등을 활용한 디지털 전환.

Displacement Transition(디스플레이스먼트 전환) : 텍스처나 셰이더로 이미지를 밀고 왜곡해 바꾸는 효과.

Liquid Transition(리퀴드 전환) : 액체처럼 흐르거나 번지는 왜곡을 사용한 전환.

Page Transition(페이지 전환) : 라우트 이동 시 이전 페이지와 다음 페이지 사이에 적용하는 애니메이션.

Shared Element Transition(공유 요소 전환) : 두 페이지에 공통으로 존재하는 요소가 위치와 크기를 이어받으며 이동하는 효과.

---

## 7. 요소 등장과 퇴장 모션

Entrance Animation(등장 애니메이션) : 요소가 화면에 처음 나타날 때 적용하는 모션.

Exit Animation(퇴장 애니메이션) : 요소가 화면에서 사라질 때 적용하는 모션.

Reveal Up : 아래에서 위로 이동하며 나타나는 효과.

Reveal Down : 위에서 아래로 이동하며 나타나는 효과.

Reveal Left : 오른쪽에서 왼쪽으로 이동하며 나타나는 효과.

Reveal Right : 왼쪽에서 오른쪽으로 이동하며 나타나는 효과.

Stagger(스태거) : 여러 요소의 애니메이션 시작 시간을 조금씩 어긋나게 하는 방식.

Stagger Delay(스태거 지연) : 각 요소 사이의 시작 시간 차이.

Cascade(캐스케이드) : 요소가 계단식으로 연속 등장하는 효과.

Choreography(모션 안무) : 여러 요소의 시작, 방향, 속도를 하나의 흐름으로 설계하는 것.

Motion Hierarchy(모션 위계) : 중요한 요소가 먼저 또는 강하게 움직이도록 우선순위를 정하는 것.

Microinteraction(마이크로인터랙션) : 버튼, 아이콘, 토글 등 작은 UI에서 발생하는 짧은 피드백.

Hover Animation(호버 애니메이션) : 포인터가 요소 위에 올라갔을 때 발생하는 변화.

Hover Lift(호버 리프트) : 카드가 위로 살짝 이동해 떠오르는 느낌을 주는 효과.

Hover Scale(호버 스케일) : 호버 시 요소나 이미지가 확대 또는 축소되는 효과.

Image Zoom on Hover : 카드의 틀은 고정하고 내부 이미지만 확대하는 효과.

Magnetic Hover(마그네틱 호버) : 버튼이나 요소가 커서 방향으로 끌려오는 효과.

Cursor Follow(커서 추종) : 요소나 미리보기 이미지가 마우스 위치를 따라 움직이는 효과.

Cursor Lag(커서 지연) : 요소가 커서를 즉시 따라가지 않고 감쇠 보간으로 뒤따르는 효과.

Cursor Preview(커서 미리보기) : 목록을 호버할 때 커서 주변에 관련 이미지나 영상이 나타나는 효과.

Floating Preview(플로팅 미리보기) : 커서를 따라다니는 이미지 카드나 영상 창.

Preview Rotation(미리보기 회전) : 커서 이동 방향과 속도에 따라 미리보기의 각도가 변하는 효과.

Tilt Effect(틸트 효과) : 마우스 위치에 따라 카드가 3D로 기울어지는 효과.

Perspective Hover(원근 호버) : perspective와 rotateX/Y를 이용해 깊이감 있게 기울이는 효과.

Spotlight Hover(스포트라이트 호버) : 커서 주변만 밝아지거나 그라디언트가 따라다니는 효과.

Border Draw(보더 드로우) : 호버 시 테두리가 한 방향으로 그려지는 효과.

Underline Reveal(밑줄 리빌) : 링크 밑줄이 좌우로 확장되며 나타나는 효과.

Text Swap(텍스트 스왑) : 기존 문구가 이동하며 다른 문구로 교체되는 효과.

Icon Morph(아이콘 모프) : 화살표, 플러스, 닫기 아이콘 등이 다른 형태로 변하는 효과.

Button Fill(버튼 필) : 호버 시 배경색이 한 방향에서 채워지는 효과.

Ripple(리플) : 클릭 지점에서 원형 파동이 퍼지는 효과.

Press Feedback(프레스 피드백) : 클릭 순간 버튼이 눌리는 것처럼 작아지거나 내려가는 효과.

Spring Animation(스프링 애니메이션) : 질량과 탄성을 가진 것처럼 목표 위치를 지나쳤다가 안정되는 모션.

Overshoot(오버슈트) : 목표값을 약간 넘은 뒤 되돌아오는 움직임.

Bounce(바운스) : 반복적으로 튕기며 감쇠하는 움직임.

Elastic Motion(엘라스틱 모션) : 고무처럼 늘어나거나 휘어지는 움직임.

Idle Animation(대기 애니메이션) : 사용자 입력이 없어도 오브젝트가 미세하게 계속 움직이는 효과.

Floating Motion(플로팅 모션) : 오브젝트가 천천히 위아래로 떠다니는 효과.

Breathing Motion(브리딩 모션) : 크기나 밝기가 숨 쉬듯 천천히 반복 변화하는 효과.

Drift(드리프트) : 오브젝트가 일정 방향으로 느리게 흘러가는 움직임.

Wobble(워블) : 오브젝트가 좌우나 회전 방향으로 부드럽게 흔들리는 효과.

Loop Animation(루프 애니메이션) : 끝난 뒤 처음부터 반복되는 애니메이션.

Seamless Loop(심리스 루프) : 시작과 끝의 차이가 보이지 않게 자연스럽게 반복되는 애니메이션.

---

## 8. 타이포그래피 모션

Display Type(디스플레이 타이포) : 큰 크기로 브랜드 인상과 메시지를 전달하는 제목용 글자.

Body Copy(본문 카피) : 상세 설명에 사용하는 읽기 중심의 텍스트.

Eyebrow Text(아이브로 텍스트) : 제목 위에 배치하는 작은 카테고리나 라벨.

Kicker(키커) : 제목을 보조하는 짧은 상단 문구.

Headline(헤드라인) : 섹션의 가장 중요한 제목 문구.

Subheadline(서브헤드라인) : 헤드라인을 보완하는 두 번째 수준의 문구.

Caption(캡션) : 이미지, 도표, 영상에 붙는 짧은 설명.

Label(레이블) : 항목의 종류나 상태를 나타내는 짧은 텍스트.

Line Height(행간) : 텍스트 줄과 줄 사이의 높이.

Letter Spacing(자간) : 글자와 글자 사이의 간격.

Tracking(트래킹) : 일정 범위 텍스트 전체의 자간 조정.

Kerning(커닝) : 특정 글자 조합 사이의 간격 조정.

Measure(행 길이) : 한 줄에 들어가는 텍스트의 폭이나 글자 수.

Line Break(줄바꿈) : 텍스트가 다음 줄로 나뉘는 지점.

Forced Line Break(강제 줄바꿈) : `<br>` 등을 사용해 설계자가 지정한 위치에서 줄을 바꾸는 것.

Fluid Typography(유동형 타이포) : 화면 크기에 따라 글자 크기가 연속적으로 변화하는 설정.

Clamp Typography : CSS `clamp()`로 최소, 유동, 최대 글자 크기를 지정하는 방식.

Text Reveal(텍스트 리빌) : 텍스트가 마스크나 이동 효과로 나타나는 연출.

Line Reveal(라인 리빌) : 텍스트가 줄 단위로 순차 등장하는 효과.

Word Reveal(단어 리빌) : 문장이 단어 단위로 나타나는 효과.

Character Reveal(글자 리빌) : 텍스트가 문자 단위로 나타나는 효과.

Split Text(스플릿 텍스트) : 애니메이션을 위해 문장을 줄, 단어, 문자 요소로 분해하는 처리.

Mask Text Reveal(마스크 텍스트 리빌) : 줄 높이의 마스크 안에서 글자가 이동해 나타나는 효과.

Text Scrub(텍스트 스크럽) : 스크롤 진행률에 따라 글자나 줄이 순차적으로 나타나는 효과.

Text Fill on Scroll(스크롤 텍스트 채우기) : 스크롤에 따라 문장의 글자색이 앞에서부터 채워지는 효과.

Kinetic Typography(키네틱 타이포그래피) : 글자의 이동, 회전, 크기 변화를 주요 시각 요소로 사용하는 방식.

Marquee(마키) : 텍스트나 로고가 수평으로 계속 흐르는 효과.

Infinite Marquee(무한 마키) : 끊김 없이 반복되는 흐르는 텍스트 트랙.

Text Loop(텍스트 루프) : 여러 문구가 같은 자리에서 순환 교체되는 효과.

Rolling Text(롤링 텍스트) : 숫자나 단어가 위아래로 굴러가며 교체되는 효과.

Counter Animation(카운터 애니메이션) : 숫자가 목표값까지 증가하거나 감소하는 효과.

Scramble Text(스크램블 텍스트) : 무작위 문자가 빠르게 바뀌다가 최종 문구로 정렬되는 효과.

Typewriter Effect(타이프라이터 효과) : 글자가 타이핑되듯 한 글자씩 나타나는 효과.

Text Morphing(텍스트 모핑) : 한 단어나 문장이 다른 텍스트로 형태를 바꾸는 효과.

Variable Font Animation(가변 폰트 애니메이션) : font-weight, width 등의 가변 축을 애니메이션하는 효과.

Text Outline(아웃라인 텍스트) : 내부 채움 없이 윤곽선만 표시한 글자.

Knockout Text(녹아웃 텍스트) : 글자 모양으로 배경이나 이미지가 뚫려 보이는 효과.

Blend-mode Text(블렌드 텍스트) : 배경과 혼합되는 blend mode를 적용한 텍스트.

---

## 9. 이미지와 영상 효과

Image Sequence(이미지 시퀀스) : 연속된 정지 이미지를 빠르게 교체해 영상처럼 표현하는 방식.

Frame-by-frame Scroll(프레임 스크롤) : 스크롤 진행률로 이미지 시퀀스의 프레임을 선택하는 연출.

Scroll-controlled Video(스크롤 제어 영상) : 스크롤 위치에 따라 영상 재생 시간을 변경하는 방식.

Video Scrubbing(비디오 스크러빙) : 영상의 currentTime을 스크롤 진행률과 연결하는 방식.

Autoplay Video(자동 재생 영상) : 사용자 입력 없이 자동으로 재생되는 영상.

Muted Autoplay(무음 자동 재생) : 브라우저 정책을 만족하도록 음소거 상태로 자동 재생하는 영상.

Looping Video(반복 영상) : 영상이 끝나면 처음부터 반복되는 설정.

Poster Image(포스터 이미지) : 영상이 로드되기 전이나 재생할 수 없을 때 표시하는 대체 이미지.

Lazy Loading(지연 로딩) : 화면에 가까워질 때 이미지나 영상을 불러오는 최적화 방식.

Preloading(사전 로딩) : 필요한 시점 전에 에셋을 미리 다운로드하는 방식.

Progressive Image(점진적 이미지) : 저화질 이미지를 먼저 보여주고 고화질로 교체하는 방식.

Blur-up(블러 업) : 흐린 작은 이미지를 먼저 표시하고 원본 로드 후 선명하게 바꾸는 방식.

Image Parallax(이미지 패럴랙스) : 컨테이너와 내부 이미지가 다른 속도로 움직이는 효과.

Mouse Parallax(마우스 패럴랙스) : 마우스 위치에 따라 이미지나 레이어가 반대 방향으로 미세 이동하는 효과.

Depth Parallax(깊이 패럴랙스) : 여러 레이어에 서로 다른 이동량을 적용해 입체감을 만드는 효과.

Ken Burns Effect(켄 번즈 효과) : 정지 이미지가 천천히 확대되고 이동하는 영상적 효과.

Pan(팬) : 카메라나 이미지 시점이 좌우 또는 상하로 이동하는 효과.

Zoom(줌) : 이미지나 카메라의 화면 점유율을 확대 또는 축소하는 효과.

Image Mask(이미지 마스크) : 특정 모양 안에서만 이미지를 보이게 하는 처리.

Duotone(듀오톤) : 이미지를 두 가지 주요 색상으로 재구성하는 효과.

Color Grading(컬러 그레이딩) : 이미지나 영상 전체의 색감과 대비를 조정하는 작업.

Blend Mode(블렌드 모드) : 레이어 색상을 아래 레이어와 계산해 혼합하는 방식.

Multiply : 밝은 부분을 투명하게 느끼게 하고 어두운 색을 강조하는 혼합 방식.

Screen : 어두운 부분을 약하게 하고 밝은 부분을 강조하는 혼합 방식.

Difference : 위아래 레이어 색상의 차이를 표시하는 혼합 방식.

Luminosity : 색상보다 밝기 정보를 중심으로 혼합하는 방식.

Image Trail(이미지 트레일) : 커서나 스크롤 이동 경로를 따라 이미지 잔상이 연속 생성되는 효과.

Motion Blur(모션 블러) : 빠른 이동 방향으로 잔상을 만들어 속도감을 주는 효과.

Chromatic Aberration(색수차) : RGB 채널을 미세하게 분리해 렌즈나 디지털 왜곡 느낌을 주는 효과.

Noise Overlay(노이즈 오버레이) : 화면 위에 미세한 입자 질감을 덮는 효과.

Film Grain(필름 그레인) : 필름처럼 불규칙한 밝기 입자를 추가하는 효과.

Vignette(비네트) : 화면 가장자리를 어둡게 해 중앙에 시선을 모으는 효과.

---

## 10. Canvas, WebGL, 3D

Canvas : JavaScript로 픽셀, 도형, 이미지, 3D 장면을 그리는 HTML 표면.

2D Canvas : Canvas 2D API를 사용해 평면 그래픽을 렌더링하는 방식.

WebGL : GPU를 이용해 브라우저에서 2D와 3D 그래픽을 렌더링하는 기술.

WebGPU : WebGL보다 현대적인 GPU 접근 방식을 제공하는 웹 그래픽 API.

Three.js : WebGL 장면, 카메라, 조명, 모델을 쉽게 구성하도록 돕는 JavaScript 3D 라이브러리.

React Three Fiber : Three.js 장면을 React 컴포넌트 방식으로 작성하는 렌더러.

Scene(씬) : 카메라, 조명, 모델, 파티클이 배치되는 3D 공간.

Scene Graph(씬 그래프) : 3D 오브젝트들의 부모·자식 관계 구조.

Camera(카메라) : 3D 장면을 어떤 시점과 투영 방식으로 볼지 결정하는 객체.

Perspective Camera(원근 카메라) : 멀리 있는 물체가 작아 보이는 현실적인 원근을 사용하는 카메라.

Orthographic Camera(직교 카메라) : 거리에 따른 크기 변화가 없는 평면적인 투영 카메라.

Field of View/FOV(시야각) : 카메라가 한 화면에 담는 시야의 각도.

Camera Dolly(카메라 돌리) : 카메라 자체를 앞뒤로 이동하는 촬영 방식.

Camera Pan(카메라 팬) : 카메라 위치를 좌우 또는 상하로 이동하는 방식.

Camera Orbit(카메라 오빗) : 대상 주변을 원형으로 회전하는 카메라 움직임.

Camera Look-at : 카메라가 특정 좌표나 오브젝트를 계속 바라보게 하는 설정.

Camera Rig(카메라 리그) : 여러 이동과 흔들림을 쉽게 제어하도록 카메라를 그룹에 묶은 구조.

Parallax Camera(패럴랙스 카메라) : 마우스나 스크롤에 따라 시점이 미세하게 변하는 카메라.

Geometry(지오메트리) : 3D 오브젝트의 점, 선, 면으로 구성된 형태 데이터.

Mesh(메시) : geometry와 material을 결합한 렌더링 가능한 3D 오브젝트.

Material(머티리얼) : 표면의 색, 반사, 투명도, 거칠기 등을 정의하는 재질.

Texture(텍스처) : 3D 표면에 적용하는 이미지 데이터.

Normal Map(노멀 맵) : 실제 면을 늘리지 않고 표면의 미세한 굴곡을 표현하는 텍스처.

Roughness Map(러프니스 맵) : 표면 부위별 거칠기와 반사 퍼짐을 제어하는 텍스처.

Metalness Map(메탈니스 맵) : 표면 부위별 금속성 정도를 제어하는 텍스처.

Environment Map(환경 맵) : 주변 환경의 빛과 반사를 재질에 제공하는 텍스처.

HDRI : 넓은 밝기 범위를 가진 환경 이미지로 사실적인 조명과 반사를 만드는 에셋.

PBR Material : 물리 기반 렌더링 원칙으로 금속, 유리, 플라스틱 등의 재질을 표현하는 방식.

MeshPhysicalMaterial : 투과, 굴절, clearcoat 등을 지원하는 Three.js의 물리 재질.

Transmission(투과) : 빛이 재질 내부를 통과해 뒤쪽이 보이는 성질.

Refraction(굴절) : 빛이 투명 재질을 통과하며 방향이 휘는 현상.

Reflection(반사) : 주변 환경이 표면에 비치는 성질.

Roughness(거칠기) : 반사가 날카로운지 퍼지는지 결정하는 값.

Metalness(금속성) : 재질이 금속처럼 빛을 반사하는 정도.

Clearcoat(클리어코트) : 표면 위에 얇은 광택 코팅층이 있는 것처럼 표현하는 속성.

IOR(굴절률) : 빛이 재질을 통과할 때 얼마나 굴절하는지 나타내는 값.

Shader(셰이더) : GPU에서 각 정점과 픽셀의 위치와 색을 계산하는 프로그램.

Vertex Shader(버텍스 셰이더) : 3D 모델 정점의 최종 위치를 계산하는 셰이더.

Fragment Shader(프래그먼트 셰이더) : 화면 픽셀의 최종 색상을 계산하는 셰이더.

Uniform(유니폼) : JavaScript에서 셰이더로 전달하는 시간, 색상, 진행률 등의 공통 값.

Varying(베어링) : 버텍스 셰이더에서 프래그먼트 셰이더로 보간되어 전달되는 값.

Procedural Shader(절차적 셰이더) : 이미지 텍스처 없이 수학식으로 패턴과 색을 생성하는 셰이더.

Noise Function(노이즈 함수) : 자연스러운 불규칙 패턴을 생성하는 수학 함수.

Perlin Noise : 부드럽게 이어지는 자연스러운 노이즈 패턴.

Simplex Noise : 계산 효율과 방향성이 개선된 노이즈 알고리즘.

Displacement(디스플레이스먼트) : 정점이나 픽셀 위치를 이동해 표면을 변형하는 처리.

Post-processing(후처리) : 3D 장면 렌더링 후 화면 전체에 추가 효과를 적용하는 단계.

Bloom(블룸) : 밝은 부분 주변에 빛이 번지는 효과.

Depth of Field/DOF(피사계 심도) : 초점 거리에 따라 일부 영역을 흐리게 만드는 효과.

Ambient Occlusion/AO : 물체가 가까이 맞닿는 부분에 접촉 그림자를 추가하는 효과.

Tone Mapping(톤 매핑) : HDR 밝기 값을 화면이 표시할 수 있는 범위로 변환하는 과정.

Anti-aliasing(안티앨리어싱) : 대각선과 곡선의 계단 현상을 줄이는 처리.

MSAA : 여러 샘플을 사용해 메시 경계의 계단 현상을 줄이는 방식.

FXAA : 렌더링된 화면을 분석해 계단 현상을 줄이는 후처리 방식.

Render Loop(렌더 루프) : 매 프레임 장면을 업데이트하고 그리는 반복 처리.

Request Animation Frame : 브라우저 화면 갱신 주기에 맞춰 렌더 함수를 호출하는 API.

Delta Time(델타 타임) : 이전 프레임과 현재 프레임 사이의 시간 차이.

Frame Rate/FPS(프레임률) : 1초 동안 렌더링되는 화면의 수.

Device Pixel Ratio/DPR : CSS 픽셀 하나에 대응하는 실제 디스플레이 픽셀 비율.

DPR Cap(DPR 상한) : 고해상도 화면에서 성능 저하를 막기 위해 렌더 해상도 비율을 제한하는 설정.

Offscreen Rendering(오프스크린 렌더링) : 최종 화면에 표시하기 전 별도의 렌더 타깃에 장면을 그리는 방식.

Render Target(렌더 타깃) : 장면 결과를 저장하는 GPU 텍스처.

Context Loss(WebGL 컨텍스트 손실) : GPU 상태가 초기화되어 WebGL 렌더링이 중단되는 현상.

Asset Disposal(에셋 해제) : 사용이 끝난 geometry, material, texture를 GPU 메모리에서 제거하는 처리.

GLTF/GLB : 웹에서 자주 사용하는 3D 모델 포맷. GLB는 관련 데이터를 하나의 바이너리 파일에 담은 형태.

Draco Compression : 3D geometry 용량을 줄이는 압축 방식.

KTX2 : GPU에 효율적으로 업로드할 수 있는 압축 텍스처 포맷.

Instancing(인스턴싱) : 같은 geometry를 여러 번 효율적으로 렌더링하는 기법.

Instanced Mesh : 하나의 draw call로 동일한 메시를 여러 위치에 그리는 방식.

Particle System(파티클 시스템) : 많은 작은 점이나 스프라이트로 먼지, 별, 연기 등을 표현하는 시스템.

Point Cloud(포인트 클라우드) : 수많은 3D 점으로 형상이나 공간을 표현하는 데이터.

Sprite(스프라이트) : 항상 카메라를 향하거나 평면 이미지로 표현되는 2D 오브젝트.

Billboard(빌보드) : 카메라 방향을 계속 바라보도록 회전하는 평면 오브젝트.

LOD(Level of Detail) : 카메라 거리나 성능에 따라 모델의 상세도를 바꾸는 기법.

Frustum Culling(프러스텀 컬링) : 카메라 화면 밖의 오브젝트를 렌더링하지 않는 최적화.

Occlusion Culling(오클루전 컬링) : 다른 물체에 완전히 가려진 오브젝트를 렌더링하지 않는 최적화.

Raycasting(레이캐스팅) : 마우스 위치에서 3D 공간으로 광선을 쏴 선택된 오브젝트를 찾는 방식.

3D Hover(3D 호버) : raycasting으로 3D 오브젝트 위의 포인터 상태를 감지하는 인터랙션.

Drag Rotation(드래그 회전) : 마우스나 터치 드래그로 3D 오브젝트를 회전하는 기능.

Idle Rotation(대기 회전) : 입력이 없어도 3D 오브젝트가 천천히 회전하는 효과.

Scroll-driven Camera(스크롤 카메라) : 스크롤 진행률로 카메라 위치와 회전을 제어하는 방식.

Scene Transition(씬 전환) : 스크롤이나 클릭에 따라 3D 모델, 조명, 카메라 상태가 바뀌는 연출.

Shared Canvas(공유 캔버스) : 하나의 고정 Canvas가 전체 페이지에서 여러 섹션 장면을 담당하는 구조.

Section Canvas(섹션 캔버스) : 각 섹션마다 별도의 Canvas를 사용하는 구조.

Fixed Canvas(고정 캔버스) : 뷰포트에 고정되고 페이지 콘텐츠가 그 위를 지나가는 Canvas.

Canvas Fallback(캔버스 대체 화면) : WebGL을 사용할 수 없을 때 보여주는 이미지나 영상.

---

## 11. 마스크, SVG와 특수 그래픽

SVG : 해상도에 영향을 받지 않는 벡터 그래픽 포맷.

SVG Path : SVG 도형의 윤곽을 정의하는 좌표 데이터.

Path Animation(패스 애니메이션) : SVG path의 길이, 모양, 위치를 변화시키는 효과.

Stroke Draw(선 그리기) : `stroke-dasharray`와 `stroke-dashoffset`으로 선이 그려지는 효과.

SVG Morphing : 서로 호환되는 SVG path 사이를 변형하는 효과.

Clip Path : 요소가 보이는 영역의 모양을 지정하는 CSS 또는 SVG 기능.

Mask Image : 이미지나 그라디언트의 밝기 또는 알파값으로 요소의 가시 영역을 결정하는 기능.

Alpha Mask(알파 마스크) : 투명도 정보를 이용해 보이는 영역을 제어하는 마스크.

Luma Mask(루마 마스크) : 밝기 정보를 이용해 보이는 영역을 제어하는 마스크.

Gradient Mask(그라디언트 마스크) : 그라디언트로 콘텐츠가 서서히 사라지도록 만드는 효과.

Text Mask(텍스트 마스크) : 글자 모양 안에 이미지나 영상을 표시하는 구성.

Blob(블롭) : 유기적으로 일그러진 둥근 도형.

Metaball(메타볼) : 가까워지면 서로 합쳐지는 액체 같은 원형 도형.

Organic Shape(유기적 도형) : 규칙적인 기하학 형태가 아닌 자연스럽고 부드러운 형태.

Generative Art(제너레이티브 아트) : 코드와 규칙으로 매번 생성되는 시각 그래픽.

Procedural Texture(절차적 텍스처) : 이미지 파일 없이 수학적으로 생성한 표면 패턴.

---

## 12. 헤더와 내비게이션

Fixed Header(고정 헤더) : 스크롤해도 화면 상단에 계속 표시되는 헤더.

Sticky Header(스티키 헤더) : 특정 위치에 도달한 후 상단에 고정되는 헤더.

Transparent Header(투명 헤더) : 별도 배경 없이 콘텐츠 위에 놓인 헤더.

Glass Header(글래스 헤더) : 반투명 배경과 backdrop blur를 사용한 헤더.

Solid Header(솔리드 헤더) : 불투명한 단색 배경을 가진 헤더.

Header Reveal(헤더 리빌) : 위로 스크롤할 때 헤더가 나타나고 아래로 스크롤할 때 숨는 동작.

Auto-hide Header(자동 숨김 헤더) : 스크롤 방향에 따라 자동으로 나타나거나 사라지는 헤더.

Header Blend Mode(헤더 블렌드 모드) : 배경에 맞춰 로고와 메뉴 색이 자동으로 반전되도록 blend mode를 사용하는 방식.

Active Navigation(활성 내비게이션) : 현재 보고 있는 섹션에 해당하는 메뉴를 강조하는 기능.

Scrollspy(스크롤스파이) : 스크롤 위치를 감지해 현재 섹션의 메뉴를 활성화하는 기능.

Anchor Link(앵커 링크) : 같은 페이지 안의 특정 ID 위치로 이동하는 링크.

Deep Link(딥 링크) : 특정 페이지나 섹션 상태로 직접 진입하는 URL.

Mega Menu(메가 메뉴) : 여러 카테고리와 콘텐츠를 넓은 패널에 표시하는 메뉴.

Overlay Menu(오버레이 메뉴) : 화면 전체를 덮으며 열리는 내비게이션.

Drawer Menu(드로어 메뉴) : 화면 가장자리에서 밀려 나오는 메뉴.

Hamburger Menu(햄버거 메뉴) : 세 줄 아이콘으로 열고 닫는 축약형 메뉴.

Portal Switcher(포털 전환기) : 메인 포털과 트레이딩 포털처럼 서비스 영역을 전환하는 UI.

---

## 13. 반응형과 모바일

Responsive Design(반응형 디자인) : 화면 크기에 따라 레이아웃과 크기가 적응하는 설계.

Adaptive Design(적응형 디자인) : 정해진 몇 가지 화면 크기별로 별도 레이아웃을 사용하는 설계.

Breakpoint(브레이크포인트) : 레이아웃 규칙이 변경되는 화면 폭 기준.

Mobile First(모바일 우선) : 작은 화면 기준 스타일을 먼저 작성하고 큰 화면으로 확장하는 방식.

Desktop First(데스크톱 우선) : 큰 화면 기준 스타일을 먼저 작성하고 작은 화면 규칙을 추가하는 방식.

Fluid Layout(유동형 레이아웃) : 고정 픽셀보다 비율과 가변 단위를 사용해 폭이 자연스럽게 변하는 구성.

Fluid Grid(유동형 그리드) : 화면 폭에 따라 컬럼 크기가 연속적으로 변하는 그리드.

Responsive Type Scale(반응형 타입 스케일) : 화면 크기에 따라 제목과 본문의 크기 비율을 조정하는 체계.

Responsive Image(반응형 이미지) : 화면 크기와 해상도에 적절한 이미지 파일을 선택하는 방식.

Srcset : 브라우저가 화면 조건에 맞는 이미지 파일을 선택할 수 있도록 후보를 제공하는 속성.

Art Direction(아트 디렉션) : 모바일과 데스크톱에 서로 다른 크롭이나 이미지를 사용하는 방식.

Touch Target(터치 영역) : 손가락으로 누를 수 있도록 확보해야 하는 버튼과 링크의 실제 크기.

Touch Interaction(터치 인터랙션) : 탭, 스와이프, 핀치 등 모바일 입력에 대응하는 동작.

Swipe(스와이프) : 손가락을 한 방향으로 밀어 콘텐츠를 이동하거나 전환하는 입력.

Pinch Zoom(핀치 줌) : 두 손가락 간격으로 확대와 축소를 제어하는 입력.

Orientation Change(화면 회전) : 세로와 가로 모드가 바뀌는 상황.

Safe Area(안전 영역) : 노치와 홈 인디케이터를 피해야 하는 화면 영역.

Safe-area Inset : 모바일 기기의 안전 영역 값을 제공하는 CSS 환경 변수.

Mobile Fallback(모바일 대체) : 무거운 데스크톱 효과 대신 모바일에서 사용하는 간소화된 화면.

Reduced Scene(축소 장면) : 모바일이나 저사양 기기에서 모델과 파티클 수를 줄인 3D 장면.

Responsive Pin Duration(반응형 핀 길이) : 화면 크기에 따라 pinned 스크롤 길이를 다르게 설정하는 방식.

---

## 14. 접근성과 입력 환경

Accessibility/A11y(접근성) : 장애 여부와 입력 환경에 관계없이 콘텐츠를 사용할 수 있도록 하는 설계.

Reduced Motion(모션 감소) : 사용자가 운영체제에서 움직임 감소를 설정했을 때 애니메이션을 줄이는 대응.

Prefers Reduced Motion : 모션 감소 설정을 감지하는 CSS 미디어 쿼리.

Keyboard Navigation(키보드 탐색) : 마우스 없이 Tab, Enter, 방향키로 기능을 사용할 수 있도록 하는 것.

Focus State(포커스 상태) : 키보드로 선택된 요소를 시각적으로 표시하는 상태.

Focus Ring(포커스 링) : 포커스된 요소 주변에 표시하는 윤곽선.

Screen Reader(스크린 리더) : 화면 내용을 음성이나 점자로 전달하는 보조 기술.

ARIA Label : 시각적 텍스트가 없는 요소의 의미를 보조 기술에 제공하는 속성.

Semantic HTML(시맨틱 HTML) : header, nav, main, section 등 의미에 맞는 HTML 요소를 사용하는 것.

Alt Text(대체 텍스트) : 이미지를 볼 수 없는 환경에서 이미지 의미를 전달하는 설명.

Decorative Image(장식 이미지) : 정보 전달 목적이 없어 빈 alt를 사용하는 이미지.

Color Contrast(색상 대비) : 글자와 배경 사이의 밝기 차이.

Pointer Coarse : 터치처럼 정밀하지 않은 포인터 환경.

Hover Capable : 장치가 실제 hover 입력을 지원하는지 나타내는 조건.

Progressive Enhancement(점진적 향상) : 기본 기능을 먼저 보장하고 지원 환경에서 고급 효과를 추가하는 방식.

Graceful Degradation(우아한 성능 저하) : 고급 기능이 실패해도 핵심 콘텐츠는 사용할 수 있게 유지하는 방식.

---

## 15. 성능과 로딩

Loading State(로딩 상태) : 콘텐츠와 에셋이 준비되는 동안 보여주는 UI 상태.

Preloader(프리로더) : 페이지 주요 에셋이 준비될 때까지 표시하는 로딩 화면.

Loading Progress(로딩 진행률) : 전체 에셋 중 준비된 비율.

Skeleton UI(스켈레톤 UI) : 실제 콘텐츠 자리의 형태를 미리 보여주는 로딩 UI.

Critical Assets(핵심 에셋) : 첫 화면 표시를 위해 반드시 먼저 필요한 폰트, 이미지, 모델 등.

Critical CSS : 첫 화면 렌더링에 필요한 최소 스타일.

Code Splitting(코드 분할) : 필요한 페이지나 기능의 코드만 나누어 불러오는 방식.

Lazy Import(지연 임포트) : 컴포넌트가 필요해질 때 JavaScript 모듈을 불러오는 방식.

Dynamic Import(동적 임포트) : 실행 중 조건에 따라 모듈을 불러오는 JavaScript 문법.

Tree Shaking(트리 셰이킹) : 사용하지 않는 코드가 최종 번들에 포함되지 않게 제거하는 과정.

Bundle Size(번들 크기) : 브라우저가 다운로드해야 하는 JavaScript와 CSS 파일 용량.

Asset Budget(에셋 예산) : 이미지, 영상, 모델 등의 허용 용량 기준.

Performance Budget(성능 예산) : 로딩 시간, 번들 크기, FPS 등에 설정하는 목표 한계.

First Contentful Paint/FCP : 첫 콘텐츠가 화면에 표시되기까지의 시간.

Largest Contentful Paint/LCP : 화면에서 가장 큰 주요 콘텐츠가 표시되기까지의 시간.

Cumulative Layout Shift/CLS : 로딩 중 요소 위치가 예상치 않게 움직이는 정도.

Interaction to Next Paint/INP : 사용자 입력 후 화면이 반응하기까지의 지연 지표.

Time to Interactive/TTI : 페이지가 실제 입력에 반응할 준비가 되기까지의 시간.

Layout Thrashing(레이아웃 스래싱) : DOM 측정과 스타일 변경을 반복해 강제 레이아웃 계산이 과도하게 발생하는 현상.

Reflow(리플로우) : 요소 크기나 위치 변경으로 브라우저가 레이아웃을 다시 계산하는 작업.

Repaint(리페인트) : 레이아웃은 그대로지만 색상이나 그림자를 다시 그리는 작업.

Composite Layer(컴포지트 레이어) : GPU가 별도로 합성할 수 있도록 분리된 렌더링 레이어.

GPU Acceleration(GPU 가속) : transform 등의 렌더링을 GPU 합성 단계에서 처리하는 최적화.

Will Change : 특정 속성이 곧 변할 것을 브라우저에 알려 최적화를 유도하는 CSS 속성.

Frame Budget(프레임 예산) : 60FPS 기준 한 프레임을 처리할 수 있는 약 16.67ms의 시간.

Jank(쟁크) : 프레임이 끊기거나 입력 반응이 불규칙해 보이는 현상.

Throttle(스로틀) : 이벤트 함수가 일정 시간에 한 번만 실행되도록 제한하는 방식.

Debounce(디바운스) : 연속 입력이 끝난 뒤 한 번만 함수를 실행하는 방식.

RAF Throttling : requestAnimationFrame을 이용해 화면 프레임당 한 번만 업데이트하는 방식.

Visibility Culling(가시성 컬링) : 화면에 보이지 않는 섹션의 렌더링이나 애니메이션을 중단하는 최적화.

Page Visibility API : 브라우저 탭이 보이는지 감지하는 API.

Idle Loading(유휴 로딩) : 브라우저가 바쁘지 않을 때 중요도가 낮은 에셋을 불러오는 방식.

Cache(캐시) : 이미 받은 파일을 저장해 다시 다운로드하지 않도록 하는 기능.

CDN : 사용자와 가까운 서버에서 정적 에셋을 전달하는 네트워크.

Offline-ready(오프라인 대응) : 외부 네트워크 없이도 핵심 페이지와 에셋이 동작하는 상태.

---

## 16. 상태와 인터랙션 설계

Default State(기본 상태) : 아무 입력도 발생하지 않은 요소의 초기 모습.

Initial State(초기 상태) : 애니메이션이나 페이지 진입 직후의 시작 상태.

Active State(활성 상태) : 현재 선택되거나 진행 중인 요소의 상태.

Inactive State(비활성 상태) : 현재 선택되지 않은 요소의 상태.

Hover State(호버 상태) : 마우스가 요소 위에 있는 상태.

Pressed State(눌림 상태) : 마우스나 터치가 요소를 누르고 있는 상태.

Selected State(선택 상태) : 사용자가 항목을 선택한 상태.

Disabled State(비활성화 상태) : 상호작용할 수 없도록 막힌 상태.

Loading State(로딩 상태) : 작업이 진행 중인 상태.

Success State(성공 상태) : 작업이 정상 완료된 상태.

Error State(오류 상태) : 작업 실패나 잘못된 입력을 알리는 상태.

Empty State(빈 상태) : 표시할 데이터가 없는 상태.

State Transition(상태 전환) : 한 UI 상태에서 다른 상태로 바뀌는 과정.

State Machine(상태 머신) : 가능한 상태와 상태 사이의 이동 조건을 명시한 구조.

Progressive Disclosure(점진적 공개) : 필요한 정보만 먼저 보여주고 상세 정보는 상호작용 후 공개하는 방식.

Accordion(아코디언) : 제목을 클릭하면 상세 영역이 펼쳐지는 UI.

Tabs(탭) : 같은 공간에서 여러 콘텐츠 패널을 선택해 전환하는 UI.

Carousel(캐러셀) : 콘텐츠 항목을 한정된 공간에서 좌우로 전환하는 UI.

Slider(슬라이더) : 값이나 콘텐츠 위치를 드래그로 조절하는 UI.

Modal(모달) : 현재 페이지 위에 떠서 사용자의 응답을 요구하는 창.

Tooltip(툴팁) : 요소를 호버하거나 포커스할 때 나타나는 짧은 설명.

Popover(팝오버) : 특정 요소 주변에 나타나는 비교적 큰 정보 패널.

Toast(토스트) : 작업 결과를 잠시 표시했다가 사라지는 알림.

Hotspot(핫스팟) : 이미지나 3D 장면의 특정 위치에 놓인 상호작용 지점.

Drag Interaction(드래그 인터랙션) : 포인터를 누른 채 이동해 요소를 조작하는 방식.

Drag Inertia(드래그 관성) : 드래그를 놓은 뒤 이동 속도에 따라 계속 움직이는 효과.

Elastic Bounds(탄성 경계) : 드래그 범위를 넘으면 저항이 생기고 놓았을 때 되돌아오는 효과.

Gesture(제스처) : 스와이프, 핀치, 롱프레스 등 연속 입력 패턴.

Long Press(롱프레스) : 일정 시간 이상 누르고 있을 때 실행되는 입력.

---

## 17. 컴포넌트와 구현 구조

Component(컴포넌트) : 독립적인 UI 구조, 스타일, 동작을 묶은 재사용 단위.

Reusable Component(재사용 컴포넌트) : 여러 위치에서 데이터만 바꿔 반복 사용할 수 있는 컴포넌트.

Data-driven Component(데이터 기반 컴포넌트) : 반복 마크업을 직접 작성하지 않고 데이터 배열을 순회해 생성하는 컴포넌트.

Presentational Component(표현 컴포넌트) : 화면 표시를 중심으로 하고 복잡한 상태 로직을 갖지 않는 컴포넌트.

Container Component(컨테이너 컴포넌트) : 데이터, 상태, 이벤트를 관리하고 하위 표현 컴포넌트에 전달하는 컴포넌트.

Shared Component(공통 컴포넌트) : 여러 라우트에서 함께 사용하는 헤더, 푸터, 버튼 등의 컴포넌트.

Section Component(섹션 컴포넌트) : 랜딩페이지의 한 섹션 전체를 담당하는 컴포넌트.

Card Component(카드 컴포넌트) : 반복되는 카드 하나의 구조와 스타일을 담당하는 컴포넌트.

Component Variant(컴포넌트 변형) : 같은 구조에 크기, 색상, 배치 차이를 옵션으로 제공하는 것.

Props : 부모 컴포넌트가 자식 컴포넌트에 전달하는 데이터.

State : 사용자 입력이나 비동기 결과에 따라 변하는 컴포넌트 내부 데이터.

Hydration(하이드레이션) : 서버에서 생성한 HTML에 클라이언트 JavaScript 동작을 연결하는 과정.

Server Component(서버 컴포넌트) : 서버에서 렌더링되고 브라우저 JavaScript를 최소화하는 React 컴포넌트.

Client Component(클라이언트 컴포넌트) : 브라우저 상태, 이벤트, effect를 사용할 수 있는 React 컴포넌트.

SSR(Server-side Rendering) : 서버에서 HTML을 생성해 브라우저로 전달하는 렌더링 방식.

CSR(Client-side Rendering) : 브라우저 JavaScript가 화면을 생성하는 렌더링 방식.

SSG(Static Site Generation) : 빌드 시점에 정적 HTML을 미리 생성하는 방식.

Route(라우트) : URL에 따라 표시되는 페이지 경로.

Nested Route(중첩 라우트) : 상위 레이아웃 안에 하위 페이지가 렌더링되는 라우트 구조.

Layout Component(레이아웃 컴포넌트) : 여러 페이지가 공유하는 구조와 메타데이터를 담당하는 컴포넌트.

Design Token(디자인 토큰) : 색상, 간격, 글자 크기 같은 디자인 값을 이름으로 관리하는 변수.

Design System(디자인 시스템) : 반복 가능한 디자인 원칙, 토큰, 컴포넌트, 사용 규칙의 집합.

Type Scale(타입 스케일) : 제목과 본문 크기의 단계 체계.

Spacing Scale(간격 스케일) : 패딩과 마진에 사용하는 일관된 간격 값 체계.

Color Token(색상 토큰) : 의미와 용도에 따라 이름 붙인 색상 변수.

Semantic Token(의미 기반 토큰) : 실제 색상값 대신 `text-primary`, `surface-hover`처럼 역할로 정의한 토큰.

Component API(컴포넌트 API) : 컴포넌트가 받는 props와 제공하는 동작의 규칙.

Single Source of Truth(단일 진실 공급원) : 동일한 데이터나 스타일이 여러 곳에 중복되지 않고 한 위치에서 관리되는 구조.

Hardcoding(하드코딩) : 반복 값이나 상태를 데이터 구조 없이 코드 여러 위치에 직접 작성하는 것.

Magic Number(매직 넘버) : 의미 설명 없이 코드에 직접 들어간 숫자 값.

Configuration(설정 데이터) : 콘텐츠와 동작을 코드 구조에서 분리해 관리하는 값.

---

## 18. 검수와 품질 용어

Visual QA(시각 검수) : 화면의 크기, 간격, 색상, 정렬, 전환을 눈으로 비교하는 검수.

Functional QA(기능 검수) : 클릭, 스크롤, 링크, 폼 등 기능이 정상 동작하는지 확인하는 검수.

Interaction QA(인터랙션 검수) : 호버, 드래그, 스크롤 타임라인, 역방향 복원 등을 확인하는 검수.

Responsive QA(반응형 검수) : 다양한 화면 크기에서 레이아웃과 기능을 확인하는 검수.

Cross-browser Testing(브라우저 교차 테스트) : Chrome, Safari, Firefox 등 여러 브라우저에서 확인하는 테스트.

Device Testing(기기 테스트) : 실제 모바일, 태블릿, 데스크톱 장치에서 확인하는 테스트.

Reference Baseline(레퍼런스 기준 화면) : 구현 비교를 위해 저장한 원본 사이트의 동일 조건 화면.

Same-viewport Comparison(동일 뷰포트 비교) : 원본과 구현을 같은 화면 크기와 DPR로 맞춰 비교하는 것.

Pixel Comparison(픽셀 비교) : 두 스크린샷의 픽셀 차이를 분석하는 검수.

Overlay Comparison(오버레이 비교) : 두 화면을 반투명하게 겹쳐 위치와 크기 차이를 확인하는 방식.

Side-by-side Comparison(나란히 비교) : 원본과 구현 화면을 좌우에 놓고 비교하는 방식.

Visual Regression(시각 회귀) : 변경 후 기존 화면과 예상치 못한 차이가 생겼는지 확인하는 테스트.

Golden Image(골든 이미지) : 시각 테스트의 정답으로 사용하는 기준 스크린샷.

Tolerance(허용 오차) : 픽셀 비교에서 차이를 허용하는 범위.

Fidelity(재현도) : 구현이 레퍼런스의 레이아웃, 모션, 분위기와 얼마나 일치하는지 나타내는 정도.

Layout Fidelity(레이아웃 재현도) : 크기, 위치, 여백, 정렬의 일치 정도.

Motion Fidelity(모션 재현도) : 속도, 타이밍, 이징, 진행 구간의 일치 정도.

Asset Fidelity(에셋 재현도) : 이미지, 모델, 폰트, 영상이 원본과 일치하는 정도.

Interaction Fidelity(인터랙션 재현도) : 마우스, 스크롤, 드래그 반응이 원본과 일치하는 정도.

Frame Capture(프레임 캡처) : 특정 스크롤 위치의 화면을 이미지로 저장하는 것.

Key Frame(주요 프레임) : 전환 시작, 중간, 끝처럼 비교 가치가 높은 시점.

Scroll Sampling(스크롤 샘플링) : 여러 진행률에서 화면을 반복 캡처해 변화 과정을 조사하는 것.

Slow Scroll Test(느린 스크롤 테스트) : 전환 중간 상태와 끊김을 확인하기 위해 천천히 스크롤하는 테스트.

Fast Scroll Test(빠른 스크롤 테스트) : 빠른 입력에서도 상태가 건너뛰거나 깨지지 않는지 확인하는 테스트.

Reverse Scroll Test(역스크롤 테스트) : 위로 되돌릴 때 장면과 상태가 정상 복원되는지 확인하는 테스트.

Direct URL Test(직접 URL 테스트) : 해당 라우트 URL로 바로 접속하거나 새로고침해도 동작하는지 확인하는 테스트.

LAN Test : localhost가 아닌 같은 네트워크의 IP로 접속해 에셋과 기능을 확인하는 테스트.

Console Error(콘솔 오류) : 브라우저 개발자 도구 콘솔에 기록되는 JavaScript 오류.

Network Error(네트워크 오류) : 에셋이나 API 요청이 실패한 상태.

CORS Error : 다른 출처의 리소스 접근 정책 때문에 요청이 차단된 오류.

Hydration Error : 서버 HTML과 클라이언트 렌더 결과가 달라 발생하는 React 오류.

Layout Shift(레이아웃 이동) : 로딩 후 요소 크기나 위치가 갑자기 바뀌는 현상.

Flash of Unstyled Content/FOUC : 스타일이 로드되기 전 기본 HTML이 잠깐 노출되는 현상.

Flash of Invisible Text/FOIT : 웹폰트 로딩 전 텍스트가 보이지 않는 현상.

Flash of Unstyled Text/FOUT : 웹폰트 로딩 전 대체 폰트가 먼저 표시되는 현상.

Acceptance Criteria(완료 조건) : 작업이 완료되었다고 판단하기 위한 구체적이고 검증 가능한 기준.

Definition of Done(완료 정의) : 기능, 시각, 테스트, 문서 등 전체 완료 요건의 목록.

---

## 19. 자주 혼동하는 용어 비교

Fixed vs Sticky : Fixed는 뷰포트에 계속 고정되고, Sticky는 부모 스크롤 범위 안에서만 고정됨.

Pinned vs Sticky : Pinned는 사용자 경험을 설명하는 말이고, Sticky는 그 경험을 구현하는 CSS 기술 중 하나임.

Scroll-triggered vs Scroll-driven : Triggered는 특정 지점에서 재생을 시작하고, Driven은 스크롤 진행률이 애니메이션 상태를 계속 결정함.

Reveal vs Transition : Reveal은 숨겨진 요소가 나타나는 효과이고, Transition은 한 상태나 장면에서 다른 상태로 바뀌는 전체 과정임.

Parallax vs Follow : Parallax는 입력에 따라 레이어별 이동량이 다른 효과이고, Follow는 요소가 입력 위치 자체를 추종하는 효과임.

Hover Preview vs Modal : Hover Preview는 포인터가 있는 동안 임시로 보이고, Modal은 명시적으로 닫기 전까지 입력을 점유함.

Carousel vs Horizontal Scroll : Carousel은 항목 단위로 전환되는 UI이고, Horizontal Scroll은 긴 수평 트랙을 연속 이동하는 구조임.

Fade vs Crossfade : Fade는 한 요소의 투명도 변화이고, Crossfade는 두 요소가 반대 방향으로 동시에 투명도 변화함.

Scale vs Zoom : Scale은 요소 크기를 바꾸고, Zoom은 카메라나 시점이 대상에 접근하는 느낌을 포함함.

Mask vs Clip : Mask는 투명도 단계 표현이 가능하고, Clip은 경계 안과 밖을 명확히 잘라냄.

Grid vs Flexbox : Grid는 행과 열을 함께 다루는 2차원 시스템이고, Flexbox는 한 방향 정렬에 적합함.

Responsive vs Adaptive : Responsive는 연속적으로 변하고, Adaptive는 정해진 화면 단계별 레이아웃을 사용함.

Component vs Section : Component는 재사용 가능한 UI 단위이고, Section은 페이지의 의미 있는 구간임. 하나의 섹션도 컴포넌트가 될 수 있음.

Animation vs Interaction : Animation은 자동으로 진행될 수 있는 시각 변화이고, Interaction은 사용자의 입력과 결과 사이의 관계를 포함함.

WebGL vs Three.js : WebGL은 브라우저 GPU API이고, Three.js는 WebGL을 쉽게 사용하도록 만든 라이브러리임.

Model vs Mesh : Model은 하나 이상의 메시, 재질, 애니메이션을 포함하는 전체 에셋이고, Mesh는 geometry와 material이 결합된 렌더 단위임.

Texture vs Material : Texture는 이미지 데이터이고, Material은 텍스처를 포함해 표면의 전체 렌더링 방식을 정의함.

Loading vs Preloading : Loading은 현재 필요한 것을 불러오는 과정이고, Preloading은 미래에 필요할 에셋을 미리 불러오는 것임.

Lazy Loading vs Progressive Loading : Lazy Loading은 로드 시점을 늦추고, Progressive Loading은 낮은 품질부터 단계적으로 보여줌.

SSR vs SSG : SSR은 요청 시 HTML을 생성하고, SSG는 빌드 시 HTML을 미리 생성함.

---

## 20. 구현 요청에 바로 쓰는 명령 문장

Pinned 카드 전환 요청 : `이 섹션을 400vh 길이의 pinned scroll section으로 만들고, 내부는 100vh sticky로 고정한 뒤 진행률을 카드 개수만큼 나눠 하나씩 활성화해줘. 마지막 카드가 활성화된 후에만 다음 섹션으로 넘어가게 해줘.`

역방향 복원 요청 : `스크럽 기반으로 구현해서 위로 역스크롤할 때 모든 상태가 반대 순서로 정확히 복원되게 해줘.`

Sticky 좌우 구성 요청 : `왼쪽 intro는 sticky로 고정하고 오른쪽 카드만 세로로 스크롤되게 해줘. sticky 부모 높이와 실제 고정 범위를 분리해서 잡아줘.`

수평 갤러리 요청 : `섹션은 pinned 상태로 유지하고 세로 스크롤 진행률을 수평 트랙의 translateX에 매핑해줘. 트랙 이동이 끝난 뒤 언핀되게 해줘.`

커서 미리보기 요청 : `목록을 호버하면 해당 이미지가 커서 주변에 나타나고 마우스를 감쇠 보간으로 따라다니게 해줘. 이동 속도에 따라 회전 각도도 부드럽게 변하게 해줘.`

이미지 패럴랙스 요청 : `이미지 컨테이너는 고정하고 내부 이미지만 1.05배 확대해서 마우스 위치 반대 방향으로 최대 10px 패럴랙스 이동하게 해줘.`

스크롤 리빌 요청 : `각 카드는 화면 16% 이상 진입할 때 아래에서 46px 이동하며 페이드 인하고, 카드 사이에는 70ms stagger를 적용해줘.`

텍스트 리빌 요청 : `제목을 줄 단위로 split하고 각 줄을 overflow hidden 마스크 안에서 아래에서 위로 순차 reveal해줘.`

이미지 마스크 전환 요청 : `다음 이미지가 clip-path inset 100%에서 0%로 열리면서 이전 이미지를 덮게 해줘. 역스크롤도 지원해줘.`

섹션 겹침 요청 : `이전 섹션 위로 다음 섹션이 올라오는 cover transition으로 만들고, 두 섹션이 30vh 동안 겹치게 해줘.`

헤더 테마 요청 : `헤더는 fixed로 유지하고 각 섹션의 data-header 값에 따라 로고와 메뉴를 light/dark 테마로 전환해줘.`

컴포넌트 통일 요청 : `반복 항목을 하나의 데이터 배열과 단일 Card 컴포넌트로 구성해서 네 항목의 DOM, 간격, 이미지 비율, 인터랙션이 모두 동일하게 해줘.`

지그재그 요청 : `동일한 카드 컴포넌트를 사용하고 홀수 행은 텍스트 왼쪽·이미지 오른쪽, 짝수 행은 이미지 왼쪽·텍스트 오른쪽으로 교차 배치해줘.`

WebGL 스크롤 장면 요청 : `Canvas는 viewport에 fixed로 하나만 유지하고 섹션 진행률에 따라 모델 위치, 회전, 스케일, 카메라, 조명을 각각 별도 트랙으로 전환해줘.`

3D 마우스 반응 요청 : `포인터 목표값과 현재값을 분리하고 damping으로 보간해서 카메라와 모델이 마우스 방향에 미세하게 반응하게 해줘.`

3D 대기 모션 요청 : `입력이 없을 때도 오브젝트가 서로 다른 위상으로 천천히 floating하고 회전하도록 idle animation을 적용해줘.`

모바일 대체 요청 : `모바일에서는 pinned 길이와 글자 크기를 줄이고 WebGL DPR을 제한해줘. reduced-motion에서는 sticky 상태 전환 없이 정적 콘텐츠가 모두 보이게 해줘.`

성능 요청 : `화면 밖 섹션은 렌더링과 RAF 업데이트를 중단하고, WebGL DPR 상한과 탭 비활성화 처리를 추가해줘.`

정확한 비교 요청 : `원본과 로컬을 동일 viewport와 DPR로 캡처하고 전환 시작, 25%, 50%, 75%, 종료 직전 프레임을 오버레이 비교해줘.`

레이아웃 검수 요청 : `폰트 크기만 줄이지 말고 컨테이너 폭, 줄바꿈, 자간, 행간, 정렬 기준을 원본과 함께 비교해줘.`

스크롤 검수 요청 : `느린 스크롤, 빠른 스크롤, 역방향 스크롤을 모두 확인하고 pinned 구간의 시작·종료와 다음 섹션 handoff를 검증해줘.`

---

## 21. 요청 작성 공식

효과 요청 공식 : `[대상 섹션] + [고정 여부] + [스크롤 길이] + [변화 대상] + [변화 순서] + [이징/보간] + [종료 조건] + [모바일/역스크롤 조건]`

예시 : `Quantitative Proofs를 400vh pinned section으로 만들고 내부 화면은 100vh sticky로 유지해줘. 스크롤 진행률을 4단계로 나눠 카드 배경이 순서대로 흰색이 되게 하고, 450ms ease로 전환해줘. 마지막 카드가 끝난 후 언핀하고 다음 섹션으로 넘겨줘. 역스크롤 복원과 모바일 대응도 포함해줘.`

레이아웃 요청 공식 : `[컨테이너 폭] + [그리드 열] + [정렬] + [간격] + [이미지 비율] + [교차 규칙] + [브레이크포인트]`

예시 : `최대 폭 1160px, 2열 1:1 그리드, gap 7%, 이미지 1:1 비율로 구성해줘. 홀수는 텍스트/이미지, 짝수는 이미지/텍스트 순서이며 640px 이하에서는 이미지가 항상 먼저 오는 1열로 바꿔줘.`

WebGL 요청 공식 : `[Canvas 범위] + [모델] + [카메라] + [조명/재질] + [입력] + [진행률 매핑] + [성능 대체]`

예시 : `전체 페이지에 fixed Canvas 하나를 사용하고 동전 모델을 렌더링해줘. 섹션 진행률로 카메라 z와 모델 회전을 스크럽하고, 마우스는 damping으로 미세 반응하게 해줘. DPR은 1.5로 제한하고 화면 밖에서는 렌더를 중단해줘.`

검수 요청 공식 : `[원본 URL] + [뷰포트] + [비교 프레임] + [입력 방식] + [허용 오차] + [완료 조건]`

예시 : `원본과 로컬을 1920×1080에서 비교하고 섹션 진입 전, 진입 직후, 각 단계 중간, 언핀 직전 화면을 캡처해줘. 느린/빠른/역방향 스크롤을 확인하고 주요 오브젝트 크기와 위치 오차가 10% 이상이면 다시 조정해줘.`

---

## 22. 빠른 색인

화면이 고정되고 내용만 변함 : Pinned Scroll, Sticky Scrollytelling, Pinned Timeline.

한쪽은 고정되고 반대쪽만 이동함 : Sticky Sidebar, Sticky Left / Scrolling Right.

카드가 하나씩 흰색으로 변함 : Sequential Highlight, Card Activation, Step-based Transition.

세로 스크롤로 가로 콘텐츠가 움직임 : Horizontal Scroll Mapping, Sticky Horizontal Gallery.

이미지가 마우스를 따라다님 : Cursor Follow, Floating Preview, Cursor Lag.

마우스 이동 방향으로 이미지가 기울어짐 : Tilt Effect, Perspective Hover.

마우스 속도에 따라 이미지 각도가 변함 : Preview Rotation, Velocity-based Effect.

이미지 내부만 미세하게 움직임 : Mouse Parallax, Image Parallax.

여러 이미지가 둥실둥실 움직임 : Floating Motion, Idle Animation, Drift.

텍스트가 줄별로 올라옴 : Line Reveal, Split Text, Mask Text Reveal.

텍스트 사이에 영상이 들어옴 : Inline Media Typography, Intentional Overlap, Kinetic Typography.

다음 섹션이 이전 섹션을 덮음 : Cover Transition, Section Overlap Transition.

원형으로 다음 화면이 열림 : Iris Reveal, Circular Reveal.

스크롤로 영상 프레임을 제어함 : Video Scrubbing, Scroll-controlled Video.

스크롤로 이미지 프레임을 교체함 : Frame-by-frame Scroll, Image Sequence.

3D 오브젝트가 스크롤에 따라 움직임 : Scroll-driven Camera, Scroll-linked Animation, Scene Transition.

화면 전체에 하나의 3D 배경을 사용함 : Shared Canvas, Fixed Canvas.

카드가 유리처럼 보임 : Glass Card, Backdrop Filter.

버튼이 커서 쪽으로 끌려옴 : Magnetic Hover.

요소가 화면에 들어올 때 순차 등장함 : Scroll-triggered Animation, Stagger Reveal.

앞뒤 스크롤에 따라 애니메이션이 그대로 되감김 : Scrub Animation, Reverse Scroll Restoration.

