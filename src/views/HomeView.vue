<template>
  <div class="home">

    <!-- Баннер -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__text">
          <h1>Холодильное оборудование для бизнеса и дома</h1>
          <p>Холодильники, морозильники, витрины и шкафы от ведущих брендов</p>
          <router-link to="/catalog" class="hero__btn">Перейти в каталог</router-link>
        </div>
      </div>
    </section>

    <!-- Категории -->
    <section class="categories">
      <div class="container">
        <h2 class="section-title">Категории</h2>
        <div class="categories__list">
          <router-link
            v-for="cat in categories"
            :key="cat.name"
            to="/catalog"
            class="category-tag"
          >
            {{ cat.icon }} {{ cat.name }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- Популярные товары -->
    <section class="popular">
      <div class="container">
        <h2 class="section-title">Популярные товары</h2>
        <div class="products-grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: { ProductCard },
  data() {
    return {
      categories: [
        { name: 'Холодильники', icon: '🧊' },
        { name: 'Морозильники', icon: '❄️' },
        { name: 'Витрины', icon: '🏪' },
        { name: 'Шкафы', icon: '🚪' }
      ]
    }
  },
  computed: {
    ...mapGetters(['allProducts']),
    products() {
      return this.allProducts
    }
  }
}
</script>

<style scoped>
/* Герой */
.hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, #0D47A1 100%);
  color: white;
  padding: var(--spacing-xl) 0;
}

.hero__inner {
  display: flex;
  align-items: center;
}

.hero__text h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  line-height: 1.3;
}

.hero__text p {
  font-size: var(--font-size-lg);
  opacity: 0.9;
  margin-bottom: var(--spacing-lg);
}

.hero__btn {
  display: inline-block;
  background: var(--color-accent);
  color: white;
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius);
  font-weight: 700;
  font-size: var(--font-size-lg);
  transition: var(--transition);
}

.hero__btn:hover {
  background: #e65100;
}

/* Категории */
.categories {
  padding: var(--spacing-xl) 0 0;
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
}

.categories__list {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.category-tag {
  background: var(--color-white);
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 999px;
  font-weight: 600;
  transition: var(--transition);
}

.category-tag:hover {
  background: var(--color-primary);
  color: white;
}

/* Товары */
.popular {
  padding: var(--spacing-xl) 0;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--spacing-lg);
}
</style>