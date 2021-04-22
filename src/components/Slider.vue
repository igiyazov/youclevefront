<template>
 <div class="for-swipe">
  <swiper class="swiper for-swipe" :options="swiperOption">
    <swiper-slide class="slide" v-for="categ in listCategory" :key="categ.id">
          <div class="slider-img">
              <img :src="`${baseUrl}${categ.photo}`" alt="IT">
          </div>
          <div class="slider-title">
              <span>{{categ.title}}</span>
          </div>
          <div class="slider-disc">
              <span>{{categ.description}}</span>
          </div>
          
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-multiple-slides-per-biew',
    title: 'Multiple slides per view',
    props: {
      listCategory: Array
    },
    components: {
      Swiper,
      SwiperSlide
    },
    computed: {
      baseUrl(){
        return this.$store.getters.getServerUrl
      }
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 5,
          spaceBetween: 10,
          
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          breakpoints: {
            2560: {
              slidesPerView: 10,
              spaceBetween: 10
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 10
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            490: {
              slidesPerView: 3,
              spaceBetween: 10
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 0
            }
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }       
        }
      }
    }
  }
</script>

<style scoped>
@media (min-width: 320px){
  .for-swipe{
    height: 350px;
    margin:0 10px;
  }
  .swiper-container{
    margin: 0;
  }
  .course-item:hover{
    transform: none;

}
.slide:hover {
    transform: none;
    
}
  
}
@media (min-width: 435px){
  .for-swipe{
    height: 400px;
    margin:0 10px;
  }
  .swiper-container{
    margin: 0;
  }
  .course-item:hover{
    transform: none;

}
.slide:hover {
    transform: none;
    
}
  
}
@media (min-width: 500px){
  .for-swipe{
    height: 450px;
    margin:0 10px;
  }
  .swiper-container{
    margin: 0;
  }
  .course-item:hover{
    transform: none;

}
.slide:hover {
    transform: none;
    
}
  
}

@media (min-width: 768px){
  .for-swipe{
    height: 450px;
    margin:0 30px;
  }
  .course-item:hover{
    transform: none;

}
.slide:hover {
    transform: none;
    
}
  .swiper-container{
    margin: 0;
  }
  
}
@media (min-width: 800px){
  .for-swipe{
    height: 500px;
    margin:0 30px;
  }
  .course-item:hover{
    transform: none;

}
.slide:hover {
    transform: none;
    
}
  .swiper-container{
    margin: 0;
  }
  
}
@media (min-width: 960px){
  .for-swipe{
    height: 500px;
    margin:0 90px;
  }
  .course-item:hover{
    color: #0f1435;
    transform: translateY(-5px);
    transition: .5s;

}
.slide:hover {
    transform: translate(0,-5px);
    
}
  .swiper-container{
    margin: 0;
  }
  
}
@media (min-width: 1440px){
  .for-swipe{
    height: 500px;
    margin:0 90px;
  }
  .course-item:hover{
    color: #0f1435;
    transform: translateY(-5px);
    transition: .5s;

}
.slide:hover {
    transform: translate(0,-5px);
    
}
  .swiper-container{
    margin: 0;
  }
  
}

</style>