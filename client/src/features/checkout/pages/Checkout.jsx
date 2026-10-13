import { Check, CreditCard, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../../components/common/Button'
import OrderSummary from '../../../components/common/OrderSummary'
import { placeOrder } from '../../order/order.service'
import { listAddresses } from '../../address/address.service'

function CheckoutBlock({ number, title, children }) { return <section className="checkout-block"><div className="checkout-block-title"><span>{number}</span><h2>{title}</h2></div>{children}</section> }

export default function Checkout({ state }) {
  const [addresses, setAddresses] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [couponCode, setCouponCode] = useState('')
  const navigate = useNavigate()
  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  useEffect(() => {
    listAddresses().then(result => {
      setAddresses(result)
      setSelectedId(result.find(address => address.isDefault)?._id || result[0]?._id || '')
    }).catch(() => {})
  }, [])

  async function handlePlaceOrder() {
    const address = addresses.find(item => (item._id || item.id) === selectedId)
    if (!address) return state.notify('Add a shipping address before checkout')
    try {
      const shippingAddress = {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || '',
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country || 'India',
      }
      await placeOrder({ shippingAddress, paymentMethod, ...(couponCode.trim() ? { couponCode: couponCode.trim().toUpperCase() } : {}) })
      state.notify('Order placed successfully')
      navigate('/orders')
    } catch (error) {
      state.notify(error.response?.data?.message || 'Please sign in before placing an order')
    }
  }

  return <div className="page-shell checkout-page"><div className="page-intro compact"><div><span className="eyebrow">Almost yours</span><h1>Checkout</h1></div></div><div className="checkout-steps"><span className="active">01 <b>Delivery</b></span><span className="active">02 <b>Payment</b></span><span>03 <b>Review</b></span></div><div className="checkout-layout"><div className="checkout-form"><CheckoutBlock number="01" title="Shipping address"><div className="address-select-grid">{addresses.map(address => { const id = address._id || address.id; return <button type="button" className={id === selectedId ? 'selected' : ''} onClick={() => setSelectedId(id)} key={id}><span className="address-check">{id === selectedId && <Check size={13} />}</span><b>{address.addressType || address.type || 'Address'}</b><span>{address.fullName}<br />{address.addressLine1}, {address.city}</span></button> })}<Link className="add-address" to="/addresses"><Plus size={18} /> Add new address</Link></div></CheckoutBlock><CheckoutBlock number="02" title="Payment method"><button type="button" className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`} onClick={() => setPaymentMethod('COD')}><span className="radio-dot" /><CreditCard size={19} /><div><b>Cash on delivery</b><small>Pay when your order arrives</small></div></button><button type="button" className={`payment-option ${paymentMethod === 'ONLINE' ? 'selected' : ''}`} onClick={() => setPaymentMethod('ONLINE')}><span className="radio-dot" /><CreditCard size={19} /><div><b>Online payment</b><small>Payment provider confirmation is handled by the backend.</small></div></button><label>Coupon code<input value={couponCode} onChange={event => setCouponCode(event.target.value)} placeholder="Optional coupon" /></label></CheckoutBlock><CheckoutBlock number="03" title="Review & place order"><label className="check-row"><input type="checkbox" defaultChecked /> I agree to the terms and conditions</label><Button onClick={handlePlaceOrder}>Place order <span aria-hidden="true">→</span></Button></CheckoutBlock></div><OrderSummary subtotal={subtotal} checkout={false} /></div></div>
}
