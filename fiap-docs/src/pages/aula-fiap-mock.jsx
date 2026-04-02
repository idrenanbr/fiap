import React from 'react';
import AulaPageTemplate from '../components/AulaPageTemplate';
import { getAulaConfig } from '../data/aulas';

export default function AulaFiapMockPage() {
  const config = getAulaConfig('es-trilha-piloto-v1');
  return <AulaPageTemplate config={config} />;
}
