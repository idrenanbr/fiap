# Criar nova aula (padrao escalavel)

Este projeto foi estruturado para adicionar novas aulas com **dados** e sem duplicar layout.

## Fluxo recomendado

1. Duplique `src/data/aulas/aulaConfig.template.js`.
2. Renomeie para algo como `src/data/minhaNovaAulaConfig.js`.
3. Preencha o objeto de config (ids, routePath, secoes e blocos).
4. Registre a aula em `src/data/aulas/index.js`.
5. Crie uma rota em `src/pages/<rota>.jsx` usando `AulaPageTemplate`.
6. Rode `npm run build` para validar.

## Regras de coerencia (validadas automaticamente)

- `aulaId` e `routePath` obrigatorios e sem duplicidade.
- `routePath` deve iniciar com `/`.
- `progressoLinks[].id` deve ser unico.
- Todo `sectionMeta.<key>.id` deve existir em `progressoLinks`.
- Toda key de `sectionOrder` deve existir em `sectionMeta`.
- Toda key de `sectionMeta` deve existir em `sectionBlocks`.
- Blocos aceitos: `paragraph` (com `text`) e `image` (com `src` e `alt`).

Se alguma regra falhar, o build quebra para evitar inconsistencias em producao.
