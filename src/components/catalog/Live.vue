<template>
    <div class="recomended">
        <swiper class="rec-list" :options="swiperOption">
            <swiper-slide href="#" class="course-item" v-for="rec in listLive" :key="rec.id">
                <div class="course-img-wrapper">
                    <img class="course-img" :src="`${baseUrl}${rec.photo}`" alt="course-img">
                </div>
                <div class="views fa fa-eye">
                    <div class="v-counter">{{rec.views}}</div>
                    <span>Смотрят</span>
                </div>
                <span class="course-title">{{rec.title}}</span>
                <div class="course-info">
                    <div class="col-time">
                        <div class="time-info">
                            <span class="sum-time">Эфир длится </span>
                            <span class="time">{{rec.course_duration}}</span>
                        </div>
                    </div>
                </div>
                <div class="course-info">
                    <div class="author">
                        <button href="#" class="author-name">{{rec.owner}}</button>
                    </div>
                    <div class="item-recomended">
                        <span class="col-like fa fa-thumbs-o-up"></span>
                        <span class="col-rec">{{rec.likes}}</span>
                    </div>
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
    name:"Live",
    title: 'Multiple slides per view',
    props: {
      listLive: Array
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
          slidesPerView: 'auto',
          spaceBetween: 10,
          freeMode:true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }       
        }
    }
}

</script>
<style>
.swiper-wrapper{
    padding: 20px 0;
}
</style>