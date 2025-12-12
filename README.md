# Miller-Endurance Time Simulator
![2025-12-123 55 42-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/e31784bd-7183-45b5-8417-23c3595e8bc7)

영화 **인터스텔라(Interstellar)**에서 등장하는 시간 지연 효과를 **실제 상대성이론 물리 공식**으로 시뮬레이션합니다.

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://miller-endurance-time-simulator.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)](https://www.typescriptlang.org/)
[![styled-components](https://img.shields.io/badge/styled--components-6-db7093)](https://styled-components.com/)

**[Live Demo →](https://miller-endurance-time-simulator.vercel.app/)**

---

## 개요

블랙홀 근처의 강한 중력장에서는 시간이 느리게 흐릅니다. 영화 인터스텔라에서 밀러 행성에서의 1시간이 인듀어런스 호에서의 7년에 해당하는 장면을 기억하시나요?

이 시뮬레이터는 **아인슈타인의 상대성이론**에 기반한 시간 지연(Time Dilation) 효과를 시각적으로 체험할 수 있도록 구현했습니다.

---

## 주요 기능

### 인터랙티브 시뮬레이션

- **관찰자 드래그**: Cooper를 밀러 ↔ 인듀어런스 사이에서 드래그
- **실시간 시간 비교**: 위치에 따른 시간 흐름 차이를 실시간으로 확인
- **반응형 디자인**: 데스크톱/모바일 모두 지원

### 두 가지 시뮬레이션 모드

| 모드        | 설명                                            |
| ----------- | ----------------------------------------------- |
| **Classic** | 슬라이더로 시간 비율 직접 조절 (1h:1h ~ 1h:7yr) |
| **Physics** | 실제 상대성이론 물리 공식 기반 계산             |

### Physics 모드 파라미터

| 파라미터    | 범위               | 설명                       |
| ----------- | ------------------ | -------------------------- |
| 블랙홀 질량 | 1,000 ~ 1,000억 M☉ | 태양질량 배수              |
| 궤도 거리   | 1 ~ 1,000조 km     | 블랙홀 중심으로부터의 거리 |
| 공전 속도   | 0 ~ 0.99 c         | 빛의 속도 비율             |

---

## 물리학 배경

### 슈바르츠실트 반지름 (이벤트 호라이즌)

$$r_s = \frac{2GM}{c^2}$$

### 중력 시간 지연 (일반 상대성이론)

$$\text{시간 지연} = \frac{1}{\sqrt{1 - \frac{r_s}{r}}}$$

### 속도 시간 지연 (특수 상대성이론 - 로렌츠 팩터)

$$\gamma = \frac{1}{\sqrt{1 - \frac{v^2}{c^2}}}$$

### 총 시간 지연

$$F_{total} = F_{gravity} \times \gamma$$

---

## 기술 스택

| 기술              | 용도        |
| ----------------- | ----------- |
| React 19          | UI 컴포넌트 |
| TypeScript        | 타입 시스템 |
| styled-components | CSS-in-JS   |
| Vite              | 빌드 도구   |
| Vercel            | 배포        |

---

## 프로젝트 구조

```
src/
├── components/
│   ├── styles/           # 테마 및 전역 스타일
│   ├── World/            # 행성 카드 컴포넌트
│   ├── Observer/         # 관찰자 컴포넌트
│   ├── Menu/             # 설정 메뉴 (모드 선택, 파라미터)
│   ├── Header/           # 타이틀 영역
│   ├── ObserverInfo/     # 하단 정보 표시
│   ├── StarField.tsx     # 별 배경
│   └── UniverseContainer.tsx  # 메인 시뮬레이션 로직
├── utils/
│   └── physics.ts        # 상대성이론 물리 계산
├── App.tsx
└── main.tsx
```

---

## 로컬 실행

```bash
git clone https://github.com/woohyun1031/miller-endurance-time-simulator.git
cd miller-endurance-time-simulator

npm install
npm run dev
```

---

## 사용 방법

### Classic 모드

1. 메뉴에서 **Classic** 버튼 클릭
2. 슬라이더로 시간 비율 조절 (1h:1h ~ 1h:7yr)
3. Cooper를 드래그하여 시간 흐름 변화 확인

### Physics 모드

1. 메뉴에서 **Physics** 버튼 클릭
2. 블랙홀 질량, 궤도 거리, 공전 속도 입력
3. 계산된 시간 비율 확인
4. Cooper를 드래그하여 관찰자 위치에 따른 시간 스케일 확인

---

## 기본 설정값 (영화 인터스텔라 기준)

| 파라미터    | Miller             | Endurance |
| ----------- | ------------------ | --------- |
| 블랙홀 질량 | 1억 M☉ (Gargantua) | -         |
| 궤도 거리   | 2.95억 km          | 2.95조 km |
| 공전 속도   | 0.55 c             | 0.0001 c  |

→ **Miller 1시간 ≈ Endurance 7년**

---

## 라이선스

MIT License

---

## 참고

이 프로젝트는 크리스토퍼 놀란 감독의 영화 **인터스텔라(2014)**에서 영감을 받았습니다.

> _"Murphy's law doesn't mean that something bad will happen. It means that whatever can happen, will happen."_
> — Cooper
