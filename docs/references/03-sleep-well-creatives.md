# Reference 03 — Sleep Well Creatives

## Reference

- URL: https://sleep-well-creatives.com/
- 분석 뷰포트: 1920 × 1080
- 전체 문서 높이: 52,610px
- 캡처: 0%부터 100%까지 1% 간격, 총 101장
- 구현 라우트: `/concepts/sleep-well`

## 구조 핵심

이 사이트는 히어로 하나에 같은 모델을 반복하는 구조가 아니다. 화면 전체를 덮는 `position: fixed` WebGL Canvas 하나를 유지하면서, 문서 내 19개 주요 섹션의 진행률에 따라 서로 다른 장면 그룹과 카메라 상태를 활성화한다. HTML 텍스트는 Canvas 위에 별도 레이어로 쌓이며, 긴 장면은 섹션 자체의 높이를 늘리고 내부에 `position: sticky; top: 0; height: 100vh` 홀더를 둔다.

## 원본 섹션 좌표

| 구간 | top | height | 레이아웃/장면 |
|---|---:|---:|---|
| Hero | 0 | 1,512 | 파란 배경, 타이포, 인물과 지형 |
| Introduction | 1,512 | 1,449 | 크림 배경 대형 에디토리얼 카피 |
| Reboot | 2,961 | 1,519 | 대형 제목과 원형 다이어그램 |
| Tunnel | 4,480 | 4,590 | 100vh sticky, 반복 링과 알약 터널 |
| Importance | 9,070 | 1,801 | 크림→블루 배경 핸드오프 |
| Woman scene | 10,870 | 1,620 | 별도 인물/터널 Canvas 장면 |
| Clock | 12,490 | 2,308 | 대형 원형 궤도 정보 구조 |
| Encounter | 14,799 | 1,757 | 좌우 분리 문장과 다음 섹션 노출 |
| Drop cans | 16,556 | 1,999 | 블루 배경 낙하 오브젝트 |
| Blue-light type | 18,556 | 2,160 | sticky 대형 타이포 |
| Phone | 20,716 | 4,320 | 손/휴대폰과 단계별 콜아웃 |
| Balance | 25,036 | 2,398 | 동심원/단상 형태 장면 |
| Lamp | 27,433 | 3,240 | 중앙 오브젝트 장기 노출 |
| Cycle | 30,673 | 2,257 | 궤도형 정보 다이어그램 |
| Solutions | 32,930 | 15,360 | 100vh sticky, 6개 팁 순차 교체 |
| Ender | 48,290 | 3,240 | 100vh sticky 최종 CTA |
| Footer | 51,590 | 약 1,020 | 크림 배경 푸터 |

## 레이어와 상호작용

- 글로벌 Canvas: fixed, viewport 전체, 모든 장면의 최하단.
- 글로벌 내비게이션/로고/노트 버튼: fixed, Canvas 및 HTML 장면 위.
- 텍스트: 섹션별 relative 레이어. 일부는 Canvas 오브젝트 앞, 일부는 뒤에 보이도록 별도 stacking context 사용.
- Tunnel, Type, Solutions, Ender: 긴 부모 높이 + 100vh sticky 내부 홀더.
- 섹션 핸드오프: 다음 배경을 현재 섹션 하단에 미리 노출하거나 투명 배경을 사용해 Canvas 장면과 맞물림.
- 마우스: 카메라/오브젝트의 pitch·yaw에 완만한 관성 적용.
- 스크롤: 현재값과 목표값을 보간하여 카메라와 오브젝트 전환의 버벅임을 줄임.
- Canvas는 High-DPI 리스케일링을 적용하되 DPR 상한을 두어 GPU 부하를 제한.

## NEXT 콘텐츠 치환

원본의 수면 개선 여정은 아래 금융 시스템 여정으로 치환한다.

1. Living Financial System — 데이터가 살아 움직이는 금융 환경
2. Rebuilding the Standard — Legacy-Free Headless 아키텍처
3. AI-Native Intelligence — 시장 데이터 구조화
4. Media-First Pipeline — 콘텐츠에서 행동까지의 마찰 제거
5. Compliance-by-Design — 권한·승인·감사 기록을 내장
6. Intelligence Cycle — Data → Context → Compliance → Experience
7. Six System Principles — 장기 sticky 구간에서 운영 원칙 순차 제시

## 구현 체크

- [x] 독립 라우트
- [x] 고정 Canvas
- [x] 마우스 관성
- [x] 스크롤 보간
- [x] 19개 대응 장면/콘텐츠 구간
- [x] 긴 Tunnel/Phone/Solutions/Ender 구간
- [x] Sticky/absolute/relative 혼합 배치
- [x] 모바일 레이아웃
- [ ] 원본/로컬 1% 병렬 비교 후 수치 보정
- [ ] 저사양 장치 Intersection Observer 기반 Canvas 휴지
