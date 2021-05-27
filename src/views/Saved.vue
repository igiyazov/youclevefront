<template>
<div class="saved-view">
    <h3>Сохраненные</h3>
    <div class="main-videos">
        
        <div class="no-podpiski" v-show="noSaved">
            <span class="no-save-text">Вы пока не сохраняли курсы
            </span>
            <router-link to="/catalog" class="tocat-btn"
            @click.native="toCatalogClicked()">
                В каталог
            </router-link>
        </div>
        <div class="videos-list">
            <div class="saved-video-item"
            v-for="savedCourse in savedListCourses" :key="savedCourse.id">
                <div class="lk-price-info">
                    <!-- <span class="price-video">{{savedCourse.price}} руб.</span> -->
                    <div @click="deleteFromSaveCourse(savedCourse.id)" class="delete fa fa-close"></div>
                </div>
                <router-link :to="`/course/${savedCourse.id}`"
                @click.native="courseClicked(savedCourse)">
                    <div class="course-img-wrapper">
                        <img class="video-img" :src="`${savedCourse.photo}`" alt="course-img">
                    </div>
                    <div class="views fa fa-eye">
                        <div class="v-counter">{{savedCourse.views}}</div>
                    </div>
                    <div class="course-title">
                    <span>{{savedCourse.title}}</span>
                    </div>
                    <div class="course-info">
                        <div class="col-time">
                            <div class="video-info">
                                <span class="col-video">{{savedCourse.lessons_count}}</span>
                                <span class="video">Видеоуроков(а)</span>
                            </div>
                            <div class="time-info">
                                <!-- <span class="sum-time">Время курса</span> -->
                                <span class="time">{{savedCourse.course_duration}}</span>
                            </div>
                        </div>
                        <!-- <div class="raiting">
                            <span class="star fa fa-star"></span>
                            <span class="sr-raiting">{{savedCourse.rating}}</span>
                        </div> -->
                    </div>
                    <div class="course-info">
                        <div class="author">
                            <router-link :to="`/author/${savedCourse.owner}`"
                            @click.native="authorClicked(savedCourse)"
                            class="author-name">{{savedCourse.username}}</router-link>
                        </div>
                        <div class="item-recomended">
                            <span class="col-like fa fa-thumbs-o-up"></span>
                            <span class="col-rec">{{savedCourse.likes_count}}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name:"Saved",
    
    
    data() {
      return {
          savedListCourses:[],
          noSaved:false
        }
    },
    async created()
	{
        this.$root.$refs.Saved = this
        if (this.$store.getters.getIsAuthenticated==true)
        {
            this.reloadSaved()
        }
    },
    computed: {
      baseUrl(){
        return this.$store.getters.getServerUrl
      },
      ...mapGetters([
            "getIsAuthenticated"
        ])
    },
    watch: {
        getIsAuthenticated: {
            deep: true,
            async handler() {
                if (this.$store.getters.getIsAuthenticated==true)
                {
                    this.savedListCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/saved`)
                    if(this.savedListCourses.length==0){
                        this.noSaved=true
                    }else{
                        this.noSaved=false
                    }
                }
            }
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo(0,0)
        },
        async deleteFromSaveCourse(courseId){
            const listA = await this.axios
            .post(`${this.$store.getters.getServerUrl}/api/course/save`,
            {
                user_id : this.$store.getters.getId,
                course_id : courseId
            })
            .then(response => {
                this.reloadSaved()
                this.scrollToTop()
                return response.data
            })
            return listA
        },
        async reloadSaved(){
            this.savedListCourses= await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/saved`)
        },
        toCatalogClicked(){
            this.$root.$refs.Catalog.loadListBy()
        },
        courseClicked:async function(savedCourse){
            this.$root.$refs.Presentation.loadCourseByClick(savedCourse.id)
        },
        authorClicked:async function(savedCourse){
            this.$root.$refs.Author.loadAuthorByClick(savedCourse.owner)
        },
        async loadList(pathUrl)
		{
			const base = this.$store.getters.getBase
            const axios = this.axios.create(base)
			const listA = await axios
            .get(`${pathUrl}`)
            .then(response => {
                console.log(response.data)
                if(response.data.length==0){
                    this.noSaved=true
                }else{
                    this.noSaved=false
                }
                return response.data
                })
            return listA
        },
        
        
    }
}
</script>