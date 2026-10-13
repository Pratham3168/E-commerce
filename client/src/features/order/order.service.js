import apiClient from '../../lib/apiClient'
import { normalizeProduct, unwrap } from '../../lib/normalize'

function normalizeOrder(order) {
	return { ...order, id: order.id || order._id, items: (order?.items || []).map(item => {
		const product = item.product && typeof item.product === 'object' ? item.product : { _id: item.product, name: item.name, slug: item.slug, thumbnail: item.thumbnail, price: item.priceAtPurchase }
		return { ...item, product: normalizeProduct(product) }
	}) }
}

export async function listOrders() { return (unwrap(await apiClient.get('/orders')) || []).map(normalizeOrder) }
export async function getOrder(orderId) { return normalizeOrder(unwrap(await apiClient.get(`/orders/${orderId}`))) }
export async function placeOrder(payload) { return normalizeOrder(unwrap(await apiClient.post('/orders', payload))) }
export async function cancelOrder(orderId) { return normalizeOrder(unwrap(await apiClient.patch(`/orders/${orderId}/cancel`))) }
