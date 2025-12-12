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
        관찰자 위치:{" "}
        <Highlight ref={observerWhereRef}>Endurance 인접</Highlight>
      </span>
      <span>
        Miller: <WorldSpeed ref={millerSpeedInfoRef} />
        {" · "}
        Endurance: <WorldSpeed ref={enduranceSpeedInfoRef} />
      </span>
    </ObserverInfoContainer>
  );
};
