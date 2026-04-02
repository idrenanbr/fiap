import { progressoLinks, sectionMeta } from './onboardCourseData';
import { sectionOrder, sectionBlocks } from './onboardSectionBlocks';
import { toolPanels } from './onboardToolPanels';

export const onboardAulaConfig = {
  aulaId: 'cc-onboard-v1',
  routePath: '/aula-fiap',
  disciplina: 'Ciência da Computação',
  titulo: 'ONBOARD',
  hero: {
    disciplina: 'CIÊNCIA DA COMPUTAÇÃO',
    titulo: 'ONBOARD',
  },
  progressoLinks,
  sectionMeta,
  sectionOrder,
  sectionBlocks,
  toolPanels,
};
