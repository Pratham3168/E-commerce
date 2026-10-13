import EmptyState from '../../../components/common/EmptyState'
import ProductGrid from '../../../components/product/ProductGrid'

export default function Wishlist({ state }) {
  const items = state.wishlistProducts || []
  return <div className="page-shell"><div className="page-intro compact"><div><span className="eyebrow">Saved for later</span><h1>Wishlist</h1></div><span className="muted">{items.length} pieces</span></div>{items.length ? <><button className="text-button" onClick={state.clearWishlist}>Clear wishlist</button><ProductGrid products={items} likedIds={state.wishlist} onLike={state.toggleWishlist} onAdd={state.addToCart} /></> : <EmptyState title="Nothing saved yet." copy="Keep the pieces that feel like you close at hand." action="Explore the collection" to="/products" />}</div>
}
