// src/utils/physics.ts
// 상대성이론 기반 시간 지연 계산 유틸리티

// ========== 물리 상수 ==========
export const PHYSICS_CONSTANTS = {
  c: 299_792_458, // 빛의 속도 (m/s)
  G: 6.6743e-11, // 중력 상수 (m³/kg/s²)
  M_sun: 1.989e30, // 태양 질량 (kg)
} as const;

// ========== 물리 파라미터 제한 ==========
export const PHYSICS_LIMITS = {
  blackHoleMass: {
    min: 1_000, // 최소: 1000 태양질량 (항성 블랙홀)
    max: 100_000_000_000, // 최대: 1000억 태양질량 (초대질량 블랙홀 한계)
  },
  distanceKm: {
    min: 1, // 최소: 1 km
    max: 1e15, // 최대: 1000조 km (약 0.1 광년)
  },
  velocityRatio: {
    min: 0, // 최소: 정지
    max: 0.99, // 최대: 빛의 99% (물리적 한계)
  },
} as const;

// ========== 물리 파라미터 인터페이스 ==========
export interface WorldPhysicsParams {
  /** 블랙홀 중심으로부터의 거리 (km) */
  distanceKm: number;
  /** 공전 속도 (빛의 속도 비율, 0~1) */
  velocityRatio: number;
}

export interface PhysicsConfig {
  /** 블랙홀 질량 (태양질량 배수) */
  blackHoleMass: number;
  /** Miller 행성 파라미터 */
  miller: WorldPhysicsParams;
  /** Endurance 파라미터 */
  endurance: WorldPhysicsParams;
}

// ========== 기본 설정값 (영화 Interstellar 기준) ==========
// Gargantua: 약 1억 태양질량의 초대질량 블랙홀
// 슈바르츠실트 반지름 rs = 2GM/c² ≈ 2.95km × 1억 = 2.95억 km
export const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  blackHoleMass: 100_000_000,
  miller: {
    // 이벤트 호라이즌 바로 바깥 (rs × 1.000048 ≈ 2.95억 km × 1.000048)
    // 1시간 = 7년 비율을 만들기 위한 설정
    distanceKm: 295_014_000, // 약 2.95억 km (rs 바로 바깥)
    velocityRatio: 0.55,
  },
  endurance: {
    // 블랙홀에서 아주 멀리 떨어진 안전 궤도
    distanceKm: 2_950_000_000_000, // 약 2.95조 km (rs × 10000)
    velocityRatio: 0.0001,
  },
};

// ========== 슈바르츠실트 반지름 ==========
/**
 * 슈바르츠실트 반지름 (이벤트 호라이즌) 계산
 * rs = 2GM/c²
 *
 * @param massSolarMultiplier - 블랙홀 질량 (태양질량 배수)
 * @returns 슈바르츠실트 반지름 (미터)
 */
export function schwarzschildRadius(massSolarMultiplier: number): number {
  const { G, c, M_sun } = PHYSICS_CONSTANTS;
  const M = massSolarMultiplier * M_sun;
  return (2 * G * M) / (c * c);
}

// ========== 중력 시간 지연 (일반 상대론) ==========
/**
 * 중력에 의한 시간 지연 배율 계산 (슈바르츠실트 메트릭)
 *
 * factor = 1 / √(1 - rs/r)
 *
 * 이 값이 클수록 해당 위치의 시간이 외부에서 볼 때 더 느리게 흐름
 *
 * @param r - 블랙홀 중심으로부터의 거리 (미터)
 * @param rs - 슈바르츠실트 반지름 (미터)
 * @returns 시간 지연 배율 (>= 1)
 */
export function gravitationalDilationFactor(r: number, rs: number): number {
  if (r <= rs) {
    // 이벤트 호라이즌 내부 - 시간이 무한히 느려짐 (현실적으로 불가능한 영역)
    return Infinity;
  }

  const ratio = rs / r;
  return 1 / Math.sqrt(1 - ratio);
}

// ========== 로렌츠 팩터 (특수 상대론) ==========
/**
 * 속도에 의한 시간 지연 배율 계산 (로렌츠 팩터)
 *
 * γ = 1 / √(1 - v²/c²)
 *
 * 이 값이 클수록 움직이는 물체의 시간이 정지 관찰자에게 더 느리게 보임
 *
 * @param v - 속도 (m/s)
 * @returns 로렌츠 팩터 (>= 1)
 */
export function lorentzFactor(v: number): number {
  const { c } = PHYSICS_CONSTANTS;

  if (v >= c) {
    // 빛의 속도 이상 - 물리적으로 불가능
    return Infinity;
  }

  const ratio = (v * v) / (c * c);
  return 1 / Math.sqrt(1 - ratio);
}

/**
 * 속도 비율로 로렌츠 팩터 계산
 *
 * @param velocityRatio - 빛의 속도 대비 비율 (0~1)
 * @returns 로렌츠 팩터
 */
export function lorentzFactorFromRatio(velocityRatio: number): number {
  if (velocityRatio >= 1) {
    return Infinity;
  }

  const ratio = velocityRatio * velocityRatio;
  return 1 / Math.sqrt(1 - ratio);
}

// ========== 총 시간 지연 배율 (일반 + 특수 상대론 결합) ==========
/**
 * 중력 + 속도를 모두 고려한 총 시간 지연 배율
 *
 * 근사: F ≈ G(r) × γ(v)
 *
 * @param r - 블랙홀 중심으로부터의 거리 (미터)
 * @param rs - 슈바르츠실트 반지름 (미터)
 * @param v - 속도 (m/s)
 * @returns 총 시간 지연 배율
 */
export function totalTimeDilationFactor(
  r: number,
  rs: number,
  v: number
): number {
  const gravFactor = gravitationalDilationFactor(r, rs);
  const velocityFactor = lorentzFactor(v);

  return gravFactor * velocityFactor;
}

/**
 * 파라미터 객체를 사용한 총 시간 지연 배율 계산
 *
 * @param params - 세계 물리 파라미터
 * @param rs - 슈바르츠실트 반지름 (미터)
 * @returns 총 시간 지연 배율
 */
export function calculateWorldTimeDilationFactor(
  params: WorldPhysicsParams,
  rs: number
): number {
  const { c } = PHYSICS_CONSTANTS;

  // 실제 거리 = km → m 변환
  const r = params.distanceKm * 1000;
  // 실제 속도 = c × 비율
  const v = c * params.velocityRatio;

  return totalTimeDilationFactor(r, rs, v);
}

// ========== 두 세계 간 상대 시간 비율 ==========
/**
 * Miller에서 1단위 시간이 지날 때 Endurance에서 흐르는 시간 비율 계산
 *
 * ratio = F_endurance / F_miller
 *
 * 예: ratio = 61320 이면, Miller에서 1시간 = Endurance에서 약 7년
 *
 * @param config - 물리 설정
 * @returns Miller 1단위 시간 대비 Endurance 시간 비율
 */
export function getRelativeTimeRatio(config: PhysicsConfig): number {
  // 입력값 유효성 검사
  const safeConfig = sanitizePhysicsConfig(config);
  const rs = schwarzschildRadius(safeConfig.blackHoleMass);

  const F_miller = calculateWorldTimeDilationFactor(safeConfig.miller, rs);
  const F_endurance = calculateWorldTimeDilationFactor(
    safeConfig.endurance,
    rs
  );

  // Infinity/NaN 방지
  if (!isFinite(F_miller) || !isFinite(F_endurance) || F_endurance === 0) {
    return 1; // 기본값 반환
  }

  const ratio = F_miller / F_endurance;

  // 최종 값 유효성 검사
  if (!isFinite(ratio) || isNaN(ratio)) {
    return 1;
  }

  return ratio;
}

/**
 * 시간 비율을 사람이 읽기 쉬운 형태로 변환
 *
 * @param ratio - 시간 비율 (시간 단위)
 * @returns 포맷된 문자열
 */
export function formatTimeRatio(ratio: number): string {
  // Infinity/NaN 방지
  if (!isFinite(ratio) || isNaN(ratio) || ratio <= 0) {
    return "계산 불가";
  }

  if (ratio <= 1.01) {
    return "1h (동일)";
  } else if (ratio < 24) {
    return `약 ${ratio.toFixed(1)}h`;
  } else if (ratio < 24 * 365) {
    const days = ratio / 24;
    return `약 ${days.toFixed(1)}d`;
  } else {
    const years = ratio / (24 * 365);
    // 너무 큰 값 방지
    if (years > 1e12) {
      return "∞ (무한대)";
    }
    return `약 ${years.toFixed(1)}yr`;
  }
}

// ========== 관찰자 위치 기반 시간 스케일 계산 ==========
/**
 * 관찰자 위치(0~1)에 따른 두 세계의 시간 스케일 계산
 *
 * @param observerNorm - 관찰자 위치 (0 = Miller, 1 = Endurance)
 * @param config - 물리 설정
 * @returns { miller, endurance } 각 세계의 시간 스케일
 */
export function getPhysicsTimeScales(
  observerNorm: number,
  config: PhysicsConfig
): { miller: number; endurance: number } {
  // 입력값 유효성 검사 및 클램핑
  const safeConfig = sanitizePhysicsConfig(config);

  const rs = schwarzschildRadius(safeConfig.blackHoleMass);

  const F_miller = calculateWorldTimeDilationFactor(safeConfig.miller, rs);
  const F_endurance = calculateWorldTimeDilationFactor(
    safeConfig.endurance,
    rs
  );

  // Infinity 또는 NaN 방지
  if (!isFinite(F_miller) || !isFinite(F_endurance) || F_endurance === 0) {
    console.warn(
      "Physics calculation resulted in invalid values, using defaults"
    );
    return { miller: 1, endurance: 1 };
  }

  // 기준 시간 배율 (두 세계의 상대적 비율)
  const baseRatio = F_miller / F_endurance;

  // baseRatio가 유효한지 확인
  if (!isFinite(baseRatio) || isNaN(baseRatio)) {
    console.warn("Base ratio is invalid, using defaults");
    return { miller: 1, endurance: 1 };
  }

  // 관찰자가 Miller에 가까울수록 (observerNorm → 0)
  // - Miller 시간은 정상에 가까움 (1.0)
  // - Endurance 시간은 빠르게 흐름 (baseRatio)

  // 관찰자가 Endurance에 가까울수록 (observerNorm → 1)
  // - Miller 시간은 느리게 흐름 (1/baseRatio)
  // - Endurance 시간은 정상에 가까움 (1.0)

  // 선형 보간 (lerp)
  const miller = lerp(1, 1 / baseRatio, observerNorm);
  const endurance = lerp(baseRatio, 1, observerNorm);

  // 최종 값 유효성 검사
  if (
    !isFinite(miller) ||
    !isFinite(endurance) ||
    isNaN(miller) ||
    isNaN(endurance)
  ) {
    console.warn("Final time scales are invalid, using defaults");
    return { miller: 1, endurance: 1 };
  }

  return { miller, endurance };
}

// ========== 입력값 유효성 검사 ==========
/**
 * 물리 파라미터 유효성 검사 및 클램핑
 */
export function sanitizePhysicsConfig(config: PhysicsConfig): PhysicsConfig {
  // 블랙홀 질량 클램핑
  const blackHoleMass = Math.min(
    PHYSICS_LIMITS.blackHoleMass.max,
    Math.max(
      PHYSICS_LIMITS.blackHoleMass.min,
      config.blackHoleMass || DEFAULT_PHYSICS_CONFIG.blackHoleMass
    )
  );

  // 슈바르츠실트 반지름 계산 (유효성 검사용)
  const rs = schwarzschildRadius(blackHoleMass);
  const rsKm = rs / 1000; // m → km

  // 최소 거리는 rs 바로 바깥 (rs * 1.00001)
  const minDistanceKm = Math.max(PHYSICS_LIMITS.distanceKm.min, rsKm * 1.00001);

  return {
    blackHoleMass,
    miller: {
      // distanceKm는 rs보다 크고,최대값 이하
      distanceKm: Math.min(
        PHYSICS_LIMITS.distanceKm.max,
        Math.max(
          minDistanceKm,
          config.miller?.distanceKm || DEFAULT_PHYSICS_CONFIG.miller.distanceKm
        )
      ),
      // velocityRatio는 제한 범위 내
      velocityRatio: Math.min(
        PHYSICS_LIMITS.velocityRatio.max,
        Math.max(
          PHYSICS_LIMITS.velocityRatio.min,
          config.miller?.velocityRatio ??
            DEFAULT_PHYSICS_CONFIG.miller.velocityRatio
        )
      ),
    },
    endurance: {
      distanceKm: Math.min(
        PHYSICS_LIMITS.distanceKm.max,
        Math.max(
          minDistanceKm,
          config.endurance?.distanceKm ||
            DEFAULT_PHYSICS_CONFIG.endurance.distanceKm
        )
      ),
      velocityRatio: Math.min(
        PHYSICS_LIMITS.velocityRatio.max,
        Math.max(
          PHYSICS_LIMITS.velocityRatio.min,
          config.endurance?.velocityRatio ??
            DEFAULT_PHYSICS_CONFIG.endurance.velocityRatio
        )
      ),
    },
  };
}

// ========== 유틸리티 함수 ==========
/**
 * 선형 보간
 */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ========== 검증 함수 ==========
/**
 * 현재 설정으로 예상되는 시간 비율 검증
 * (영화 기준: Miller 1시간 ≈ Endurance 7년)
 */
export function validateInterstellarRatio(config: PhysicsConfig): {
  ratio: number;
  millerHours: number;
  enduranceYears: number;
  isCloseToMovie: boolean;
} {
  const ratio = getRelativeTimeRatio(config);
  const enduranceYears = ratio / (24 * 365); // 시간을 년으로 변환

  return {
    ratio,
    millerHours: 1,
    enduranceYears,
    // 영화 설정: 1시간 ≈ 7년 (약 61,320)
    isCloseToMovie: Math.abs(enduranceYears - 7) < 1,
  };
}
