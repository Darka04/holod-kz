<template>
  <div class="admin-page">
    <div class="container">

      <!-- Заголовок -->
      <div class="admin-header">
        <div>
          <h1>Панель администратора</h1>
          <p class="admin-subtitle">Управление товарами магазина</p>
        </div>
        <button class="btn-add" @click="openForm(null)">
          + Добавить товар
        </button>
      </div>

      <!-- Статистика -->
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-value">{{ products.length }}</div>
          <div class="stat-label">Всего товаров</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ inStockCount }}</div>
          <div class="stat-label">В наличии</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ outOfStockCount }}</div>
          <div class="stat-label">Нет в наличии</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ categories.length }}</div>
          <div class="stat-label">Категорий</div>
        </div>
      </div>

      <!-- Поиск и фильтр -->
      <div class="table-toolbar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск по названию или бренду..."
          class="search-input"
        />
        <select v-model="filterCategory" class="filter-select">
          <option value="">Все категории</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <!-- Таблица товаров -->
      <div class="table-wrapper">
        <table class="products-table">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Название</th>
              <th>Категория</th>
              <th>Бренд</th>
              <th>Цена</th>
              <th>Наличие</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="7" class="empty-row">Товары не найдены</td>
            </tr>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td>
                <img
                  :src="product.image || 'https://via.placeholder.com/60x60?text=No+Image'"
                  :alt="product.name"
                  class="product-thumb"
                />
              </td>
              <td class="product-name">{{ product.name }}</td>
              <td>
                <span class="badge-category">{{ product.category }}</span>
              </td>
              <td>{{ product.brand }}</td>
              <td class="product-price">{{ formatPrice(product.price) }} ₸</td>
              <td>
                <span :class="['badge-stock', product.inStock ? 'in-stock' : 'out-of-stock']">
                  {{ product.inStock ? 'В наличии' : 'Нет' }}
                </span>
              </td>
              <td>
                <div class="action-btns">
                  <button class="btn-edit" @click="openForm(product)" title="Редактировать">
                    ✏️
                  </button>
                  <button class="btn-delete" @click="confirmDelete(product)" title="Удалить">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <!-- Модальное окно формы -->
    <AdminProductForm
      v-if="showForm"
      :product="editingProduct"
      @close="closeForm"
      @save="handleSave"
    />

    <!-- Диалог подтверждения удаления -->
    <div v-if="deletingProduct" class="confirm-overlay" @click.self="deletingProduct = null">
      <div class="confirm-dialog">
        <h3>Удалить товар?</h3>
        <p>«{{ deletingProduct.name }}» будет удалён без возможности восстановления.</p>
        <div class="confirm-actions">
          <button class="btn-cancel" @click="deletingProduct = null">Отмена</button>
          <button class="btn-confirm-delete" @click="handleDelete">Удалить</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AdminProductForm from '@/components/AdminProductForm.vue'

export default {
  name: 'AdminView',
  components: { AdminProductForm },
  data() {
    return {
      showForm: false,
      editingProduct: null,
      deletingProduct: null,
      searchQuery: '',
      filterCategory: '',
    }
  },
  computed: {
    ...mapGetters(['allProducts']),
    products() {
      return this.allProducts
    },
    filteredProducts() {
      return this.products.filter(p => {
        const matchSearch =
          p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchCategory = !this.filterCategory || p.category === this.filterCategory
        return matchSearch && matchCategory
      })
    },
    categories() {
      return [...new Set(this.products.map(p => p.category))]
    },
    inStockCount() {
      return this.products.filter(p => p.inStock).length
    },
    outOfStockCount() {
      return this.products.filter(p => !p.inStock).length
    },
  },
  methods: {
    ...mapActions(['addProduct', 'updateProduct', 'deleteProduct']),
    openForm(product) {
      this.editingProduct = product
      this.showForm = true
    },
    closeForm() {
      this.showForm = false
      this.editingProduct = null
    },
    handleSave(formData) {
      if (this.editingProduct) {
        this.updateProduct({ ...formData, id: this.editingProduct.id })
      } else {
        this.addProduct(formData)
      }
      this.closeForm()
    },
    confirmDelete(product) {
      this.deletingProduct = product
    },
    handleDelete() {
      this.deleteProduct(this.deletingProduct.id)
      this.deletingProduct = null
    },
    formatPrice(price) {
      return price.toLocaleString('ru-RU')
    },
  },
}
</script>

<style scoped>
.admin-page {
  padding: 2rem 0;
  min-height: 80vh;
  background: #f8f9fa;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.admin-header h1 {
  font-size: 1.75rem;
  color: #1a1a2e;
  margin: 0 0 0.25rem;
}

.admin-subtitle {
  color: #666;
  margin: 0;
  font-size: 0.9rem;
}

.btn-add {
  padding: 0.7rem 1.5rem;
  background: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.btn-add:hover {
  background: #e55a00;
}

/* Статистика */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: #fff;
  border-radius: 10px;
  padding: 1.25rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
}

.stat-label {
  font-size: 0.82rem;
  color: #888;
  margin-top: 0.25rem;
}

/* Тулбар */
.table-toolbar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 0.9rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.filter-select {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  font-size: 0.9rem;
  background: #fff;
  cursor: pointer;
}

/* Таблица */
.table-wrapper {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  overflow: hidden;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table th {
  background: #f0f4ff;
  padding: 0.9rem 1rem;
  text-align: left;
  font-size: 0.82rem;
  font-weight: 700;
  color: #444;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e0e7ff;
}

.products-table td {
  padding: 0.85rem 1rem;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.9rem;
  vertical-align: middle;
}

.products-table tr:last-child td {
  border-bottom: none;
}

.products-table tr:hover td {
  background: #fafbff;
}

.product-thumb {
  width: 52px;
  height: 52px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #eee;
}

.product-name {
  font-weight: 600;
  color: #1a1a2e;
  max-width: 220px;
}

.product-price {
  font-weight: 700;
  color: var(--primary-color);
}

.badge-category {
  background: #e8f0fe;
  color: var(--primary-color);
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-stock {
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
}

.in-stock {
  background: #e8f5e9;
  color: #2e7d32;
}

.out-of-stock {
  background: #fce4ec;
  color: #c62828;
}

.action-btns {
  display: flex;
  gap: 0.4rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.15s;
}

.btn-edit:hover {
  background: #e8f0fe;
  border-color: var(--primary-color);
}

.btn-delete:hover {
  background: #fce4ec;
  border-color: #e53935;
}

.empty-row {
  text-align: center;
  color: #999;
  padding: 3rem !important;
  font-size: 0.95rem;
}

/* Подтверждение удаления */
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 380px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.confirm-dialog h3 {
  margin: 0 0 0.75rem;
  color: #1a1a2e;
  font-size: 1.15rem;
}

.confirm-dialog p {
  color: #555;
  margin: 0 0 1.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn-cancel {
  padding: 0.6rem 1.25rem;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-confirm-delete {
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  background: #e53935;
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-confirm-delete:hover {
  background: #c62828;
}

/* Адаптив */
@media (max-width: 768px) {
  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .admin-header {
    flex-direction: column;
    gap: 1rem;
  }

  .table-toolbar {
    flex-direction: column;
  }

  .products-table th:nth-child(3),
  .products-table td:nth-child(3),
  .products-table th:nth-child(4),
  .products-table td:nth-child(4) {
    display: none;
  }
}
</style>