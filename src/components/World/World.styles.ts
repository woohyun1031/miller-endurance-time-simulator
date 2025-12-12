// src/components/World/World.styles.ts
import styled, { css } from "styled-components";

export const WorldContainer = styled.div<{
  $variant: "miller" | "endurance";
  showText: boolean;
}>`
  flex: 1;
  position: relative;
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 220px;
  overflow: visible;
  background: transparent;
  border: ${({ showText, theme }) =>
    showText ? theme.colors.borderLight : "none"}  
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const WorldHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.base};
  position: relative;
  z-index: 2;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const WorldName = styled.div`
  font-weight: 600;
`;

export const WorldTag = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.06);
  color: ${({ theme }) => theme.colors.textAccent};
`;

export const TimeLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accentBlue};
  text-align: right;
`;

export const TimeValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const TimeTimer = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.accentOrange};
  margin-top: 2px;
`;

export const WorldViewport = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 0;
  background: transparent;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const OrbitWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
`;

const millerCoreStyle = css`
  background: ${({ theme }) => theme.colors.millerCore};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.millerGlow},
    0 0 26px ${({ theme }) => theme.colors.millerGlowOuter};
`;

const enduranceCoreStyle = css`
  background: ${({ theme }) => theme.colors.enduranceCore};
  box-shadow: 0 0 10px ${({ theme }) => theme.colors.enduranceGlow},
    0 0 26px ${({ theme }) => theme.colors.enduranceGlowOuter};
`;

export const CenterCore = styled.div<{ $variant: "miller" | "endurance" }>`
  width: 22px;
  height: 22px;
  border-radius: 50%;

  ${({ $variant }) =>
    $variant === "miller" ? millerCoreStyle : enduranceCoreStyle}
`;

const millerOrbitStyle = css`
  background: ${({ theme }) => theme.colors.millerOrbit};
  box-shadow: 0 0 8px rgba(166, 220, 255, 0.9),
    0 0 18px rgba(100, 180, 255, 0.6);
`;

const enduranceOrbitStyle = css`
  background: ${({ theme }) => theme.colors.enduranceOrbit};
  box-shadow: 0 0 8px rgba(255, 228, 166, 0.9),
    0 0 18px rgba(255, 200, 100, 0.6);
`;

export const OrbitBody = styled.div<{ $variant: "miller" | "endurance" }>`
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  transform-origin: 40px 40px;

  ${({ $variant }) =>
    $variant === "miller" ? millerOrbitStyle : enduranceOrbitStyle}
`;
