export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  return <nav aria-label="Pagination" className="tabs"><button disabled={page <= 1} onClick={() => onChange?.(page - 1)}>Previous</button><span className="eyebrow">Page {page} of {totalPages}</span><button disabled={page >= totalPages} onClick={() => onChange?.(page + 1)}>Next</button></nav>
}
