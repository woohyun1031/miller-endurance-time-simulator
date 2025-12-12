// src/components/styles/Layout.styles.ts
import styled from "styled-components";

export const RootContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: radial-gradient(circle at center, #050816, #020308 70%);
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  overflow: hidden;
`;

export const AppContainer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

export const UniverseContainer = styled.div<{ showText: boolean }>`
  position: relative;
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme, showText }) =>
    showText ? theme.shadows.card : "none"};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    padding-bottom: 50px;
  }
`;
