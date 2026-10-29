# Prévia — Daniela e Lilian Arquitetura

Prévia comercial não oficial (v1.1, 29/10/2026). Vite + React + TypeScript, pré-renderizada no build:
o HTML chega pronto (útil sem JS) e o cliente só hidrata.

## Comandos (dentro de `site/`)

- `npm run dev` — desenvolvimento em http://127.0.0.1:3036
- `npm run check` — tipos + build + `verificar-dist` (noindex, bundle sem referências internas, WhatsApp, logo canônico, licenças, links)
- `npm run preview` — serve `dist/` em http://127.0.0.1:3036 (configuração `daniela-lilian` no launch.json)
- Pela raiz da operação: `op verificar Daniela_e_Lilian_Arquitetura` (checa e captura `site/dist`)

## Organização

- `src/data/content.ts` — textos (rascunho do COPY.md) e contato.
- `src/data/assets.ts` — conceitos, vídeo e fotografias do perfil incluídas por pedido de Bruno em 29/10; fontes em `../materiais/LICENCAS.md`.
- `src/components/` — Header, Hero, MaterialStory (lâminas), Studio (retrato conjunto + assinatura), Portfolio (duas imagens reais), Contact e PageMotion.
- `public/media` — estudo conceitual, loop do hero (1600/960 px), estudos de madeira/pedra/luz e croqui, todos conceituais;
  `public/fonts` — Fraunces (títulos) e Manrope em WOFF2 + OFL; `public/brand` — monograma de Bruno.
- `materiais/referencias` não entra no bundle (conferido por `verificar-dist`).

## Seções e movimento

1. Hero: sete lâminas curvas abrem uma vez sobre o estudo; depois entra o loop de luz (Higgsfield/Kling, 10 s ida e volta,
   sem som). Vídeo só com movimento permitido e sem economia de dados; carrega após a abertura, pausa fora da tela e tem botão de pausa.
2. Matéria e luz: três lâminas (madeira, pedra, luz), cada uma com o próprio estudo; a escolhida se abre (`accordion`).
3. Escritório: croqui conceitual, frase publicada e assinatura das duas arquitetas.
4. Portfólio: faixa honesta de curadoria com link para o Instagram oficial.
5. Contato: WhatsApp e Instagram.

Na v1.1, o croqui do escritório foi substituído pelo retrato real da dupla e o portfólio ganhou living/detalhe com links diretos aos posts. Cópia de apoio do portfólio atualizada para refletir as imagens. Layout, hero, contato e navegação preservados. `PageMotion.tsx` faz entradas por Web Animations API com observadores limpos e resposta a movimento reduzido em tempo real. Linha de continuidade usa scroll timeline quando suportado. Sem dependências novas. Fotografias são carregadas sob demanda em AVIF/WebP. O acervo original não é distribuído.

`node scripts/revisar-fotos.cjs`: revisão com Edge/Playwright do runtime local; capturas/resultados em `qa-2026-10-29`. Apenas prévia local; aprovação de publicação e crédito dos fotógrafos pendentes.

Sem JS ou com movimento reduzido: estado final imediato, sem vídeo. Se o JS não confirmar em 3 s, os estados iniciais são removidos.

## Trocar por materiais aprovados

1. Comprimir originais autorizados (AVIF/WebP nas larguras do `srcset`) e colocar em `public/media/`.
2. Portfólio: com fotos e fichas aprovadas, trocar a faixa de `Portfolio.tsx` por casos reais (foto, ficha, crédito do fotógrafo).
3. Retrato: acrescentar `<Picture>` com a foto aprovada em `Studio.tsx`, ao lado da assinatura.
4. Logo oficial: substituir o nome em texto do `Header` e incluir favicon (hoje vazio de propósito).
5. Registrar autoria em `materiais/ASSETS.json` e rodar `npm run check`.
