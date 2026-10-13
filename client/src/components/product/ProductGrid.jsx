import ProductCard from './ProductCard'

export default function ProductGrid({ products, likedIds, onLike, onAdd }) {
  return <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} liked={likedIds.includes(product.id)} onLike={onLike} onAdd={onAdd} />)}</div>
}
