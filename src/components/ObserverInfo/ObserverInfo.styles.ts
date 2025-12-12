// src/components/ObserverInfo/ObserverInfo.styles.ts
import styled from "styled-components";

export const ObserverInfoContainer = styled.div`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontSize.md};
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textAccent};

  span {
    white-space: nowrap;
  }
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.textHighlight};
  font-weight: 600;
`;

export const WorldSpeed = styled.span`
  color: ${({ theme }) => theme.colors.textTime};
  font-weight: 600;
`;
