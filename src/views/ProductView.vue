<template>
  <div class="product-page">
    <div class="container">

      <!-- Назад -->
      <router-link to="/catalog" class="back-link">
        ← Вернуться в каталог
      </router-link>

      <div v-if="product" class="product-layout">

        <!-- Фото -->
        <div class="product-gallery">
          <img :src="product.image" :alt="product.name" />
          <div v-if="discountPercent" class="product-badge">
            -{{ discountPercent }}%
          </div>
        </div>

        <!-- Инфо -->
        <div class="product-info">

          <p class="product-category">{{ product.category }}</p>
          <h1 class="product-name">{{ product.name }}</h1>

          <!-- Рейтинг -->
          <div class="product-rating">
            <span class="stars">★ {{ product.rating }}</span>
            <span class="reviews">{{ product.reviews }} отзывов</span>
          </div>

          <!-- Цена -->
          <div class="product-price">
            <span class="price-current">{{ formatPrice(product.price) }} ₸</span>
            <span v-if="product.oldPrice" class="price-old">
              {{ formatPrice(product.oldPrice) }} ₸
            </span>
          </div>

          <!-- Описание -->
          <p class="product-description">{{ product.description }}</p>

          <!-- Наличие -->
          <p class="product-stock" :class="product.inStock ? 'in-stock' : 'out-stock'">
            {{ product.inStock ? '✓ Есть в наличии' : '✗ Нет в наличии' }}
          </p>

          <!-- Количество + кнопка -->
          <div class="product-actions">
            <div class="quantity-control">
              <button @click="decreaseQty">−</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQty">+</button>
            </div>
            <button
              class="btn-add-cart"
              :disabled="!product.inStock"
              @click="addToCart"
            >
              🛒 В корзину
            </button>
          </div>

          <!-- Уведомление -->
          <div v-if="added" class="product-added">
            ✓ Товар добавлен в корзину!
          </div>

          <!-- Характеристики -->
          <div class="product-specs">
            <h3>Характеристики</h3>
            <table>
              <tr>
                <td>Бренд</td>
                <td>{{ product.brand }}</td>
              </tr>
              <tr>
                <td>Категория</td>
                <td>{{ product.category }}</td>
              </tr>
              <tr>
                <td>Рейтинг</td>
                <td>★ {{ product.rating }}</td>
              </tr>
              <tr>
                <td>Наличие</td>
                <td>{{ product.inStock ? 'Есть' : 'Нет' }}</td>
              </tr>
            </table>
          </div>

        </div>
      </div>

      <!-- Товар не найден -->
      <div v-else class="not-found">
        <p>😔 Товар не найден</p>
        <router-link to="/catalog" class="btn-reset">В каталог</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductView',
  data() {
    return {
      quantity: 1,
      added: false
    }
  },
  computed: {
    ...mapGetters(['allProducts']),
    product() {
      const id = parseInt(this.$route.params.id)
      return this.allProducts.find(p => p.id === id) || null
    },
    discountPercent() {
      if (!this.product?.oldPrice) return null
      return Math.round((1 - this.product.price / this.product.oldPrice) * 100)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('ru-RU')
    },
    increaseQty() {
      this.quantity++
    },
    decreaseQty() {
      if (this.quantity > 1) this.quantity--
    },
    addToCart() {
      for (let i = 0; i < this.quantity; i++) {
        this.$store.dispatch('addToCart', this.product)
      }
      this.added = true
      setTimeout(() => { this.added = false }, 2500)
    }
  }
}
</script>

<style scoped>
.product-page {
  padding: var(--spacing-xl) 0;
}

.back-link {
  display: inline-block;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: var(--spacing-lg);
  transition: var(--transition);
}

.back-link:hover {
  opacity: 0.7;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

/* Галерея */
.product-gallery {
  position: relative;
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.product-gallery img {
  width: 100%;
  height: 420px;
  object-fit: contain;
  padding: var(--spacing-xl);
}

.product-badge {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
  background: var(--color-discount);
  color: white;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-lg);
}

/* Инфо */
.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.product-category {
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-name {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.3;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stars {
  color: #FFC107;
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.reviews {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.product-price {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.price-current {
  font-size: 32px;
  font-weight: 700;
}

.price-old {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  text-decoration: line-through;
}

.product-description {
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.product-stock {
  font-weight: 600;
}

.in-stock { color: var(--color-success); }
.out-stock { color: var(--color-discount); }

/* Действия */
.product-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 2px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.quantity-control button {
  width: 40px;
  height: 44px;
  background: var(--color-bg);
  font-size: var(--font-size-lg);
  font-weight: 700;
  transition: var(--transition);
}

.quantity-control button:hover {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.quantity-control span {
  width: 48px;
  text-align: center;
  font-weight: 700;
  font-size: var(--font-size-lg);
}

.btn-add-cart {
  flex: 1;
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
  font-size: var(--font-size-lg);
  font-weight: 700;
  transition: var(--transition);
}

.btn-add-cart:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.btn-add-cart:disabled {
  background: var(--color-border);
  color: var(--color-text-secondary);
  cursor: not-allowed;
}

.product-added {
  background: #E8F5E9;
  color: var(--color-success);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  font-weight: 600;
}

/* Характеристики */
.product-specs h3 {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

.product-specs table {
  width: 100%;
  border-collapse: collapse;
}

.product-specs td {
  padding: var(--spacing-sm) var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-base);
}

.product-specs td:first-child {
  color: var(--color-text-secondary);
  width: 40%;
}

/* Не найден */
.not-found {
  text-align: center;
  padding: var(--spacing-xl);
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.btn-reset {
  padding: var(--spacing-sm) var(--spacing-xl);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: var(--border-radius);
  font-weight: 600;
  transition: var(--transition);
}

.btn-reset:hover {
  background: var(--color-primary);
  color: white;
}
</style>