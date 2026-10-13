import { Star } from 'lucide-react'

export default function RatingStars({ value = 5, count }) {
  return <span className="rating"><Star size={13} fill="currentColor" /> <b>{value}</b>{count !== undefined && <small>({count})</small>}</span>
}
