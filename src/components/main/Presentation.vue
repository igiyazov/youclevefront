<template>
        <div class="presentation ">
        <div class="present-row" >
            <div class="present-choice">
                <div class="present-img">
                    <img class="teaching" src="../../assets/img/teaching.png" alt="teaching">
                </div>
                <div class="present-text-wrapper">
                    <div class="present-title">
                        <span>Станьте партнером сервиса YouCleve</span>
                    </div>
                    <div class="present-disc">
                        <span>Загружайте Видео-уроки, зарабатывайте с просмотров! 
                            Поделитесь знаниями со всем Миром!
                        </span>
                    </div>
                </div>
                <div class="presentation-btn-wrapper">
                    <router-link to="/lk" @click.native="addCourseClicked()">
                        <div class="presentation-btn">Добавить курс</div>
                    </router-link>
                    <!-- <div @click="addCourseClicked()">
                        <div class="presentation-btn">
                            Добавить курс
                        </div> 
                    </div>  -->
                </div>
            </div>
            <div class="present-choice">
                <div class="present-img">
                    <img class="watching" src="../../assets/img/watching.png" alt="wathing">
                </div>
                <div class="present-text-wrapper">
                    <div class="present-title">
                        <span>Сделайте шаг к новому вместе с YouCleve</span>
                    </div>
                    <div class="present-disc">
                        <span>
                           Изучите то, что раньше казалось невозможным
                           вместе с преподавателями со всего Мира! 
                        </span>
                    </div>
                </div>
                <div class="presentation-btn-wrapper">
                    <router-link to="/catalog" @click.native="startClicked()">
                        <div class="presentation-btn">Начать</div>
                    </router-link>
                     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Presentation",
    methods:{
        addCourseClicked(){
            if (this.$store.getters.getIsAuthenticated){
                this.$root.$refs.Lk.AddCourse=true
                this.$root.$refs.Lk.podpiski=false
                this.$root.$refs.Lk.myCourses=false
                this.$root.$refs.Lk.aboutMe=false
            }else{
                this.$root.$refs.Header.show=true
                this.$awn.warning('Для входа в личный кабинет, пожалуйста авторизуйтесь', this.$options)
            }
            
        },
        startClicked(){
            this.$root.$refs.Catalog.loadListBy()
        }
    }
}
</script>