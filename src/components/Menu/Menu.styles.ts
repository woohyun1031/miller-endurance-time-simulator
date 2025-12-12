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
  letter-spacing: 0.02em;

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
  line-height: 1.5;
  font-weight: 400;
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
  gap: 8px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textAccent};
  letter-spacing: 0.02em;
  cursor: pointer;

  input[type="checkbox"] {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

// ========== Physics Mode 스타일 ==========

export const ModeSelector = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
`;

export const ModeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 6px 8px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: 500;
  letter-spacing: 0.03em;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.accentBlue : theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $active }) =>
    $active ? "rgba(169, 176, 255, 0.15)" : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.textPrimary : theme.colors.textMuted};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentBlue};
    background: rgba(169, 176, 255, 0.1);
  }
`;

export const PhysicsSectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

export const PhysicsParamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const PhysicsParamItem = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "span 2" : "auto")};
`;

export const PhysicsParamLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.02em;
`;

export const PhysicsParamInput = styled.input`
  width: 100%;
  padding: 4px 6px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textPrimary};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  outline: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.accentBlue};
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

export const PhysicsResult = styled.div`
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 210, 123, 0.08);
  border: 1px solid rgba(255, 210, 123, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.textAccent};
  line-height: 1.5;
`;

export const PhysicsResultValue = styled.span`
  color: ${({ theme }) => theme.colors.textTime};
  font-weight: 600;
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.borderLight};
  margin: 8px 0;
`;
