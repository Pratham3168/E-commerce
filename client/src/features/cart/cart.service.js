import apiClient from '../../lib/apiClient'
import { normalizeCart, unwrap } from '../../lib/normalize'

export async function getCart() { return normalizeCart(unwrap(await apiClient.get('/cart'))) }
export async function addToCart(productId, quantity = 1) { return normalizeCart(unwrap(await apiClient.post('/cart', { productId, quantity }))) }
export async function updateCartItem(productId, quantity) { return normalizeCart(unwrap(await apiClient.patch(`/cart/${productId}`, { quantity }))) }
export async function removeCartItem(productId) { return normalizeCart(unwrap(await apiClient.delete(`/cart/${productId}`))) }
export async function clearCart() { return normalizeCart(unwrap(await apiClient.delete('/cart'))) }
