import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MobileMenu({ open, isAdmin, onClose }) {
  if (!open) return null
  return <div className="mobile-menu-overlay" onClick={onClose}><aside className="mobile-menu" onClick={event => event.stopPropagation()}><div className="mobile-menu-head"><span className="wordmark">FORM / OBJECT</span><button className="icon-button" onClick={onClose} aria-label="Close menu"><X size={20} /></button></div><nav><Link onClick={onClose} to="/">Home</Link><Link onClick={onClose} to="/products">Shop all</Link><Link onClick={onClose} to="/wishlist">Wishlist</Link><Link onClick={onClose} to="/orders">Orders</Link><Link onClick={onClose} to="/profile">Account</Link>{isAdmin && <Link onClick={onClose} to="/admin">Admin panel</Link>}</nav><div className="mobile-menu-footer">Thoughtful objects for everyday life.</div></aside></div>
}
