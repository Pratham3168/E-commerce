import { Check } from 'lucide-react'

export default function TimelineStep({ title, done }) {
  return <div className={`timeline-step ${done ? 'done' : ''}`}><span>{done && <Check size={13} />}</span><b>{title}</b></div>
}
