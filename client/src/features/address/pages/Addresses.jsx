import { useEffect, useState } from 'react'
import { Edit3, Plus, Trash2 } from 'lucide-react'
import { createAddress, deleteAddress, listAddresses, setDefaultAddress, updateAddress } from '../address.service'
import Button from '../../../components/common/Button'

const blank = { fullName: '', phone: '', addressType: 'Home', addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', country: '' }

export default function Addresses() {
  const [addresses, setAddresses] = useState([])
  const [form, setForm] = useState(null)
  const reload = () => listAddresses().then(setAddresses).catch(() => {})
  useEffect(() => { reload() }, [])
  function edit(address) { setForm({ ...blank, ...address, id: address._id || address.id }) }
  async function submit(event) {
    event.preventDefault()
    const { id, ...payload } = form
    await (id ? updateAddress(id, payload) : createAddress(payload)).then(() => { setForm(null); reload() }).catch(() => {})
  }
  async function remove(id) { await deleteAddress(id).then(reload).catch(() => {}) }
  async function makeDefault(id) { await setDefaultAddress(id).then(reload).catch(() => {}) }
  return <div className="page-shell narrow-page"><div className="page-intro compact"><div><span className="eyebrow">Where to find you</span><h1>Addresses</h1></div><Button onClick={() => setForm({ ...blank })}><Plus size={16} /> Add address</Button></div>{form && <form className="detail-panel" onSubmit={submit}><div className="form-row"><label>Full name<input required value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} /></label><label>Phone<input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label></div><div className="form-row"><label>Address line 1<input required value={form.addressLine1} onChange={e => setForm({ ...form, addressLine1: e.target.value })} /></label><label>Address line 2<input value={form.addressLine2} onChange={e => setForm({ ...form, addressLine2: e.target.value })} /></label></div><div className="form-row"><label>City<input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></label><label>State<input required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} /></label><label>Postal code<input required value={form.postalCode} onChange={e => setForm({ ...form, postalCode: e.target.value })} /></label></div><div className="address-actions"><Button type="submit">Save address</Button><button type="button" className="text-button" onClick={() => setForm(null)}>Cancel</button></div></form>}<div className="address-grid">{addresses.map(address => { const id = address._id || address.id; return <div className="address-card" key={id}>{address.isDefault && <span className="default-tag">Default</span>}<span className="eyebrow">{address.addressType || 'Address'}</span><h3>{address.fullName}</h3><p>{address.addressLine1}<br />{address.addressLine2}<br />{address.city}, {address.state} {address.postalCode}</p><span className="muted">{address.phone}</span><div className="address-actions">{!address.isDefault && <button onClick={() => makeDefault(id)}><Edit3 size={14} /> Make default</button>}<button onClick={() => edit(address)}><Edit3 size={14} /> Edit</button><button onClick={() => remove(id)}><Trash2 size={14} /> Delete</button></div></div> })}</div></div>
}
