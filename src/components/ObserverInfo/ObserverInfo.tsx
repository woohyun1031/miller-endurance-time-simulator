// src/components/ObserverInfo/ObserverInfo.tsx
import React, { type RefObject } from "react";
import {
  ObserverInfoContainer,
  Highlight,
  WorldSpeed,
} from "./ObserverInfo.styles";

interface ObserverInfoProps {
  observerWhereRef: RefObject<HTMLSpanElement | null>;
  millerSpeedInfoRef: RefObject<HTMLSpanElement | null>;
  enduranceSpeedInfoRef: RefObject<HTMLSpanElement | null>;
  showText: boolean;
}

export const ObserverInfo: React.FC<ObserverInfoProps> = ({
  observerWhereRef,
  millerSpeedInfoRef,
  enduranceSpeedInfoRef,
  showText,
}) => {
  return (
    <ObserverInfoContainer
      style={{ visibility: showText ? "visible" : "hidden" }}
    >
      <span>
        현재 쿠퍼 위치 기준:{" "}
        <Highlight ref={observerWhereRef}>인듀어런스 쪽에 가까움</Highlight>
      </span>
      <span>
        밀러 시간: <WorldSpeed ref={millerSpeedInfoRef} />
        {" · "}
        인듀어런스 시간: <WorldSpeed ref={enduranceSpeedInfoRef} />
      </span>
    </ObserverInfoContainer>
  );
};
