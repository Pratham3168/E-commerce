import { useEffect, useState } from "react";
import {
  getCart,
  addToCart as apiAddToCart,
  updateCartItem as apiUpdateCartItem,
  removeCartItem as apiRemoveCartItem,
  clearCart as apiClearCart,
} from "../features/cart/cart.service";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist as apiClearWishlist,
} from "../features/wishlist/wishlist.service";
import { listProducts } from "../features/product/product.service";
import { listCategories } from "../features/category/category.service";

export default function useMockState() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [toast, setToast] = useState("");
  const [role, setRole] = useState(() => sessionStorage.getItem("ecommerce.role") || "user");

  useEffect(() => {
    Promise.all([listProducts({ limit: 50 }), listCategories()])
      .then(([productResult, categoryResult]) => {
        const loadedProducts = productResult.products || [];
        setProducts(loadedProducts);
        setCategories(categoryResult.map(category => ({
          ...category,
          count: loadedProducts.filter(product => {
            const productCategory = typeof product.category === "object" ? product.category.name : product.category;
            return productCategory === category.name || product.category?.slug === category.slug;
          }).length,
        })));
      })
      .catch(() => {});
    if (sessionStorage.getItem("ecommerce.authenticated") === "true") {
      getCart()
        .then((result) => setCart(result.items || []))
        .catch(() => {});
      getWishlist()
        .then((result) => {
          setWishlist(result.map((product) => product.id));
          setWishlistProducts(result);
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    const syncAuth = () => setRole(sessionStorage.getItem("ecommerce.role") || "user");
    window.addEventListener("auth-change", syncAuth);
    return () => window.removeEventListener("auth-change", syncAuth);
  }, []);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };
  const resolveCartItems = (items, fallbackItems = []) => (items || []).map((item) => {
    const productId = item.product?.id || item.product?._id || item.product;
    const fallbackProduct = products.find((candidate) => String(candidate.id) === String(productId))
      || fallbackItems.find((candidate) => String(candidate.product?.id) === String(productId))?.product;
    const product = fallbackProduct
      ? { ...fallbackProduct, ...item.product, image: item.product?.image || fallbackProduct.image }
      : item.product;
    return { ...item, product };
  });
  const addToCart = (product) => {
    setCart((current) => {
      const item = current.find((entry) => entry.product.id === product.id);
      return item
        ? current.map((entry) =>
            entry.product.id === product.id
              ? { ...entry, quantity: entry.quantity + 1 }
              : entry,
          )
        : [...current, { product, quantity: 1 }];
    });
    apiAddToCart(product.id)
      .then((result) => setCart((current) => resolveCartItems(result.items, current)))
      .catch(() => {});
    notify(`${product.name} added to your bag`);
  };
  const toggleWishlist = (product) => {
    const liked = wishlist.includes(product.id);
    setWishlist((current) =>
      liked
        ? current.filter((id) => id !== product.id)
        : [...current, product.id],
    );
    const request = liked
      ? removeFromWishlist(product.id)
      : addToWishlist(product.id);
    request
      .then((result) => {
        setWishlist(result.map((item) => item.id));
        setWishlistProducts(result);
      })
      .catch(() => {});
    notify(liked ? "Removed from wishlist" : "Added to wishlist");
  };
  const updateQuantity = (id, amount) => {
    const item = cart.find((entry) => entry.product.id === id);
    const quantity = Math.max(1, (item?.quantity || 1) + amount);
    setCart((current) =>
      current.map((entry) =>
        entry.product.id === id ? { ...entry, quantity } : entry,
      ),
    );
    apiUpdateCartItem(id, quantity)
      .then((result) => setCart((current) => resolveCartItems(result.items, current)))
      .catch(() => {});
  };
  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.product.id !== id));
    apiRemoveCartItem(id)
      .then((result) => setCart((current) => resolveCartItems(result.items, current)))
      .catch(() => {});
  };
  const clearCart = () => apiClearCart().then(result => setCart(result.items || [])).catch(() => {});
  const clearWishlist = () => apiClearWishlist().then(result => {
    setWishlist(result.map(item => item.id));
    setWishlistProducts(result);
  }).catch(() => {});
  return {
    products,
    categories,
    cart,
    wishlist,
    wishlistProducts,
    toast,
    notify,
    addToCart,
    toggleWishlist,
    updateQuantity,
    removeItem,
    clearCart,
    clearWishlist,
    isAdmin: role === "admin",
  };
}
