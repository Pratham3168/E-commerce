import { ClipboardList, Heart, Menu, Package, Search, UserRound } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Navbar({ cartCount, likedCount, isAdmin, onMenu }) {
  const location = useLocation()
  return <header className="site-header"><div className="header-inner"><button className="mobile-menu-button icon-button" onClick={onMenu} aria-label="Open menu"><Menu size={20} /></button><Link className="wordmark" to="/">FORM / OBJECT</Link><nav className="desktop-nav"><NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/products">Shop</NavLink><a href="#journal">Journal</a><a href="#about">About</a>{isAdmin && <Link to="/admin">Admin panel</Link>}</nav><div className="header-actions"><Link className="header-action search-link" to="/products"><Search size={18} /><span>Search</span></Link><Link className="header-action desktop-only" to="/orders"><ClipboardList size={18} /><span>Orders</span></Link><Link className="header-action" to="/wishlist"><Heart size={18} /><span className="desktop-only">Wishlist</span>{likedCount > 0 && <i>{likedCount}</i>}</Link><Link className="header-action" to="/cart"><Package size={18} /><span className="desktop-only">Bag</span>{cartCount > 0 && <i>{cartCount}</i>}</Link><Link className="header-action desktop-only" to="/profile"><UserRound size={18} /></Link></div></div>{location.pathname === '/' && <div className="announcement">Free shipping on orders over $150 <ArrowRight size={14} /></div>}</header>
}
