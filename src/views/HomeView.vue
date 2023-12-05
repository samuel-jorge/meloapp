<script setup>
</script>

<template>
  <main>
    <div class="container splash">
      <div>
        <img class="logo" src="/images/brasao.png">
        <h1 class="hero-title">Memória Localizada da <span class="cor-1">UFC</span></h1>
        <p class="hero-subtitle">Conteúdo histórico acessível por marcadores geográficos</p>
      </div>
      <img class="hero-point" src="/images/splash.png">
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 60px 0;
}
header {
  position: fixed;
  width: 100%;
  background-color: #159AC5;
}
.nav {
  height: 40px;
  padding: 10px 0;
  display: flex;
  gap: 10px;
}
.splash{
  width: calc(100% - 60px);
  max-width: 800px;
  height: auto;
  padding: 60px;
  border: 3px solid var(--slide-4);
  border-radius: 20px;
  background-color:#FFFC;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 200px;
  margin-bottom: 20px;
}
.hero-point {
  width: 200px;
}
.hero-title {
  font-size: 3.5rem;
}
.hero-subtitle {
  font-size: 1.8rem;
}
</style>
