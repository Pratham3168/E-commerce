import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <div className="empty-state page-empty"><span className="eyebrow">404</span><h1>Page not found.</h1><p>The object you are looking for is elsewhere.</p><Link className="button button-dark" to="/">Back home <ArrowRight size={16} /></Link></div>
}
