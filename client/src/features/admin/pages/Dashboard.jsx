import { useEffect, useState } from 'react'
import { getDashboardAnalytics } from '../admin.service'

export default function Dashboard() {
  const [analytics, setAnalytics] = useState(null)
  useEffect(() => { getDashboardAnalytics().then(setAnalytics).catch(() => {}) }, [])
  const stats = [
    ['Total orders', analytics?.totalOrders ?? 0],
    ['Pending orders', analytics?.pendingOrders ?? 0],
    ['Customers', analytics?.totalCustomers ?? 0],
    ['Products', analytics?.totalProducts ?? 0],
    ['Delivered orders', analytics?.deliveredOrders ?? 0],
    ['Out of stock', analytics?.outOfStockProducts ?? 0],
  ]
  return <div className="admin-content"><div className="admin-heading"><div><span className="eyebrow">Overview</span><h1>Store performance</h1></div></div><div className="stats-grid">{stats.map(([label, value]) => <div className="stat-card" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><section className="chart-panel large"><div className="panel-heading"><div><span className="eyebrow">Revenue from delivered orders</span><h2>${Number(analytics?.totalRevenue || 0).toFixed(2)}</h2></div></div><p className="muted">Live totals from the backend order, customer, and product collections.</p></section></div>
}
