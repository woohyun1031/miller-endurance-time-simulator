// src/components/Observer/Observer.tsx
import React, { type RefObject } from "react";
import { ObserverContainer, ObserverLabel } from "./Observer.styles";

interface ObserverProps {
  observerRef: RefObject<HTMLDivElement | null>;
}

export const Observer: React.FC<ObserverProps> = ({ observerRef }) => {
  return (
    <ObserverContainer ref={observerRef} className="observer">
      <ObserverLabel>쿠퍼</ObserverLabel>
    </ObserverContainer>
  );
};
