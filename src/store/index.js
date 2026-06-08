import { createStore } from 'vuex'

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
        image: 'https://placehold.co/300x300?text=LG+Fridge',
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
        image: 'https://placehold.co/300x300?text=Midea+Freezer',
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
        image: 'https://placehold.co/300x300?text=Polair+Vitrina',
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
        image: 'https://placehold.co/300x300?text=Samsung+Fridge',
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
        image: 'https://placehold.co/300x300?text=Indesit+Lari',
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
        image: 'https://placehold.co/300x300?text=Liebherr+Shkaf',
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
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
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
    }
  }
})