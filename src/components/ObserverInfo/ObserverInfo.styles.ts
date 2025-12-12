// src/components/ObserverInfo/ObserverInfo.styles.ts
import styled from "styled-components";

export const ObserverInfoContainer = styled.div`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.md};
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.02em;
  line-height: 1.4;

  span {
    white-space: nowrap;
  }
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.textHighlight};
  font-weight: 500;
  letter-spacing: 0.03em;
`;

export const WorldSpeed = styled.span`
  color: ${({ theme }) => theme.colors.textTime};
  font-weight: 500;
  letter-spacing: 0.01em;
`;
