import { useEffect } from 'react'

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
    const setup = () => {
      stop()
      if (media.matches || !('IntersectionObserver' in window)) return
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer?.unobserve(entry.target)
          const photo = entry.target.matches('[data-reveal="foto"]')
          const animation = entry.target.animate(photo ? [
            { clipPath: 'inset(5% 0 0 0 round 80px 0 0 0)', opacity: .65, transform: 'translateY(18px)' },
            { clipPath: 'inset(0% 0 0 0 round 0px)', opacity: 1, transform: 'translateY(0)' },
          ] : [
            { opacity: .5, transform: 'translateY(16px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: photo ? 850 : 600, easing: 'cubic-bezier(.16,1,.3,1)' })
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        }
      }, { threshold: .1 })
      document.querySelectorAll('[data-reveal], .secao__cabeca, .estudio__texto, .portfolio__corpo, .contato__acoes').forEach((el) => observer?.observe(el))
    }
    setup()
    media.addEventListener('change', setup)
    return () => { stop(); media.removeEventListener('change', setup) }
  }, [])
  return null
}
