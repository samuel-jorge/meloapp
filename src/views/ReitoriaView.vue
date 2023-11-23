<script>
  import { onMounted, ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue'; // Import Swiper Vue.js components
  import { EffectCoverflow, Pagination } from 'swiper/modules'; // import required modules

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
      const setSwiperRef = (swiper) => {
        swiperRef = swiper
      }
      onMounted(async () => {
        slides.value = await fetch('/dados/reitoria.json').then(res => res.json())
        console.log(slides)
      })
      return {
        slides,
        swiperRef: null,
        setSwiperRef,
        modules: [EffectCoverflow, Pagination],
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
    :pagination="true"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in slides" :key="index" :virtualIndex="index">
      <p>{{ item.title }}</p>
      <div v-html="item.body"></div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}
.swiper-slide {
  background-color: #f9f9f9;
  background-position: center;
  background-size: cover;
  width: calc(100% - 20px);
  max-width: 800px;
  height: 90vh;
  padding: 20px 40px;
  border-radius: 20px;
  overflow: hidden;
}
.swiper-slide-fully-visible {
  box-shadow: 0px 0px 5px 0px #000;
}
</style>
