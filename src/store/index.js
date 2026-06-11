import { createStore } from 'vuex'
import auth from './modules/auth'

export default createStore({
  state: {
    products: [
  {
    id: 1,
    name: 'Холодильник LG GC-B459SMUM',
    category: 'Холодильники',
    brand: 'LG',
    price: 189990,
    oldPrice: 220000,
    rating: 4.8,
    reviews: 24,
    image: 'https://api.technodom.kz/f3/api/v1/images/800/800/264250_8.jpg',
    description: 'Двухкамерный холодильник с системой No Frost. Объём 374 л.',
    inStock: true
  },
  {
    id: 2,
    name: 'Морозильник Midea MDRC453FZF01D',
    category: 'Морозильники',
    brand: 'Midea',
    price: 99990,
    oldPrice: 139990,
    rating: 5,
    reviews: 16,
    image: 'https://api.technodom.kz/f3/api/v1/images/292355_1.jpg',
    description: 'Вместительный морозильник объёмом 280 л.',
    inStock: true
  },
  {
    id: 3,
    name: 'Витрина холодильная Polair ШХ-0.5',
    category: 'Витрины',
    brand: 'Polair',
    price: 320000,
    oldPrice: null,
    rating: 4.5,
    reviews: 8,
    image: 'https://icegroup.kz/themes/images/products/holod_shkaf/polair/polair_db107s_1.webp',
    description: 'Холодильная витрина для магазинов и кафе.',
    inStock: true
  },
  {
    id: 4,
    name: 'Холодильник Samsung RB37A5200WW',
    category: 'Холодильники',
    brand: 'Samsung',
    price: 215000,
    oldPrice: 250000,
    rating: 4.7,
    reviews: 31,
    image: 'https://tgrad.kz/upload/iblock/3ed/3edac318b86e82c4cf10fbb7136b5730.png',
    description: 'Холодильник с большим дисплеем и No Frost.',
    inStock: true
  },
  {
    id: 5,
    name: 'Ларь морозильный Indesit OS 1A 100',
    category: 'Морозильники',
    brand: 'Indesit',
    price: 74990,
    oldPrice: 89990,
    rating: 4.3,
    reviews: 12,
    image: 'https://e-katalog.kz/jpg/649140.jpg',
    description: 'Горизонтальный морозильный ларь объёмом 90 л.',
    inStock: false
  },
  {
    id: 6,
    name: 'Шкаф холодильный Liebherr GKv 4310',
    category: 'Шкафы',
    brand: 'Liebherr',
    price: 450000,
    oldPrice: null,
    rating: 5,
    reviews: 5,
    image: 'https://system4.ua/images/product/product_39051_186567/300',
    description: 'Профессиональный холодильный шкаф для HoReCa.',
    inStock: true
  }
],
    cart: [],
    searchQuery: ''
  },

  getters: {
    allProducts: state => state.products,
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartCount: state => state.cart.reduce((sum, item) => sum + item.quantity, 0),
    searchQuery: state => state.searchQuery
  },

  mutations: {
    ADD_TO_CART(state, product) {
      const existing = state.cart.find(item => item.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    DECREASE_QUANTITY(state, productId) {
      const item = state.cart.find(item => item.id === productId)
      if (item) {
        if (item.quantity > 1) {
          item.quantity--
        } else {
          state.cart = state.cart.filter(i => i.id !== productId)
        }
      }
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },

    // ✅ CRUD для админки
    ADD_PRODUCT(state, product) {
      state.products.push({
        ...product,
        id: Date.now(),
        rating: 0,
        reviews: 0
      })
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex(p => p.id === updatedProduct.id)
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct)
      }
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter(p => p.id !== productId)
    }
  },

  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query)
    },

    // ✅ CRUD экшены для админки
    addProduct({ commit }, product) {
      commit('ADD_PRODUCT', product)
    },
    updateProduct({ commit }, product) {
      commit('UPDATE_PRODUCT', product)
    },
    deleteProduct({ commit }, productId) {
      commit('DELETE_PRODUCT', productId)
    }
  },

  modules: {
    auth
  }
})