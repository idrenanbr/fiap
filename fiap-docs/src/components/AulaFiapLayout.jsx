import React, { useEffect, useRef, useState } from 'react';

const miniSidebarStyle = {
  width: '72px',
  background: '#181818',
  borderRight: '1px solid rgba(255,255,255,0.06)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '20px',
  gap: '18px',
  position: 'relative',
  zIndex: 3,
};

const baseMiniIconStyle = {
  width: '38px',
  height: '38px',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '15px',
  border: '1px solid rgba(255,255,255,0.06)',
  background: 'rgba(255,255,255,0.02)',
  cursor: 'pointer',
  transition: 'all 0.25s ease',
};

const expandedBlockStyle = {
  background: 'linear-gradient(180deg, rgba(17,17,17,0.98) 0%, rgba(13,13,13,0.98) 100%)',
  padding: '28px 30px',
  borderTop: '1px solid rgba(255,255,255,0.04)',
};

const menuRowBaseStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderTop: '1px solid rgba(255,255,255,0.05)',
  color: '#d8d8d8',
  textAlign: 'left',
  cursor: 'pointer',
  padding: '0',
};

const resetButtonStyle = {
  background: 'transparent',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#d8d8d8',
  padding: '10px 14px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '13px',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const READ_LINE_RATIO = 0.3;
const MIN_SECTION_READ_MS = 8000;
const MIN_SECTION_PROGRESS = 0.6;
const ACTIVE_INTERACTION_WINDOW_MS = 15000;
const READ_TICK_MS = 500;

function formatReadMs(ms) {
  return `${(ms / 1000).toFixed(1)}s`;
}

function getMiniIconStyle(active = false) {
  return {
    ...baseMiniIconStyle,
    color: active ? '#ff0a78' : '#d8d8d8',
    borderColor: active ? 'rgba(255,10,120,0.35)' : 'rgba(255,255,255,0.06)',
    background: active ? 'rgba(255,10,120,0.08)' : 'rgba(255,255,255,0.02)',
    boxShadow: active ? '0 0 18px rgba(255,10,120,0.15)' : 'none',
  };
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const hh = String(hours).padStart(2, '0');
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}

function getDefaultStats() {
  const now = new Date().toISOString();

  return {
    visitCount: 1,
    totalTimeMs: 0,
    activeTimeMs: 0,
    sectionsViewed: {},
    lastVisitedSection: null,
    firstOpenedAt: now,
    lastOpenedAt: now,
    resetCount: 0,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function AulaFiapLayout({
  aulaId,
  disciplina,
  titulo,
  progressoLinks = [],
  contentOptions = null,
  appearanceContent = null,
  readingResources = null,
  children,
}) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [manualOverrides, setManualOverrides] = useState({});
  const [readingStats, setReadingStats] = useState(getDefaultStats);
  const [autoTrackingPaused, setAutoTrackingPaused] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [readHud, setReadHud] = useState({
    sectionLabel: '—',
    elapsedMs: 0,
    progress: 0,
    inReadZone: false,
    active: false,
    read: false,
  });

  const lastInteractionRef = useRef(Date.now());
  const viewedThisSessionRef = useRef(new Set());
  const sectionReadMsRef = useRef({});
  const sectionMaxProgressRef = useRef({});

  const storageNamespace = aulaId || titulo;
  const progressStorageKey = `fiap-progress-${storageNamespace}`;
  const manualStorageKey = `fiap-progress-manual-${storageNamespace}`;
  const statsStorageKey = `fiap-reading-stats-${storageNamespace}`;

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(progressStorageKey);
      if (savedProgress) {
        setCheckedItems(JSON.parse(savedProgress));
      }

      const savedManual = localStorage.getItem(manualStorageKey);
      if (savedManual) {
        setManualOverrides(JSON.parse(savedManual));
      }

      const savedStats = localStorage.getItem(statsStorageKey);
      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        setReadingStats({
          ...getDefaultStats(),
          ...parsed,
          visitCount: (parsed.visitCount || 0) + 1,
          lastOpenedAt: new Date().toISOString(),
        });
      } else {
        setReadingStats(getDefaultStats());
      }
    } catch (error) {
      console.error('Erro ao carregar dados locais:', error);
    }
  }, [progressStorageKey, manualStorageKey, statsStorageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(progressStorageKey, JSON.stringify(checkedItems));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  }, [checkedItems, progressStorageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(manualStorageKey, JSON.stringify(manualOverrides));
    } catch (error) {
      console.error('Erro ao salvar overrides manuais:', error);
    }
  }, [manualOverrides, manualStorageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(statsStorageKey, JSON.stringify(readingStats));
    } catch (error) {
      console.error('Erro ao salvar estatísticas:', error);
    }
  }, [readingStats, statsStorageKey]);

  useEffect(() => {
    function registerInteraction() {
      lastInteractionRef.current = Date.now();
    }

    const events = ['mousemove', 'scroll', 'keydown', 'click', 'touchstart'];

    events.forEach((eventName) => {
      window.addEventListener(eventName, registerInteraction, { passive: true });
    });

    const interval = setInterval(() => {
      if (!document.hidden) {
        setReadingStats((prev) => ({
          ...prev,
          totalTimeMs: prev.totalTimeMs + 1000,
        }));

        const isActive = Date.now() - lastInteractionRef.current < 20000;
        if (isActive) {
          setReadingStats((prev) => ({
            ...prev,
            activeTimeMs: prev.activeTimeMs + 1000,
          }));
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      events.forEach((eventName) => {
        window.removeEventListener(eventName, registerInteraction);
      });
    };
  }, []);

  useEffect(() => {
    if (!autoTrackingPaused) return;

    function handleScrollResume() {
      setAutoTrackingPaused(false);
    }

    window.addEventListener('scroll', handleScrollResume, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollResume);
    };
  }, [autoTrackingPaused]);

  useEffect(() => {
    function updateScrollUi() {
      const scrollTop = window.scrollY || window.pageYOffset;
      const doc = document.documentElement;
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const progress = clamp(scrollTop / maxScroll, 0, 1);

      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 450);

      if (progressoLinks.length) {
        const readLine = window.innerHeight * READ_LINE_RATIO;
        let bestIndex = 0;
        let bestDistance = Number.POSITIVE_INFINITY;
        let containingIndex = -1;

        progressoLinks.forEach((item, index) => {
          const el = document.getElementById(item.id);
          if (!el) return;

          const rect = el.getBoundingClientRect();
          if (rect.top <= readLine && rect.bottom >= readLine) {
            containingIndex = index;
          }

          const distance = Math.abs(rect.top - readLine);

          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = index;
          }
        });

        setCurrentSectionIndex(containingIndex >= 0 ? containingIndex : bestIndex);
      }
    }

    updateScrollUi();
    window.addEventListener('scroll', updateScrollUi, { passive: true });
    window.addEventListener('resize', updateScrollUi);

    return () => {
      window.removeEventListener('scroll', updateScrollUi);
      window.removeEventListener('resize', updateScrollUi);
    };
  }, [progressoLinks]);

  useEffect(() => {
    if (!progressoLinks.length) return;

    const sectionId = progressoLinks[currentSectionIndex]?.id;
    if (!sectionId) return;

    if (!viewedThisSessionRef.current.has(sectionId)) {
      viewedThisSessionRef.current.add(sectionId);
      setReadingStats((prev) => ({
        ...prev,
        sectionsViewed: {
          ...prev.sectionsViewed,
          [sectionId]: (prev.sectionsViewed?.[sectionId] || 0) + 1,
        },
        lastVisitedSection: sectionId,
      }));
      return;
    }

    setReadingStats((prev) => ({
      ...prev,
      lastVisitedSection: sectionId,
    }));
  }, [currentSectionIndex, progressoLinks]);

  useEffect(() => {
    if (!progressoLinks.length || autoTrackingPaused) return;

    const interval = setInterval(() => {
      if (document.hidden) return;

      const section = progressoLinks[currentSectionIndex];
      if (!section) return;

      const sectionId = section.id;
      const sectionLabel = section.label;
      const alreadyRead = !!checkedItems[sectionId];

      const setHud = (partial) => {
        setReadHud({
          sectionLabel,
          elapsedMs: sectionReadMsRef.current[sectionId] || 0,
          progress: sectionMaxProgressRef.current[sectionId] || 0,
          inReadZone: false,
          active: false,
          read: alreadyRead,
          ...partial,
        });
      };

      if (manualOverrides[sectionId]) return;

      const isActive = Date.now() - lastInteractionRef.current <= ACTIVE_INTERACTION_WINDOW_MS;
      if (!isActive) {
        setHud({ active: false, read: alreadyRead });
        return;
      }

      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl) return;

      const readLine = window.innerHeight * READ_LINE_RATIO;
      const rect = sectionEl.getBoundingClientRect();
      const isInReadZone = rect.top <= readLine && rect.bottom >= readLine;

      if (!isInReadZone) {
        setHud({ inReadZone: false, active: true, read: alreadyRead });
        return;
      }

      const currentReadMs = (sectionReadMsRef.current[sectionId] || 0) + READ_TICK_MS;
      sectionReadMsRef.current[sectionId] = currentReadMs;

      const sectionProgress = clamp((readLine - rect.top) / Math.max(rect.height, 1), 0, 1);
      const currentMaxProgress = sectionMaxProgressRef.current[sectionId] || 0;
      sectionMaxProgressRef.current[sectionId] = Math.max(currentMaxProgress, sectionProgress);

      setHud({
        elapsedMs: sectionReadMsRef.current[sectionId] || 0,
        progress: sectionMaxProgressRef.current[sectionId] || 0,
        inReadZone: true,
        active: true,
        read: alreadyRead,
      });

      if (
        currentReadMs >= MIN_SECTION_READ_MS &&
        sectionMaxProgressRef.current[sectionId] >= MIN_SECTION_PROGRESS
      ) {
        setCheckedItems((prev) => {
          if (prev[sectionId]) return prev;
          setReadHud((prevHud) => ({
            ...prevHud,
            read: true,
          }));
          return {
            ...prev,
            [sectionId]: true,
          };
        });
      }
    }, READ_TICK_MS);

    return () => {
      clearInterval(interval);
    };
  }, [currentSectionIndex, progressoLinks, manualOverrides, autoTrackingPaused, checkedItems]);

  function toggleChecked(id) {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setManualOverrides((prev) => ({
      ...prev,
      [id]: true,
    }));
  }

  function resetProgressOnly() {
    const confirmed = window.confirm(
      'Reiniciar o progresso desta leitura? Isso vai zerar as marcações automáticas e manuais.'
    );

    if (!confirmed) return;

    setCheckedItems({});
    setManualOverrides({});
    viewedThisSessionRef.current = new Set();
    sectionReadMsRef.current = {};
    sectionMaxProgressRef.current = {};
    setReadHud({
      sectionLabel: '—',
      elapsedMs: 0,
      progress: 0,
      inReadZone: false,
      active: false,
      read: false,
    });
    setAutoTrackingPaused(true);

    try {
      localStorage.removeItem(progressStorageKey);
      localStorage.removeItem(manualStorageKey);
    } catch (error) {
      console.error('Erro ao resetar progresso:', error);
    }
  }

  function resetAllStats() {
    const confirmed = window.confirm(
      'Resetar tudo desta aula? Isso vai apagar progresso e estatísticas locais.'
    );

    if (!confirmed) return;

    const now = new Date().toISOString();

    setCheckedItems({});
    setManualOverrides({});
    sectionReadMsRef.current = {};
    sectionMaxProgressRef.current = {};
    setReadHud({
      sectionLabel: '—',
      elapsedMs: 0,
      progress: 0,
      inReadZone: false,
      active: false,
      read: false,
    });
    setReadingStats({
      visitCount: 1,
      totalTimeMs: 0,
      activeTimeMs: 0,
      sectionsViewed: {},
      lastVisitedSection: null,
      firstOpenedAt: now,
      lastOpenedAt: now,
      resetCount: (readingStats.resetCount || 0) + 1,
    });

    viewedThisSessionRef.current = new Set();
    setAutoTrackingPaused(true);

    try {
      localStorage.removeItem(progressStorageKey);
      localStorage.removeItem(manualStorageKey);
      localStorage.removeItem(statsStorageKey);
    } catch (error) {
      console.error('Erro ao resetar dados:', error);
    }
  }

  function handlePanelClick(panelKey) {
    if (!toolsOpen) {
      setToolsOpen(true);
      setActivePanel(panelKey);
      return;
    }

    if (activePanel === panelKey) {
      setActivePanel(null);
      return;
    }

    setActivePanel(panelKey);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderExpandedContent(panelKey) {
    if (activePanel !== panelKey) return null;

    if (panelKey === 'progress') {
      const checkedCount = progressoLinks.filter((item) => checkedItems[item.id]).length;

      return (
        <div
          style={{
            ...expandedBlockStyle,
            borderLeft: '4px solid #ff0a78',
            boxShadow: 'inset 10px 0 24px rgba(255,10,120,0.04)',
          }}
        >
          <div style={{ color: '#bfbfbf', fontSize: '15px', marginBottom: '10px' }}>
            Índice - seções do capítulo
          </div>

          <div style={{ color: '#c8c8c8', fontSize: '15px', marginBottom: '16px' }}>
            {String(checkedCount).padStart(2, '0')}/
            {String(progressoLinks.length).padStart(2, '0')} |
          </div>

          <ol
            style={{
              margin: 0,
              paddingLeft: '0',
              listStyle: 'none',
              display: 'grid',
              gap: '12px',
              fontSize: '15px',
            }}
          >
            {progressoLinks.map((item, index) => {
              const checked = !!checkedItems[item.id];

              return (
                <li key={item.id}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '24px 1fr',
                      gap: '12px',
                      alignItems: 'start',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleChecked(item.id)}
                      style={{
                        marginTop: '3px',
                        accentColor: '#ff0a78',
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                      }}
                    />

                    <a
                      href={`#${item.id}`}
                      style={{
                        color: checked ? '#ff4f9e' : '#d8d8d8',
                        textDecoration: 'none',
                        lineHeight: 1.7,
                      }}
                    >
                      {index + 1}. {item.label}
                    </a>
                  </div>
                </li>
              );
            })}
          </ol>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '24px',
            }}
          >
            <button onClick={resetProgressOnly} style={resetButtonStyle}>
              Reiniciar progresso
            </button>

            <button
              onClick={resetAllStats}
              style={{
                ...resetButtonStyle,
                borderColor: 'rgba(255,10,120,0.28)',
                color: '#ff7ab3',
              }}
            >
              Resetar tudo
            </button>
          </div>
        </div>
      );
    }

    if (panelKey === 'content') {
      return (
        <div
          style={{
            ...expandedBlockStyle,
            borderLeft: '4px solid #ff0a78',
            boxShadow: 'inset 10px 0 24px rgba(255,10,120,0.04)',
          }}
        >
          {contentOptions}
        </div>
      );
    }

    if (panelKey === 'appearance') {
      return (
        <div
          style={{
            ...expandedBlockStyle,
            borderLeft: '4px solid #ff0a78',
            boxShadow: 'inset 10px 0 24px rgba(255,10,120,0.04)',
          }}
        >
          {appearanceContent}
        </div>
      );
    }

    if (panelKey === 'reading') {
      return (
        <div
          style={{
            ...expandedBlockStyle,
            borderLeft: '4px solid #ff0a78',
            boxShadow: 'inset 10px 0 24px rgba(255,10,120,0.04)',
          }}
        >
          {readingResources}

          <div
            style={{
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'grid',
              gap: '10px',
            }}
          >
            <div
              style={{
                color: '#8f8f8f',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Estatísticas locais
            </div>

            <div style={{ color: '#d8d8d8', fontSize: '14px' }}>
              Visitas: {readingStats.visitCount}
            </div>

            <div style={{ color: '#d8d8d8', fontSize: '14px' }}>
              Tempo total: {formatDuration(readingStats.totalTimeMs)}
            </div>

            <div style={{ color: '#d8d8d8', fontSize: '14px' }}>
              Tempo ativo: {formatDuration(readingStats.activeTimeMs)}
            </div>

            <div style={{ color: '#d8d8d8', fontSize: '14px' }}>
              Última seção vista: {readingStats.lastVisitedSection || '—'}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  function renderMenuRow(panelKey, icon, label) {
    const active = activePanel === panelKey;

    return (
      <>
        <button
          onClick={() => handlePanelClick(panelKey)}
          style={menuRowBaseStyle}
          title={label}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              padding: '28px 30px',
              background: active ? 'rgba(255,255,255,0.03)' : 'transparent',
            }}
          >
            <span
              style={{
                color: active ? '#ff0a78' : '#f0f0f0',
                fontSize: '24px',
                width: '28px',
                display: 'inline-flex',
                justifyContent: 'center',
              }}
            >
              {icon}
            </span>

            <span
              style={{
                color: '#cfcfcf',
                fontSize: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {label}
            </span>
          </div>
        </button>

        {renderExpandedContent(panelKey)}
      </>
    );
  }

  const currentDisplay = progressoLinks.length
    ? `${String(currentSectionIndex + 1).padStart(2, '0')}/${String(progressoLinks.length).padStart(2, '0')}`
    : '00/00';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0b0b0b',
        color: '#f5f5f5',
        display: 'grid',
        gridTemplateColumns: toolsOpen ? '72px 420px 1fr' : '72px 1fr',
      }}
    >
      <aside style={miniSidebarStyle}>
        <button
          onClick={() => {
            if (toolsOpen) {
              setToolsOpen(false);
              return;
            }

            setToolsOpen(true);
            setActivePanel(null);
          }}
          style={{
            ...getMiniIconStyle(false),
            color: '#ff0a78',
            borderColor: 'rgba(255,10,120,0.35)',
            background: 'rgba(255,10,120,0.06)',
            marginTop: '6px',
          }}
          title={toolsOpen ? 'Recolher menu' : 'Expandir menu'}
        >
          {toolsOpen ? '←' : '→'}
        </button>

        <button
          onClick={() => handlePanelClick('progress')}
          style={getMiniIconStyle(activePanel === 'progress' && toolsOpen)}
          title="Progresso de Estudo"
        >
          ⚑
        </button>

        <button
          onClick={() => handlePanelClick('content')}
          style={getMiniIconStyle(activePanel === 'content' && toolsOpen)}
          title="Opções de Conteúdo"
        >
          📄
        </button>

        <button
          onClick={() => handlePanelClick('appearance')}
          style={getMiniIconStyle(activePanel === 'appearance' && toolsOpen)}
          title="Aparência e Acessibilidade"
        >
          ⚙
        </button>

        <button
          onClick={() => handlePanelClick('reading')}
          style={getMiniIconStyle(activePanel === 'reading' && toolsOpen)}
          title="Recursos de Leitura"
        >
          ✎
        </button>

        <div style={{ flex: 1 }} />

        <div
          style={{
            ...getMiniIconStyle(false),
            borderRadius: '999px',
            cursor: 'default',
          }}
          title="Informações"
        >
          i
        </div>
      </aside>

      {toolsOpen && (
        <aside
          style={{
            background: 'rgba(30,30,30,0.96)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2,
            boxShadow: '12px 0 40px rgba(0,0,0,0.35)',
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              padding: '28px 30px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background:
                'linear-gradient(180deg, rgba(45,45,45,0.98) 0%, rgba(37,37,37,0.98) 100%)',
            }}
          >
            <div
              style={{
                fontSize: '17px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#e6e6e6',
              }}
            >
              Menu de Ferramentas
            </div>

            <button
              onClick={() => setToolsOpen(false)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '999px',
                border: 'none',
                background: '#ff0a78',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '18px',
                lineHeight: 1,
              }}
              title="Recolher menu"
            >
              ←
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {renderMenuRow('progress', '⚑', 'Progresso de Estudo')}
            {renderMenuRow('content', '📄', 'Opções de Conteúdo')}
            {renderMenuRow('appearance', '⚙', 'Aparência e Acessibilidade')}
            {renderMenuRow('reading', '✎', 'Recursos de Leitura')}
          </div>
        </aside>
      )}

      <section
        style={{
          background: `
            radial-gradient(circle at 62% 22%, rgba(255,10,120,0.22) 0%, rgba(255,10,120,0.08) 20%, rgba(0,0,0,0) 42%),
            linear-gradient(180deg, #0a0a0a 0%, #101010 100%)
          `,
          position: 'relative',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        <div
          style={{
            position: 'fixed',
            right: '2px',
            top: '120px',
            width: '14px',
            height: 'calc(100vh - 240px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 4,
            transition: 'left 0.25s ease',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '2px',
              height: '100%',
              background: 'rgba(255,255,255,0.14)',
              boxShadow: '0 0 18px rgba(255,255,255,0.04)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: `${scrollProgress * 100}%`,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '2px',
                background: '#ff0a78',
                boxShadow: '0 0 18px rgba(255,10,120,0.6)',
              }}
            />
          </div>
        </div>

        <div
          style={{
            height: '72px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 30px',
            color: '#d9d9d9',
            background: 'rgba(8,8,8,0.88)',
          }}
        >
          <div
            style={{
              color: '#bdbdbd',
              fontWeight: 400,
              letterSpacing: '0.12em',
              fontSize: '16px',
              textTransform: 'uppercase',
            }}
          >
            FIAP
          </div>
        </div>

        <div
          style={{
            padding: '72px 32px 120px',
            maxWidth: '1100px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div
            style={{
              color: '#7c2cff',
              fontSize: '18px',
              textTransform: 'uppercase',
              marginBottom: '10px',
              letterSpacing: '0.04em',
            }}
          >
            {disciplina}
          </div>

          <h1
            style={{
              fontSize: '64px',
              margin: 0,
              marginBottom: '42px',
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            {titulo}
          </h1>

          {children}
        </div>

        <div
          style={{
            position: 'fixed',
            right: '22px',
            bottom: '20px',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: '#ff7ab3',
              textTransform: 'uppercase',
              background: 'rgba(0,0,0,0.28)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '8px 10px',
              borderRadius: '999px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {currentDisplay}
          </div>

          <div
            style={{
              fontSize: '11px',
              color: readHud.read ? '#7dffb3' : '#ffd3e6',
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              padding: '8px 10px',
              maxWidth: '220px',
              lineHeight: 1.35,
              textAlign: 'center',
            }}
            title="Status de leitura da seção atual"
          >
            {readHud.read ? 'LIDO' : readHud.inReadZone && readHud.active ? 'LENDO' : 'AGUARDANDO LEITURA'}
            <br />
            {readHud.sectionLabel}
            <br />
            {formatReadMs(readHud.elapsedMs)} / {formatReadMs(MIN_SECTION_READ_MS)} |{' '}
            {Math.round(readHud.progress * 100)}% / {Math.round(MIN_SECTION_PROGRESS * 100)}%
          </div>

          {showBackToTop && (
            <button
              onClick={scrollToTop}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '999px',
                border: '1px solid rgba(255,10,120,0.35)',
                background: 'rgba(15,15,15,0.86)',
                color: '#ff0a78',
                cursor: 'pointer',
                fontSize: '18px',
                boxShadow: '0 0 18px rgba(255,10,120,0.16)',
              }}
              title="Voltar ao topo"
            >
              ↑
            </button>
          )}
        </div>
      </section>
    </main>
  );
}