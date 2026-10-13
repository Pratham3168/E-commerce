import { Search, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { getProfile } from '../features/user/user.service'

export default function AdminLayout() {
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '' })
  useEffect(() => { getProfile().then(setProfile).catch(() => {}) }, [])
  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || 'Administrator'
  const initials = fullName.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()
  return <div className="admin-layout"><aside className="admin-sidebar"><Link className="wordmark" to="/">FORM / OBJECT</Link><div className="admin-nav"><span className="eyebrow">Workspace</span><NavLink end to="/admin">Overview</NavLink><NavLink to="/admin/orders">Orders</NavLink><NavLink to="/admin/customers">Customers</NavLink><NavLink to="/admin/management">Management</NavLink><Link to="/products">Storefront</Link></div><div className="admin-sidebar-footer"><span className="avatar small">{initials}</span><span>{fullName}<br /><small>Administrator</small></span></div></aside><div className="admin-main"><header className="admin-topbar"><div><span className="eyebrow">Admin workspace</span><b>Good morning, {profile.firstName || 'Administrator'}.</b></div><div className="admin-top-actions"><button className="icon-button" aria-label="Search"><Search size={18} /></button><Link className="icon-button" to="/profile" aria-label="Open profile"><UserRound size={18} /></Link></div></header><Outlet /></div></div>
}
