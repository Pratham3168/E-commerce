import { ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import RatingStars from '../common/RatingStars'
import PriceDisplay from '../common/PriceDisplay'
import placeholder from '../../assets/hero.png'

export default function ProductCard({ product, liked, onLike, onAdd }) {
  return <article className="product-card"><div className="product-image-wrap"><Link to={`/products/${product.slug}`}><img src={product.image || placeholder} onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = placeholder }} alt={product.name} /></Link>{product.badge && <span className="product-badge">{product.badge}</span>}<button className={`icon-button like-button ${liked ? 'liked' : ''}`} aria-label="Toggle wishlist" onClick={() => onLike(product)}><Heart size={17} fill={liked ? 'currentColor' : 'none'} /></button><button className="quick-add" onClick={() => onAdd(product)}>Add to bag <ArrowRight size={15} /></button></div><div className="product-card-copy"><div className="eyebrow">{product.brand}</div><Link to={`/products/${product.slug}`} className="product-name">{product.name}</Link><div className="product-meta"><RatingStars value={product.rating} count={product.reviews} /><PriceDisplay product={product} /></div></div></article>
}
