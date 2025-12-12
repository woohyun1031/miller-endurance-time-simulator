# Miller-Endurance Time Simulator

영화 **인터스텔라(Interstellar)**에서 등장하는 시간 지연 효과를 인터랙티브하게 시뮬레이션합니다.

[![Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://miller-endurance-time-simulator.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6)](https://www.typescriptlang.org/)
[![styled-components](https://img.shields.io/badge/styled--components-6-db7093)](https://styled-components.com/)

**[Live Demo →](https://miller-endurance-time-simulator.vercel.app/)**

---

## 개요

블랙홀 근처의 강한 중력장에서는 시간이 느리게 흐릅니다. 영화 인터스텔라에서 밀러 행성에서의 1시간이 인듀어런스 호에서의 7년에 해당하는 장면을 기억하시나요?

이 시뮬레이터는 상대성 이론에 따른 **시간 지연(Time Dilation)** 효과를 시각적으로 체험할 수 있도록 구현했습니다.

### 주요 기능

- **인터랙티브 관찰자**: Cooper를 드래그하여 두 세계 사이를 이동
- **실시간 시간 비교**: 위치에 따라 달라지는 시간 흐름을 실시간으로 확인
- **시간 비율 조절**: 1시간:1시간부터 1시간:7년까지 슬라이더로 조절
- **반응형 디자인**: 데스크톱/모바일 환경 모두 지원

---

## 사용 방법

1. 화면 중앙의 Cooper(녹색 원)를 밀러 행성 ↔ 인듀어런스 사이에서 드래그합니다.
2. Cooper의 위치에 따라 각 세계의 시간 속도가 달라지는 것을 확인합니다.
3. 우측 상단 메뉴에서 시간 비율을 조절할 수 있습니다.

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
│   ├── Menu/             # 설정 메뉴
│   ├── Header/           # 타이틀 영역
│   ├── ObserverInfo/     # 하단 정보 표시
│   ├── StarField.tsx     # 별 배경
│   └── UniverseContainer.tsx
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

## 시간 지연 공식

관찰자의 위치 `x` (0 = 밀러, 1 = 인듀어런스)에 따른 시간 배율:

```
밀러 시간 배율     = R^(-x)
인듀어런스 시간 배율 = R^(1-x)
```

`R`은 시간 비율을 나타내며, 기본값은 7년(= 61,320시간)입니다.

---

## 라이선스

MIT License

---

## 참고

이 프로젝트는 크리스토퍼 놀란 감독의 영화 **인터스텔라(2014)**에서 영감을 받았습니다.

> _"Murphy's law doesn't mean that something bad will happen. It means that whatever can happen, will happen."_
> — Cooper
