import { useNavigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

const Card = ({ title, desc, onClick }) => (
  <button
    onClick={onClick}
    className="card hover:translate-y-[-4px] transition-transform w-full text-left"
  >
    <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-1">{title}</h3>
    <p className="text-[var(--text-secondary)]">{desc}</p>
  </button>
)

export default function RoleSelect() {
  const nav = useNavigate()
  const { setRole } = useRole()

  const choose = (r) => {
    setRole(r)
    nav('/')  // go home
  }

  return (
    <section className="min-h-screen pt-24 p-4 container mx-auto max-w-3xl">
      <div className="hero-glass mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Choose your access</h2>
        <p className="text-[var(--text-secondary)] mt-2">
          Posters can create & manage items. Claimers can only request to claim items.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card
          title="I'm a Poster"
          desc="Create listings, review claims, approve or decline."
          onClick={() => choose('poster')}
        />
        <Card
          title="I'm a Claimer"
          desc="Browse items and send claim requests to posters."
          onClick={() => choose('claimer')}
        />
      </div>
    </section>
  )
}
    