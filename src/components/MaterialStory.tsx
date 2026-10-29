import { useState, type CSSProperties } from 'react'
import { materiais } from '../data/assets'
import { materia } from '../data/content'
import { Picture } from './Picture'

const numero = (i: number) => String(i + 1).padStart(2, '0')

/**
 * Matéria e luz em lâminas: cada material é um painel vertical com o próprio estudo conceitual;
 * o escolhido se abre e os outros recuam como lâminas de madeira. No celular, vira lista empilhada.
 */
export function MaterialStory() {
  const [ativo, setAtivo] = useState(0)

  return (
    <section id="materia" className="secao materia" aria-labelledby="materia-titulo">
      <div className="secao__cabeca">
        <p className="indice">01 — Matéria e luz</p>
        <h2 id="materia-titulo">{materia.titulo}</h2>
        <p className="secao__apoio">{materia.texto}</p>
      </div>

      <div className="laminas">
        {materiais.map((m, i) => {
          const aberto = i === ativo
          return (
            <article key={m.id} className={`painel${aberto ? ' is-aberto' : ''}`} style={{ '--i': i } as CSSProperties}>
              <h3 className="painel__titulo">
                <button
                  type="button"
                  id={`${m.id}-botao`}
                  aria-expanded={aberto}
                  aria-controls={`${m.id}-conteudo`}
                  onClick={() => setAtivo(i)}
                >
                  <span className="painel__num">{numero(i)}</span>
                  <span className="painel__nome">{m.nome}</span>
                  <span className="painel__verbo">{m.verbo}</span>
                </button>
              </h3>
              <div
                id={`${m.id}-conteudo`}
                className="painel__conteudo"
                role="region"
                aria-labelledby={`${m.id}-botao`}
                hidden={!aberto}
              >
                <figure className="painel__materia">
                  <Picture img={m.img} sizes="(min-width: 960px) 36vw, 92vw" className="painel__img" />
                  <figcaption className="rotulo-midia">{m.img.rotulo}</figcaption>
                </figure>
                <div className="painel__texto">
                  <p className="painel__frase">{m.nome} <em>{m.verbo}.</em></p>
                  <p>{m.texto}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
