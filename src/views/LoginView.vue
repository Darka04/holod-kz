<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Вкладки -->
      <div class="tabs">
        <button
          class="tab"
          :class="{ active: activeTab === 'login' }"
          @click="activeTab = 'login'"
        >
          Войти
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'register' }"
          @click="activeTab = 'register'"
        >
          Зарегистрироваться
        </button>
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
      <!-- Сообщение об успехе -->
      <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>

      <!-- Форма входа -->
      <div v-if="activeTab === 'login'" class="form">
        <h2>Вход в аккаунт</h2>
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="loginForm.email"
            type="email"
            placeholder="example@mail.com"
            @keyup.enter="handleLogin"
          />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="Введите пароль"
            @keyup.enter="handleLogin"
          />
        </div>
        <button class="btn-submit" @click="handleLogin" :disabled="loading">
          {{ loading ? 'Входим...' : 'Войти' }}
        </button>
        <p class="switch-hint">
          Нет аккаунта?
          <span @click="activeTab = 'register'">Зарегистрироваться</span>
        </p>
      </div>

      <!-- Форма регистрации -->
      <div v-if="activeTab === 'register'" class="form">
        <h2>Регистрация</h2>
        <div class="form-group">
          <label>Имя</label>
          <input
            v-model="registerForm.name"
            type="text"
            placeholder="Ваше имя"
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="registerForm.email"
            type="email"
            placeholder="example@mail.com"
          />
        </div>
        <div class="form-group">
          <label>Пароль</label>
          <input
            v-model="registerForm.password"
            type="password"
            placeholder="Минимум 6 символов"
          />
        </div>
        <div class="form-group">
          <label>Повторите пароль</label>
          <input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            @keyup.enter="handleRegister"
          />
        </div>
        <button class="btn-submit" @click="handleRegister" :disabled="loading">
          {{ loading ? 'Регистрируем...' : 'Зарегистрироваться' }}
        </button>
        <p class="switch-hint">
          Уже есть аккаунт?
          <span @click="activeTab = 'login'">Войти</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginView',
  data() {
    return {
      activeTab: 'login',
      loading: false,
      errorMsg: '',
      successMsg: '',
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
  },
  mounted() {
    // Если уже залогинен — редиректим на главную
    if (this.isLoggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),

    clearMessages() {
      this.errorMsg = ''
      this.successMsg = ''
    },

    async handleLogin() {
      this.clearMessages()
      const { email, password } = this.loginForm

      if (!email || !password) {
        this.errorMsg = 'Заполните все поля'
        return
      }

      this.loading = true
      try {
        await this.login({ email, password })
        this.successMsg = 'Вы успешно вошли!'
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

      if (!name || !email || !password || !confirmPassword) {
        this.errorMsg = 'Заполните все поля'
        return
      }
      if (password.length < 6) {
        this.errorMsg = 'Пароль должен быть минимум 6 символов'
        return
      }
      if (password !== confirmPassword) {
        this.errorMsg = 'Пароли не совпадают'
        return
      }

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
    },
  },
}
</script>

<style scoped>
.login-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  padding: 40px 16px;
}

.login-container {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 440px;
  overflow: hidden;
}

.tabs {
  display: flex;
}

.tab {
  flex: 1;
  padding: 16px;
  border: none;
  background: #f0f4ff;
  color: #666;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
}

.tab.active {
  background: #fff;
  color: var(--primary-color, #1565c0);
  border-bottom-color: var(--primary-color, #1565c0);
}

.form {
  padding: 32px;
}

.form h2 {
  margin: 0 0 24px;
  font-size: 20px;
  color: #1a1a1a;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #555;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color, #1565c0);
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--primary-color, #1565c0);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 4px;
}

.btn-submit:hover:not(:disabled) {
  background: #1251a3;
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error-msg {
  margin: 0 32px;
  padding: 10px 14px;
  background: #fff0f0;
  border: 1px solid #ffcccc;
  border-radius: 8px;
  color: #c0392b;
  font-size: 13px;
  margin-top: 16px;
}

.success-msg {
  margin: 0 32px;
  padding: 10px 14px;
  background: #f0fff4;
  border: 1px solid #b2f0c8;
  border-radius: 8px;
  color: #27ae60;
  font-size: 13px;
  margin-top: 16px;
}

.switch-hint {
  text-align: center;
  margin-top: 16px;
  font-size: 13px;
  color: #888;
}

.switch-hint span {
  color: var(--primary-color, #1565c0);
  cursor: pointer;
  font-weight: 500;
}

.switch-hint span:hover {
  text-decoration: underline;
}
</style>