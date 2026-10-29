// Exporta apenas as três fotografias solicitadas para a prévia, preservando originais.
const path = require('node:path')
const fs = require('node:fs/promises')
const sharp = require('C:/Users/itzlu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')
const root = path.resolve(__dirname, '..', '..')
const fotos = [
  ['ref-06-escritorio.jpg', 'escritorio-arquitetas', [640, 1024, 1600]],
  ['ref-04-living.jpg', 'ambiente-living', [480, 800, 1200]],
  ['ref-02-detalhe-madeira-pedra.jpg', 'ambiente-detalhe', [480, 800, 1200]],
]
;(async () => {
  const registros = []
  for (const [original, nome, larguras] of fotos) {
    for (const largura of larguras) {
      for (const formato of ['webp', 'avif']) {
        const alvo = path.join(root, 'site/public/media', `${nome}-${largura}.${formato}`)
        await sharp(path.join(root, 'materiais/referencias', original)).rotate()
          .resize({ width: largura, withoutEnlargement: true })
          .toFormat(formato, { quality: formato === 'avif' ? 58 : 83 }).toFile(alvo)
        registros.push({ file: path.relative(root, alvo), original, bytes: (await fs.stat(alvo)).size })
      }
    }
  }
  await fs.writeFile(path.join(root, 'materiais/fotos-previa-2026-10-29.json'), JSON.stringify({
    decisao: 'Pedido de Bruno em 29/10/2026: incluir fotos reais das arquitetas e do Instagram na prévia local. Não equivale a autorização do escritório para produção pública.',
    transformacao: 'Redimensionamento e conversão, sem IA, retoque de pessoas ou ampliação.',
    arquivos: registros,
  }, null, 2))
  console.log(`${registros.length} versões responsivas exportadas.`)
})().catch((e) => { console.error(e); process.exit(1) })
