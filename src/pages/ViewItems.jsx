// E:\nir2\findly\src\pages\ViewItems.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import clsx from 'clsx'
import axios from 'axios'
import { useRole } from '../context/RoleContext'
import { useNavigate } from 'react-router-dom'

export default function ViewItems({ items, deleteItem, refresh }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const itemsPerPage = 6
  const { role } = useRole()
  const nav = useNavigate()

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDark(mq.matches)
    const handler = (e) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const handlePageClick = (data) => setCurrentPage(data.selected)

  const offset = currentPage * itemsPerPage
  const currentItems = items.slice(offset, offset + itemsPerPage)
  const pageCount = Math.max(1, Math.ceil(items.length / itemsPerPage))

  const requestClaim = async (itemId) => {
    const claimerName = prompt('Your name:')
    if (!claimerName) return
    const claimerContact = prompt('Your contact (email/phone):')
    if (!claimerContact) return
    const message = prompt('Message to poster (optional):') || ''
    try {
      await axios.post(`http://localhost:5000/items/${itemId}/claim`, {
        claimerName,
        claimerContact,
        message,
      })
      alert('Claim request sent to the poster ✅')
      refresh?.()
    } catch (e) {
      console.error(e)
      alert('Failed to send claim request.')
    }
  }

  return (
    <motion.section
      className={clsx('min-h-screen stack-under-nav p-4', { dark: isDark })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sticky, centered Lost Items bar directly under the navbar */}
      <div className="lostbar-sticky">
        <div className="mx-auto max-w-6xl">
          <div className="lostbar glass rounded-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center">
              Lost Items
            </h2>
          </div>
        </div>
      </div>

      {/* Cards start BELOW the bar; grid stays centered and 3-up on lg */}
      <div className="mx-auto max-w-6xl cards-after-bar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <motion.div
              key={item._id}
              className="card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                {item.name}
              </h3>
              <p className="text-[var(--text-secondary)] mb-2">{item.description}</p>
              <p className="text-[var(--text-secondary)] mb-2">Location: {item.location}</p>
              <p className="text-[var(--text-secondary)] mb-4">Contact (poster): {item.contact}</p>

              <div className="flex gap-2 flex-wrap">
                {role === 'claimer' && (
                  <button
                    onClick={() => requestClaim(item._id)}
                    className="glass px-4 py-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--accent)]/20 transition-all duration-300"
                  >
                    Request to Claim
                  </button>
                )}

                {role === 'poster' && (
                  <>
                    <button
                      onClick={() => nav(`/claims?item=${item._id}`)}
                      className="glass px-4 py-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--accent)]/20"
                    >
                      View Claims ({item.claims?.length || 0})
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="glass px-4 py-2 rounded-lg text-[var(--text-primary)] hover:bg-[var(--accent)]/20"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-6">
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        )}
      </div>
    </motion.section>
  )
}
