export function unwrap(response) {
  return response.data?.data ?? response.data
}

export function normalizeProduct(product) {
  if (!product) return product
  if (typeof product === 'string') return { id: product, image: '', reviews: 0 }
  return {
    ...product,
    id: product.id || product._id,
    image: product.image || product.thumbnail?.url || product.images?.[0]?.url || '',
    reviews: product.reviews ?? product.totalReviews ?? 0,
  }
}

export function normalizeProducts(payload) {
  const products = Array.isArray(payload) ? payload : payload?.products || []
  return products.map(normalizeProduct)
}

export function normalizeCart(cart) {
  return {
    ...(cart || {}),
    items: (cart?.items || []).map(item => ({
      ...item,
      quantity: item.quantity,
      product: normalizeProduct(item.product),
    })),
  }
}

export function normalizeWishlist(wishlist) {
  return (wishlist?.products || []).map(normalizeProduct)
}
