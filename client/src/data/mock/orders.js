import { products } from './products'
import { addresses } from './addresses'

export const orders = [
  { id: 'FR-2048', date: 'October 2, 2026', status: 'Delivered', payment: 'Paid', total: 285, items: [{ product: products[0], quantity: 1 }, { product: products[2], quantity: 2 }], address: addresses[0] },
  { id: 'FR-2021', date: 'September 18, 2026', status: 'Shipped', payment: 'Paid', total: 176, items: [{ product: products[6], quantity: 1 }], address: addresses[1] },
  { id: 'FR-1983', date: 'August 29, 2026', status: 'Cancelled', payment: 'Refunded', total: 148, items: [{ product: products[3], quantity: 1 }], address: addresses[0] },
]
