import { avisoPrevia, contato, fechamento, marca } from '../data/content'
import { Icon } from './Icon'

export function Contact() {
  return (
    <>
      <section id="contato" className="contato" aria-labelledby="contato-titulo">
        <p className="indice">04 — Contato</p>
        <h2 id="contato-titulo">{fechamento.titulo}</h2>
        <p className="contato__texto">{fechamento.texto}</p>
        <div className="contato__acoes">
          <a className="botao botao--papel" href={contato.whatsapp} target="_blank" rel="noopener noreferrer">
            <Icon name="message" /> {fechamento.botao}
          </a>
          <a className="link-seta link-seta--claro" href={contato.instagram} target="_blank" rel="noopener noreferrer">
            {contato.instagramUsuario} <Icon name="arrow-up-right" size={18} />
          </a>
        </div>
        <p className="contato__local"><Icon name="location" size={18} /> {contato.cidade} · {contato.alcance}</p>
      </section>

      <footer className="rodape">
        <p className="rodape__marca">{marca.nome} {marca.complemento}</p>
        <p className="rodape__aviso">
          <img src="./brand/logo-bruno-luque.svg" alt="" width="22" height="30" />
          {avisoPrevia}
        </p>
      </footer>
    </>
  )
}
