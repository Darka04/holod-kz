<template>
  <div class="form-overlay" @click.self="$emit('close')">
    <div class="form-modal">
      <div class="form-header">
        <h2>{{ isEdit ? 'Редактировать товар' : 'Добавить товар' }}</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <div class="form-body">
        <div class="form-group">
          <label>Название *</label>
          <input v-model="form.name" type="text" placeholder="Например: Samsung RB38T600FSA" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Категория *</label>
            <select v-model="form.category">
              <option value="">Выберите категорию</option>
              <option value="Холодильники">Холодильники</option>
              <option value="Морозильники">Морозильники</option>
              <option value="Винные шкафы">Винные шкафы</option>
              <option value="Встраиваемые">Встраиваемые</option>
            </select>
            <span v-if="errors.category" class="error">{{ errors.category }}</span>
          </div>

          <div class="form-group">
            <label>Бренд *</label>
            <select v-model="form.brand">
              <option value="">Выберите бренд</option>
              <option value="Samsung">Samsung</option>
              <option value="LG">LG</option>
              <option value="Bosch">Bosch</option>
              <option value="Haier">Haier</option>
              <option value="Indesit">Indesit</option>
              <option value="Beko">Beko</option>
            </select>
            <span v-if="errors.brand" class="error">{{ errors.brand }}</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Цена (₸) *</label>
            <input v-model.number="form.price" type="number" min="0" placeholder="250000" />
            <span v-if="errors.price" class="error">{{ errors.price }}</span>
          </div>

          <div class="form-group">
            <label>Старая цена (₸)</label>
            <input v-model.number="form.oldPrice" type="number" min="0" placeholder="300000" />
          </div>
        </div>

        <div class="form-group">
          <label>URL изображения</label>
          <input v-model="form.image" type="text" placeholder="https://..." />
        </div>

        <div class="form-group">
          <label>Описание</label>
          <textarea v-model="form.description" rows="3" placeholder="Описание товара..."></textarea>
        </div>

        <div class="form-group checkbox-group">
          <label>
            <input v-model="form.inStock" type="checkbox" />
            В наличии
          </label>
        </div>
      </div>

      <div class="form-footer">
        <button class="btn-cancel" @click="$emit('close')">Отмена</button>
        <button class="btn-save" @click="handleSubmit">
          {{ isEdit ? 'Сохранить' : 'Добавить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminProductForm',
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  emits: ['close', 'save'],
  data() {
    return {
      form: {
        name: '',
        category: '',
        brand: '',
        price: '',
        oldPrice: '',
        image: '',
        description: '',
        inStock: true,
      },
      errors: {},
    }
  },
  computed: {
    isEdit() {
      return !!this.product
    },
  },
  created() {
    if (this.product) {
      this.form = { ...this.product }
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.form.name.trim()) this.errors.name = 'Введите название'
      if (!this.form.category) this.errors.category = 'Выберите категорию'
      if (!this.form.brand) this.errors.brand = 'Выберите бренд'
      if (!this.form.price || this.form.price <= 0) this.errors.price = 'Введите корректную цену'
      return Object.keys(this.errors).length === 0
    },
    handleSubmit() {
      if (!this.validate()) return
      this.$emit('save', { ...this.form })
    },
  },
}
</script>

<style scoped>
.form-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.form-modal {
  background: #fff;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.form-header h2 {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.form-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.checkbox-group label {
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-group input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.error {
  font-size: 0.78rem;
  color: #e53935;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e0e0e0;
}

.btn-cancel {
  padding: 0.6rem 1.25rem;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  color: #555;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-save {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  background: var(--primary-color);
  color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-save:hover {
  background: #1976d2;
}
</style>