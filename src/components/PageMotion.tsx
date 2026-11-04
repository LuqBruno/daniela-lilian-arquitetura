import { useEffect } from 'react'

const EASE = 'cubic-bezier(.16,1,.3,1)'

// Fotos entram por máscara curva; títulos sobem por uma linha de corte; o resto surge em sequência.
const ALVOS = [
  '[data-reveal]',
  '.secao__cabeca > *',
  '.estudio__texto > *',
  '.portfolio__cabeca > *',
  '.contato .indice', '.contato h2', '.contato__texto', '.contato__acoes',
].join(', ')

/** Animações progressivas: HTML visível sem JS; observadores e animações limpos no unmount. */
export function PageMotion() {
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    const animations = new Set<Animation>()
    const stop = () => {
      observer?.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
    }
    const quadros = (el: Element): Keyframe[] => {
      if (el.matches('[data-reveal="foto"]')) return [
        { clipPath: 'inset(5% 0 0 0 round 80px 0 0 0)', opacity: .65, transform: 'translateY(18px)' },
        { clipPath: 'inset(0% 0 0 0 round 0px)', opacity: 1, transform: 'translateY(0)' },
      ]
      if (el.matches('h2')) return [
        { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(28px)' },
        { clipPath: 'inset(0 0 -20% 0)', transform: 'translateY(0)' },
      ]
      return [
        { opacity: 0, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ]
    }
    const setup = () => {
      stop()
      if (media.matches || !('IntersectionObserver' in window)) return
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          observer?.unobserve(el)
          // Atraso: explícito (data-atraso) ou pela posição entre irmãos, para entrar em sequência.
          const irmaos = el.parentElement ? Array.from(el.parentElement.children) : []
          const atraso = el.dataset.atraso ? Number(el.dataset.atraso) : Math.min(irmaos.indexOf(el), 4) * 90
          const duracao = el.matches('[data-reveal="foto"]') ? 850 : el.matches('h2') ? 780 : 600
          const animation = el.animate(quadros(el), { duration: duracao, delay: atraso, easing: EASE, fill: 'backwards' })
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        }
      }, { threshold: .1 })
      document.querySelectorAll(ALVOS).forEach((el) => observer?.observe(el))
    }
    setup()
    media.addEventListener('change', setup)
    return () => { stop(); media.removeEventListener('change', setup) }
  }, [])
  return null
}
