<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="cart-title">Корзина</h1>

      <!-- Корзина не пустая -->
      <div v-if="cartItems.length" class="cart-layout">

        <!-- Список товаров -->
        <div class="cart-items">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="cart-item"
          >
            <img :src="item.image" :alt="item.name" class="cart-item__img" />

            <div class="cart-item__info">
              <router-link :to="`/product/${item.id}`" class="cart-item__name">
                {{ item.name }}
              </router-link>
              <p class="cart-item__brand">{{ item.brand }}</p>
            </div>

            <div class="cart-item__quantity">
              <button @click="decrease(item)">−</button>
              <span>{{ item.quantity }}</span>
              <button @click="increase(item)">+</button>
            </div>

            <div class="cart-item__price">
              {{ formatPrice(item.price * item.quantity) }} ₸
            </div>

            <button class="cart-item__remove" @click="remove(item.id)">
              ✕
            </button>
          </div>
        </div>

        <!-- Итого -->
        <div class="cart-summary">
          <h3>Итого</h3>

          <div class="cart-summary__row">
            <span>Товаров:</span>
            <span>{{ cartCount }} шт.</span>
          </div>

          <div class="cart-summary__row cart-summary__total">
            <span>Сумма:</span>
            <span>{{ formatPrice(cartTotal) }} ₸</span>
          </div>

          <button class="btn-checkout" @click="checkout">
            Оформить заказ
          </button>

          <router-link to="/catalog" class="btn-continue">
            ← Продолжить покупки
          </router-link>
        </div>

      </div>

      <!-- Корзина пустая -->
      <div v-else class="cart-empty">
        <p>🛒 Ваша корзина пуста</p>
        <router-link to="/catalog" class="btn-to-catalog">
          Перейти в каталог
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CartView',
  computed: {
    ...mapGetters(['cartItems', 'cartTotal', 'cartCount'])
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('ru-RU')
    },
    increase(item) {
      this.$store.dispatch('addToCart', item)
    },
    decrease(item) {
      this.$store.commit('DECREASE_QUANTITY', item.id)
    },
    remove(id) {
      this.$store.dispatch('removeFromCart', id)
    },
    checkout() {
      alert('Функция оформления заказа будет добавлена позже!')
    }
  }
}
</script>

<style scoped>
.cart-page {
  padding: var(--spacing-xl) 0;
}

.cart-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xl);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: var(--spacing-xl);
  align-items: start;
}

/* Товары */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cart-item {
  display: grid;
  grid-template-columns: 90px 1fr auto auto auto;
  align-items: center;
  gap: var(--spacing-md);
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-md);
}

.cart-item__img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: var(--border-radius-sm);
  background: #fafafa;
}

.cart-item__info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.cart-item__name {
  font-weight: 600;
  font-size: var(--font-size-base);
  color: var(--color-text);
  transition: var(--transition);
  line-height: 1.4;
}

.cart-item__name:hover {
  color: var(--color-primary);
}

.cart-item__brand {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

/* Количество */
.cart-item__quantity {
  display: flex;
  align-items: center;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.cart-item__quantity button {
  width: 36px;
  height: 36px;
  background: var(--color-bg);
  font-size: var(--font-size-lg);
  font-weight: 700;
  transition: var(--transition);
}

.cart-item__quantity button:hover {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.cart-item__quantity span {
  width: 40px;
  text-align: center;
  font-weight: 700;
}

.cart-item__price {
  font-weight: 700;
  font-size: var(--font-size-lg);
  white-space: nowrap;
  min-width: 120px;
  text-align: right;
}

.cart-item__remove {
  width: 32px;
  height: 32px;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  border-radius: 50%;
  transition: var(--transition);
}

.cart-item__remove:hover {
  background: #FFEBEE;
  color: var(--color-discount);
}

/* Итого */
.cart-summary {
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-lg);
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.cart-summary h3 {
  font-size: var(--font-size-xl);
  font-weight: 700;
  padding-bottom: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.cart-summary__total {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-border);
}

.btn-checkout {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
  font-size: var(--font-size-lg);
  font-weight: 700;
  transition: var(--transition);
}

.btn-checkout:hover {
  background: var(--color-primary-hover);
}

.btn-continue {
  display: block;
  text-align: center;
  color: var(--color-primary);
  font-weight: 500;
  transition: var(--transition);
}

.btn-continue:hover {
  opacity: 0.7;
}

/* Пустая корзина */
.cart-empty {
  text-align: center;
  padding: var(--spacing-xl) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
}

.btn-to-catalog {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  background: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: var(--font-size-lg);
  transition: var(--transition);
}

.btn-to-catalog:hover {
  background: var(--color-primary-hover);
}
</style>