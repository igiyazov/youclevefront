<template>
  <div id="app-catalog">
    <h3 class="cat">Категории</h3>
    <StoreCategoriesChoise />

    <h3>Видео-курсы</h3>
    <FilterStore />
    <CoursesStore :listCourses="listCourses"/>

    
  </div>
</template>
<script>
import StoreCategoriesChoise from "../components/cstore/StoreCategoryChoise.vue";
import FilterStore from "../components/cstore/FilterStore.vue";
import CoursesStore from "../components/cstore/CoursesStore.vue";

export default 
{
	name: 'CStore',
    data(){
        return {
            listCourses:[],
            CATslugPod:'',
            SUBslugPod:'',
            key:'',
            filt:''
        }
    },
    
	components: 
	{
        StoreCategoriesChoise,
        FilterStore,
        CoursesStore
    },
    async created()
	{
        this.$root.$refs.CStore = this
        const params={
            limit:10,
            offset:0
        }
        this.listCourses=await this.loadList("/api/courses", {params})
        this.listCourses = this.listCourses.results
	},
	methods:
	{
        async loadList(pathUrl)
		{
			const listA = await this.axios
            .get(`${this.$store.getters.getServerUrl}${pathUrl}`)
            .then(response => response.data)
            return listA
        },
        async loadListBy()
        {
            const params={
                limit:10,
                offset:0
            }
            this.listCourses=await this.loadList(`/api/courses${this.CATslugPod}${this.SUBslugPod}?${this.key}${this.filt}`, {params})
            this.listCourses = this.listCourses.results
        }
	}
	

}
</script>
<style scoped>
@import "../assets/css/catalog.css";
</style>