<template>
<div class="present-video">
                <div class="buy-course" v-show="buyCourseShow">
                    <span class="buy-desc">
                        Доступ по подписке
                    </span>
                    <router-link to="/podpiska" class="buy-btn">Оформить подписку</router-link>
                    <!-- <div @click="buyCourse(course.id)" class="buy-btn">Оформить подписку</div> -->
                </div>
                <div class="player" v-show="playerShow">
                    <vue-plyr ref="plyr">
                        <video controls crossorigin playsinline :src="`${this.lesson.videos}`">
                            <!-- <source
                            size=""
                            :src="`${this.lesson.videos}`"
                            type="video/mp4"
                            />, -->

                            <source
                            v-for="video in lesson.videos"
                            :key="video[0]"
                            :size="video[0]"
                            :src="`${video[1]}`"
                            type="video/mp4"
                            />,
                            <!-- <source v-if="q360" size="360" :src="`${this.lesson.videos[0][1]}`" type="video/mp4" />, -->
                            <!-- <source size="480" :src="`${this.lesson.videos}`" type="video/mp4" />, -->
                            <!-- <source v-if="quality.q720" size="720" :src="`${this.lesson.videos}`" type="video/mp4" />, -->
                            <!-- <source v-if="quality.q1080" size="1080" :src="`${this.lesson.video}`" type="video/mp4" /> -->
                            <!-- <track
                            default
                            kind="captions"
                            label="Русский"
                            src="/path/to/english.vtt"
                            srclang="ru"
                            /> -->
                        </video>
                    </vue-plyr>
                </div>
                <!-- <img :src="`${baseUrl}${course.photo}`" alt="video-img"> -->
            </div>
</template>
<script>
export default {
    name: "Player",
    props: {
      lesson:Object,
      buyCourseShow:Boolean,
      q360:Boolean,
      playerShow:Boolean,
      course:Object,
    },
    data(){
        return{
            buyCourseShow:false,
            videoPlaying: false,
            playerShow:true
        }
    },
    mounted () {
        // console.log(this.$refs.plyr.player)
        this.$refs.plyr.player.on('play', event => {
            if (!this.videoPlaying) {
                console.log('eve',event.detail.plyr);
                this.addView();
                this.videoPlaying = true;
            }
            
        });
    },
    methods:
    {
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
                        return response.data
                    })
                return listA
            } else {
                this.$awn.warning('Для покупки нужно Авторизоваться', this.$options)
            }
        },

        async addView() {
            const resp = await this.axios
                    .post(`${this.$store.getters.getServerUrl}/api/activity/view`, {
                        user_id: this.$store.getters.getId,
                        course_id: this.course.id,
                        lesson_id: this.lesson.id,
                    })
                    .then(response => {
                        return response.data
                    })
            console.log(resp)
            return resp
        }

    }
}
</script>