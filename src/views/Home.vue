<template>
  <div class="home">
    <Presentation />
    <h3>Катеории</h3>    
    <MainCats :listCategory="listCategory" />
    
    <Recomended :listRec="listRec" />
    
    <Popular :listPop="listPop" />
  </div>
</template>

<script>
import MainCats from "../components/main/MainCats.vue";
import Recomended from "../components/Recomended.vue";
import Popular from "../components/Popular.vue";
import Presentation from "../components/main/Presentation.vue";


export default 
{
	name: 'Home',
    data(){
        return {
            listCategory:[],
            listRec:[],
            listPop:[],
        }
    },
	components: 
	{
        Presentation,
        MainCats,
        Recomended,
        Popular
	},
	async created()
	{
        this.listCategory=await this.loadList("/api/categories")
        this.listPop = await this.loadList("/api/courses?filter=popular")
        this.listPop = this.listPop.results
        this.listRec = await this.loadList("/api/courses?filter=recommended")
        this.listRec = this.listRec.results
        
	},
	methods:
	{
    
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
@import "../assets/css/main.css";
@import "../assets/css/catalog.css";
</style>

