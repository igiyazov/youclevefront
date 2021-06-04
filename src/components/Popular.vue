<template>
	<div class="recomended">
	<h3>Популярные</h3>
		<swiper class="rec-list" :options="swiperOption">
			<swiper-slide class="course-item" v-for="pop in listPop" :key="pop.id"
			@click.native="courseClicked(pop)"> 
			<router-link :to="`/course/${pop.id}`" >
				<!-- <div class="price-info">
					<span class="price-video">{{pop.price}} руб.</span>
				</div> -->
				<div class="course-img-wrapper">
					<img class="course-img" :src="`${pop.photo}`" alt="course-img">
				</div>
				<div class="views fa fa-eye">
					<div class="v-counter">{{pop.views}}</div>
				</div>
				<div class="course-title">
				<span>{{pop.title}}</span>
				</div>
				<div class="course-info">
					<div class="col-time">
						<div class="video-info">
							<span class="col-video">{{sclonLessons(pop.lessons_count)}}</span>
						</div>
						<div class="time-info">
							<!-- <span class="sum-time">Время курса </span> -->
							<span class="time">{{timeToChM(pop.course_duration)}}</span>
						</div>
					</div>
					<!-- <div class="raiting">
						<span class="star fa fa-star "></span>
						<span class="main-sr-raiting">{{pop.rating}}</span>
					</div> -->
				</div>
				<div class="course-info">
					<div class="author">
						<router-link :to="`/author/${pop.owner}`"
						@click.native="authorClicked(pop)" class="author-name">{{pop.username}}</router-link></div><div class="item-recomended">
						<span class="col-like fa fa-thumbs-o-up"></span>
						<span class="col-rec">{{pop.likes_count}}</span>
					</div>
				</div>
			</router-link>
			</swiper-slide>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
		</swiper>
	</div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { sclonLessons, timeToChM} from "@/services/services.js";
import 'swiper/css/swiper.css'
export default {
	name:"Popular",
	title: 'Multiple slides per view',
	props: {
	listPop:Array
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
				slidesPerView: 2,
				spaceBetween: 5
				},
				320: {
				slidesPerView: 2,
				spaceBetween: 5
				}
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}       
			}
			}
	},
	methods: {
		timeToChM(time){
			return timeToChM(time);
		},
		sclonLessons(n)
		{
			let words = ['видеоурок', 'видеоурока', 'видеоуроков']
			return n + ' ' + sclonLessons(n, words);
		},
		courseClicked:async function(pop){
			this.$root.$refs.Presentation.loadCourseByClick(pop.id)
		},
	}
}
</script>
<style scoped>
@import "../assets/css/catalog.css";
</style>