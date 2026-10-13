import apiClient from '../../lib/apiClient'
import { normalizeWishlist, unwrap } from '../../lib/normalize'

export async function getWishlist() { return normalizeWishlist(unwrap(await apiClient.get('/wishlist'))) }
export async function addToWishlist(productId) { return normalizeWishlist(unwrap(await apiClient.post(`/wishlist/${productId}`))) }
export async function removeFromWishlist(productId) { return normalizeWishlist(unwrap(await apiClient.delete(`/wishlist/${productId}`))) }
export async function clearWishlist() { return normalizeWishlist(unwrap(await apiClient.delete('/wishlist'))) }
