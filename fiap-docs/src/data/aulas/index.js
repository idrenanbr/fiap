import { onboardAulaConfig } from '../onboardAulaConfig';
import { mockAulaConfig } from '../mockAulaConfig';
import { validateAulaConfig } from './validateAulaConfig';

const rawConfigs = [onboardAulaConfig, mockAulaConfig];

const routePathSet = new Set();
rawConfigs.forEach((config) => {
  validateAulaConfig(config);
  if (routePathSet.has(config.routePath)) {
    throw new Error(`[${config.aulaId}] routePath duplicado no registry: ${config.routePath}`);
  }
  routePathSet.add(config.routePath);
});

export const aulasRegistry = {
  [onboardAulaConfig.aulaId]: onboardAulaConfig,
  [mockAulaConfig.aulaId]: mockAulaConfig,
};

export function getAulaConfig(aulaId) {
  return aulasRegistry[aulaId] || null;
}

export function getAllAulas() {
  return Object.values(aulasRegistry);
}
