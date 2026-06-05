<template>
  <footer class="footer">
    <div class="container footer__inner">
      <span class="footer__logo">Holod<span>.kz</span></span>
      <p class="footer__copy">© 2025 Holod.kz — Холодильное оборудование</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background-color: var(--color-white);
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-lg) 0;
}

.footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__logo {
  font-size: var(--font-size-lg);
  font-weight: 700;
  color: var(--color-primary);
}

.footer__logo span {
  color: var(--color-accent);
}

.footer__copy {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}
</style>