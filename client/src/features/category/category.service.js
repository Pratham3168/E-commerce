import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function listCategories() { const categories = unwrap(await apiClient.get('/categories')) || []; return categories.map(category => ({ ...category, id: category.id || category._id, image: category.image?.url || category.image || '' })) }
export async function getCategoryBySlug(slug) { return unwrap(await apiClient.get(`/categories/${slug}`)) }
