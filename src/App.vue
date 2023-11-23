<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <NavBar />
  <main>
    <div class="container">
      <RouterView />
    </div>
  </main>
  <FooterBar />
</template>

<style scoped>
main {
  margin-top: 90px;
}
</style>
