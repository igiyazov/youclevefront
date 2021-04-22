<template>
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
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name:"Filter",
    title: 'Multiple slides per view',
    data(){
        return {
            listPod:[],
            selected: undefined,
            textFilter1:false,
            textFilter2:false,
            textFilter3:true,
            textFilter4:false,
            textFilter5:false,
            showFilter:false,
            swiperOption: {
                slidesPerView: 'auto',
                spaceBetween: 5,
                freeMode:true,
            },
        }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    async created()
	{
        this.$root.$refs.FilterCat=this
        this.listPod=await this.loadList("/api/levels")
        
	},
    computed:{
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
        baseUrl(){
            return this.$store.getters.getServerUrl
        }
    },
    methods: {
        async loadList(pathUrl)
		{
			const listA = await this.axios
            .get(`${this.$store.getters.getServerUrl}${pathUrl}`)
            .then(response => response.data)
            return listA
        },
        podClicked:async function(pod){
            this.$root.$refs.Catalog.key="&level="+pod.key
            this.$root.$refs.Catalog.loadListBy()
        },
        filtClicked:async function(){
            if(this.textFilter1==true){
                this.$root.$refs.Catalog.filt='&filter=popular',
                this.$root.$refs.Catalog.loadListBy()
            }else
            if(this.textFilter2==true){
                this.$root.$refs.Catalog.filt='&filter=recommended',
                this.$root.$refs.Catalog.loadListBy()
            }else
            if(this.textFilter4==true){
                this.$root.$refs.Catalog.filt='&filter=durationdown',
                this.$root.$refs.Catalog.loadListBy()
            }else
            if(this.textFilter5==true){
                this.$root.$refs.Catalog.filt='&filter=durationup',
                this.$root.$refs.Catalog.loadListBy()
            }
            else{
                this.$root.$refs.Catalog.filt='',
                this.$root.$refs.Catalog.loadListBy()
            }
        },

    }
}
</script>