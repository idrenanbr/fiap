function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function validateProgressoLinks(config) {
  assert(Array.isArray(config.progressoLinks), `[${config.aulaId}] progressoLinks deve ser um array.`);

  const ids = new Set();
  config.progressoLinks.forEach((item, index) => {
    assert(item && typeof item === 'object', `[${config.aulaId}] progressoLinks[${index}] inválido.`);
    assert(isNonEmptyString(item.id), `[${config.aulaId}] progressoLinks[${index}].id obrigatório.`);
    assert(isNonEmptyString(item.label), `[${config.aulaId}] progressoLinks[${index}].label obrigatório.`);
    assert(!ids.has(item.id), `[${config.aulaId}] id duplicado em progressoLinks: ${item.id}`);
    ids.add(item.id);
  });

  return ids;
}

function validateSectionMeta(config) {
  assert(
    config.sectionMeta && typeof config.sectionMeta === 'object' && !Array.isArray(config.sectionMeta),
    `[${config.aulaId}] sectionMeta deve ser um objeto.`
  );

  const keys = Object.keys(config.sectionMeta);
  assert(keys.length > 0, `[${config.aulaId}] sectionMeta não pode estar vazio.`);

  keys.forEach((key) => {
    const meta = config.sectionMeta[key];
    assert(meta && typeof meta === 'object', `[${config.aulaId}] sectionMeta.${key} inválido.`);
    assert(isNonEmptyString(meta.id), `[${config.aulaId}] sectionMeta.${key}.id obrigatório.`);
    assert(isNonEmptyString(meta.titleTop), `[${config.aulaId}] sectionMeta.${key}.titleTop obrigatório.`);
    assert(typeof meta.titleBottom === 'string', `[${config.aulaId}] sectionMeta.${key}.titleBottom deve ser string.`);
  });

  return keys;
}

function validateSectionOrder(config, sectionMetaKeys) {
  assert(Array.isArray(config.sectionOrder), `[${config.aulaId}] sectionOrder deve ser um array.`);
  assert(config.sectionOrder.length > 0, `[${config.aulaId}] sectionOrder não pode estar vazio.`);

  const knownKeys = new Set(sectionMetaKeys);
  config.sectionOrder.forEach((item, index) => {
    assert(item && typeof item === 'object', `[${config.aulaId}] sectionOrder[${index}] inválido.`);
    assert(isNonEmptyString(item.key), `[${config.aulaId}] sectionOrder[${index}].key obrigatório.`);
    assert(knownKeys.has(item.key), `[${config.aulaId}] sectionOrder[${index}] referencia key inexistente: ${item.key}`);
  });
}

function validateSectionBlocks(config, sectionMetaKeys) {
  assert(
    config.sectionBlocks && typeof config.sectionBlocks === 'object' && !Array.isArray(config.sectionBlocks),
    `[${config.aulaId}] sectionBlocks deve ser um objeto.`
  );

  const metaKeySet = new Set(sectionMetaKeys);
  sectionMetaKeys.forEach((key) => {
    assert(Array.isArray(config.sectionBlocks[key]), `[${config.aulaId}] sectionBlocks.${key} deve ser array.`);

    config.sectionBlocks[key].forEach((block, index) => {
      assert(block && typeof block === 'object', `[${config.aulaId}] sectionBlocks.${key}[${index}] inválido.`);
      assert(
        block.type === 'paragraph' || block.type === 'image',
        `[${config.aulaId}] sectionBlocks.${key}[${index}] type inválido: ${block.type}`
      );

      if (block.type === 'paragraph') {
        assert(
          isNonEmptyString(block.text),
          `[${config.aulaId}] sectionBlocks.${key}[${index}].text obrigatório para bloco paragraph.`
        );
      }

      if (block.type === 'image') {
        assert(
          isNonEmptyString(block.src),
          `[${config.aulaId}] sectionBlocks.${key}[${index}].src obrigatório para bloco image.`
        );
        assert(
          isNonEmptyString(block.alt),
          `[${config.aulaId}] sectionBlocks.${key}[${index}].alt obrigatório para bloco image.`
        );
      }
    });
  });

  Object.keys(config.sectionBlocks).forEach((key) => {
    assert(metaKeySet.has(key), `[${config.aulaId}] sectionBlocks contém key sem sectionMeta: ${key}`);
  });
}

function validateCrossReferences(config, progressoIds) {
  const sectionMetaIds = Object.values(config.sectionMeta).map((meta) => meta.id);
  sectionMetaIds.forEach((id) => {
    assert(
      progressoIds.has(id),
      `[${config.aulaId}] sectionMeta.id não existe em progressoLinks: ${id}`
    );
  });
}

export function validateAulaConfig(config) {
  assert(config && typeof config === 'object', 'Config da aula inválida.');
  assert(isNonEmptyString(config.aulaId), 'aulaId é obrigatório.');
  assert(isNonEmptyString(config.routePath), `[${config.aulaId}] routePath é obrigatório.`);
  assert(config.routePath.startsWith('/'), `[${config.aulaId}] routePath deve iniciar com "/".`);
  assert(isNonEmptyString(config.disciplina), `[${config.aulaId}] disciplina é obrigatória.`);
  assert(isNonEmptyString(config.titulo), `[${config.aulaId}] titulo é obrigatório.`);

  assert(config.hero && typeof config.hero === 'object', `[${config.aulaId}] hero é obrigatório.`);
  assert(isNonEmptyString(config.hero.disciplina), `[${config.aulaId}] hero.disciplina é obrigatório.`);
  assert(isNonEmptyString(config.hero.titulo), `[${config.aulaId}] hero.titulo é obrigatório.`);

  const progressoIds = validateProgressoLinks(config);
  const sectionMetaKeys = validateSectionMeta(config);
  validateSectionOrder(config, sectionMetaKeys);
  validateSectionBlocks(config, sectionMetaKeys);
  validateCrossReferences(config, progressoIds);

  assert(config.toolPanels && typeof config.toolPanels === 'object', `[${config.aulaId}] toolPanels é obrigatório.`);

  return config;
}
