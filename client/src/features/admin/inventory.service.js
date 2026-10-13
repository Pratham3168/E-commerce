import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function addStock(productId, payload) { return unwrap(await apiClient.post(`/inventory/in/${productId}`, payload)) }
export async function reduceStock(productId, payload) { return unwrap(await apiClient.post(`/inventory/out/${productId}`, payload)) }
export async function adjustStock(productId, payload) { return unwrap(await apiClient.post(`/inventory/adjust/${productId}`, payload)) }
export async function getInventoryHistory(productId) { return unwrap(await apiClient.get(`/inventory/${productId}`)) }
