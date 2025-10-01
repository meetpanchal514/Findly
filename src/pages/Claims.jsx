import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useRole } from '../context/RoleContext'

export default function Claims() {
  const { role } = useRole()
  const nav = useNavigate()
  const [params] = useSearchParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (role !== 'poster') {
      alert('Only posters can view/manage claims.')
      nav('/view')
      return
    }
    const fetch = async () => {
      const res = await axios.get('http://localhost:5000/items')
      setItems(res.data)
    }
    fetch()
  }, [role, nav])

  const updateStatus = async (itemId, claimId, status) => {
    await axios.patch(`http://localhost:5000/items/${itemId}/claims/${claimId}`, { status })
    setItems(items => items.map(it => it._id === itemId
      ? { ...it, claims: it.claims.map(c => c._id === claimId ? { ...c, status } : c) }
      : it
    ))
  }

  const filterItemId = params.get('item') // optional focus
  const list = filterItemId ? items.filter(i => i._id === filterItemId) : items

  return (
    <section className="min-h-screen pt-24 p-4 container mx-auto max-w-5xl">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-6">Claims</h2>
      {list.map(item => (
        <div key={item._id} className="card mb-6">
          <h3 className="text-xl font-semibold text-[var(--text-primary)]">{item.name}</h3>
          <p className="text-[var(--text-secondary)] mb-3">{item.description}</p>
          {item.claims?.length ? (
            <div className="space-y-3">
              {item.claims.map(c => (
                <div key={c._id} className="glass p-3 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="font-medium text-[var(--text-primary)]">{c.claimerName}</div>
                    <div className="text-[var(--text-secondary)] text-sm">{c.claimerContact}</div>
                    {c.message && <div className="text-sm mt-1">{c.message}</div>}
                    <div className="text-sm mt-1">Status: <span className="font-semibold">{c.status}</span></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => updateStatus(item._id, c._id, 'approved')} className="glass px-4 py-2 rounded-lg hover:bg-[var(--accent)]/20">Approve</button>
                    <button onClick={() => updateStatus(item._id, c._id, 'declined')} className="glass px-4 py-2 rounded-lg hover:bg-[var(--accent)]/20">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[var(--text-secondary)]">No claims yet.</div>
          )}
        </div>
      ))}
    </section>
  )
}
