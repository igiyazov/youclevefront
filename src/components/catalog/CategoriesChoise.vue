<template>
<div class="categories">
    
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
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name:"CategoriesChoise",
    title: 'Multiple slides per view',
    data(){
        return {
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
            
        }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    async created()
	{
        this.$root.$refs.CategoriesChoise = this;
        this.listCategory=await this.loadList("/api/categories")
        
	},
    mounted()
    {
        this.$root.$refs.CategoriesChoise = this;
    },
    computed: {
      baseUrl(){
        return this.$store.getters.getServerUrl
      }
    },
    methods: {
        categClicked:async function(categ){
            this.listSubCoteg=await this.loadList(`/api/subcategories/${categ.id}`)
            this.showSecCh=true
            this.selected2=undefined
            this.$root.$refs.Catalog.CATslugPod="/"+categ.slug
            this.$root.$refs.FilterCat.selected=undefined
            this.$root.$refs.Catalog.key=''
            this.$root.$refs.Catalog.SUBslugPod=''
            this.$root.$refs.Catalog.loadListBy()

        },
        subCategClicked:async function(subCateg){
            this.$root.$refs.Catalog.SUBslugPod="/"+subCateg.slug
            this.$root.$refs.FilterCat.selected=undefined
            this.$root.$refs.Catalog.key=''
            this.$root.$refs.Catalog.loadListBy()
        },
        async loadList(pathUrl)
		{
			const listA = await this.axios
            .get(`${this.$store.getters.getServerUrl}${pathUrl}`)
            .then(response => response.data)
            return listA
		}
    }
}
</script>
<style scoped>
   
</style>