// src/components/Menu/Menu.styles.ts
import styled from "styled-components";

export const MenuButtonContainer = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.borderHeavy};
  background: ${({ theme }) => theme.colors.bgOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
`;

export const MenuButtonBars = styled.div`
  width: 16px;
  height: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    width: 16px;
    height: 2px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const MenuPanelContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 52px;
  right: ${({ theme }) => theme.spacing.lg};
  width: 300px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.borderMedium};
  padding: 10px 12px 12px;
  box-shadow: ${({ theme }) => theme.shadows.menu};
  z-index: 19;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: translateY(${({ $isOpen }) => ($isOpen ? "0" : "-8px")});
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};
`;

export const MenuSection = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textAccent};
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RatioControl = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textAccent};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RatioLabel = styled.div`
  line-height: 1.4;
`;

export const RatioText = styled.span`
  color: ${({ theme }) => theme.colors.textTime};
  font-weight: 600;
`;

export const RatioSliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;

  input[type="range"] {
    flex: 1;
  }
`;

export const RatioEnd = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

export const MenuCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: #dde1ff;

  input[type="checkbox"] {
    width: 14px;
    height: 14px;
  }
`;
