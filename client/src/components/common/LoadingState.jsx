export default function LoadingState({ label = 'Loading' }) {
  return <div className="empty-state" aria-live="polite"><span className="eyebrow">{label}</span></div>
}
