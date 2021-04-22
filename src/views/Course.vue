<template>
<div id="app-video">
    <Presentation />

    <!--ABOUT VIDEO START-->

    
    
</div>
</template>

<script>
import Presentation from "../components/course/Presentation.vue";
export default {
    name: "Course",
    data(){
        return {
        }
    },
    async created()
	{
        // this.$root.$refs.Course = this
    },
	components: 
	{
        Presentation,
    },
    
}
</script>
<style scoped>
@import "../assets/css/video.css";
</style>