import { toolPanels } from './onboardToolPanels';

const progressoLinks = [
  { id: 'secao-1', label: 'Boas-vindas à trilha piloto' },
  { id: 'secao-2', label: 'Prática guiada' },
  { id: 'secao-3', label: 'Próximos passos' },
];

const sectionMeta = {
  intro: {
    id: 'secao-1',
    titleTop: 'BEM-VINDO',
    titleBottom: 'À TRILHA PILOTO',
  },
  pratica: {
    id: 'secao-2',
    titleTop: 'PRÁTICA',
    titleBottom: 'GUIADA',
  },
  proximos: {
    id: 'secao-3',
    titleTop: 'PRÓXIMOS',
    titleBottom: 'PASSOS',
  },
};

const sectionOrder = [{ key: 'intro', noDecor: true }, { key: 'pratica' }, { key: 'proximos' }];

const sectionBlocks = {
  intro: [
    {
      type: 'paragraph',
      text: 'Esta é uma aula piloto criada para validar escalabilidade do modelo de conteúdo e reaproveitamento de componentes.',
    },
    {
      type: 'paragraph',
      text: 'Com esse formato, você consegue criar novas aulas alterando apenas dados, sem duplicar estrutura de página.',
    },
  ],
  pratica: [
    {
      type: 'paragraph',
      text: 'Nesta etapa, os alunos seguem uma sequência curta com leitura, checklist e reflexão prática.',
    },
    {
      type: 'paragraph',
      text: 'As seções podem ter blocos de texto e imagem, mantendo a mesma renderização já usada no onboarding.',
    },
    {
      type: 'image',
      src: '/img/onboard/mock-pratica.png',
      alt: 'Ilustração da etapa prática guiada',
    },
  ],
  proximos: [
    {
      type: 'paragraph',
      text: 'Para publicar uma nova trilha, basta registrar um novo arquivo de configuração e adicionar a rota da aula.',
    },
    {
      type: 'paragraph',
      text: 'Esse fluxo permite escalar o catálogo FIAP com consistência visual e menor custo de manutenção.',
    },
  ],
};

export const mockAulaConfig = {
  aulaId: 'es-trilha-piloto-v1',
  routePath: '/aula-fiap-mock',
  disciplina: 'Engenharia de Software',
  titulo: 'TRILHA PILOTO',
  hero: {
    disciplina: 'ENGENHARIA DE SOFTWARE',
    titulo: 'TRILHA PILOTO',
  },
  progressoLinks,
  sectionMeta,
  sectionOrder,
  sectionBlocks,
  toolPanels,
};
