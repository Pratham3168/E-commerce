export default function useWishlist(state) {
  return {
    ids: state.wishlist,
    toggleWishlist: state.toggleWishlist,
  }
}
