# BASE Movement — Direção Criativa

## Brief
Criar um website que as pessoas recordem 30 segundos depois de o visitar.
Experimental, premium, cinematográfico. Sem layout de loja tradicional, sem
grelhas de produtos, mantendo todo o catálogo intacto (nomes, descrições,
categorias, referências e imagens — modelo 100% orçamento, sem preços).

## Os cinco conceitos explorados

### 1. O MOVIMENTO — a sessão cinematográfica ✦ (escolhido)
O site é uma sessão de Pilates: um único scroll narrativo com Prólogo,
Capítulos I–VI e Epílogo. Cada categoria de equipamento é um capítulo com
numeral gigante contornado, tipografia editorial a 8–11vw, fotografia
assimétrica anotada com cotas (blueprint) e a série completa em filmstrip
horizontal arrastável. Interlúdios: manifesto tipográfico, a matéria
(bandas de material que expandem), ticker de contextos, citações gigantes.

### 2. ATELIER — a casa das matérias
O catálogo reorganizado por matéria (Madeira / Aço / Estofo / Cortiça).
Macro-texturas full-bleed; os produtos emergem da sua matéria-prima como
numa casa de materiais Herman Miller.

### 3. GALERIA — o museu do movimento
Produtos como escultura: scroll horizontal, plintos digitais, legendas de
exposição (REF, dimensões), salas por categoria, cursor-lupa.

### 4. BLUEPRINT — o poema de engenharia
Estética de desenho técnico: cotas animadas sobre as fotografias, fichas
técnicas como arte, numerais enormes, disciplina Rams/Leica.

### 5. ESTÚDIO INFINITO — a sala contínua
Uma única sala em creme atravessada por scroll; arcos como portais entre
categorias; luz ambiente que muda com a profundidade da página.

## Porquê "O Movimento"
- Nasce do próprio nome da marca — BASE *Movement*: o site move-se.
- Dá uma espinha narrativa capaz de suportar **todo** o catálogo (36
  equipamentos + 54 acessórios) sem nunca recorrer a uma grelha.
- Absorve o melhor dos restantes conceitos: legendas de museu (3), cotas
  blueprint (4) e o motivo do estúdio contínuo/luz viva (5).
- Exequível sem dependências externas (zero libraries), preservando a
  performance e o SEO existentes.

## Sistema da experiência
- **Prólogo** — fotografia da marca full-bleed, headline serifada com
  palavra em itálico dourado, "Respire." com linha que respira, parallax
  ao ponteiro e ao scroll.
- **Manifesto** — "Precisão. Silêncio. Movimento." em três tratamentos
  (cheio / itálico dourado / contorno), gradiente vivo animado por trás,
  índice editorial 01–04 em linhas com hover.
- **Capítulos I–VI** — numeral gigante contornado que deriva com o scroll
  (data-speed), fotografia com cota de dimensões em pílula glass, título
  serifado enorme, tagline em itálico, filmstrip horizontal com todos os
  modelos (drag-to-scroll, hint "Arraste — N modelos").
- **A Matéria** — secção escura com bandas de Estofo/Madeira/Metal que
  expandem em altura no hover, com as opções de personalização.
- **Ticker** — contextos ("Estúdios de Pilates — Hotéis — …") em texto
  contornado gigante em marquee infinito; pára no hover.
- **Vozes** — citações gigantes em carrossel snap horizontal.
- **Notas Finais** — FAQ em acordeão minimal.
- **Epílogo** — céu escuro com gradiente dourado vivo, headline gigante,
  CTA magnético.
- **Microinterações** — cursor personalizado (ponto + anel com rótulos
  "Arraste"/"Ver"), botões magnéticos, rail de capítulos fixo (✳ I–VI ∞)
  com estado ativo, reveals em máscara linha a linha.
- **Acessibilidade** — tudo degradável: `prefers-reduced-motion` desliga
  cursor, parallax, marquee e scrub; conteúdo 100% visível sem JavaScript.

## Onde vive no código
- `src/assets/css/experience.css` — toda a camada cinematográfica.
- `src/templates/pages/home.mjs` — a narrativa da homepage.
- `src/assets/js/main.js` — cursor, scrub, filmstrips, rail, magnéticos.
- Páginas de produto e acessórios usam filmstrips (sem grelhas em todo o site).
