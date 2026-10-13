import { Search, ShieldCheck, ShieldOff } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { listAdminCustomers, updateCustomerStatus } from '../admin.service'
import Button from '../../../components/common/Button'

const idOf = customer => customer._id || customer.id

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const load = () => listAdminCustomers().then(setCustomers).catch(requestError => setError(requestError.response?.data?.message || 'Unable to load customers'))
  useEffect(() => { load() }, [])
  const visible = useMemo(() => customers.filter(customer => `${customer.firstName} ${customer.lastName} ${customer.email} ${customer.phone || ''}`.toLowerCase().includes(search.toLowerCase())), [customers, search])
  const activeCount = customers.filter(customer => customer.isActive).length
  async function toggleStatus(customer) {
    await updateCustomerStatus(idOf(customer), !customer.isActive).then(load).catch(requestError => setError(requestError.response?.data?.message || 'Unable to update customer status'))
  }
  return <div className="admin-content">
    <div className="admin-heading"><div><span className="eyebrow">Workspace / Customers</span><h1>Customers</h1><p className="muted">Manage every customer account and access status.</p></div></div>
    {error && <p role="alert">{error}</p>}
    <div className="customer-summary"><div className="stat-card"><span>Total customers</span><strong>{customers.length}</strong></div><div className="stat-card"><span>Active accounts</span><strong>{activeCount}</strong></div><div className="stat-card"><span>Access paused</span><strong>{customers.length - activeCount}</strong></div></div>
    <div className="admin-toolbar"><label className="filter-search"><Search size={16} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search name, email, or phone" /></label><span className="muted">{visible.length} customers</span></div>
    <div className="admin-order-table full customer-table"><div className="table-head"><span>Customer</span><span>Contact</span><span>Joined</span><span>Status</span><span>Action</span></div>{visible.map(customer => <div className="table-row" key={idOf(customer)}><div><b>{customer.firstName} {customer.lastName}</b><small className="muted">{customer.isVerified ? 'Verified account' : 'Unverified account'}</small></div><div><span>{customer.email}</span><small className="muted">{customer.phone || 'No phone number'}</small></div><span>{new Date(customer.createdAt).toLocaleDateString()}</span><span className={`status ${customer.isActive ? 'status-paid' : 'status-cancelled'}`}>{customer.isActive ? 'Active' : 'Paused'}</span><Button variant="outline" onClick={() => toggleStatus(customer)}>{customer.isActive ? <><ShieldOff size={14} />Pause access</> : <><ShieldCheck size={14} />Activate</>}</Button></div>)}</div>
    {!visible.length && <div className="detail-panel"><p className="muted">No customers match this search.</p></div>}
  </div>
}
