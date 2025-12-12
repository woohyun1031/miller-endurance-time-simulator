// src/components/Observer/Observer.styles.ts
import styled from "styled-components";

export const ObserverContainer = styled.div<{ $isDragging?: boolean }>`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.observerBg};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.observerGlow},
    0 0 24px ${({ theme }) => theme.colors.observerGlowOuter};
  cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.4);
  z-index: 10;
  user-select: none;
  touch-action: none;

  ${({ $isDragging, theme }) =>
    $isDragging &&
    `
    box-shadow: 0 0 12px ${theme.colors.observerGlow}, 
      0 0 30px rgba(118, 255, 218, 0.7);
  `}
`;

export const ObserverLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: 600;
  color: #00110c;
`;
