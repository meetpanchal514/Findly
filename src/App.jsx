import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PostItem from './pages/PostItem'
import ViewItems from './pages/ViewItems'
import RoleSelect from './pages/RoleSelect'
import Claims from './pages/Claims'
import { RoleProvider, useRole } from './context/RoleContext'

/* Guard components */
const PosterOnly = ({ children }) => {
  const { role } = useRole()
  const loc = useLocation()
  if (role !== 'poster') return <Navigate to="/view" state={{ from: loc }} replace />
  return children
}

function AppInner() {
  const [lostItems, setLostItems] = useState([])

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/items')
      setLostItems(response.data)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const addItem = async (newItem) => {
    try {
      const response = await axios.post('http://localhost:5000/items', newItem)
      setLostItems(prev => [response.data, ...prev])
    } catch (error) {
      console.error('Error adding item:', error)
    }
  }

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`)
      setLostItems(prev => prev.filter(item => item._id !== id))
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/post" element={<PosterOnly><PostItem addItem={addItem} /></PosterOnly>} />
        <Route path="/view" element={<ViewItems items={lostItems} deleteItem={deleteItem} refresh={fetchItems} />} />
        <Route path="/claims" element={<PosterOnly><Claims /></PosterOnly>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  )
}

export default function App() {
  return (
    <RoleProvider>
      <AppInner />
    </RoleProvider>
  )
}
