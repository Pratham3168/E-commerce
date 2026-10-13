import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import MobileMenu from '../components/layout/MobileMenu'
import Footer from '../components/layout/Footer'
import Toast from '../components/common/Toast'

export default function CustomerLayout({ state }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <><Navbar cartCount={state.cart.reduce((sum, item) => sum + item.quantity, 0)} likedCount={state.wishlist.length} isAdmin={state.isAdmin} onMenu={() => setMenuOpen(true)} /><MobileMenu open={menuOpen} isAdmin={state.isAdmin} onClose={() => setMenuOpen(false)} /><main><Outlet /></main><Footer /><Toast message={state.toast} onClose={() => state.notify('')} /></>
}
