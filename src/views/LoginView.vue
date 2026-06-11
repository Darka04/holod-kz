<template>
  <div class="login-page">
    <div class="login-container">

      <!-- Вкладки -->
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'login' }"
          @click="switchTab('login')"
        >
          Войти
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'register' }"
          @click="switchTab('register')"
        >
          Зарегистрироваться
        </button>
      </div>

      <div v-if="errorMsg" class="msg msg--error">{{ errorMsg }}</div>
      <div v-if="successMsg" class="msg msg--success">{{ successMsg }}</div>

      <!-- ФОРМА ВХОДА -->
      <div v-if="activeTab === 'login'" class="form">
        <h2>Вход в аккаунт</h2>
        <div class="form-group">
          <label>Email</label>
          <input v-model="loginForm.email" type="email" placeholder="example@mail.com" @keyup.enter="handleLogin" />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="loginForm.password" type="password" placeholder="Введите пароль" @keyup.enter="handleLogin" />
        </div>
        <button class="btn-submit" @click="handleLogin" :disabled="loading">
          {{ loading ? 'Входим...' : 'Войти' }}
        </button>
        <p class="switch-hint">
          Нет аккаунта? <span @click="switchTab('register')">Зарегистрироваться</span>
        </p>
      </div>

      <!-- ФОРМА РЕГИСТРАЦИИ -->
      <div v-if="activeTab === 'register'" class="form">
        <h2>Регистрация</h2>
        <div class="form-group">
          <label>Имя</label>
          <input v-model="registerForm.name" type="text" placeholder="Ваше имя" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="registerForm.email" type="email" placeholder="example@mail.com" />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="registerForm.password" type="password" placeholder="Минимум 6 символов" />
        </div>
        <div class="form-group">
          <label>Повторите пароль</label>
          <input v-model="registerForm.confirmPassword" type="password" placeholder="Повторите пароль" @keyup.enter="handleRegister" />
        </div>
        <button class="btn-submit" @click="handleRegister" :disabled="loading">
          {{ loading ? 'Регистрируем...' : 'Зарегистрироваться' }}
        </button>
        <p class="switch-hint">
          Уже есть аккаунт? <span @click="switchTab('login')">Войти</span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      activeTab: 'login',
      loading: false,
      errorMsg: '',
      successMsg: '',
      loginForm: { email: '', password: '' },
      registerForm: { name: '', email: '', password: '', confirmPassword: '' }
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  mounted() {
    if (this.isLoggedIn) this.$router.push('/')
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),
    switchTab(tab) {
      this.activeTab = tab
      this.errorMsg = ''
      this.successMsg = ''
    },
    clearMessages() {
      this.errorMsg = ''
      this.successMsg = ''
    },
    async handleLogin() {
      this.clearMessages()
      const { email, password } = this.loginForm
      if (!email || !password) { this.errorMsg = 'Заполните все поля'; return }
      this.loading = true
      try {
        await this.login({ email, password })
        this.successMsg = 'Вы успешно вошли! Перенаправляем...'
        setTimeout(() => this.$router.push('/'), 800)
      } catch (e) {
        this.errorMsg = e.message
      } finally {
        this.loading = false
      }
    },
    async handleRegister() {
      this.clearMessages()
      const { name, email, password, confirmPassword } = this.registerForm
      if (!name || !email || !password || !confirmPassword) { this.errorMsg = 'Заполните все поля'; return }
      if (password.length < 6) { this.errorMsg = 'Пароль минимум 6 символов'; return }
      if (password !== confirmPassword) { this.errorMsg = 'Пароли не совпадают'; return }
      this.loading = true
      try {
        await this.register({ name, email, password })
        this.successMsg = 'Аккаунт создан! Перенаправляем...'
        setTimeout(() => this.$router.push('/'), 800)
      } catch (e) {
        this.errorMsg = e.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
  padding: 40px 16px;
}
.login-container {
  background: var(--color-white);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 440px;
  overflow: hidden;
}
.tabs { display: flex; }
.tab {
  flex: 1;
  padding: 16px;
  border: none;
  background: #f0f4ff;
  color: #888;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  border-bottom: 3px solid transparent;
}
.tab.active {
  background: var(--color-white);
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
.tab:hover:not(.active) { color: var(--color-primary); }
.msg {
  margin: 16px 32px 0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
}
.msg--error { background: #fff0f0; border: 1px solid #ffcccc; color: #c0392b; }
.msg--success { background: #f0fff4; border: 1px solid #b2f0c8; color: #27ae60; }
.form { padding: 28px 32px 32px; }
.form h2 { margin: 0 0 24px; font-size: 20px; color: var(--color-text); }
.form-group { margin-bottom: 16px; }
.form-group label { display: block; font-size: 13px; font-weight: 500; color: #555; margin-bottom: 6px; }
.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--border-radius);
  font-size: 14px;
  transition: var(--transition);
  box-sizing: border-box;
  outline: none;
}
.form-group input:focus { border-color: var(--color-primary); }
.btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 8px;
}
.btn-submit:hover:not(:disabled) { background: var(--color-primary-hover); }
.btn-submit:disabled { opacity: 0.65; cursor: not-allowed; }
.switch-hint { text-align: center; margin-top: 16px; font-size: 13px; color: #888; }
.switch-hint span { color: var(--color-primary); font-weight: 500; cursor: pointer; }
.switch-hint span:hover { text-decoration: underline; }
</style>