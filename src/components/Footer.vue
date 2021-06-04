<template>
    <footer class="footer">
        <div class="footer-border">
            <div class="footer-content">
                <div class="footer-logo">
                    <router-link to="/" class="header-logo"><span>YOU</span><br><span>CLEVE</span></router-link>
                </div>
                <div class="footer-nav">
                    <nav>
                        <ul class="nav">
                            <li><router-link to="/catalog" @click.native="loadCatalog(),scrollBehavior()">Каталог</router-link></li>
                            <li><router-link to="/podpiska" class="footer-item" @click="scrollBehavior()">Подписка</router-link></li>
                            <li><div class="footer-item" @click="checkAuthForSaved(),loadlistSavedCourses(),scrollBehavior()">Сохраненное</div></li>
                            <li><div class="footer-item" @click="checkAuth(), podpiskiClicked(),scrollBehavior()" >Личный кабинет</div></li>
                        </ul>
                    </nav>
                </div>  
            </div>
        </div>
        <div class="politica">
            <div class="org">© 2021 Сервис YouCleve</div>
            <div class="pol-link">
                <router-link to="/soglashenie">Пользовательское соглашение</router-link>
                <router-link to="/politika">Политика конфиденциальности</router-link>
                <router-link to="/aboutpay">Об оплате</router-link>
            </div>
        </div>
    </footer>  
</template>

<script>
export default {
    name: 'Footer',
    methods:{
        checkAuth: function(){
            if (this.$store.getters.getIsAuthenticated){
                this.$router.push('/lk')
            }else{
                this.show=true
                this.$awn.warning('Для входа в личный кабинет, пожалуйста авторизуйтесь', this.$options)
            }
        },
        checkAuthForSaved: function(){
            if (this.$store.getters.getIsAuthenticated){
                this.$router.push('/saved')
            }else{
                this.show=true
                this.$awn.warning('Для просмотра сохраненных, пожалуйста авторизуйтесь', this.$options)
            }
        },
        async loadlistSavedCourses() { 
            this.$root.$refs.Saved.savedListCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/saved`)   
        },
        podpiskiClicked(){
            this.$root.$refs.Lk.loadlistSubCourses()
        },
        
        scrollBehavior() {
            return { x: 0, y: 0 };
        },
        async loadList(pathUrl)
        {
            const base = this.$store.getters.getBase
            const axios = this.axios.create(base)
			const listA = await axios
            .get(`${pathUrl}`)
            .then(response => response.data)
            return listA
        },
    }
}
</script>

