export default function PriceDisplay({ product }) {
  return <div className="price"><strong>${product.price}</strong>{product.oldPrice && <del>${product.oldPrice}</del>}{product.oldPrice && <span>{Math.round((1 - product.price / product.oldPrice) * 100)}% off</span>}</div>
}
