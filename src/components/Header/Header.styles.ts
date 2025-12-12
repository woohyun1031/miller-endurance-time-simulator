// src/components/Header/Header.styles.ts
import styled from "styled-components";

export const Title = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 500;
  letter-spacing: 0.05em;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.textPrimary} 0%,
    ${({ theme }) => theme.colors.accentBlue} 50%,
    ${({ theme }) => theme.colors.textPrimary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.02em;
  line-height: 1.5;
`;
