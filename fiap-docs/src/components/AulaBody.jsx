import React from 'react';
import '../css/onboard.css';
import OnboardSection from './OnboardSection';
import OnboardImage from './OnboardImage';
import { sectionMeta as defaultSectionMeta } from '../data/onboardCourseData';
import {
  sectionBlocks as defaultSectionBlocks,
  sectionOrder as defaultSectionOrder,
} from '../data/onboardSectionBlocks';


function HeroOnboard({ disciplina = 'CIÊNCIA DA COMPUTAÇÃO', titulo = 'ONBOARD' }) {
  return (
    <section className="onboard-hero">
      <div className="onboard-hero-noise" />
      <div className="onboard-hero-line line-left-top" />
      <div className="onboard-hero-line line-left-bottom" />
      <div className="onboard-hero-line line-right-mid" />

      <div className="onboard-grid-pink" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="onboard-diamonds" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="onboard-plus left-plus">+</div>

      <div className="onboard-hero-inner">
        <div className="onboard-hero-copy">
          <div className="onboard-hero-discipline">{disciplina}</div>
          <h1>{titulo}</h1>
        </div>

        <div className="onboard-hero-art">
          <div className="onboard-orbit" />
          <div className="onboard-core-glow" />
          <div className="onboard-mouse">
            <div className="wheel" />
            <div className="split" />
          </div>
          <div className="onboard-scroll-down">
            <span>SCROLL DOWN</span>
            <strong>⌄</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScreenshotBlock({ src, alt }) {
  return <OnboardImage src={src} alt={alt} />;
}

function NarrativeSection({ meta, children, noDecor = false }) {
  return (
    <OnboardSection
      id={meta.id}
      titleTop={meta.titleTop}
      titleBottom={meta.titleBottom}
      noDecor={noDecor}
    >
      {children}
    </OnboardSection>
  );
}

function ContentBlocks({ blocks }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === 'image') {
          return <ScreenshotBlock key={`${block.src}-${index}`} src={block.src} alt={block.alt} />;
        }
        return <p key={`${block.text.slice(0, 20)}-${index}`}>{block.text}</p>;
      })}
    </>
  );
}

function FooterRating() {
  return (
    <section id="secao-13" className="onboard-experience">
      <div className="onboard-experience-inner">
        <div className="experience-small">CONTE-NOS SOBRE A SUA EXPERIÊNCIA</div>
        <div className="experience-question">O QUE VOCÊ ACHOU DO CONTEÚDO DESTE CAPÍTULO?</div>
        <div className="experience-stars">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
      </div>
    </section>
  );
}

export default function AulaBody({
  hero,
  sectionMeta = defaultSectionMeta,
  sectionOrder = defaultSectionOrder,
  sectionBlocks = defaultSectionBlocks,
}) {
  return (
    <div className="onboard-page">
      <HeroOnboard disciplina={hero?.disciplina} titulo={hero?.titulo} />
      {sectionOrder.map(({ key, noDecor }) => (
        <NarrativeSection key={key} meta={sectionMeta[key]} noDecor={Boolean(noDecor)}>
          <ContentBlocks blocks={sectionBlocks[key] || []} />
        </NarrativeSection>
      ))}

      <FooterRating />
    </div>
  );
}