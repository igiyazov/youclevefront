<template>
  <div id="app-catalog">
    <h3 class="cat">Категории</h3>
    <div class="categories">

            <!--1ST CHOICE START-->

        <div class="first-choice">
            <swiper class="main-catalog" :options="swiperOption">
                <swiper-slide v-for="categ in listCategory" :key="categ.id"
                class="main-catalog-items" :class="{isactive:categ.id == selected1}"
                v-on:click.native="categClicked(categ), selected1 = categ.id">
                    {{categ.title}}
                </swiper-slide>
            </swiper>
        </div>

            <!--1ST CHOICE END-->

            <!--2ND CHOICE START-->
        <transition name="fade">
            <div class="second-choice" v-show="showSecCh">
                <swiper class="main-catalog" :options="swiperOption">
                    <swiper-slide
                    v-for="subCateg in listSubCoteg" :key="subCateg.id"
                    class="main-catalog-items" :class="{isactive:subCateg.id == selected2}"
                    v-on:click.native="subCategClicked(subCateg),selected2 = subCateg.id"> 
                        {{subCateg.title}}
                    </swiper-slide>
                </swiper>
            </div>
        </transition>
        <!--2ND CHOICE END-->
    </div>


    <h3>Видео-курсы</h3>
    <div class="filter-podborki">
        <div class="filter">
            <button v-on:click="showFilter=!showFilter" class="fa fa-tasks filter-btn" >{{ filterText }} </button>
            <ul v-show="showFilter" class="filter-choice">
                <li><button v-on:click="
                textFilter1=true, textFilter2=false, textFilter3=false, textFilter4=false, textFilter5=false, showFilter=!showFilter,filtClicked() " class="filter-btn-choice1"> По популярности</button></li>
                <li><button v-on:click="
                textFilter2=true, textFilter1=false, textFilter3=false, textFilter4=false, textFilter5=false, showFilter=!showFilter,filtClicked()" class="filter-btn-choice2"> По рейтингу</button></li>
                <li><button v-on:click="
                textFilter3=true, textFilter2=false, textFilter1=false, textFilter4=false, textFilter5=false, showFilter=!showFilter,filtClicked()" class="filter-btn-choice3"> По дате добавления</button></li>
                <li><button v-on:click="
                textFilter4=true, textFilter2=false, textFilter1=false, textFilter3=false, textFilter5=false, showFilter=!showFilter,filtClicked()" class="filter-btn-choice3"> По продолжительности max</button></li>
                <li><button v-on:click="
                textFilter5=true, textFilter2=false, textFilter1=false, textFilter3=false, textFilter4=false, showFilter=!showFilter,filtClicked()" class="filter-btn-choice3"> По продолжительности min</button></li>
            </ul>
        </div>
        <div class="podborki">
            <swiper class="main-catalog" :options="swiperOption">
                <swiper-slide 
                v-for="pod in listPod" :key="pod.id"
                class="main-catalog-items" :class="{isactive:pod.id == selected}"
                v-on:click.native="podClicked(pod), selected = pod.id">
                    {{pod.body}}
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <div class="main-videos">
        <div class="no-podpiski" v-show="noCoursesInCatalog">
            <span class="no-save-text">В этой категории пока нет курсов...
            </span>
        </div>
        <div class="videos-list">
            <router-link :to="`/course/${course.id}`" class="video-item" 
            v-for="course in listCourses" :key="course.id"
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
        <div class="next-btn-wrapper">
            <div class="next-btn"
            v-show="moreBtn"
            @click="loadMoreCourses()">ПОКАЗАТЬ ЕЩЕ</div>
        </div>
    </div>
    
    
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// import Courses from "../components/catalog/Courses.vue";

export default 
{
	name: 'Catalog',
    data(){
        return {
            listCourses:[],
            CATslugPod:'',
            SUBslugPod:'',
            key:'',
            filt:'',
            noCoursesInCatalog:false,
            moreCoursesLink:'',
            moreBtn:true,

            listCategory:[],
            listSubCoteg:[],
            selected1: undefined,
            selected2: undefined,
            showSecCh:false,
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 5,
                freeMode:true,
            },

            listPod:[],
            selected: undefined,
            textFilter1:false,
            textFilter2:false,
            textFilter3:true,
            textFilter4:false,
            textFilter5:false,
            showFilter:false,
        }
    },
	components: 
	{
        Swiper,
        SwiperSlide
        // Courses
    },
    computed: {
      baseUrl(){
        return this.$store.getters.getServerUrl
      },
      filterText: function(){
            
        if(this.textFilter1==true){
    
            return ' По популярности'
        }else
        if(this.textFilter2==true){
            
            return ' По рейтингу'
        }else
        if(this.textFilter4==true){
            
            return ' По продолжительности max'
        }else
        if(this.textFilter5==true){
            return ' По продолжительности min'
        }
        else{
            
            return ' По дате добавения'
        }
        
    },
    },
    async created()
	{
        this.$root.$refs.Catalog = this
        this.listCategory=await this.loadList("/api/categories")
        this.listPod=await this.loadList("/api/levels")
        this.loadListBy()
    },
	methods:
	{
        podClicked:async function(pod){
            this.key="&level="+pod.key
            this.loadListBy()
        },
        filtClicked:async function(){
            if(this.textFilter1==true){
                this.filt='&filter=popular',
                this.loadListBy()
            }else
            if(this.textFilter2==true){
                this.filt='&filter=recommended',
                this.loadListBy()
            }else
            if(this.textFilter4==true){
                this.filt='&filter=durationdown',
                this.loadListBy()
            }else
            if(this.textFilter5==true){
                this.filt='&filter=durationup',
                this.loadListBy()
            }
            else{
                this.filt='',
                this.loadListBy()
            }
        },
        categClicked:async function(categ){
            this.listSubCoteg=await this.loadList(`/api/subcategories/${categ.id}`)
            this.showSecCh=true
            this.selected2=undefined
            this.CATslugPod="/"+categ.slug
            this.selected=undefined
            this.key=''
            this.SUBslugPod=''
            this.loadListBy()

        },
        subCategClicked:async function(subCateg){
            this.SUBslugPod="/"+subCateg.slug
            this.selected=undefined
            this.key=''
            this.loadListBy()
        },
        courseClicked:async function(course){
            this.$root.$refs.Presentation.loadCourseByClick(course.id)
        },
        authorClicked:async function(course){
            this.$root.$refs.Author.loadAuthorByClick(course.owner)
        },
        async loadList(pathUrl)
		{
            
			const listA = await this.axios
            .get(`${this.$store.getters.getServerUrl}${pathUrl}`)
            .then(response => {
                this.moreCoursesLink=response.data.next
                if(response.data.next==null){
                    this.moreBtn=false
                }else{
                    this.moreBtn=true
                }
                return response.data
                })
            return listA
        },
        
        async loadListBy()
        {
            this.listCourses=await this.loadList(`/api/courses${this.CATslugPod}${this.SUBslugPod}?limit=12&offset=0?${this.key}${this.filt}`)
            this.listCourses = this.listCourses.results
            if(this.listCourses.length==0){
                this.noCoursesInCatalog=true
            }else{
                this.noCoursesInCatalog=false
            }
        },
        async loadMoreCourses()
        {
            const listA = await this.axios
            .get(`${this.moreCoursesLink}`)
            .then(response => {
                
                for(var i=0;i<response.data.results.length;i++){
                    this.listCourses.push(response.data.results[i])
                    if(response.data.next==null){
                        this.moreBtn=false
                    }else{
                        this.moreBtn=true
                    }
                }
                this.moreCoursesLink=response.data.next
                return response.data
                })
            return listA
        },    

        
	}
	

}
</script>
<style scoped>
@import "../assets/css/catalog.css";
</style>