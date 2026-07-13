const recalculateCart = (cart) => {
    cart.totalItems = cart.items.reduce(
        (total,item) => total + item.quantity, 0
    );

    cart.totalPrice = cart.items.reduce(
        (total,item) => total + item.quantity * item.priceAtAddition,0
    );
};

export default recalculateCart;