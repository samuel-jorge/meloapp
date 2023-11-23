<script></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="/logo.png" width="32" alt="">
        Melo WebApp
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Início</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/reitoria" class="nav-link">Reitoria</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/sobre" class="nav-link">Sobre</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style></style>
