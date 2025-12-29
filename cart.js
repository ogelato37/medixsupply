// Cart Logic

const CART_KEY = 'medix_cart';

export const cart = {
    items: [],

    init() {
        const stored = localStorage.getItem(CART_KEY);
        if (stored) {
            this.items = JSON.parse(stored);
        }
        this.updateCounter();
    },

    save() {
        localStorage.setItem(CART_KEY, JSON.stringify(this.items));
        this.updateCounter();
    },

    add(product, qty = 1) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.qty += qty;
        } else {
            this.items.push({ ...product, qty });
        }
        this.save();
        // UI should handle notification
    },

    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
    },

    updateQty(id, qty) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.qty = parseInt(qty);
            if (item.qty <= 0) {
                this.remove(id);
            } else {
                this.save();
            }
        }
    },

    clear() {
        this.items = [];
        this.save();
    },

    total() {
        return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
    },

    count() {
        return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    updateCounter() {
        const counter = document.getElementById('cartCount');
        if (counter) {
            counter.textContent = this.count();
        }
    }
};

// Auto-init if running in browser
if (typeof window !== 'undefined') {
    cart.init();
}
