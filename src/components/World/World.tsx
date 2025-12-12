// src/components/World/World.tsx
import React, { type RefObject } from "react";
import {
  WorldContainer,
  WorldHeader,
  WorldName,
  WorldTag,
  TimeLabel,
  TimeValue,
  TimeTimer,
  WorldViewport,
  OrbitWrapper,
  CenterCore,
  OrbitBody,
} from "./World.styles";

interface WorldProps {
  variant: "miller" | "endurance";
  worldRef: RefObject<HTMLDivElement | null>;
  orbitRef: RefObject<HTMLDivElement | null>;
  speedTextRef: RefObject<HTMLSpanElement | null>;
  timerRef: RefObject<HTMLSpanElement | null>;
  showText: boolean;
}

const worldConfig = {
  miller: {
    name: "Miller",
    tag: "강한 중력장 · 시간 지연 발생",
  },
  endurance: {
    name: "Endurance",
    tag: "약한 중력장 · 관측 기준점",
  },
};

export const World: React.FC<WorldProps> = ({
  variant,
  worldRef,
  orbitRef,
  speedTextRef,
  timerRef,
  showText,
}) => {
  const config = worldConfig[variant];

  return (
    <WorldContainer $variant={variant} ref={worldRef} showText={showText}>
      <WorldHeader style={{ visibility: showText ? "visible" : "hidden" }}>
        <div>
          <WorldName>{config.name}</WorldName>
          <WorldTag>{config.tag}</WorldTag>
        </div>
        <TimeLabel>
          상대 시간 배율
          <br />
          <TimeValue ref={speedTextRef}>1.0×</TimeValue>
          <TimeTimer>
            t = <span ref={timerRef}>0s</span>
          </TimeTimer>
        </TimeLabel>
      </WorldHeader>
      <WorldViewport>
        <OrbitWrapper>
          <CenterCore $variant={variant} />
          <OrbitBody $variant={variant} ref={orbitRef} />
        </OrbitWrapper>
      </WorldViewport>
    </WorldContainer>
  );
};
