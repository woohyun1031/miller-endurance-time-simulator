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
        Miller ↔ Endurance 상대론적 시간 지연 시뮬레이션
      </Title>
      <Subtitle style={{ visibility: showText ? "visible" : "hidden" }}>
        관찰자를 드래그하여 중력장에 따른 시간 흐름의 차이를 확인해 보세요.
      </Subtitle>
    </>
  );
};
