// Textos da prévia. Rascunho de 26/10/2026 (COPY.md), não aprovado pelo escritório.

const WHATSAPP = '5548999189192' // link público da bio, conferido em 26/10/2026
const MENSAGEM = 'Olá! Gostaria de conversar sobre um projeto de arquitetura e interiores.'

export const contato = {
  whatsapp: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`,
  instagram: 'https://www.instagram.com/danielilianarquitetura/',
  instagramUsuario: '@danielilianarquitetura',
  cidade: 'Criciúma/SC',
  alcance: 'Atendimento em todo o Brasil',
} as const

export const marca = {
  nome: 'Daniela e Lilian',
  complemento: 'Arquitetura',
  assinatura: ['Daniela Viana', 'Lilian Maravai'],
} as const

export const navegacao = [
  { href: '#materia', rotulo: 'Matéria e luz' },
  { href: '#escritorio', rotulo: 'Escritório' },
  { href: '#projetos', rotulo: 'Projetos' },
  { href: '#contato', rotulo: 'Contato' },
] as const

export const hero = {
  sobretitulo: 'Arquitetura e interiores',
  titulo: ['Arquitetura', 'com essência.'],
  apoio: 'Arquitetura e interiores em Criciúma, com atendimento em todo o Brasil.',
  cta: 'Conversar sobre meu projeto',
  secundario: 'Explorar matéria e luz',
} as const

export const materia = {
  titulo: 'A essência está nas escolhas.',
  texto: 'A madeira acolhe. A pedra traz presença. A luz revela os detalhes. É na relação entre esses elementos e a forma de viver que cada espaço encontra identidade.',
} as const

export const escritorio = {
  titulo: 'Do traço à matéria.',
  texto: 'Daniela Viana e Lilian Maravai conduzem projetos de arquitetura e interiores em Criciúma, com atendimento em todo o Brasil.',
  frase: 'Projetar é transformar.',
  fraseFonte: 'Peça publicada pelo escritório',
} as const

export const portfolio = {
  titulo: 'Projetos selecionados',
  texto: 'Ambientes e detalhes publicados pelo escritório. Madeira, pedra e luz se encontram em uma arquitetura que acolhe. Explore cada imagem na publicação original.',
  link: 'Ver projetos no Instagram',
} as const

export const fechamento = {
  titulo: 'Vamos conversar sobre o seu espaço?',
  texto: 'Conte o que você imagina para o seu projeto.',
  botao: 'Conversar pelo WhatsApp',
} as const

export const avisoPrevia = 'Conceito de apresentação desenvolvido por Bruno Luque. Prévia não oficial.'
