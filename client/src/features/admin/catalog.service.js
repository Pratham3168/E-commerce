import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function createProduct(payload) { return unwrap(await apiClient.post('/products', payload)) }
export async function updateProduct(id, payload) { return unwrap(await apiClient.patch(`/products/${id}`, payload)) }
export async function deleteProduct(id) { return unwrap(await apiClient.delete(`/products/${id}`)) }
export async function restoreProduct(id) { return unwrap(await apiClient.patch(`/products/${id}/restore`)) }
export async function uploadProductImages(id, formData) { return unwrap(await apiClient.post(`/products/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })) }
export async function deleteProductImage(productId, imageId) { return unwrap(await apiClient.delete(`/products/${productId}/images/${imageId}`)) }
export async function setProductThumbnail(productId, imageId) { return unwrap(await apiClient.patch(`/products/${productId}/images/${imageId}/thumbnail`)) }

export async function createCategory(payload) { return unwrap(await apiClient.post('/categories', payload)) }
export async function updateCategory(id, payload) { return unwrap(await apiClient.patch(`/categories/${id}`, payload)) }
export async function deleteCategory(id) { return unwrap(await apiClient.delete(`/categories/${id}`)) }
export async function restoreCategory(id) { return unwrap(await apiClient.patch(`/categories/${id}/restore`)) }
