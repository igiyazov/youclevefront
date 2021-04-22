<template>
    <div class="page-choise-wrapper">
        <swiper class="page-choise">
            <swiper-slide class="choise-item swiper-slide"
                v-on:click.native="podpiski=true, 
                myCourses=false,
                aboutMe=false,
                AddCourse=false">
                Подписки
            </swiper-slide>
            <swiper-slide class="choise-item" 
                v-on:click.native="myCourses=true, 
                podpiski=false,
                aboutMe=false,
                AddCourse=false,
                pokPod=false">
                Мои курсы
            </swiper-slide>
            <swiper-slide class="choise-item" 
                v-on:click.native="aboutMe=true,
                myCourses=false, 
                podpiski=false,
                AddCourse=false,
                pokPod=false">
                Обо мне
            </swiper-slide>
            <swiper-slide class="choise-item" 
                v-on:click.native="AddCourse=true,
                myCourses=false, 
                podpiski=false,
                aboutMe=false,
                pokPod=false">
                Добавить курс
            </swiper-slide>
            <swiper-slide class="choise-item" 
                v-on:click.native="pokPod=true,
                myCourses=false, 
                podpiski=false,
                aboutMe=false,
                AddCourse=false">
                Подписка на сервис
            </swiper-slide>
            <swiper-slide class="choise-item">
                Вывод бонусов
            </swiper-slide>
        </swiper>
    </div>
</template> 
<script>
import { Swiper, SwiperSlide  } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: 'Lk',
    title: 'Multiple slides per view',
    data(){
        return {
            podpiski:true,
            myCourses:false,
            aboutMe:false,
            AddCourse:false,
            pokPod:false,
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 5,
                freeMode: true
                
                
            }
        }
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    
    
}
</script>
    