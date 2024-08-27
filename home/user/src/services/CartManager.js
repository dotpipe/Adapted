export class CartManager {
    constructor() {
        this.cart = [];
    }

    addToCart(item, quantity) {
        const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ ...item, quantity });
        }
    }

    getCart() {
        return this.cart;
    }

    updateQuantity(itemId, newQuantity) {
        const item = this.cart.find(cartItem => cartItem.id === itemId);
        if (item) {
            item.quantity = newQuantity;
        }
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
    }

    getCartItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
}