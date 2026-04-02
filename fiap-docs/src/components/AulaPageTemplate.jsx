import React from 'react';
import AulaFiapLayout from './AulaFiapLayout';
import AulaBody from './AulaBody';
import ToolPanelContent from './ToolPanelContent';

export default function AulaPageTemplate({ config }) {
  if (!config) return null;

  const {
    aulaId,
    disciplina,
    titulo,
    hero,
    progressoLinks,
    sectionMeta,
    sectionOrder,
    sectionBlocks,
    toolPanels,
  } = config;

  return (
    <AulaFiapLayout
      aulaId={aulaId}
      disciplina={disciplina}
      titulo={titulo}
      progressoLinks={progressoLinks}
      contentOptions={<ToolPanelContent panel={toolPanels?.content} />}
      appearanceContent={<ToolPanelContent panel={toolPanels?.appearance} />}
      readingResources={<ToolPanelContent panel={toolPanels?.reading} />}
    >
      <AulaBody hero={hero} sectionMeta={sectionMeta} sectionOrder={sectionOrder} sectionBlocks={sectionBlocks} />
    </AulaFiapLayout>
  );
}
