import React from 'react';
import AulaFiapLayout from '../components/AulaFiapLayout';
import AulaBody, {
  ContentOptions,
  AppearanceContent,
  ReadingResources,
} from '../components/AulaBody';
import { progressoLinks } from '../data/onboardCourseData';

export default function AulaFiapPage() {
  return (
    <AulaFiapLayout
      aulaId="cc-onboard-v1"
      disciplina="Ciência da Computação"
      titulo="ONBOARD"
      progressoLinks={progressoLinks}
      contentOptions={<ContentOptions />}
      appearanceContent={<AppearanceContent />}
      readingResources={<ReadingResources />}
    >
      <AulaBody />
    </AulaFiapLayout>
  );
}