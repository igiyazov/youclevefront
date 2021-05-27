<template>
    <div id="app-author">     
    <div class="author-author-wrapper">
        <div class="about-or-courses">
            <div class="courses-btn">
                <button autofocus v-on:click="aboutAut=false, courses=true">Курсы</button>
            </div>
            <div class="about-btn">
                <button v-on:click="aboutAut=true, courses=false">Об авторе</button>
            </div>
            
        </div>
        <div class="about-author-wrapper"  v-show="aboutAut">
            <div class="author-author-page">
                <div class="author-info-wrapper">
                    <div class="author-avatar">
                        <img :src="`${author.photo}`" alt="author-avatar">
                    </div>
                    <div class="author-info">
                        <div class="author-present-author-name">{{author.username}}</div>
                        <div class="author-geoposition fa fa-map-marker">{{author.geo}}</div>
                    </div>
                </div>
                <div class="counter-wrapper">
                    <div class="fol-count">
                        <a class="counter fa fa-group">{{author.followers_count}} подп.</a>
                    </div>
                    <div class="courses-count">
                        <a class="fa fa-graduation-cap">{{author.courses_count}}<span> курсов(а)</span></a>
                    </div>
                </div>
                <!-- <a href="author.site" class="site">{{author.site}}</a>
                <ul class="social">
                    <li><a href="#"><div><i class="fa fa-facebook"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-twitter"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-instagram"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-vk"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-youtube"></i></div></a></li>
                </ul> -->
                <div class="follow-btn">
                    <button class="fa" v-bind:class="{'fa-plus': isActivePlus}" 
                    v-on:click=" followAutOrUnfollow()">{{ subText }}</button>
                </div>
            </div>
            <div class="about-text-wrapper">
                <h1>Об Авторе</h1>
                <div class="text">
                    <span>{{author.description}}
                    </span>
                </div>
            </div>
        </div>
        
    </div>

    <div class="author-courses-wrapper" v-show="courses">
        <div class="author-author-page">
            <div class="author-info-wrapper">
                <div class="author-avatar">
                    <img :src="`${author.photo}`" alt="author-avatar">
                </div>
                <div class="author-author-info">
                    <div class="author-present-author-name">{{author.username}}</div>
                    <div class="author-geoposition fa fa-map-marker">{{author.geo}}</div>
                </div>
            </div>
            <div class="counter-wrapper">
                <div class="fol-count">
                    <a class="counter fa fa-group">{{author.followers_count}} подп.</a>
                </div>
                <div class="courses-count">
                    <a class="fa fa-graduation-cap">{{author.courses_count}}<span> курсов(а)</span></a>
                </div>
            </div>
            <!-- <a href="author.site" class="site">{{author.site}}</a>
            <ul class="social">
                <li><a href="#"><div><i class="fa fa-facebook"></i></div></a></li>
                <li><a href="#"><div><i class="fa fa-twitter"></i></div></a></li>
                <li><a href="#"><div><i class="fa fa-instagram"></i></div></a></li>
                <li><a href="#"><div><i class="fa fa-vk"></i></div></a></li>
                <li><a href="#"><div><i class="fa fa-youtube"></i></div></a></li>
            </ul> -->
            <div class="follow-btn">
                <button class="fa" v-bind:class="{'fa-plus': isActivePlus}" 
                v-on:click=" followAutOrUnfollow()">{{ subText }}</button>
            </div>
        </div>
        <div class="courses">
            <router-link :to="`/course/${courseAut.id}`" class="author-video-item" 
            v-for="courseAut in listAutCourses" :key="courseAut.id"
            @click.native="courseAutClicked(courseAut)">
                <!-- <div class="price-info">
                    <span class="author-price-video">{{courseAut.price}} руб.</span>
                </div> -->
            <div class="course-img-wrapper">
                <img class="video-img" :src="`${courseAut.photo}`" alt="course-img">
            </div>
                <div class="views fa fa-eye">
                    <div class="v-counter">{{courseAut.views}}</div>
                </div>
                <span class="author-course-title">{{courseAut.title}}</span>
                <div class="author-course-info">
                    <div class="author-col-time">
                        <div class="author-video-info">
                            <span class="author-col-video">{{courseAut.lessons_count}}</span>
                            <span class="author-video">Видеоуроков(а)</span>
                        </div>
                        <div class="author-time-info">
                            <!-- <span class="author-sum-time">Время курса</span> -->
                            <span class="author-time">{{courseAut.course_duration}}</span>
                        </div>
                    </div>
                    <!-- <div class="author-raiting">
                        <span class="author-star fa fa-star"></span>
                        <span class="author-sr-raiting">{{courseAut.rating}}</span>
                    </div> -->
                </div>
                <div class="author-course-info">
                    <div class="author-author">
                        <button href="#" class="author-item-author-name">{{courseAut.username}}</button>
                    </div>
                    <div class="author-item-recomended">
                        <span class="author-col-like fa fa-thumbs-o-up"></span>
                        <span class="author-col-rec">{{courseAut.likes_count}}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Author',
    data(){
        return {
            listAutCourses:[],
            aboutAut:false,
            courses:true,
            sub:true,
            isActivePlus:false,
            author:{},
            subText:'Это Ваш профиль',
        }
    },
    async created(){
        this.$root.$refs.Author=this
        this.loadAuthorByClick()
        this.listAutCourses=await this.loadList(`/api/accounts/profile/${this.$route.params.id}/courses`)
    },
    computed:{
        baseUrl(){
        return this.$store.getters.getServerUrl
        },
        
    },
    methods:{
        async loadList(pathUrl)
		{
			const listA = await this.axios
            .get(`${this.$store.getters.getServerUrl}${pathUrl}`)
            .then(response => response.data)
            return listA
        },
        async loadAuthorByClick()
        {
            this.author=await this.loadList(`/api/accounts/profile/${this.$route.params.id}`)
            this.checkFollowAut()
        },
        courseAutClicked:async function(courseAut){
            this.$root.$refs.Presentation.loadCourseByClick(courseAut.id)
        },
        async checkFollowAut(){
            if(this.$store.getters.getId!=null){
                const listA = await this.axios
                .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/isfollow`,
                {
                    user_id : this.$store.getters.getId,
                    follow_id : this.$route.params.id
                })
                .then(response => {
                    if(response.data.detail=='followed'){
                        this.subText="Вы подписаны"
                        this.isActivePlus=false
                    }else{
                        this.subText="Подписаться"
                        this.isActivePlus=true
                    }
                    if(this.$store.getters.getId==this.$route.params.id){
                        this.subText="Это Ваш профиль"
                        this.isActivePlus=false
                        
                    }
                    return response.data
                })
                return listA
            }else{
                this.subText="Подписаться"
            }
        },
        async followAutOrUnfollow(){
            if (this.subText=="Подписаться"){
                this.followAut()
            }else{
                this.unFollowAut()
            }
        },
        async followAut(){
            if (this.$store.getters.getIsAuthenticated==true){
                
                const listA = await this.axios
                .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/follow`,
                {
                    user_id : this.$store.getters.getId,
                    follow_id : this.$route.params.id
                })
                .then(response => {
                        this.loadAuthorByClick()
                    return response.data
                })
                return listA
            }else{
                this.$awn.warning('Для подписки нужно Авторизоваться', this.$options)
            }
        },
        async unFollowAut(){
            if (this.$store.getters.getIsAuthenticated==true){
                
                const listA = await this.axios
                .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/unfollow`,
                {
                    user_id : this.$store.getters.getId,
                    follow_id : this.$route.params.id
                })
                .then(response => {
                        this.loadAuthorByClick()
                    return response.data
                })
                return listA
            }else{
                this.$awn.warning('Для подписки нужно Авторизоваться', this.$options)
            }
        },
    }
}
</script>
<style scoped>
@import "../assets/css/author.css";
</style>