<template>
  <div class="product-card">

    <!-- Бейдж скидки -->
    <div v-if="discountPercent" class="product-card__badge">
      -{{ discountPercent }}%
    </div>

    <!-- Фото -->
    <router-link :to="`/product/${product.id}`">
      <img :src="product.image" :alt="product.name" class="product-card__img" />
    </router-link>

    <!-- Инфо -->
    <div class="product-card__body">
      <router-link :to="`/product/${product.id}`">
        <h3 class="product-card__name">{{ product.name }}</h3>
      </router-link>

      <!-- Рейтинг -->
      <div class="product-card__rating">
        <span class="stars">★ {{ product.rating }}</span>
        <span class="reviews">({{ product.reviews }})</span>
      </div>

      <!-- Цена -->
      <div class="product-card__price">
        <span class="price-current">{{ formatPrice(product.price) }} ₸</span>
        <span v-if="product.oldPrice" class="price-old">
          {{ formatPrice(product.oldPrice) }} ₸
        </span>
      </div>

      <!-- Кнопка -->
      <button
        class="btn-cart"
        :disabled="!product.inStock"
        @click="addToCart"
      >
        {{ product.inStock ? 'В корзину' : 'Нет в наличии' }}
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    discountPercent() {
      if (!this.product.oldPrice) return null
      return Math.round((1 - this.product.price / this.product.oldPrice) * 100)
    }
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString('ru-RU')
    },
    addToCart() {
      this.$store.dispatch('addToCart', this.product)
    }
  }
}
</script>

<style scoped>
.product-card {
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  position: relative;
  transition: var(--transition);
}

.product-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

.product-card__badge {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  background: var(--color-discount);
  color: white;
  font-size: var(--font-size-sm);
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--border-radius-sm);
  z-index: 1;
}

.product-card__img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  padding: var(--spacing-md);
  background: #fafafa;
}

.product-card__body {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.product-card__name {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
  transition: var(--transition);
}

.product-card__name:hover {
  color: var(--color-primary);
}

.product-card__rating {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.stars {
  color: #FFC107;
  font-weight: 600;
}

.reviews {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.product-card__price {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.price-current {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-text);
}

.price-old {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: line-through;
}

.btn-cart {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-primary);
  color: white;
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  font-weight: 600;
  transition: var(--transition);
}

.btn-cart:hover:not(:disabled) {
  background: var(--color-primary-hover);
}

.btn-cart:disabled {
  background: var(--color-border);
  color: var(--color-text-secondary);
  cursor: not-allowed;
}
</style>