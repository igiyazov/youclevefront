<template>
    <div class="main-videos">
        <div class="videos-list">
            <router-link :to="`/course/${course.id}`" class="video-item" 
            v-for="course in listCourses" :key="course.id"
            @click.native="courseClicked(course)">
                <div class="price-info">
                    <span class="price-video">{{course.price}}</span>
                    <span class="price">руб.</span>
                </div>
                <div class="course-img-wrapper">
                    <img class="video-img" :src="`${baseUrl}${course.photo}`" alt="course-img">
                </div>
                <div class="views fa fa-eye">
                    <div class="v-counter">{{course.views}}</div>
                    <span>Просмотр(ов)</span>
                </div>
                <span class="course-title">{{course.title}}</span>
                <div class="course-info">
                    <div class="col-time">
                        <div class="video-info">
                            <span class="col-video">{{course.lessons_count}}</span>
                            <span class="video">Видеоуроков(а)</span>
                        </div>
                        <div class="time-info">
                            <span class="sum-time">Время курса</span>
                            <span class="time">{{course.course_duration}}</span>
                        </div>
                    </div>
                    <div class="raiting">
                        <span class="star fa fa-star "></span>
                        <span class="sr-raiting">{{course.rating}}</span>
                    </div>
                </div>
                <div class="course-info">
                    <div class="author">
                        <router-link :to="`/author/${course.owner}`"
                        @click.native="authorClicked(course)"
                         class="author-name">{{course.username}}</router-link>
                    </div>
                    <div class="item-recomended">
                        <span class="col-like fa fa-thumbs-o-up"></span>
                        <span class="col-rec">{{course.likes}}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:"CoursesStore",
    props: {
      listCourses: Array
    },
    computed: {
      baseUrl(){
        return this.$store.getters.getServerUrl
      }
    },
    data() {
      return {
            
        }
    },
    methods: {
    courseClicked:async function(course){
        this.$root.$refs.Presentation.loadCourseByClick(course.id)
        
    },
    authorClicked:async function(course){
        this.$root.$refs.Author.loadAuthorByClick(course.owner)
    },
    }
}
</script>