// src/components/UniverseContainer.tsx
import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import {
  RootContainer,
  AppContainer,
  UniverseContainer as UniverseWrapper,
} from "./styles/Layout.styles";
import { StarField, type Star } from "./StarField";
import { World } from "./World";
import { Observer } from "./Observer";
import { MenuButton, MenuPanel } from "./Menu";
import { Header } from "./Header";
import { ObserverInfo } from "./ObserverInfo";

const STAR_COUNT = 140;

// Generate stars at module scope to avoid impure function calls during render
const generateStars = (): Star[] => {
  const arr: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const big = Math.random() < 0.18;
    const size = big ? 1.5 + Math.random() * 3.5 : 0.5 + Math.random() * 1.5;

    arr.push({
      id: i,
      size,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: big ? 0.4 + Math.random() * 0.5 : 0.15 + Math.random() * 0.4,
    });
  }
  return arr;
};

// Pre-generated stars - computed once when module loads
const INITIAL_STARS = generateStars();

export const UniverseContainerComponent: React.FC = () => {
  // ====== refs ======
  const universeRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const millerWorldRef = useRef<HTMLDivElement | null>(null);
  const enduranceWorldRef = useRef<HTMLDivElement | null>(null);
  const millerOrbitRef = useRef<HTMLDivElement | null>(null);
  const enduranceOrbitRef = useRef<HTMLDivElement | null>(null);
  const millerSpeedTextRef = useRef<HTMLSpanElement | null>(null);
  const enduranceSpeedTextRef = useRef<HTMLSpanElement | null>(null);
  const millerTimerRef = useRef<HTMLSpanElement | null>(null);
  const enduranceTimerRef = useRef<HTMLSpanElement | null>(null);
  const observerWhereRef = useRef<HTMLSpanElement | null>(null);
  const millerSpeedInfoRef = useRef<HTMLSpanElement | null>(null);
  const enduranceSpeedInfoRef = useRef<HTMLSpanElement | null>(null);
  const ratioSliderRef = useRef<HTMLInputElement | null>(null);
  const ratioTextRef = useRef<HTMLSpanElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);

  // ====== UI state ======
  const [menuOpen, setMenuOpen] = useState(false);
  const [showText, setShowText] = useState(true);

  // Use pre-generated stars
  const stars = INITIAL_STARS;

  // ====== 시뮬레이션 로직 ======
  useEffect(() => {
    const universe = universeRef.current;
    const observer = observerRef.current;
    const millerWorld = millerWorldRef.current;
    const enduranceWorld = enduranceWorldRef.current;
    const millerOrbit = millerOrbitRef.current;
    const enduranceOrbit = enduranceOrbitRef.current;
    const millerSpeedText = millerSpeedTextRef.current;
    const enduranceSpeedText = enduranceSpeedTextRef.current;
    const millerTimerEl = millerTimerRef.current;
    const enduranceTimerEl = enduranceTimerRef.current;
    const observerWhere = observerWhereRef.current;
    const millerSpeedInfo = millerSpeedInfoRef.current;
    const enduranceSpeedInfo = enduranceSpeedInfoRef.current;
    const ratioSlider = ratioSliderRef.current;
    const ratioTextEl = ratioTextRef.current;

    if (
      !universe ||
      !observer ||
      !millerWorld ||
      !enduranceWorld ||
      !millerOrbit ||
      !enduranceOrbit ||
      !millerSpeedText ||
      !enduranceSpeedText ||
      !millerTimerEl ||
      !enduranceTimerEl ||
      !observerWhere ||
      !millerSpeedInfo ||
      !enduranceSpeedInfo ||
      !ratioSlider ||
      !ratioTextEl
    ) {
      return;
    }

    let universeRect = universe.getBoundingClientRect();

    let dragging = false;
    let observerNorm = 1; // 0 = 밀러, 1 = 인듀어런스

    let millerTime = 0;
    let enduranceTime = 0;
    let millerClock = 0;
    let enduranceClock = 0;
    let lastTs = performance.now();

    const R_MIN = 1;
    const R_MID = 24;
    const R_MAX = 7 * 365 * 24;
    let ratioFactor = R_MAX; // 기본: 7년

    const isVertical = () => window.innerWidth <= 720;

    const getAnchors = () => {
      universeRect = universe.getBoundingClientRect();
      const millerRect = millerWorld.getBoundingClientRect();
      const enduranceRect = enduranceWorld.getBoundingClientRect();

      if (!isVertical()) {
        const minX = millerRect.left + millerRect.width / 2;
        const maxX = enduranceRect.left + enduranceRect.width / 2;
        const centerY = millerRect.top + millerRect.height / 2;
        return { minX, maxX, centerY };
      } else {
        const minY = millerRect.top + millerRect.height / 2;
        const maxY = enduranceRect.top + enduranceRect.height / 2;
        const centerX = universeRect.left + universeRect.width / 2;
        return { minY, maxY, centerX };
      }
    };

    const updateObserverPositionFromNorm = () => {
      const anchors = getAnchors();

      if (!isVertical()) {
        const { minX, maxX, centerY } = anchors as {
          minX: number;
          maxX: number;
          centerY: number;
        };
        const x = minX + (maxX - minX) * observerNorm;
        const y = centerY;
        observer.style.left = `${
          x - universeRect.left - observer.offsetWidth / 2
        }px`;
        observer.style.top = `${
          y - universeRect.top - observer.offsetHeight / 2
        }px`;
      } else {
        const { minY, maxY, centerX } = anchors as {
          minY: number;
          maxY: number;
          centerX: number;
        };
        const y = minY + (maxY - minY) * observerNorm;
        const x = centerX;
        observer.style.left = `${
          x - universeRect.left - observer.offsetWidth / 2
        }px`;
        observer.style.top = `${
          y - universeRect.top - observer.offsetHeight / 2
        }px`;
      }
    };

    const updateRatioLabel = () => {
      const R = ratioFactor;

      if (R <= 1.01) {
        ratioTextEl.textContent = "1시간 (동일)";
      } else if (R < 24) {
        ratioTextEl.textContent = `약 ${R.toFixed(1)}시간`;
      } else if (R < 24 * 365) {
        const days = R / 24;
        if (Math.abs(days - 1) < 0.01) {
          ratioTextEl.textContent = "1일";
        } else {
          ratioTextEl.textContent = `약 ${days.toFixed(1)}일`;
        }
      } else {
        const years = R / (24 * 365);
        ratioTextEl.textContent = `약 ${years.toFixed(1)}년`;
      }
    };

    const getTimeScales = (normX: number) => {
      const R = ratioFactor <= 1 ? 1 : ratioFactor;
      const miller = Math.pow(R, -normX);
      const endurance = Math.pow(R, 1 - normX);
      return { miller, endurance };
    };

    const updateUI = () => {
      const { miller, endurance } = getTimeScales(observerNorm);

      millerSpeedText.textContent = `${miller.toFixed(2)}x`;
      enduranceSpeedText.textContent = `${endurance.toFixed(2)}x`;

      millerSpeedInfo.textContent = `${miller.toFixed(2)}x`;
      enduranceSpeedInfo.textContent = `${endurance.toFixed(2)}x`;

      if (observerNorm < 0.35) {
        observerWhere.textContent = "밀러 행성 쪽에 거의 붙어 있음";
      } else if (observerNorm > 0.65) {
        observerWhere.textContent = "인듀어런스 쪽에 거의 붙어 있음";
      } else {
        observerWhere.textContent = "두 세계의 중간 지점";
      }
    };

    const formatDuration = (totalSeconds: number) => {
      let s = Math.floor(totalSeconds);
      const secMinute = 60;
      const secHour = 60 * 60;
      const secDay = 24 * secHour;
      const secMonth = 30 * secDay;
      const secYear = 365 * secDay;

      const parts: string[] = [];

      const years = Math.floor(s / secYear);
      s %= secYear;
      const months = Math.floor(s / secMonth);
      s %= secMonth;
      const days = Math.floor(s / secDay);
      s %= secDay;
      const hours = Math.floor(s / secHour);
      s %= secHour;
      const minutes = Math.floor(s / secMinute);
      s %= secMinute;
      const seconds = s;

      if (years) parts.push(`${years}Y`);
      if (months) parts.push(`${months}M`);
      if (days) parts.push(`${days}D`);
      if (hours) parts.push(`${hours}h`);
      if (minutes) parts.push(`${minutes}m`);
      if (seconds || parts.length === 0) parts.push(`${seconds}s`);

      return parts.join(" ");
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      dragging = true;
      observer.classList.add("dragging");
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;

      const anchors = getAnchors();

      if (!isVertical()) {
        const clientX =
          "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const { minX, maxX } = anchors as {
          minX: number;
          maxX: number;
          centerY: number;
        };
        const clampedX = Math.min(Math.max(clientX, minX), maxX);
        observerNorm = (clampedX - minX) / (maxX - minX || 1);
      } else {
        const clientY =
          "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
        const { minY, maxY } = anchors as {
          minY: number;
          maxY: number;
          centerX: number;
        };
        const clampedY = Math.min(Math.max(clientY, minY), maxY);
        observerNorm = (clampedY - minY) / (maxY - minY || 1);
      }

      updateObserverPositionFromNorm();
      updateUI();
    };

    const onPointerUp = () => {
      dragging = false;
      observer.classList.remove("dragging");
    };

    const onSliderInput = () => {
      const t = parseFloat(ratioSlider.value) / 100; // 0~1
      let R: number;
      if (t <= 0.5) {
        const tt = t / 0.5;
        R = R_MIN + (R_MID - R_MIN) * tt;
      } else {
        const tt = (t - 0.5) / 0.5;
        R = R_MID + (R_MAX - R_MID) * tt;
      }
      ratioFactor = R;
      updateRatioLabel();
      updateUI();
    };

    updateObserverPositionFromNorm();
    updateUI();
    updateRatioLabel();

    let animationFrameId: number;

    const loop = (ts: number) => {
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const { miller, endurance } = getTimeScales(observerNorm);

      millerTime += dt * miller;
      enduranceTime += dt * endurance;

      millerClock += dt * miller;
      enduranceClock += dt * endurance;

      millerTimerEl.textContent = formatDuration(millerClock);
      enduranceTimerEl.textContent = formatDuration(enduranceClock);

      const period = 4;
      const angleMiller = ((millerTime % period) / period) * Math.PI * 2;
      const angleEndurance = ((enduranceTime % period) / period) * Math.PI * 2;
      const R = 40;

      const xM = Math.cos(angleMiller) * R;
      const yM = Math.sin(angleMiller) * R;
      millerOrbit.style.transform = `translate(${xM}px, ${yM}px)`;

      const xE = Math.cos(angleEndurance) * R;
      const yE = Math.sin(angleEndurance) * R;
      enduranceOrbit.style.transform = `translate(${xE}px, ${yE}px)`;

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    // 이벤트 리스너 등록
    observer.addEventListener("mousedown", onPointerDown);
    observer.addEventListener("touchstart", onPointerDown, { passive: false });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);
    window.addEventListener("touchcancel", onPointerUp);
    ratioSlider.addEventListener("input", onSliderInput);

    const onResize = () => {
      universeRect = universe.getBoundingClientRect();
      updateObserverPositionFromNorm();
      updateUI();
    };
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);

      observer.removeEventListener("mousedown", onPointerDown);
      observer.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("touchcancel", onPointerUp);
      ratioSlider.removeEventListener("input", onSliderInput);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ====== 메뉴 외부 클릭 감지 ======
  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e: MouseEvent) => {
      const panel = menuPanelRef.current;
      const button = menuButtonRef.current;
      const target = e.target as Node | null;

      if (!panel || !button || !target) return;

      if (panel.contains(target) || button.contains(target)) return;

      setMenuOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [menuOpen]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RootContainer>
        <StarField stars={stars} />

        <AppContainer>
          <MenuButton
            buttonRef={menuButtonRef}
            onToggle={() => setMenuOpen((prev) => !prev)}
          />

          <MenuPanel
            panelRef={menuPanelRef}
            ratioSliderRef={ratioSliderRef}
            ratioTextRef={ratioTextRef}
            isOpen={menuOpen}
            showText={showText}
            onToggleShowText={(checked) => setShowText(checked)}
          />

          <Header showText={showText} />

          <UniverseWrapper ref={universeRef}>
            <World
              variant="miller"
              worldRef={millerWorldRef}
              orbitRef={millerOrbitRef}
              speedTextRef={millerSpeedTextRef}
              timerRef={millerTimerRef}
              showText={showText}
            />

            <World
              variant="endurance"
              worldRef={enduranceWorldRef}
              orbitRef={enduranceOrbitRef}
              speedTextRef={enduranceSpeedTextRef}
              timerRef={enduranceTimerRef}
              showText={showText}
            />

            <Observer observerRef={observerRef} />
          </UniverseWrapper>

          <ObserverInfo
            observerWhereRef={observerWhereRef}
            millerSpeedInfoRef={millerSpeedInfoRef}
            enduranceSpeedInfoRef={enduranceSpeedInfoRef}
            showText={showText}
          />
        </AppContainer>
      </RootContainer>
    </ThemeProvider>
  );
};

// 기존 export 이름 유지
export { UniverseContainerComponent as UniverseContainer };
