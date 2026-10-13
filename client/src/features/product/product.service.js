import apiClient from '../../lib/apiClient'
import { normalizeProduct, normalizeProducts, unwrap } from '../../lib/normalize'

export async function listProducts(params = {}) {
	const payload = unwrap(await apiClient.get('/products', { params }))
	return { products: normalizeProducts(payload), pagination: payload?.pagination }
}

export async function getProductBySlug(slug) {
	return normalizeProduct(unwrap(await apiClient.get(`/products/${slug}`)))
}
