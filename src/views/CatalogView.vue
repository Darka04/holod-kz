<template>
  <div class="catalog-page">
    <div class="container catalog-layout">

      <!-- Фильтры -->
      <aside class="filters">
        <h3 class="filters__title">Фильтры</h3>

        <!-- Категория -->
        <div class="filter-group">
          <h4>Категория</h4>
          <label v-for="cat in categories" :key="cat">
            <input
              type="checkbox"
              :value="cat"
              v-model="selectedCategories"
            />
            {{ cat }}
          </label>
        </div>

        <!-- Бренд -->
        <div class="filter-group">
          <h4>Бренд</h4>
          <label v-for="brand in brands" :key="brand">
            <input
              type="checkbox"
              :value="brand"
              v-model="selectedBrands"
            />
            {{ brand }}
          </label>
        </div>

        <!-- Цена -->
        <div class="filter-group">
          <h4>Цена (₸)</h4>
          <div class="price-inputs">
            <input
              type="number"
              placeholder="От"
              v-model.number="priceMin"
            />
            <span>—</span>
            <input
              type="number"
              placeholder="До"
              v-model.number="priceMax"
            />
          </div>
        </div>

        <!-- Сбросить -->
        <button class="btn-reset" @click="resetFilters">
          Сбросить фильтры
        </button>
      </aside>

      <!-- Товары -->
      <div class="catalog-main">

        <!-- Шапка каталога -->
        <div class="catalog-header">
          <h2>Каталог <span>({{ filteredProducts.length }})</span></h2>
          <select v-model="sortBy">
            <option value="default">По умолчанию</option>
            <option value="price-asc">Цена: по возрастанию</option>
            <option value="price-desc">Цена: по убыванию</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>

        <!-- Сетка товаров -->
        <div v-if="filteredProducts.length" class="products-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Пусто -->
        <div v-else class="catalog-empty">
          <p>😔 Товары не найдены. Попробуйте изменить фильтры.</p>
          <button class="btn-reset" @click="resetFilters">Сбросить фильтры</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CatalogView',
  components: { ProductCard },
  data() {
    return {
      selectedCategories: [],
      selectedBrands: [],
      priceMin: null,
      priceMax: null,
      sortBy: 'default'
    }
  },
  computed: {
    ...mapGetters(['allProducts']),
    categories() {
      return [...new Set(this.allProducts.map(p => p.category))]
    },
    brands() {
      return [...new Set(this.allProducts.map(p => p.brand))]
    },
    filteredProducts() {
      let result = [...this.allProducts]

      if (this.selectedCategories.length) {
        result = result.filter(p => this.selectedCategories.includes(p.category))
      }

      if (this.selectedBrands.length) {
        result = result.filter(p => this.selectedBrands.includes(p.brand))
      }

      if (this.priceMin) {
        result = result.filter(p => p.price >= this.priceMin)
      }

      if (this.priceMax) {
        result = result.filter(p => p.price <= this.priceMax)
      }

      if (this.sortBy === 'price-asc') {
        result.sort((a, b) => a.price - b.price)
      } else if (this.sortBy === 'price-desc') {
        result.sort((a, b) => b.price - a.price)
      } else if (this.sortBy === 'rating') {
        result.sort((a, b) => b.rating - a.rating)
      }

      return result
    }
  },
  methods: {
    resetFilters() {
      this.selectedCategories = []
      this.selectedBrands = []
      this.priceMin = null
      this.priceMax = null
      this.sortBy = 'default'
    }
  }
}
</script>

<style scoped>
.catalog-page {
  padding: var(--spacing-xl) 0;
}

.catalog-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

/* Фильтры */
.filters {
  background: var(--color-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: var(--spacing-lg);
  position: sticky;
  top: 90px;
}

.filters__title {
  font-size: var(--font-size-lg);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: var(--color-primary);
}

.filter-group {
  margin-bottom: var(--spacing-lg);
}

.filter-group h4 {
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text);
}

.filter-group label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) 0;
  cursor: pointer;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

.filter-group input[type="checkbox"] {
  accent-color: var(--color-primary);
  width: 16px;
  height: 16px;
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.price-inputs input {
  width: 100%;
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  outline: none;
}

.price-inputs input:focus {
  border-color: var(--color-primary);
}

.btn-reset {
  width: 100%;
  padding: var(--spacing-sm);
  background: transparent;
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

/* Каталог */
.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.catalog-header h2 {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.catalog-header h2 span {
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
  font-weight: 400;
}

.catalog-header select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
  outline: none;
  cursor: pointer;
}

.catalog-header select:focus {
  border-color: var(--color-primary);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--spacing-lg);
}

.catalog-empty {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.catalog-empty .btn-reset {
  width: auto;
  padding: var(--spacing-sm) var(--spacing-xl);
}
</style>