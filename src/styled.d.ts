// src/styled.d.ts
import "styled-components";
import { theme } from "./components/styles/theme";

type ThemeType = typeof theme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
