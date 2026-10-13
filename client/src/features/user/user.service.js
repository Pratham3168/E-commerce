import apiClient from '../../lib/apiClient'
import { unwrap } from '../../lib/normalize'

export async function getProfile() { return unwrap(await apiClient.get('/users/profile')) }
