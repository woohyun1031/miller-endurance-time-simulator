// src/components/Menu/MenuPanel.tsx
import React, { type RefObject } from "react";
import {
  MenuPanelContainer,
  MenuSection,
  RatioControl,
  RatioLabel,
  RatioText,
  RatioSliderWrapper,
  RatioEnd,
  MenuCheckbox,
} from "./Menu.styles";

interface MenuPanelProps {
  panelRef: RefObject<HTMLDivElement | null>;
  ratioSliderRef: RefObject<HTMLInputElement | null>;
  ratioTextRef: RefObject<HTMLSpanElement | null>;
  isOpen: boolean;
  showText: boolean;
  onToggleShowText: (checked: boolean) => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({
  panelRef,
  ratioSliderRef,
  ratioTextRef,
  isOpen,
  showText,
  onToggleShowText,
}) => {
  return (
    <MenuPanelContainer $isOpen={isOpen} ref={panelRef}>
      <MenuSection>
        <RatioControl>
          <RatioLabel>
            Miller 기준 <strong>1시간</strong> 경과 시
            <br />
            Endurance 경과 시간:{" "}
            <RatioText ref={ratioTextRef}>약 7.0년</RatioText>
          </RatioLabel>
          <RatioSliderWrapper>
            <RatioEnd>1h : 1h</RatioEnd>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={100}
              ref={ratioSliderRef}
            />
            <RatioEnd>1h : 7yr</RatioEnd>
          </RatioSliderWrapper>
        </RatioControl>
      </MenuSection>

      <MenuSection>
        <MenuCheckbox>
          <input
            type="checkbox"
            checked={showText}
            onChange={(e) => onToggleShowText(e.target.checked)}
          />
          UI 표시
        </MenuCheckbox>
      </MenuSection>
    </MenuPanelContainer>
  );
};
