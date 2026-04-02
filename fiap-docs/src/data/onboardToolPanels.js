export const toolPanels = {
  content: {
    kind: 'content',
    title: 'Opções de conteúdo',
    items: [
      { icon: '↓', label: 'E-book', colorClass: 'tool-circle-purple' },
      { icon: '▶', label: 'Vídeos', colorClass: 'tool-circle-pink' },
      { icon: '♫', label: 'Podcasts', colorClass: 'tool-circle-cyan' },
    ],
  },
  appearance: {
    kind: 'appearance',
    title: 'Aparência e acessibilidade',
    fontTitle: 'Tamanho da fonte',
    fontOptions: [
      { label: '-A', className: 'tool-font-off' },
      { label: 'A', className: 'tool-font-on' },
      { label: 'A+', className: 'tool-font-big' },
    ],
    librasTitle: 'Libras',
    librasOptions: [
      { label: 'Ativado', active: false },
      { label: 'Desativado', active: true },
    ],
  },
  reading: {
    kind: 'reading',
    title: 'Recursos de leitura',
    items: [
      { icon: '☆', label: 'Favoritar' },
      { icon: '⌁', label: 'Tags' },
      { icon: '✎', label: 'Anotações' },
      { icon: '⚠', label: 'Relatar problema' },
    ],
  },
};
