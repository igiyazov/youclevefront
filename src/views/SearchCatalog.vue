<template>
  <div id="app-catalog">


    <h3>Результаты поиска</h3>
    
    <div class="main-videos">
        <!-- <div class="no-podpiski" v-show="noCoursesInCatalog">
            <span class="no-save-text">Сделайте запрос в поиске
            </span>
        </div> -->
        <div class="videos-list">
            <router-link :to="`/course/${course.id}`" class="video-item" 
            v-for="course in searchCatalogListCourses" :key="course.id"
            @click.native="courseClicked(course)">
                <!-- <div class="price-info">
                    <span class="price-video">{{course.price}} руб.</span>
                </div> -->
                <div class="course-img-wrapper">
                    <img class="video-img" :src="`${course.photo}`" alt="course-img">
                </div>
                <div class="views fa fa-eye">
                    <div class="v-counter">{{course.views}}</div>
                </div>
                <span class="course-title">{{course.title}}</span>
                <div class="course-info">
                    <div class="col-time">
                        <div class="video-info">
                            <span class="col-video">{{course.lessons_count}}</span>
                            <span class="video">Видеоуроков(а)</span>
                        </div>
                        <div class="time-info">
                            <!-- <span class="sum-time">Время курса</span> -->
                            <span class="time">{{course.course_duration}}</span>
                        </div>
                    </div>
                    <!-- <div class="raiting">
                        <span class="star fa fa-star"></span>
                        <span class="sr-raiting">{{course.rating}}</span>
                    </div> -->
                </div>
                <div class="course-info">
                    <div class="author">
                        <router-link :to="`/author/${course.owner}`"
                        @click.native="authorClicked(course)"
                         class="author-name">{{course.username}}</router-link>
                    </div>
                    <div class="item-recomended">
                        <span class="col-like fa fa-thumbs-o-up"></span>
                        <span class="col-rec">{{course.likes_count}}</span>
                    </div>
                </div>
            </router-link>
        </div>
        
    </div>
    
    
  </div>
</template>
<script>


export default 
{
	name: 'SearchCatalog',
    
    data(){
        return {
            searchCatalogListCourses:[],
        }
    },
	
    
    async created()
	{
        this.$root.$refs.SearchCatalog = this
        this.searchCatalogListCourses=this.$root.$refs.Header.searchList.courses
        
    },
	methods:
	{
        courseClicked:async function(course){
            this.$root.$refs.Presentation.loadCourseByClick(course.id)
        },
        authorClicked:async function(course){
            this.$root.$refs.Author.loadAuthorByClick(course.owner)
        },
           

        
	}
	

}
</script>
<style scoped>
</style>