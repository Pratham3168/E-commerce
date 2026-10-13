export default function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return <div className="mobile-menu-overlay" role="presentation" onClick={onClose}><div className="detail-panel" role="dialog" aria-modal="true" aria-label={title} onClick={event => event.stopPropagation()}>{title && <h2>{title}</h2>}{children}</div></div>
}
