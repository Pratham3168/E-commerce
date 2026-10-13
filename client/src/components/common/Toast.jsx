import { Check, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  if (!message) return null
  return <div className="toast"><Check size={16} /> {message}<button onClick={onClose} aria-label="Dismiss"><X size={14} /></button></div>
}
