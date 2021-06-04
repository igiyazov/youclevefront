<template>
		<div class="recomended">
			<h3>Зрители рекомендуют</h3>
				<swiper class="rec-list" :options="swiperOption">
						<swiper-slide class="course-item" v-for="rec in listRec" :key="rec.id"
						@click.native="courseClicked(rec)"> 
						<router-link :to="`/course/${rec.id}`" >
								<!-- <div class="price-info">
										<span class="price-video">{{rec.price}} руб.</span>
								</div> -->
								<div class="course-img-wrapper">
										<img class="course-img" :src="`${rec.photo}`" alt="course-img">
								</div>
								<div class="views fa fa-eye">
										<div class="v-counter">{{rec.views}}</div>
								</div>
								<div class="course-title">
								<span>{{rec.title}}</span>
								</div>
								<div class="course-info">
										<div class="col-time">
												<div class="video-info">
														<span class="col-video">{{sclonLessons(rec.lessons_count)}}</span>
												</div>
												<div class="time-info">
														<!-- <span class="sum-time">Время курса </span> -->
														<span class="time">{{timeToChM(rec.course_duration)}}</span>
												</div>
										</div>
										<!-- <div class="raiting">
												<span class="star fa fa-star "></span>
												<span class="main-sr-raiting">{{rec.rating}}</span>
										</div> -->
								</div>
								<div class="course-info">
										<div class="author">
												<router-link :to="`/author/${rec.owner}`"
												@click.native="authorClicked(rec)"
												class="author-name">{{rec.username}}</router-link>
										</div>
										<div class="item-recomended">
												<span class="col-like fa fa-thumbs-o-up"></span>
												<span class="col-rec">{{rec.likes_count}}</span>
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
		name:"Recomended",
		title: 'Multiple slides per view',
		props: {
			listRec: Array,
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
			courseClicked:async function(rec){
				this.$root.$refs.Presentation.loadCourseByClick(rec.id)
			},
		}
}
</script>
<style scoped>
@import "../assets/css/catalog.css";
</style>