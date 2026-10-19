import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Origin } from './components/Origin'
import { Timeline } from './components/Timeline'
import { Customs } from './components/Customs'
import { Symbols } from './components/Symbols'
import { Cinema } from './components/Cinema'
import { Footer } from './components/Footer'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ClickTreats } from './components/Ghosts'
import { ScrollProgress } from './components/ScrollFX'

export default function App() {
  return (
    <LazyMotion strict features={domAnimation}>
    <div className="grain min-h-screen bg-ink">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Origin />
        <Timeline />
        <Customs />
        <Symbols />
        <Cinema />
      </main>
      <Footer />
      <ClickTreats />
    </div>
    </LazyMotion>
  )
}
