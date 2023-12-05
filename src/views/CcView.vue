<script>
  import { onMounted, ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue'; // Import Swiper Vue.js components
  import { EffectCoverflow, Pagination, Navigation, Keyboard } from 'swiper/modules'; // import required modules

  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-coverflow';
  import 'swiper/css/pagination';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      let slides = ref()
      let swiperRef = null
      const speechButton = (item) => {
        let { title, body } = item;
        //console.log(title, body);
        if (document.body.classList.contains('speaking')) return stopSpeach();
        document.body.classList.add('speaking');
        let text = title + "\n\n" + body.replaceAll('am-se', 'ãosse').replaceAll('</p>', '.</p>');
        speak(text);
      }
      const setSwiperRef = (swiper) => {
        swiperRef = swiper
      }
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      // inicio da configuracao do speech
      let voice;
      function populateVoiceList() {
        let voices = window.speechSynthesis.getVoices();
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].lang === 'pt-BR') {
            voice = voices[i];
            return ;
          }
        }
        voice = voices[0];
      }
      function stopSpeach() {
        speechSynthesis.cancel();
      }
      function speak(speechtext) {
        let utterance = new SpeechSynthesisUtterance(speechtext.replace(/<[^>]*>?/gm, ' '));
        utterance.voice = voice;
        utterance.volume = 0.7;
        utterance.pitch = 0.2;
        utterance.rate = 2;
        utterance.addEventListener('start', () => document.body.classList.add('speaking'));
        utterance.addEventListener('end', () => document.body.classList.remove('speaking'));
        utterance.addEventListener('error', () => document.body.classList.remove('speaking'));
        speechSynthesis.speak(utterance);
      }
      // fim da configuração do speech
      onMounted(async () => {
        slides.value = await fetch('/dados/cc.json').then(res => res.json())
        populateVoiceList();
        if (speechSynthesis.onvoiceschanged !== undefined) speechSynthesis.onvoiceschanged = populateVoiceList;
        //console.log(slides)
      })
      return {
        slides,
        swiperRef: null,
        setSwiperRef,
        onSwiper,
        onSlideChange,
        populateVoiceList,
        speechButton,
        modules: [EffectCoverflow, Pagination, Navigation, Keyboard],
      };
    },
  };
</script>

<template>
  <swiper
    :effect="'coverflow'"
    :grabCursor="true"
    :centeredSlides="true"
    :slidesPerView="'auto'"
    :coverflowEffect="{
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 4.5,
      slideShadows: true,
    }"
    :keyboard="{ enabled: true }"
    :pagination="{ clickable: true }"
    :navigation="true"
    :modules="modules"
    @slideChange="onSlideChange"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in slides" :key="index" :virtualIndex="index">
      <div class="slide-content">
        <h2 class="slide-title">
          <span class="inner-title">{{ item.title }}</span>
          <ion-icon @click="speechButton(item)" class="speaker" name="mic-circle"></ion-icon>
        </h2>
        <div class="slide-content-bottom" v-html="item.body"></div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
</style>


