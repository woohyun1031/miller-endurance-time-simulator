// src/components/Menu/MenuPanel.tsx
import React, { type RefObject, useMemo } from "react";
import {
  MenuPanelContainer,
  MenuSection,
  RatioControl,
  RatioLabel,
  RatioText,
  RatioSliderWrapper,
  RatioEnd,
  MenuCheckbox,
  ModeSelector,
  ModeButton,
  PhysicsSectionTitle,
  PhysicsParamGrid,
  PhysicsParamItem,
  PhysicsParamLabel,
  PhysicsParamInput,
  PhysicsResult,
  PhysicsResultValue,
  MenuDivider,
} from "./Menu.styles";
import {
  type PhysicsConfig,
  getRelativeTimeRatio,
  formatTimeRatio,
  DEFAULT_PHYSICS_CONFIG,
  PHYSICS_LIMITS,
  sanitizePhysicsConfig,
} from "../../utils/physics";

export type SimulationMode = "classic" | "physics";

interface MenuPanelProps {
  panelRef: RefObject<HTMLDivElement | null>;
  ratioSliderRef: RefObject<HTMLInputElement | null>;
  ratioTextRef: RefObject<HTMLSpanElement | null>;
  isOpen: boolean;
  showText: boolean;
  onToggleShowText: (checked: boolean) => void;
  // Physics mode props
  simulationMode: SimulationMode;
  onSimulationModeChange: (mode: SimulationMode) => void;
  physicsConfig: PhysicsConfig;
  onPhysicsConfigChange: (config: PhysicsConfig) => void;
}

export const MenuPanel: React.FC<MenuPanelProps> = ({
  panelRef,
  ratioSliderRef,
  ratioTextRef,
  isOpen,
  showText,
  onToggleShowText,
  simulationMode,
  onSimulationModeChange,
  physicsConfig,
  onPhysicsConfigChange,
}) => {
  // 실제 계산에 사용되는 sanitized config (UI 표시용)
  const sanitizedConfig = useMemo(() => {
    return sanitizePhysicsConfig(physicsConfig);
  }, [physicsConfig]);

  // Physics mode에서 계산된 시간 비율
  const physicsTimeRatio = useMemo(() => {
    if (simulationMode !== "physics") return null;
    return getRelativeTimeRatio(physicsConfig);
  }, [simulationMode, physicsConfig]);

  const handlePhysicsParamChange = (path: string, value: number) => {
    const newConfig = { ...physicsConfig };

    if (path === "blackHoleMass") {
      // 블랙홀 질량 클램핑
      newConfig.blackHoleMass = Math.min(
        PHYSICS_LIMITS.blackHoleMass.max,
        Math.max(PHYSICS_LIMITS.blackHoleMass.min, value)
      );
    } else if (path.startsWith("miller.")) {
      const key = path.split(".")[1] as keyof typeof newConfig.miller;
      let clampedValue = value;

      if (key === "distanceKm") {
        clampedValue = Math.min(
          PHYSICS_LIMITS.distanceKm.max,
          Math.max(PHYSICS_LIMITS.distanceKm.min, value)
        );
      } else if (key === "velocityRatio") {
        clampedValue = Math.min(
          PHYSICS_LIMITS.velocityRatio.max,
          Math.max(PHYSICS_LIMITS.velocityRatio.min, value)
        );
      }

      newConfig.miller = { ...newConfig.miller, [key]: clampedValue };
    } else if (path.startsWith("endurance.")) {
      const key = path.split(".")[1] as keyof typeof newConfig.endurance;
      let clampedValue = value;

      if (key === "distanceKm") {
        clampedValue = Math.min(
          PHYSICS_LIMITS.distanceKm.max,
          Math.max(PHYSICS_LIMITS.distanceKm.min, value)
        );
      } else if (key === "velocityRatio") {
        clampedValue = Math.min(
          PHYSICS_LIMITS.velocityRatio.max,
          Math.max(PHYSICS_LIMITS.velocityRatio.min, value)
        );
      }

      newConfig.endurance = { ...newConfig.endurance, [key]: clampedValue };
    }

    onPhysicsConfigChange(newConfig);
  };

  return (
    <MenuPanelContainer $isOpen={isOpen} ref={panelRef}>
      {/* 시뮬레이션 모드 선택 */}
      <MenuSection>
        <ModeSelector>
          <ModeButton
            $active={simulationMode === "classic"}
            onClick={() => onSimulationModeChange("classic")}
            type="button"
          >
            Classic
          </ModeButton>
          <ModeButton
            $active={simulationMode === "physics"}
            onClick={() => onSimulationModeChange("physics")}
            type="button"
          >
            Physics
          </ModeButton>
        </ModeSelector>
      </MenuSection>

      {/* Classic Mode: 슬라이더 - 항상 렌더링하되 모드에 따라 숨김 */}
      <MenuSection
        style={{ display: simulationMode === "classic" ? "flex" : "none" }}
      >
        <RatioControl>
          <RatioLabel>
            Miller 기준 <strong>1시간</strong> 경과 시
            <br />
            Endurance 경과 시간:{" "}
            <RatioText ref={ratioTextRef}>약 7.0yr</RatioText>
          </RatioLabel>
          <RatioSliderWrapper>
            <RatioEnd>1h : 1h</RatioEnd>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={100}
              ref={ratioSliderRef}
            />
            <RatioEnd>1h : 7yr</RatioEnd>
          </RatioSliderWrapper>
        </RatioControl>
      </MenuSection>

      {/* Physics Mode: 상대성이론 파라미터 */}
      {simulationMode === "physics" && (
        <>
          <MenuSection>
            <PhysicsSectionTitle>Black Hole</PhysicsSectionTitle>
            <PhysicsParamGrid>
              <PhysicsParamItem $fullWidth>
                <PhysicsParamLabel>질량 (M☉ 배수)</PhysicsParamLabel>
                <PhysicsParamInput
                  type="number"
                  value={sanitizedConfig.blackHoleMass}
                  onChange={(e) =>
                    handlePhysicsParamChange(
                      "blackHoleMass",
                      parseFloat(e.target.value) ||
                        DEFAULT_PHYSICS_CONFIG.blackHoleMass
                    )
                  }
                  step="1000000"
                  min={PHYSICS_LIMITS.blackHoleMass.min}
                  max={PHYSICS_LIMITS.blackHoleMass.max}
                />
              </PhysicsParamItem>
            </PhysicsParamGrid>
          </MenuSection>

          <MenuSection>
            <PhysicsSectionTitle>Miller</PhysicsSectionTitle>
            <PhysicsParamGrid>
              <PhysicsParamItem>
                <PhysicsParamLabel>궤도 거리 (km)</PhysicsParamLabel>
                <PhysicsParamInput
                  type="number"
                  value={sanitizedConfig.miller.distanceKm}
                  onChange={(e) =>
                    handlePhysicsParamChange(
                      "miller.distanceKm",
                      parseFloat(e.target.value) ||
                        DEFAULT_PHYSICS_CONFIG.miller.distanceKm
                    )
                  }
                  step="1000000"
                  min={PHYSICS_LIMITS.distanceKm.min}
                  max={PHYSICS_LIMITS.distanceKm.max}
                />
              </PhysicsParamItem>
              <PhysicsParamItem>
                <PhysicsParamLabel>공전 속도 (c×)</PhysicsParamLabel>
                <PhysicsParamInput
                  type="number"
                  value={sanitizedConfig.miller.velocityRatio}
                  onChange={(e) =>
                    handlePhysicsParamChange(
                      "miller.velocityRatio",
                      parseFloat(e.target.value) ||
                        DEFAULT_PHYSICS_CONFIG.miller.velocityRatio
                    )
                  }
                  step="0.01"
                  min={PHYSICS_LIMITS.velocityRatio.min}
                  max={PHYSICS_LIMITS.velocityRatio.max}
                />
              </PhysicsParamItem>
            </PhysicsParamGrid>
          </MenuSection>

          <MenuSection>
            <PhysicsSectionTitle>Endurance</PhysicsSectionTitle>
            <PhysicsParamGrid>
              <PhysicsParamItem>
                <PhysicsParamLabel>궤도 거리 (km)</PhysicsParamLabel>
                <PhysicsParamInput
                  type="number"
                  value={sanitizedConfig.endurance.distanceKm}
                  onChange={(e) =>
                    handlePhysicsParamChange(
                      "endurance.distanceKm",
                      parseFloat(e.target.value) ||
                        DEFAULT_PHYSICS_CONFIG.endurance.distanceKm
                    )
                  }
                  step="1000000000"
                  min={PHYSICS_LIMITS.distanceKm.min}
                  max={PHYSICS_LIMITS.distanceKm.max}
                />
              </PhysicsParamItem>
              <PhysicsParamItem>
                <PhysicsParamLabel>공전 속도 (c×)</PhysicsParamLabel>
                <PhysicsParamInput
                  type="number"
                  value={sanitizedConfig.endurance.velocityRatio}
                  onChange={(e) =>
                    handlePhysicsParamChange(
                      "endurance.velocityRatio",
                      parseFloat(e.target.value) ||
                        DEFAULT_PHYSICS_CONFIG.endurance.velocityRatio
                    )
                  }
                  step="0.0001"
                  min={PHYSICS_LIMITS.velocityRatio.min}
                  max={PHYSICS_LIMITS.velocityRatio.max}
                />
              </PhysicsParamItem>
            </PhysicsParamGrid>
          </MenuSection>

          {/* 계산 결과 */}
          {physicsTimeRatio !== null && (
            <PhysicsResult>
              시간 지연 비율: Miller 1h ={" "}
              <PhysicsResultValue>
                Endurance {formatTimeRatio(physicsTimeRatio)}
              </PhysicsResultValue>
            </PhysicsResult>
          )}
        </>
      )}

      <MenuDivider />

      <MenuSection>
        <MenuCheckbox>
          <input
            type="checkbox"
            checked={showText}
            onChange={(e) => onToggleShowText(e.target.checked)}
          />
          UI 표시
        </MenuCheckbox>
      </MenuSection>
    </MenuPanelContainer>
  );
};
