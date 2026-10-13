import { ArrowRight, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyState({ title, copy, action, to }) {
  return <div className="empty-state"><div className="empty-mark"><Package size={22} /></div><h2>{title}</h2><p>{copy}</p><Link className="button button-dark" to={to}>{action} <ArrowRight size={16} /></Link></div>
}
