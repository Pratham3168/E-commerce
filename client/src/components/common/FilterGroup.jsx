export default function FilterGroup({ title, children }) {
  return <div className="filter-group"><span className="filter-title">{title}</span>{children}</div>
}
