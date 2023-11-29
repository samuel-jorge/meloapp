<script setup>
import { onMounted, ref } from 'vue';

let pontos = ref();

onMounted(async () => {
  pontos = await fetch('/dados/pontos.json').then(res => res.json());
  console.log(pontos)
})

const teste = () => {
  alert('Teste!!!')
}

const localizar = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(localizarPonto, noLocationAuth, {enableHighAccuracy: true});
  }
}

const localizarPonto = (location) => {
  closest_point(location.coords.latitude, location.coords.longitude);
}

function noLocationAuth(error) {
  alert('Autorize o compartilhamento de localização para usar este recurso, ou siga a navegação virtual!');
  console.log(error);
}

let closest_point = (lat, lon) => {
  let num = Math.pow(lat, 2) + Math.pow(lon, 2), min = Math.abs(pontos[0].sum - num), closest = 0;
  pontos[0].diff = Math.abs(num - pontos[0].sum);
  for (let i = 1; i < pontos.length; i++) {
    pontos[i].diff = Math.abs(num - pontos[i].sum);
    if (pontos[i].diff < min) {
      min = Math.abs(num - pontos[i].sum);
      closest = i;
    }
  }
  //console.log(num,  lat, lon);
  alertify.confirm(
    'Ponto mais próximo encontrado:',
    '<p class="center"><b>'+ pontos[closest].title + '</b></p>',
    () => location.href = '/'+ pontos[closest].point + '',
    () => location.href = pontos[closest].directions,
  )
  .set('labels', {ok: pontos[closest].subtitle, cancel: '<ion-icon name="map"></ion-icon> Rota para o local'})
  .set({invokeOnCloseOff: true});
}

const fontes = () => {
  alertify.alert(
    'Fontes:',
    '<h3 style="margin-bottom:20px;">Todas as informações dispostas neste sítio eletrônico tem como origem uma ou mais dentre as seguintes fontes:</h3>'+
    '<ul style="margin-bottom:20px;list-style-type:bullet">'+
      '<li>Portal da UFC</li>'+
      '<li>Memorial da UFC</li>'+
      '<li>Sítio da STI</li>'+
      '<li>Sítio do Centro de Ciências</li>'+
    '</ul>'+
    '<p>Estamos abertos à revisão colaborativa, de forma a tornar a informação cada vez mais útil e precisa.</p>'
  )
}

const escolher_ponto = async () => {
  let html = '';
  pontos.forEach((p) => html += '<h3 class="point-title"><a href="/'+ p.point +'">'+ p.title +': '+ p.subtitle  +'</h3>');
  alertify.alert('Selecione um ponto', html);
}
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
  padding: 30px 0;
}
</style>
