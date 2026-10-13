import { ImagePlus, Pencil, RotateCcw, Trash2 } from 'lucide-react'

export default function ProductTable({ products, idOf, editProduct, uploadImages, deleteProduct, restoreProduct, imageId, setProductThumbnail, deleteProductImage, reload }) {
  return <div className="admin-order-table full product-management-table">
    <div className="table-head"><span>Product</span><span>Price</span><span>Inventory</span><span>Images</span><span>Actions</span></div>
    {products.map(product => <div className="table-row" key={idOf(product)}>
      <div className="admin-product-identity"><div className="admin-product-thumb">{product.image ? <img src={product.image} alt="" /> : <ImagePlus size={16} />}</div><div><b>{product.name}</b><small className="muted">{product.brand || 'Unbranded'}{product.sku ? ` / ${product.sku}` : ''}</small></div></div>
      <strong>${Number(product.price || 0).toFixed(2)}</strong>
      <span className={product.stock <= 0 ? 'stock-empty' : ''}>{product.stock} in stock</span>
      <div className="product-image-actions"><label className="text-button image-upload"><ImagePlus size={14} />Add images<input type="file" multiple hidden accept="image/*" onChange={event => uploadImages(event, product)} /></label>{product.images?.length ? <small className="muted">{product.images.length} uploaded</small> : <small className="muted">No images</small>}</div>
      <div className="product-row-actions"><button className="text-button" onClick={() => editProduct(product)}><Pencil size={14} />Edit</button><button className="text-button" onClick={() => deleteProduct(idOf(product)).then(reload)}><Trash2 size={14} />Delete</button><button className="text-button" onClick={() => restoreProduct(idOf(product)).then(reload)}><RotateCcw size={14} />Restore</button></div>
      {product.images?.length > 0 && <div className="product-image-list">{product.images.map(image => <span key={imageId(image)}><button className="text-button" onClick={() => setProductThumbnail(idOf(product), imageId(image)).then(reload)}>Set thumbnail</button><button className="text-button" onClick={() => deleteProductImage(idOf(product), imageId(image)).then(reload)}>Remove</button></span>)}</div>}
    </div>)}
  </div>
}
