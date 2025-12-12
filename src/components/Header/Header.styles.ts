// src/components/Header/Header.styles.ts
import styled from "styled-components";

export const Title = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 600;
`;

export const Subtitle = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.base};
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
