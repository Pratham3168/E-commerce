import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function listAdminOrders(params = {}) {
	const payload = unwrap(await apiClient.get('/admin/orders', { params }))
	return { orders: payload?.orders || [], pagination: payload?.pagination }
}
export async function updateOrderStatus(orderId, newStatus) { return unwrap(await apiClient.patch(`/admin/orders/${orderId}/status`, { newStatus })) }
export async function getDashboardAnalytics() { return unwrap(await apiClient.get('/admin/dashboard')) }
export async function listAdminCustomers() { return unwrap(await apiClient.get('/admin/customers')) }
export async function updateCustomerStatus(customerId, isActive) { return unwrap(await apiClient.patch(`/admin/customers/${customerId}/status`, { isActive })) }
