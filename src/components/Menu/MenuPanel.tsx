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
            밀러에서 <strong>1시간</strong>이 지날 때
            <br />
            인듀어런스에서 흐르는 시간 비율:{" "}
            <RatioText ref={ratioTextRef}>약 7.0년</RatioText>
          </RatioLabel>
          <RatioSliderWrapper>
            <RatioEnd>1시간 : 1시간</RatioEnd>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={100}
              ref={ratioSliderRef}
            />
            <RatioEnd>1시간 : 7년</RatioEnd>
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
          텍스트 / UI 표시
        </MenuCheckbox>
      </MenuSection>
    </MenuPanelContainer>
  );
};
