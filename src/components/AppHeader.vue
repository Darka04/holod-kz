<template>
  <header class="header">
    <div class="container header__inner">

      <!-- Логотип -->
      <router-link to="/" class="header__logo">
        Holod<span>.kz</span>
      </router-link>

      <!-- Поиск -->
      <div class="header__search">
        <input
          type="text"
          placeholder="Поиск холодильного оборудования..."
          v-model="searchQuery"
          @keyup.enter="handleSearch"
        />
        <button @click="handleSearch">🔍</button>
      </div>

      <!-- Навигация -->
      <nav class="header__nav">
        <router-link to="/catalog">Каталог</router-link>
        <router-link to="/cart" class="header__cart">
          🛒 Корзина
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </router-link>

        <router-link v-if="!isLoggedIn" to="/login">Войти</router-link>

        <div v-else class="header__user">
          <span class="header__username">👤 {{ currentUser.name }}</span>
          <button class="header__logout" @click="handleLogout">Выйти</button>
        </div>
      </nav>

    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapGetters(['cartCount']),
    ...mapGetters('auth', ['isLoggedIn', 'currentUser'])
  },
  methods: {
    ...mapActions(['setSearchQuery']),
    ...mapActions('auth', ['logout']),
    handleSearch() {
      this.setSearchQuery(this.searchQuery)
      if (this.$route.name !== 'catalog') {
        this.$router.push('/catalog')
      }
    },
    async handleLogout() {
      await this.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.header {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header__inner {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  height: 70px;
}

.header__logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-primary);
  white-space: nowrap;
}

.header__logo span {
  color: var(--color-accent);
}

.header__search {
  flex: 1;
  display: flex;
  border: 2px solid var(--color-primary);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.header__search input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  outline: none;
  font-size: var(--font-size-base);
}

.header__search button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-base);
  transition: var(--transition);
}

.header__search button:hover {
  background-color: var(--color-primary-hover);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  white-space: nowrap;
}

.header__nav a {
  color: var(--color-text);
  font-weight: 500;
  transition: var(--transition);
}

.header__nav a:hover,
.header__nav a.router-link-active {
  color: var(--color-primary);
}

.header__cart {
  display: flex;
  align-items: center;
  background-color: var(--color-primary);
  color: var(--color-white) !important;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.header__cart:hover {
  background-color: var(--color-primary-hover) !important;
}

.cart-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-accent);
  color: white;
  font-size: 11px;
  font-weight: 700;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: var(--spacing-xs);
}

.header__user {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.header__username {
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-primary);
}

.header__logout {
  background: transparent;
  border: 1.5px solid var(--color-primary);
  color: var(--color-primary);
  padding: 5px 12px;
  border-radius: var(--border-radius);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.header__logout:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
}
</style>