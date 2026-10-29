import { contato, portfolio } from '../data/content'
import { Icon } from './Icon'
import { ambientes } from '../data/assets'
import { Picture } from './Picture'

/** Fotografias do perfil na prévia local, com acesso direto às fontes originais. */
export function Portfolio() {
  return (
    <section id="projetos" className="portfolio" aria-labelledby="portfolio-titulo">
      <p className="indice">03 — Portfólio</p>
      <div className="portfolio__corpo">
        <h2 id="portfolio-titulo">{portfolio.titulo}</h2>
        <div>
          <p className="portfolio__texto">{portfolio.texto}</p>
          <a className="link-seta" href={contato.instagram} target="_blank" rel="noopener noreferrer">
            {portfolio.link} <Icon name="arrow-up-right" size={18} />
          </a>
        </div>
      </div>
      <div className="portfolio__imagens">
        {ambientes.map((ambiente) => (
          <figure className="portfolio__projeto" key={ambiente.fonte} data-reveal="foto">
            <a className="portfolio__foto" href={ambiente.fonte} target="_blank" rel="noopener noreferrer" aria-label={`${ambiente.titulo} Ver publicação original no Instagram`}>
              <Picture img={ambiente.img} sizes="(min-width: 960px) 48vw, 100vw" />
              <span className="portfolio__abrir" aria-hidden="true"><Icon name="arrow-up-right" size={22} /></span>
            </a>
            <figcaption>{ambiente.titulo}<span>Publicado no perfil do escritório</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
