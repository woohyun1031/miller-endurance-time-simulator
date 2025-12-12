// src/components/Menu/MenuButton.tsx
import React, { type RefObject } from "react";
import { MenuButtonContainer, MenuButtonBars } from "./Menu.styles";

interface MenuButtonProps {
  buttonRef: RefObject<HTMLButtonElement | null>;
  onToggle: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
  buttonRef,
  onToggle,
}) => {
  return (
    <MenuButtonContainer
      ref={buttonRef}
      aria-label="설정 메뉴 열기"
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
    >
      <MenuButtonBars>
        <span />
        <span />
        <span />
      </MenuButtonBars>
    </MenuButtonContainer>
  );
};
