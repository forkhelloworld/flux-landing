import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Modules from '@/components/Modules'
import UserJourney from '@/components/UserJourney'
import Waitlist from '@/components/Waitlist'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Modules />
      <UserJourney />
      <Waitlist />
      <Footer />
    </main>
  )
}

