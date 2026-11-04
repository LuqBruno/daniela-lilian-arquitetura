import { useEffect, useRef, useState } from 'react'
import { ambientes } from '../data/assets'
import { contato, hero, marca } from '../data/content'
import { Icon } from './Icon'
import { Picture } from './Picture'

// Lâminas curvas de madeira (ref-08), em viewBox 0–100 esticado: a fotografia abre por fendas
// verticais e cede à leitura. Topo vertical, base que se abre para a esquerda.
const PASSO = 13.2
const LARGURA = 8.4
const ABERTURA = 10
const laminas = Array.from({ length: 7 }, (_, i) => {
  const x = 8 + i * PASSO
  const d = `M${x} -1H${x + LARGURA}V52Q${x + LARGURA} 90 ${x + LARGURA - ABERTURA} 101H${x - ABERTURA}Q${x} 90 ${x} 52Z`
  return { d, atraso: i * 45 }
})
// Borda fixa: a imagem termina numa curva, não num retângulo.
const BORDA = 'M-1 -1H7V50Q7 88 -1 101Z'

const living = ambientes[0].img

export function Hero() {
  const img = useRef<HTMLImageElement>(null)
  const [pronta, setPronta] = useState(false)

  useEffect(() => {
    const el = img.current
    if (!el) return
    let feito = false
    const marcar = () => { if (!feito) { feito = true; setPronta(true) } }
    // Abre as lâminas quando a imagem existe para ser revelada; nunca espera mais que 1,2 s.
    const limite = window.setTimeout(marcar, 1200)
    if (el.complete && el.naturalWidth) marcar()
    else el.decode().then(marcar, marcar)
    return () => window.clearTimeout(limite)
  }, [])

  return (
    <section id="inicio" className={`hero${pronta ? ' is-pronta' : ''}`} aria-labelledby="hero-titulo">
      <div className="hero__texto">
        <p className="hero__sobre">{marca.assinatura.join(' · ')}</p>
        <h1 id="hero-titulo" className="hero__titulo">
          {hero.titulo.map((linha, i) => (
            <span key={linha} className="linha"><span style={{ animationDelay: `${120 + i * 110}ms` }}>{linha}</span></span>
          ))}
        </h1>
        <p className="hero__apoio">{hero.apoio}</p>
        <div className="hero__acoes">
          <a className="botao botao--tinta" href={contato.whatsapp} target="_blank" rel="noopener noreferrer">
            <Icon name="message" /> {hero.cta}
          </a>
          <a className="link-seta" href="#materia">
            {hero.secundario} <Icon name="arrow-right" size={18} />
          </a>
        </div>
        <p className="hero__local"><Icon name="location" size={18} /> {contato.cidade} · {contato.alcance}</p>
      </div>

      <figure className="hero__materia">
        <Picture
          img={living}
          sizes="(min-width: 960px) 58vw, 100vw"
          prioridade
          ref={img}
          className="hero__img"
        />
        <svg className="hero__laminas" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="hero__borda" d={BORDA} />
          {laminas.map((l) => (
            <path key={l.d} className="lamina" d={l.d} style={{ animationDelay: `${l.atraso}ms` }} />
          ))}
        </svg>
        <figcaption className="rotulo-midia">Publicado pelo escritório</figcaption>
      </figure>
    </section>
  )
}
