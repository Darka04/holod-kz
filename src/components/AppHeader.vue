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
        />
        <button>🔍</button>
      </div>

      <!-- Навигация -->
      <nav class="header__nav">
        <router-link to="/catalog">Каталог</router-link>
        <router-link to="/cart" class="header__cart">
          🛒 Корзина
        </router-link>
        <router-link to="/login">Войти</router-link>
      </nav>

    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      searchQuery: ''
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
  background-color: var(--color-primary);
  color: var(--color-white) !important;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.header__cart:hover {
  background-color: var(--color-primary-hover) !important;
}
</style>