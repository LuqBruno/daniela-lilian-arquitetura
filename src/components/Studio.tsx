import { arquitetas } from '../data/assets'
import { escritorio, marca } from '../data/content'
import { Picture } from './Picture'

/** Retrato real conjunto; não atribuir nomes por posição sem confirmação. */
export function Studio() {
  return (
    <section id="escritorio" className="secao estudio" aria-labelledby="estudio-titulo">
      <figure className="estudio__retrato" data-reveal="foto">
        <div className="estudio__foto">
          <Picture img={arquitetas} sizes="(min-width: 960px) 52vw, 100vw" className="estudio__img" />
        </div>
        <figcaption>Daniela Viana & Lilian Maravai <span>Arquitetura e interiores</span></figcaption>
      </figure>

      <div className="estudio__texto">
        <p className="indice">02 — Escritório</p>
        <h2 id="estudio-titulo">{escritorio.titulo}</h2>
        <p className="secao__apoio">{escritorio.texto}</p>

        <blockquote className="estudio__frase">
          <p>{escritorio.frase}</p>
          <footer>{escritorio.fraseFonte}</footer>
        </blockquote>

        <div className="estudio__assinatura">
          {marca.assinatura.map((n) => {
            const [nome, ...sobrenome] = n.split(' ')
            return (
              <p key={n} className="estudio__nome">
                {nome} <span>{sobrenome.join(' ')}</span>
              </p>
            )
          })}
          <p className="estudio__area">{marca.complemento} e interiores</p>
        </div>
      </div>
    </section>
  )
}
