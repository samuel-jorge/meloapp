<script setup>
import { onMounted, ref } from 'vue';

let pontos = ref();
let link_gmaps = ref();

onMounted(async () => {
  pontos = await fetch('/dados/pontos.json').then(res => res.json());

  let pagina_atual = location.pathname.substring(1);

  pontos.forEach((item) =>
  {
    if (item.point == pagina_atual)
    {
      document.getElementById('maps_link').href = item.directions;
      document.title = item.title +' - '+ item.subtitle;
    }

    console.log(pontos)
  });
})

let nav_share = () => {
  let data = {
    'title': 'Memória da UFC',
    'text': document.title,
    'url': location.href
  };
  if (navigator.canShare && navigator.canShare(data)) {
    navigator.share(data);
  }
}

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
      '<li>Sítio: <a href="https://prograd50anos.ufc.br">Prograd 50 anos</a></li>'+
    '</ul>'+
    '<p>Estamos abertos à revisão colaborativa, de forma a tornar a informação cada vez mais útil e precisa.</p>'
  )
}

const escolher_ponto = async () => {
  let html = '';
  pontos.forEach((p) => html += '<h3 class="point-title"><a href="/'+ p.point +'">'+ p.title +': '+ p.subtitle  +'</h3>');
  alertify.alert('Selecione um ponto', html);
}

let opened_menu = true;
const clickBtnMenu = () => {
  //console.log(texto_botao);
  document.querySelector('.menu-links').classList.toggle('active');
  //document.querySelector('.menu-button').innerText = texto_botao;
  //opened_menu = !opened_menu;
}
</script>

<template>
  <header>
    <div class="container">
      <div class="nav">
        <button @click="clickBtnMenu" class="menu-button">menu</button>
        <ul class="menu menu-links">
          <li><a href="/"><img class="brasao-navbar" src="https://wp.ufc.br/a/brasao-ufc.svg" alt="Brasao da UFC" /></a></li>
          <li><a @click="localizar" href="#">Navegação por localização</a></li>
          <li><a @click="escolher_ponto" href="#">Navegação virtual</a></li>
          <li><a @click="fontes" href="#">Fontes</a></li>
          <li><a href="javascript:alertify.alert('Web App em desenvolvimento', 'Web App desenvolvido por equipe MELO para o Hackaton da Prointer/UFC.')">Sobre</a></li>
        </ul>
        <ul class="menu menu-icons">
          <li>
            <a class="pointer-link" href="#" id="maps_link" target="_blank" title="Rota para este ponto">
              <ion-icon name="location" role="img" class="md hydrated" aria-label="location"></ion-icon>
            </a>
          </li>
          <li>
            <a class="pointer-link" @click="nav_share" href="#">
              <ion-icon name="share-social-outline"></ion-icon>
            </a>
          </li>
          <li>
            <a class="pointer-link" href="#" target="_blank">
              <ion-icon name="qr-code-outline"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  z-index: 999;
  width: 100%;
  background-color: rgb(0 30 40);
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu {
  height: 40px;
  padding: 10px 0;
  display: flex;
  gap: 20px;
}
a {
  color: #fff;
}
.brasao-navbar {
  width: 50px;
}
button {
  display: none;
}

@media (max-width: 640px) {
  button {
    display: block;
    z-index: 9999;
    border: 0;
    padding: 2px 6px;
    background-color: orange;
    border-radius: 4px;
  }
  .menu-links {
    display: none;
  }
  .menu-links.active {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, .95);
    padding: 20px;
    text-align: center;
  }
  .menu-links.active a {
    font-size: 2.5rem;
    padding: 10px 0;
  }
  .menu-links.active .brasao-navbar {
    width: 200px;
  }
}
</style>
