<script setup>
</script>

<template>
  <main>
    <div class="container splash">
      <div>
        <img class="hero-point" src="/images/splash.png">
        <img class="logo" src="/images/brasao.png">
        <h1 class="hero-title">Memória Localizada da <span class="cor-1">UFC</span></h1>
        <p class="hero-subtitle">Conteúdo histórico acessível por marcadores geográficos</p>
      </div>
      <nav>
        <ul class="menu-bar">
          <li><a class="menu-item" @click="localizar" href="#">Navegação por localização</a></li>
          <li><a class="menu-item" @click="escolher_ponto" href="#">Navegação virtual</a></li>
          <li><a class="menu-item"
              href="javascript:alertify.alert('Web App em desenvolvimento', 'Web App desenvolvido por equipe MELO para o Hackaton da Prointer/UFC.')">Sobre</a>
          </li>
          <li><a class="menu-item" @click="fontes" href="#">Fontes</a></li>
        </ul>
      </nav>
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
</style>
