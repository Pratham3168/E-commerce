import { useEffect, useState } from 'react'
import { createCategory, createProduct, deleteCategory, deleteProduct, restoreCategory, restoreProduct, updateCategory, updateProduct, uploadProductImages, deleteProductImage, setProductThumbnail } from '../catalog.service'
import { createCoupon, deleteCoupon, listCoupons, restoreCoupon, updateCoupon } from '../coupon.service'
import { addStock, adjustStock, getInventoryHistory, reduceStock } from '../inventory.service'
import { listCategories } from '../../category/category.service'
import { listProducts } from '../../product/product.service'
import Button from '../../../components/common/Button'
import ProductTable from '../components/ProductTable'

const emptyProduct = { name: '', description: '', category: '', brand: '', price: '', stock: 0, discountPercentage: 0, isFeatured: false, sku: '' }
const emptyCategory = { name: '', description: '' }
const emptyCoupon = { code: '', description: '', discountType: 'percentage', discountValue: 1, minimumOrderValue: 0, maximumDiscount: 0, usageLimit: 0, startDate: '', expiryDate: '', isActive: true }

export default function Management() {
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [coupons, setCoupons] = useState([])
  const [selected, setSelected] = useState(null)
  const [productForm, setProductForm] = useState(emptyProduct)
  const [categoryForm, setCategoryForm] = useState(emptyCategory)
  const [couponForm, setCouponForm] = useState(emptyCoupon)
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const idOf = item => item?._id || item?.id
  const fail = requestError => setError(requestError.response?.data?.message || 'Request failed')

  async function reload() {
    try {
      const [productResult, categoryResult, couponResult] = await Promise.all([listProducts({ limit: 100 }), listCategories(), listCoupons()])
      setProducts(productResult.products || [])
      setCategories(categoryResult || [])
      setCoupons(couponResult?.coupons || couponResult || [])
      setError('')
    } catch (requestError) { fail(requestError) }
  }
  useEffect(() => { Promise.resolve().then(reload) }, [])

  async function saveProduct(event) {
    event.preventDefault()
    try {
      const payload = { ...productForm, price: Number(productForm.price), stock: Number(productForm.stock), discountPercentage: Number(productForm.discountPercentage), isFeatured: Boolean(productForm.isFeatured) }
      if (selected) await updateProduct(idOf(selected), payload); else await createProduct(payload)
      setMessage('Product saved'); setSelected(null); setProductForm(emptyProduct); reload()
    } catch (requestError) { fail(requestError) }
  }
  async function saveCategory(event) {
    event.preventDefault()
    try { if (selected) await updateCategory(idOf(selected), categoryForm); else await createCategory(categoryForm); setMessage('Category saved'); setSelected(null); setCategoryForm(emptyCategory); reload() } catch (requestError) { fail(requestError) }
  }
  async function saveCoupon(event) {
    event.preventDefault()
    try {
      const payload = { ...couponForm, discountValue: Number(couponForm.discountValue), minimumOrderValue: Number(couponForm.minimumOrderValue), maximumDiscount: Number(couponForm.maximumDiscount), usageLimit: Number(couponForm.usageLimit), startDate: new Date(couponForm.startDate).toISOString(), expiryDate: new Date(couponForm.expiryDate).toISOString() }
      if (selected) await updateCoupon(idOf(selected), payload); else await createCoupon(payload)
      setMessage('Coupon saved'); setSelected(null); setCouponForm(emptyCoupon); reload()
    } catch (requestError) { fail(requestError) }
  }
  async function uploadImages(event, product) {
    const formData = new FormData()
    Array.from(event.target.files).forEach(file => formData.append('images', file))
    await uploadProductImages(idOf(product), formData).then(reload).catch(fail)
  }
  async function loadHistory(product) { await getInventoryHistory(idOf(product)).then(result => setHistory(result.inventory || [])).catch(fail) }
  async function stockAction(action, event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      if (action === 'add') await addStock(idOf(selected), { ...data, quantity: Number(data.quantity) })
      if (action === 'reduce') await reduceStock(idOf(selected), { ...data, quantity: Number(data.quantity) })
      if (action === 'adjust') await adjustStock(idOf(selected), { newStock: Number(data.newStock), reason: data.reason })
      setMessage('Inventory updated'); reload()
    } catch (requestError) { fail(requestError) }
  }
  function editProduct(product) { setSelected(product); setProductForm({ ...emptyProduct, ...product, category: idOf(product.category) }) }
  function editCategory(category) { setSelected(category); setCategoryForm({ name: category.name, description: category.description || '' }) }
  function editCoupon(coupon) { setSelected(coupon); setCouponForm({ ...emptyCoupon, ...coupon, startDate: coupon.startDate?.slice(0, 10), expiryDate: coupon.expiryDate?.slice(0, 10) }) }
  const imageId = image => image._id || image.id

  return <div className="admin-content">
    <div className="admin-heading"><div><span className="eyebrow">Workspace / Management</span><h1>Store management</h1></div></div>
    <div className="tabs mini">{['products', 'categories', 'coupons', 'inventory'].map(item => <button className={tab === item ? 'active' : ''} onClick={() => setTab(item)} key={item}>{item[0].toUpperCase() + item.slice(1)}</button>)}</div>
    {error && <p role="alert">{error}</p>}{message && <p className="muted">{message}</p>}
    {tab === 'products' && <><form className="detail-panel" onSubmit={saveProduct}><h2>{selected ? 'Edit product' : 'Add product'}</h2><div className="form-row"><label>Name<input required value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} /></label><label>SKU<input required={!selected} value={productForm.sku} onChange={e => setProductForm({ ...productForm, sku: e.target.value })} /></label><label>Price<input type="number" min="0" required value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} /></label></div><div className="form-row"><label>Brand<input required value={productForm.brand} onChange={e => setProductForm({ ...productForm, brand: e.target.value })} /></label><label>Category<select required value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}><option value="">Select category</option>{categories.map(category => <option key={idOf(category)} value={idOf(category)}>{category.name}</option>)}</select></label><label>Stock<input type="number" min="0" value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} /></label></div><label>Description<textarea required value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} /></label><Button type="submit">Save product</Button></form><ProductTable products={products} idOf={idOf} editProduct={editProduct} uploadImages={uploadImages} deleteProduct={deleteProduct} restoreProduct={restoreProduct} imageId={imageId} setProductThumbnail={setProductThumbnail} deleteProductImage={deleteProductImage} reload={reload} /></>}
    {tab === 'categories' && <><form className="detail-panel" onSubmit={saveCategory}><h2>{selected ? 'Edit category' : 'Add category'}</h2><label>Name<input required value={categoryForm.name} onChange={e => setCategoryForm({ ...categoryForm, name: e.target.value })} /></label><label>Description<textarea value={categoryForm.description} onChange={e => setCategoryForm({ ...categoryForm, description: e.target.value })} /></label><Button type="submit">Save category</Button></form><div className="admin-order-table full">{categories.map(category => <div className="table-row" key={idOf(category)}><span>{category.name}</span><button className="text-button" onClick={() => editCategory(category)}>Edit</button><button className="text-button" onClick={() => deleteCategory(idOf(category)).then(reload)}>Delete</button><button className="text-button" onClick={() => restoreCategory(idOf(category)).then(reload)}>Restore</button></div>)}</div></>}
    {tab === 'coupons' && <><form className="detail-panel" onSubmit={saveCoupon}><h2>{selected ? 'Edit coupon' : 'Add coupon'}</h2><div className="form-row"><label>Code<input required value={couponForm.code} onChange={e => setCouponForm({ ...couponForm, code: e.target.value })} /></label><label>Type<select value={couponForm.discountType} onChange={e => setCouponForm({ ...couponForm, discountType: e.target.value })}><option value="percentage">Percentage</option><option value="fixed">Fixed</option></select></label><label>Value<input type="number" min="1" required value={couponForm.discountValue} onChange={e => setCouponForm({ ...couponForm, discountValue: e.target.value })} /></label></div><div className="form-row"><label>Starts<input type="date" required value={couponForm.startDate} onChange={e => setCouponForm({ ...couponForm, startDate: e.target.value })} /></label><label>Expires<input type="date" required value={couponForm.expiryDate} onChange={e => setCouponForm({ ...couponForm, expiryDate: e.target.value })} /></label></div><Button type="submit">Save coupon</Button></form><div className="admin-order-table full">{coupons.map(coupon => <div className="table-row" key={idOf(coupon)}><span>{coupon.code}</span><span>{coupon.discountValue} {coupon.discountType}</span><button className="text-button" onClick={() => editCoupon(coupon)}>Edit</button><button className="text-button" onClick={() => deleteCoupon(idOf(coupon)).then(reload)}>Delete</button><button className="text-button" onClick={() => restoreCoupon(idOf(coupon)).then(reload)}>Restore</button></div>)}</div></>}
    {tab === 'inventory' && <><label>Product<select value={selected ? idOf(selected) : ''} onChange={e => setSelected(products.find(product => idOf(product) === e.target.value) || null)}><option value="">Select product</option>{products.map(product => <option key={idOf(product)} value={idOf(product)}>{product.name}</option>)}</select></label>{selected && <><div className="form-row"><form className="detail-panel" onSubmit={e => stockAction('add', e)}><h3>Add stock</h3><input name="quantity" type="number" min="1" required /><input name="reason" placeholder="Reason" /><Button type="submit">Add</Button></form><form className="detail-panel" onSubmit={e => stockAction('reduce', e)}><h3>Reduce stock</h3><input name="quantity" type="number" min="1" required /><input name="reason" placeholder="Reason" /><Button type="submit">Reduce</Button></form><form className="detail-panel" onSubmit={e => stockAction('adjust', e)}><h3>Set stock</h3><input name="newStock" type="number" min="0" required /><input name="reason" required placeholder="Reason" /><Button type="submit">Adjust</Button></form></div><Button variant="outline" onClick={() => loadHistory(selected)}>Load history</Button><div className="admin-order-table full">{history.map(entry => <div className="table-row" key={entry._id || entry.id}><span>{entry.type || entry.action}</span><span>{entry.quantity ?? entry.newStock}</span><span>{entry.reason}</span><span>{entry.createdAt && new Date(entry.createdAt).toLocaleString()}</span></div>)}</div></>}</>}
  </div>
}
