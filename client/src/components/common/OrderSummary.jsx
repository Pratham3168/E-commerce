import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function OrderSummary({ subtotal, checkout = true }) {
  return <aside className="order-summary"><span className="eyebrow">Summary</span><div><span>Subtotal</span><b>${subtotal}</b></div><div><span>Shipping</span><b>{subtotal >= 150 ? 'Free' : '$12'}</b></div><div className="summary-total"><span>Total</span><b>${subtotal >= 150 ? subtotal : subtotal + 12}</b></div>{checkout && <Link className="button button-dark full-width" to="/checkout">Continue to checkout <ArrowRight size={17} /></Link>}<small>Taxes calculated at checkout.</small></aside>
}
