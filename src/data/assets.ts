// Conceitos identificados como ilustração. Fotografias do perfil incluídas na prévia
// por pedido explícito de Bruno em 29/10/2026; fontes em materiais/LICENCAS.md.

export type Imagem = {
  base: string // caminho sem largura/extensão, relativo ao index publicado
  larguras: readonly number[]
  largura: number
  altura: number
  alt: string
  rotulo?: string // aviso exibido junto da mídia
}

export const conceito: Imagem = {
  base: './media/ia-materia-luz-conceitual',
  larguras: [480, 768, 1200, 1600],
  largura: 1600,
  altura: 900,
  alt: 'Ilustração conceitual: lâminas curvas de madeira sobre base de travertino, ao lado de vidro canelado, com luz natural na parede clara.',
  rotulo: 'Estudo visual conceitual',
}

/** Loop do hero: o mesmo estudo animado no Higgsfield (Kling 3.0), ida e volta, sem som. */
export const heroVideo = {
  desktop: './media/ia-hero-luz-conceitual-1600.mp4',
  movel: './media/ia-hero-luz-conceitual-960.mp4',
} as const

export const croqui: Imagem = {
  base: './media/ia-croqui-conceitual',
  larguras: [640, 1024],
  largura: 1024,
  altura: 688,
  alt: 'Ilustração conceitual de um croqui a lápis e aquarela: lâminas curvas de madeira nascendo de um banco de pedra, sobre papel claro.',
  rotulo: 'Croqui conceitual',
}

export const srcset = (img: Imagem, formato: 'avif' | 'webp') =>
  img.larguras.map((w) => `${img.base}-${w}.${formato} ${w}w`).join(', ')

export const arquitetas: Imagem = {
  base: './media/escritorio-arquitetas', larguras: [640, 1024, 1600],
  largura: 1600, altura: 1066,
  alt: 'Daniela Viana e Lilian Maravai juntas na entrada do escritório, junto à fachada com seus nomes.',
}

export const ambientes = [
  {
    img: { base: './media/ambiente-living', larguras: [480, 800, 1200], largura: 1601, altura: 2130,
      alt: 'Living publicado pelo escritório, com sofá claro, madeira natural, pedra e jantar integrado.' } as Imagem,
    titulo: 'Madeira, pedra e convivência.',
    fonte: 'https://www.instagram.com/danielilianarquitetura/p/DeSXQuQAV63/',
  },
  {
    img: { base: './media/ambiente-detalhe', larguras: [480, 800, 1200], largura: 1216, altura: 1600,
      alt: 'Detalhe de bar publicado pelo escritório, com marcenaria de madeira, pedra clara e luz indireta.' } as Imagem,
    titulo: 'O cuidado está no detalhe.',
    fonte: 'https://www.instagram.com/danielilianarquitetura/p/DeiIJUKxw-a/',
  },
] as const

/** Matéria e luz: uma imagem própria por material, cada uma numa lâmina. */
export type Material = { id: string; nome: string; verbo: string; texto: string; img: Imagem }

const estudo = (id: string, alt: string): Imagem => ({
  base: `./media/ia-${id}-conceitual`,
  larguras: [480, 720, 896],
  largura: 896,
  altura: 1120,
  alt,
  rotulo: 'Estudo visual conceitual',
})

export const materiais: readonly Material[] = [
  {
    id: 'madeira',
    nome: 'Madeira',
    verbo: 'acolhe',
    texto: 'Veios, curvas e encaixes que aproximam o espaço de quem vive nele.',
    img: estudo('madeira', 'Ilustração conceitual: lâminas de madeira com cantos arredondados e frisos de bronze, sob luz lateral quente.'),
  },
  {
    id: 'pedra',
    nome: 'Pedra',
    verbo: 'traz presença',
    texto: 'Travertino de textura natural, peso e permanência na medida certa.',
    img: estudo('pedra', 'Ilustração conceitual: bloco de travertino com poros naturais e sombra listrada da luz da tarde.'),
  },
  {
    id: 'luz',
    nome: 'Luz',
    verbo: 'revela os detalhes',
    texto: 'Luz natural filtrada por vidro canelado, desenhando a parede ao longo do dia.',
    img: estudo('luz', 'Ilustração conceitual: parede clara banhada por luz quente, filtrada por vidro canelado bronze.'),
  },
]
