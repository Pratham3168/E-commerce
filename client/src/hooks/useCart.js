export default function useCart(state) {
  return {
    items: state.cart,
    updateQuantity: state.updateQuantity,
    removeItem: state.removeItem,
    addToCart: state.addToCart,
  }
}
