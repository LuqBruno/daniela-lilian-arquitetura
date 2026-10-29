import { useEffect, useRef, useState } from 'react'
import { conceito, heroVideo } from '../data/assets'
import { contato, hero, marca } from '../data/content'
import { Icon } from './Icon'
import { Picture } from './Picture'

// Lâminas curvas inspiradas no living com painéis de madeira (ref-08), em viewBox 0–100 esticado.
// Topo vertical, base que se abre para a esquerda, como as peças do repertório.
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

export function Hero() {
  const img = useRef<HTMLImageElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [pronta, setPronta] = useState(false)
  // Vídeo só com movimento permitido e sem economia de dados; o estudo estático continua como pôster.
  const [comVideo, setComVideo] = useState(false)
  const [rodando, setRodando] = useState(false)
  const [pausado, setPausado] = useState(false)

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

  useEffect(() => {
    const conexao = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (matchMedia('(prefers-reduced-motion: no-preference)').matches && !conexao?.saveData) setComVideo(true)
  }, [])

  // Começa depois que as lâminas abrem; pausa fora da tela para não gastar bateria.
  useEffect(() => {
    const v = video.current
    if (!comVideo || !pronta || !v) return
    if (!v.src) v.src = matchMedia('(min-width: 960px)').matches ? heroVideo.desktop : heroVideo.movel
    const observador = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !pausado) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.2 })
    observador.observe(v)
    return () => observador.disconnect()
  }, [comVideo, pronta, pausado])

  const alternar = () => {
    const v = video.current
    if (!v) return
    if (pausado) { setPausado(false); v.play().catch(() => {}) }
    else { setPausado(true); v.pause() }
  }

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
          img={conceito}
          sizes="(min-width: 960px) 58vw, 100vw"
          prioridade
          ref={img}
          className="hero__img"
        />
        {comVideo && (
          <video
            ref={video}
            className={`hero__video${rodando ? ' is-rodando' : ''}`}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setRodando(true)}
          />
        )}
        <svg className="hero__laminas" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="hero__borda" d={BORDA} />
          {laminas.map((l) => (
            <path key={l.d} className="lamina" d={l.d} style={{ animationDelay: `${l.atraso}ms` }} />
          ))}
        </svg>
        <figcaption className="rotulo-midia">{conceito.rotulo}</figcaption>
        {comVideo && rodando && (
          <button type="button" className="hero__pausa" onClick={alternar} aria-pressed={pausado}>
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              {pausado ? <path d="M8 5v14l11-7Z" fill="currentColor" /> : <path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" />}
            </svg>
            <span className="sr">{pausado ? 'Reproduzir animação' : 'Pausar animação'}</span>
          </button>
        )}
      </figure>
    </section>
  )
}
