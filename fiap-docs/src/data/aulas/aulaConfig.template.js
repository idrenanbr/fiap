import { toolPanels } from '../onboardToolPanels';

/**
 * Template base para criar novas aulas.
 *
 * Passos:
 * 1) Duplique este arquivo e renomeie para "<nomeDaAula>Config.js".
 * 2) Preencha os campos e seções.
 * 3) Registre no arquivo `src/data/aulas/index.js`.
 * 4) Crie a rota em `src/pages/<rota>.jsx` usando `AulaPageTemplate`.
 */
export const novaAulaTemplate = {
  aulaId: 'curso-slug-v1',
  routePath: '/aula-nova',
  disciplina: 'Nome da Disciplina',
  titulo: 'TITULO DA AULA',
  hero: {
    disciplina: 'NOME DA DISCIPLINA',
    titulo: 'TITULO DA AULA',
  },
  progressoLinks: [
    { id: 'secao-1', label: 'Introducao' },
    { id: 'secao-2', label: 'Conteudo principal' },
  ],
  sectionMeta: {
    intro: {
      id: 'secao-1',
      titleTop: 'INTRODUCAO',
      titleBottom: '',
    },
    conteudo: {
      id: 'secao-2',
      titleTop: 'CONTEUDO',
      titleBottom: 'PRINCIPAL',
    },
  },
  sectionOrder: [{ key: 'intro', noDecor: true }, { key: 'conteudo' }],
  sectionBlocks: {
    intro: [
      { type: 'paragraph', text: 'Texto introdutorio da secao.' },
      { type: 'image', src: '/img/onboard/exemplo.png', alt: 'Descricao da imagem' },
    ],
    conteudo: [{ type: 'paragraph', text: 'Texto principal da secao.' }],
  },
  toolPanels,
};
