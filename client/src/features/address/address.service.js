import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function listAddresses() { return unwrap(await apiClient.get('/addresses')) }
export async function createAddress(payload) { return unwrap(await apiClient.post('/addresses', payload)) }
export async function updateAddress(id, payload) { return unwrap(await apiClient.patch(`/addresses/${id}`, payload)) }
export async function deleteAddress(id) { return unwrap(await apiClient.delete(`/addresses/${id}`)) }
export async function setDefaultAddress(id) { return unwrap(await apiClient.patch(`/addresses/${id}/default`)) }
