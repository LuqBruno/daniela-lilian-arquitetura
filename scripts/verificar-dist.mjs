// Confere o bundle publicado contra as regras da prévia (privacidade, autoria, contato, links).
import { readFile, readdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const site = fileURLToPath(new URL('..', import.meta.url))
const dist = path.join(site, 'dist')
const materiais = path.join(site, '..', 'materiais')
const falhas = []
const ok = (cond, msg) => { if (!cond) falhas.push(msg) }

async function arquivos(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    out.push(...(e.isDirectory() ? await arquivos(p) : [p]))
  }
  return out
}

const html = await readFile(path.join(dist, 'index.html'), 'utf8')
const todos = (await arquivos(dist)).map((p) => path.relative(dist, p).replaceAll('\\', '/'))

// Privacidade e escopo do bundle
ok(/<meta name="robots" content="noindex,nofollow"/.test(html), 'meta robots noindex,nofollow ausente')
ok(!todos.some((f) => /(^|\/)ref-\d|referencias|instagram\.(png|jpe?g)/i.test(f)), 'referência interna copiada para dist')
ok(!todos.some((f) => /\.(md|json|py|png)$/i.test(f)), `documento/original interno em dist: ${todos.filter((f) => /\.(md|json|py|png)$/i.test(f)).join(', ')}`)
ok(!/googletagmanager|gtag\(|fbq\(|analytics/i.test(html), 'rastreamento encontrado')
ok(!/fonts\.googleapis|fonts\.gstatic/.test(html), 'fonte externa em tempo de execução')

// Conteúdo pré-renderizado (funciona sem JS)
ok((html.match(/<h1[\s>]/g) || []).length === 1, 'deve haver exatamente um h1')
ok(html.includes('Arquitetura') && html.includes('com essência.'), 'h1 não pré-renderizado')
ok(html.includes('Conceito de apresentação desenvolvido por Bruno Luque. Prévia não oficial.'), 'aviso de prévia ausente')
ok(html.includes('Estudo visual conceitual'), 'rótulo do conceito ausente')

// Contato: número público e mensagem escapada; nada de envio automático
const wa = [...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1].replaceAll('&amp;', '&'))
ok(wa.length >= 2, 'links de WhatsApp ausentes')
for (const link of wa) {
  const u = new URL(link)
  ok(u.pathname === '/5548999189192', `número inesperado: ${link}`)
  ok(u.searchParams.get('text') === 'Olá! Gostaria de conversar sobre um projeto de arquitetura e interiores.', `mensagem inesperada: ${link}`)
}

// Autoria: SVG idêntico ao canônico; licenças das fontes distribuídas
const logo = await readFile(path.join(dist, 'brand', 'logo-bruno-luque.svg'))
const canon = await readFile(path.join(materiais, 'branding', 'logo-bruno-luque.svg'))
ok(logo.equals(canon), 'logo de Bruno difere do canônico')
for (const f of ['fraunces-OFL.txt', 'manrope-OFL.txt']) ok(todos.includes(`fonts/${f}`), `licença ausente: ${f}`)

// Referências relativas resolvem dentro de dist
for (const m of html.matchAll(/\b(?:src|href|srcset|imagesrcset)="([^"]+)"/g)) {
  for (const parte of m[1].split(',')) {
    const ref = parte.trim().split(/\s+/)[0]
    if (!ref || /^(https?:|#|mailto:|tel:|data:)/.test(ref)) continue
    const alvo = path.join(dist, decodeURI(ref.split(/[?#]/)[0]))
    ok(await stat(alvo).then(() => true, () => false), `referência quebrada: ${ref}`)
  }
}

const tamanho = (await Promise.all(todos.map((f) => stat(path.join(dist, f)).then((s) => s.size)))).reduce((a, b) => a + b, 0)
if (falhas.length) {
  console.error(`verificar-dist: ${falhas.length} falha(s)\n- ${falhas.join('\n- ')}`)
  process.exit(1)
}
console.log(`verificar-dist: ok · ${todos.length} arquivos · ${(tamanho / 1024).toFixed(0)} KB em dist`)
