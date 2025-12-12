// src/components/Header/Header.tsx
import React from "react";
import { Title, Subtitle } from "./Header.styles";

interface HeaderProps {
  showText: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showText }) => {
  return (
    <>
      <Title style={{ visibility: showText ? "visible" : "hidden" }}>
        밀러 행성 ↔ 인듀어런스 상대적 시간 시뮬레이터
      </Title>
      <Subtitle style={{ visibility: showText ? "visible" : "hidden" }}>
        쿠퍼(관찰자)을 드래그해서 (가로에서는 좌우, 세로에서는 상하로)
        <br />
        어느 쪽 시계가 빠르게 / 느리게 흐르는지 체감해보자.
      </Subtitle>
    </>
  );
};
