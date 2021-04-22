<template>
    <div class="category-main">
        <div class="cat-wrapper">
            <router-link to="/catalog" v-for="categ in listCategory" :key="categ.id"
            class="cat-item"
            v-on:click.native="categClicked(categ)">
                <div class="cat-text">
                    <div class="slider-title">
                        <span>{{categ.title}}</span>
                    </div>
                    <div class="slider-disc">
                        <span>{{categ.description}}</span>
                    </div>
                </div>
                <div class="cat-img">
                    <img :src="`${categ.photo}`" alt="IT">
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:"MainCats",
    data(){
        return {
        }
    },
    props: {
      listCategory: Array
    },
    computed: {
      baseUrl(){
        return this.$store.getters.getServerUrl
      }
    },
    async created()
	{
        
	},
    methods: {
        categClicked:async function(categ){
            this.$root.$refs.CategoriesChoise.selected1 = categ.id
            this.$root.$refs.Catalog.CATslugPod="/"+categ.slug
            this.$root.$refs.CategoriesChoise.categClicked(categ)
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