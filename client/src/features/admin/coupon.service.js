import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function listCoupons() { return unwrap(await apiClient.get('/coupons')) }
export async function createCoupon(payload) { return unwrap(await apiClient.post('/coupons', payload)) }
export async function updateCoupon(id, payload) { return unwrap(await apiClient.patch(`/coupons/${id}`, payload)) }
export async function deleteCoupon(id) { return unwrap(await apiClient.delete(`/coupons/${id}`)) }
export async function restoreCoupon(id) { return unwrap(await apiClient.patch(`/coupons/${id}/restore`)) }
