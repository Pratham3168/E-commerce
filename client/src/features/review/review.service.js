import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function listProductReviews(productId, params = {}) { return unwrap(await apiClient.get(`/reviews/products/${productId}`, { params })) }
export async function createReview(productId, payload) { return unwrap(await apiClient.post(`/reviews/products/${productId}`, payload)) }
export async function updateReview(reviewId, payload) { return unwrap(await apiClient.patch(`/reviews/${reviewId}`, payload)) }
export async function deleteReview(reviewId) { return unwrap(await apiClient.delete(`/reviews/${reviewId}`)) }
