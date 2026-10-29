import { useEffect, useRef, useState } from 'react'
import { contato, marca, navegacao } from '../data/content'
import { Icon } from './Icon'

export function Header() {
  const [aberto, setAberto] = useState(false)
  const botao = useRef<HTMLButtonElement>(null)
  const painel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!aberto) return
    painel.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setAberto(false)
      botao.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [aberto])

  return (
    <header className="topo">
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <div className="topo__barra">
        <a className="topo__marca" href="#inicio" aria-label={`${marca.nome} ${marca.complemento}, início`}>
          <span className="topo__nome">{marca.nome}</span>
          <span className="topo__comp">{marca.complemento}</span>
        </a>
        <nav className="topo__nav" aria-label="Seções">
          {navegacao.map((item) => (
            <a key={item.href} href={item.href}>{item.rotulo}</a>
          ))}
        </nav>
        <a className="topo__cta" href={contato.whatsapp} target="_blank" rel="noopener noreferrer">
          Conversar
        </a>
        <button
          ref={botao}
          className="topo__menu"
          type="button"
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((v) => !v)}
        >
          <Icon name={aberto ? 'close' : 'menu'} size={22} />
          <span className="sr">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
        </button>
      </div>
      <div id="menu-movel" ref={painel} className="topo__painel" hidden={!aberto}>
        <nav aria-label="Seções">
          {navegacao.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setAberto(false)}>{item.rotulo}</a>
          ))}
        </nav>
        <a className="botao botao--tinta" href={contato.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setAberto(false)}>
          <Icon name="message" /> Conversar pelo WhatsApp
        </a>
      </div>
    </header>
  )
}
