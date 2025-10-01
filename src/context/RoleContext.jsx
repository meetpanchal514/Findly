import { createContext, useContext, useEffect, useState } from 'react'

const RoleContext = createContext({ role: 'claimer', setRole: () => {} })
export const useRole = () => useContext(RoleContext)

export const RoleProvider = ({ children }) => {
  const [role, setRoleState] = useState('claimer')

  useEffect(() => {
    const saved = localStorage.getItem('findly_role')
    if (saved) setRoleState(saved)
  }, [])

  const setRole = (r) => {
    setRoleState(r)
    localStorage.setItem('findly_role', r)
  }

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}
