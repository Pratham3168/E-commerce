import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cancelOrder, listOrders } from '../order.service'
import StatusBadge from '../../../components/common/StatusBadge'

export default function Orders() { const [orders, setOrders] = useState([]); const load = () => listOrders().then(setOrders).catch(() => {}); useEffect(() => { load() }, []); async function cancel(id) { await cancelOrder(id).then(load).catch(() => {}) } return <div className="page-shell"><div className="page-intro compact"><div><span className="eyebrow">Your history</span><h1>Orders</h1></div></div><div className="orders-list">{orders.map(order => <div className="order-row" key={order.id}><Link to={`/orders/${order.id}`}><div><span className="eyebrow">{order.id}</span><b>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}</b></div><span>{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span><StatusBadge status={order.status} /><strong>${order.totalAmount ?? order.total}</strong></Link>{['Pending', 'Confirmed', 'Packed'].includes(order.status) && <button className="text-button" onClick={() => cancel(order.id)}>Cancel</button>}<ArrowRight size={17} /></div>)}</div></div> }
