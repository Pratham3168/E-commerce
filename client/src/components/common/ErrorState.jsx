export default function ErrorState({ message = 'Something went wrong.' }) {
  return <div className="empty-state" role="alert"><span className="eyebrow">Error</span><h2>{message}</h2></div>
}
