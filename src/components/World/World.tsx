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
    name: "밀러 행성",
    tag: "블랙홀 근처 · 강한 중력장",
  },
  endurance: {
    name: "인듀어런스 호",
    tag: "멀리 떨어진 관측자",
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
          쿠퍼가 느끼는 속도 대비
          <br />
          <TimeValue ref={speedTextRef}>1.0x</TimeValue>
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
