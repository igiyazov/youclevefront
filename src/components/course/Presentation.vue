<template lang="ru">
<div class="presentation">
    <div class="course-present">
        <div class="course-present-title">
            <div class="course-name">
                <h4>{{course.title}}</h4>
            </div>
            <div class="course-author">
                <div class="name-author">
                    <router-link :to="`/author/${course.owner}`" @click.native="authorClicked(course)">{{course.username}}
                    </router-link>
                </div>
                <div class="follow-author fa fa-circle">
                    <button @click="followAutOrUnfollow(course.owner)" class="follow-author-btn" v-on:click="sub=!sub">
                        <span>{{ subText }}</span>
                    </button>
                </div>

            </div>
        </div>

        <div class="video-row">
            
            <Player :key="componentKey" :playerShow="playerShow" :lesson="lesson" :buyCourseShow="buyCourseShow" :course="course" />

            <div class="playlist">
                <div class="summary-time">
                    <span>{{sclonLessons(course.lessons_count)}}</span><span>{{timeToChM(course.course_duration)}}</span>
                </div>
                <div class="video-list">
                    <ol>
                        <li class="present-video-item" :class="{isactiveLesson:lessonItem.id == selectedLesson}"
                         v-for="lessonItem in lessonList" 
                        :key="lessonItem.id" @click="loadLesson(lessonItem.id), selectedLesson=lessonItem.id"
                        >
                            <div class="present-video-info fa fa-play">
                                <span class="info">{{lessonItem.title}}</span>
                            </div>
                            <span class="duration">{{calculTime(lessonItem.duration)}}</span>
                        </li>
                    </ol>
                </div>
            </div>
        </div>

        <div class="views-pr-wrapper">
            <div class="present-views fa fa-eye">
                <div class="present-v-counter">{{course.views}}</div>
            </div>
            <div class="present-views fa fa-thumbs-o-up">
                <div class="present-v-counter">{{course.likes_count}}</div>
            </div>
        </div>
        <div class="useful-btns">
            <div class="save-btn">
                <button v-bind:class="{'fa-bookmark': isActiveSave, 'fa-check-square-o':isActiveDontSave}" v-on:click="saveCourse(course.id)" class="fa">{{ saveText }}</button>
            </div>
            <div v-bind:class="{'active-like': isActiveLike, 'not-active-like':isActiveDontLike}"
             class="video-recomend-btn">
                <button @click="likeCourse()" 
                v-bind:class="{'active-like': isActiveLike, 'not-active-like':isActiveDontLike}"
                class="fa fa-thumbs-o-up " v-show="likeShow"> Нравится
                </button>
                <!-- <div class="pr-rating-area" v-show="stars">
                    <input type="radio" id="star-5" name="rating" value="5">
                    <label v-on:click="stars=false, likeShow=true, like=true" for="star-5" title="Оценка «5»"></label>		                    <input type="radio" id="star-4" name="rating" value="4">
                    <label v-on:click="stars=false, likeShow=true, like=true" for="star-4" title="Оценка «4»"></label>    
                    <input type="radio" id="star-3" name="rating" value="3">
                    <label v-on:click="stars=false, likeShow=true, like=true" for="star-3" title="Оценка «3»"></label>  
                    <input type="radio" id="star-2" name="rating" value="2">
                    <label v-on:click="stars=false, likeShow=true, like=true" for="star-2" title="Оценка «2»"></label>    
                    <input type="radio" id="star-1" name="rating" value="1">
                    <label v-on:click="stars=false, likeShow=true, like=true" for="star-1" title="Оценка «1»"></label>
                </div> -->

            </div>

        </div>
    </div>
    <div class="course-info-wrapper">
        <!-- <div class="present-course-info">
            <div class="chose-about">
                <button class="info-btn" v-on:click="showDisc=true, showDop=false, showCom=false, showAut=false">Описание</button>
            </div>
            <div class="resources">
                <button class="info-btn" v-on:click="showDop=true, showDisc=false, showCom=false, showAut=false">Дополнительные материалы</button>
            </div>
            <div class="comments">
                <button class="info-btn" v-on:click="showCom=true, showDisc=false, showDop=false, showAut=false">Комментарии</button>
            </div>

        </div> -->

    </div>

    <div class="text-about-wrapper">
        <div class="about" v-show="showDisc">
            <h5>Описание</h5>
            <div class="about-course">
                <span>
                    {{course.overview}}
                </span>
            </div>
        </div>
        <!-- <div class="comments" v-show="showCom">
            <h5>Комменарии</h5>
        </div> -->
        <div class="resources-doc" v-show="showDop">
            <h5>Дополнительные материалы</h5>
            <ul class="documents">
                <li><a href="#" class="doc-item fa fa-folder-open-o"> Название файла</a><span>n MB</span></li>
            </ul>
        </div>
        <div class="author-wrapper">
            <div class="author-page">
                <div class="info-wrapper">
                    <div class="avatar">
                        <img src="@/assets/img/avatar.png" alt="author-avatar">
                    </div>
                    <div class="author-info-present">
                        <router-link class="present-author-name" :to="`/author/${course.owner}`" @click.native="authorClicked(course)">{{course.username}}
                        </router-link>
                        <div class="geoposition fa fa-map-marker">{{authorPresent.geo}}</div>
                    </div>
                </div>
                <div class="video-counter-wrapper">
                    <div class="fol-count">
                        <span class="counter fa fa-group">{{authorPresent.followers_count}} подп.</span>
                    </div>
                    <div class="courses-count">
                        <span class="fa fa-graduation-cap">{{authorPresent.courses_count}}<span> курсов</span></span>

                    </div>
                </div>
                <!-- <ul class="social-author">
                    <li><a href="#"><div><i class="fa fa-facebook"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-twitter"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-instagram"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-vk"></i></div></a></li>
                    <li><a href="#"><div><i class="fa fa-youtube"></i></div></a></li>
                </ul> -->
                <div class="follow-btn">
                    <button class="fa" v-bind:class="{'fa-plus': isActivePlus}" v-on:click="sub=!sub,followAutOrUnfollow(course.owner)">{{ subText }}</button>
                </div>
            </div>
        </div>

    </div>
    <Recomended :listRec="listRec" />
    <Popular :listPop="listPop" />
</div>
</template>

<script>
import Recomended from "../Recomended.vue";
import Popular from "../Popular.vue";
import Player from "./Player.vue";
import { calculTime, sclonLessons, timeToChM} from "@/services/services.js";
export default {
    name: "Presentation",
    data() {
        return {
            listRec: [],
            listPop: [],
            buyCourseShow: true,
            playerShow: false,

            selectedLesson:undefined,

            showDisc: true,
            showDop: false,
            showCom: false,
            sub: true,
            save: true,
            like: false,
            likeShow: true,
            stars: false,
            isActivePlus: true,
            isActiveSave: true,
            isActiveDontSave: false,
            isActiveLike: false,
            isActiveDontLike: true,
            course: {},
            lessonList: [],
            authorPresent: {},
            likeText: '',
            subText: '',
            saveText: ' Сохранить',
            lesson: {},
            componentKey: 0,
            // player: this.$refs.plyr.player,
        }
    },
    components: {
        Recomended,
        Popular,
        Player,
    },
    async created() {
        this.$root.$refs.Presentation = this
        this.checklikeCourse()
        this.loadCourseByClick()
        this.listPop = await this.loadList("/api/courses?filter=popular")
        this.listPop = this.listPop.results
        this.listRec = await this.loadList("/api/courses?filter=recommended")
        this.listRec = this.listRec.results
        // this.checkFollowAut()
        console.log(this.course)
        console.log(this.$refs)
        // this.$refs.plyr.player.on('playing', event => {
        //     console.log(event)
        //     console.log(event.detail)
        //     console.log(event.detail.plyr)
        // })
        

    },
    computed: {
        baseUrl() {
            return this.$store.getters.getServerUrl
        },

    },
    methods: {
        timeToChM(time){
            return timeToChM(time);
        },
        sclonLessons(n)
        {
            let words = ['урок', 'урока', 'уроков']
            return n + ' ' + sclonLessons(n, words);
        },
        calculTime(time) {
            return calculTime(time)
        },
        forceRerender() {
            this.componentKey += 1;
        },
        async loadLesson(lessonId) {
            this.lesson = await this.loadList(`/api/lesson/${lessonId}`)
            console.log('Videos', this.lesson.videos)
            this.forceRerender()

        },
        async checkSaveCourse(courseId) {
            if (this.$store.getters.getId != null) {
                const listA = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/course/issaved`, {
                        user_id: this.$store.getters.getId,
                        course_id: courseId
                    })
                    .then(response => {
                        if (response.data.detail == 'saved') {
                            this.saveText = ' Сохранено'
                            this.isActiveDontSave = true
                            this.isActiveSave = false
                        } else {
                            this.saveText = ' Сохранить'
                            this.isActiveSave = true
                            this.isActiveDontSave = false
                        }
                        return response.data
                    })
                return listA
            } else {
                this.saveText = ' Сохранить'
                this.isActiveSave = true
            }
        },
        async saveCourse(courseId) {
            if (this.$store.getters.getIsAuthenticated == true) {
                if (this.saveText == ' Сохранить') {
                    const listA = await this.axios
                        .post(`${this.$store.getters.getServerUrl}/api/course/save`, {
                            user_id: this.$store.getters.getId,
                            course_id: courseId
                        })
                        .then(response => {
                            this.loadCourseByClick()
                            return response.data
                        })
                    return listA
                } else {
                    this.$awn.success('Данный курс уже сохранен!', this.$options)
                }

            } else {
                this.$awn.warning('Чтобы сохранить курс нужно Авторизоваться', this.$options)
            }
        },
        async checkBoughtCourse(courseId) {
            if (this.$store.getters.getId != null) {
                const listA = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/isbought`, {
                        user_id: this.$store.getters.getId,
                        course_id: courseId
                    })
                    .then(response => {
                        if (response.data.detail == 'bought') {
                            this.buyCourseShow = false
                            this.playerShow = true
                        } else {
                            this.buyCourseShow = true
                            this.playerShow = false
                        }
                        return response.data
                    })
                return listA
            } else {
                this.buyCourseShow = true
                this.playerShow = false
            }
        },
        async buyCourse(courseId) {
            if (this.$store.getters.getIsAuthenticated == true) {

                const listA = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/buy`, {
                        user_id: this.$store.getters.getId,
                        course_id: courseId
                    })
                    .then(response => {
                        this.buyCourseShow = false
                        this.playerShow = true
                        this.forceRerender()
                        return response.data
                    })
                return listA
            } else {
                this.$awn.warning('Для покупки нужно Авторизоваться', this.$options)
            }
        },
        async checkFollowAut(ownerId) {
            if (this.$store.getters.getId != null) {
                const listA = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/isfollow`, {
                        user_id: this.$store.getters.getId,
                        follow_id: ownerId
                    })
                    .then(response => {
                        if (response.data.detail == 'followed') {
                            this.subText = "Вы подписаны"
                            this.isActivePlus = false
                        } else {
                            this.subText = "Подписаться"
                            this.isActivePlus = true
                        }
                        if (this.$store.getters.getId == ownerId) {
                            this.subText = "Это Ваш профиль"
                            this.isActivePlus = false
                        }
                        return response.data
                    })
                return listA
            } else {
                this.subText = "Подписаться"
            }
        },
        async followAutOrUnfollow(ownerId) {
            if (this.subText == "Подписаться") {
                this.followAut(ownerId)
            } else {
                this.unFollowAut(ownerId)
            }
        },
        async followAut(ownerId) {
            if (this.$store.getters.getIsAuthenticated == true) {

                const listA = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/follow`, {
                        user_id: this.$store.getters.getId,
                        follow_id: ownerId
                    })
                    .then(response => {
                        this.loadCourseByClick()
                        return response.data
                    })
                return listA
            } else {
                this.$awn.warning('Для подписки нужно Авторизоваться', this.$options)
            }
        },
        async unFollowAut(ownerId) {
            if (this.$store.getters.getIsAuthenticated == true) {

                const listA = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/accounts/profile/unfollow`, {
                        user_id: this.$store.getters.getId,
                        follow_id: ownerId
                    })
                    .then(response => {
                        this.loadCourseByClick()
                        return response.data
                    })
                return listA
            } else {
                this.$awn.warning('Для подписки нужно Авторизоваться', this.$options)
            }
        },
        async checklikeCourse() {
            if (this.$store.getters.getId != null) {
                this.course.id = this.$route.params.id
                const listA = await this.axios
                    .get(`${this.$store.getters.getServerUrl}/api/activity/isliked?user_id=${this.$store.getters.getId}&course_id=${this.course.id}`)
                    .then(response => {
                        if (response.data.result == 'liked') {
                            this.isActiveLike=true
                            this.isActiveDontLike=false
                        } else {
                            this.isActiveLike=false
                            this.isActiveDontLike=true
                        }
                        return response.data
                    })
                return listA
            } else {
                this.isActiveLike=false
                this.isActiveDontLike=true

            }
        },
        async likeCourse() {
            if (this.$store.getters.getIsAuthenticated == true) {
                const listA = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/activity/like`, {
                        user_id: this.$store.getters.getId,
                        course_id: this.course.id
                    })
                    .then(response => {
                        this.loadCourseByClick()
                        this.checklikeCourse()
                        return response.data
                    })
                return listA
            } else {
                this.$awn.warning('Для оценки курса нужно Авторизоваться', this.$options)
            }
        },
        async loadList(pathUrl) {
            const listA = await this.axios
                .get(`${this.$store.getters.getServerUrl}${pathUrl}`)
                .then(response => response.data)
            return listA
        },
        async loadCourseByClick() {

            this.course = await this.loadList(`/api/course/${this.$route.params.id}`)
            this.lessonList = await this.loadList(`/api/lessons/${this.course.id}`)
            this.loadAuthorInPresent(this.course.owner)
            this.checkFollowAut(this.course.owner)
            this.checkBoughtCourse(this.course.id)
            this.checkSaveCourse(this.course.id)
        },
        authorClicked: async function (course) {
            this.$root.$refs.Author.loadAuthorByClick(course.owner)
        },
        async loadAuthorInPresent(custom_user) {
            this.authorPresent = await this.loadList(`/api/accounts/profile/${custom_user}`)
        },
    },

}
</script>
