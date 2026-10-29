import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MaterialStory } from './components/MaterialStory'
import { Portfolio } from './components/Portfolio'
import { Studio } from './components/Studio'
import { PageMotion } from './components/PageMotion'

export default function App() {
  return (
    <>
      <PageMotion />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <MaterialStory />
        <Studio />
        <Portfolio />
        <Contact />
      </main>
      {/* Marca de autoria da prévia (POLITICA-MARCA-DAGUA.md): SVG original, decorativa. */}
      <img className="marca-autoria" src="./brand/logo-bruno-luque.svg" alt="" aria-hidden="true" width="18" height="25" />
    </>
  )
}
