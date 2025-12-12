// src/components/StarField.tsx
import React from "react";
import styled from "styled-components";

export type Star = {
  id: number;
  size: number;
  left: number;
  top: number;
  opacity: number;
};

interface StarFieldProps {
  stars: Star[];
}

const StarElement = styled.div<{
  $size: number;
  $left: number;
  $top: number;
  $opacity: number;
}>`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  pointer-events: none;
  z-index: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  left: ${({ $left }) => $left}%;
  top: ${({ $top }) => $top}%;
  opacity: ${({ $opacity }) => $opacity};
`;

export const StarField: React.FC<StarFieldProps> = ({ stars }) => {
  return (
    <>
      {stars.map((star) => (
        <StarElement
          key={star.id}
          $size={star.size}
          $left={star.left}
          $top={star.top}
          $opacity={star.opacity}
        />
      ))}
    </>
  );
};
