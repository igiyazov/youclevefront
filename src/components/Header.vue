<template>
  <div id="app-header">
    <header>
        <nav class="header-nav">
            <router-link to="/" class="header-logo" v-show="headerShow"><span>YOU</span><br><span>CLEVE</span></router-link>
            <div class="search">
                <div class="area-wrapper">
                    <transition name="slide-fade">
                        <input
                        @click="searchBtn=false, showMenu=false" class="search-input" type="text" placeholder="Поиск..."
                        v-on:keyup.enter="goToSearchCat()"
                        v-show="showSearch"
                        @change="loadSearch()"
                        v-model="searchText">
                        
                    </transition>
                    <div v-show="areaShow" class="search-area">
                        <div class="sr-area-items">
                            <span class="sr-header">Видео-курсы</span>
                            <span v-show="noSrCourses" class="no-searched-item">Нет совпадений</span>
                            <div class="search-courses">
                                <router-link :to="`/course/${searchItem.id}`"
                                v-for="searchItem in searchList.courses" :key="searchItem.id"
                                @click.native="courseClicked(searchItem), 
                                areaShow=false,showSearch = !showSearch,
                                showSearchBtn=!showSearchBtn, 
                                showFade=!showFade, headerShow=!headerShow,
                                searchBtn=true, logOrAva=true,searchText=''"
                                >{{searchItem.title}}</router-link> 
                            </div>
                        </div>
                        <div class="sr-area-items">
                            <span class="sr-header">Авторы</span>
                            <span v-show="noSrAuthors" class="no-searched-item">Нет совпадений</span>
                            <div class="search-authors" >
                                <router-link class="search-aut-item" 
                                :to="`/author/${searchAut.custom_user.id}`"
                                v-for="searchAut in searchList.authors" :key="searchAut.custom_user.id"
                                @click.native="authorClicked(searchAut), 
                                areaShow=false,showSearch = !showSearch, 
                                showSearchBtn=!showSearchBtn,
                                showFade=!showFade, headerShow=!headerShow,
                                searchBtn=true, logOrAva=true,searchText=''">
                                    <img 
                                    class="search-avatar"
                                    :src="`${searchAut.photo}`" alt="course-img">
                                    {{searchAut.custom_user.username}} 
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <transition name="slide-fade">
                    <div v-show="showSearchBtn" 
                    @click="goToSearchCat()"
                    class="search-open-btn">Найти</div>
                </transition>
                
                <button class="search-btn" v-show="searchBtn" @click="searchBtn=false, logOrAva=false, showSearch = !showSearch,showSearchBtn=!showSearchBtn, headerShow=!headerShow, showFade=!showFade">
                    <img class="search-icon" src="../assets/img/icons/search.png" alt="search-icon">
                </button>
                <transition name="fade">
                    <div id="shadow" v-show="showFade" @click="areaShow=false,showSearch = !showSearch,
                    showSearchBtn=!showSearchBtn, showFade=!showFade, headerShow=!headerShow,
                    searchBtn=true, logOrAva=true"></div>
                </transition>
                
            </div>
            <div class="log-or-ava" v-show="logOrAva">
                <div class="log-in" v-show="logIn">
                    <a class="log-in-btn" v-on:click="show=!show,isActiveSignIn=true, 
                    isActiveSignUp=false">Войти</a>
                </div>
                <div class="header__item" v-show="showLogo">
                    <a href="#" class="header__link">
                        <transition name="slide-fade">
                        <!-- Header Navigation Menu Icons -->
                        <img src="../assets/img/avatar.png" class="header--button"  @click="showMenu = !showMenu">
                        </transition>
                    </a>
                    <!-- Dropdown Menu -->
                    <transition name="dropdown">
                        <div class="dropdown__menu" v-bind:class="{ active: showMenu }" v-if="showMenu">
                        <ul class="dropdown__menu-nav">
                            <li class="dropdown__menu-item" @click="checkAuth(),showMenu=false, podpiskiClicked()">
                            <router-link :to="`/lk`" class="dropdown__menu-link" title="Account">
                                <div class="dropdown__menu-svg">
                                <svg viewBox="0 0 496 512">
                                    <path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z" />
                                </svg>
                                </div>
                                <div class="dropdown__menu-text">Личный кабинет</div>
                            </router-link>
                            </li>
                            
                            <!-- Dropdown Menu Separator -->
                            <hr>
                            <li class="dropdown__menu-item">
                            <a @click="logOut(), showMenu=false" class="dropdown__menu-link" title="Help">
                                <!-- <div class="dropdown__menu-svg">
                                <svg viewBox="0 0 512 512">
                                    <path fill="currentColor" d="M256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28zm7.67-24h-16c-6.627 0-12-5.373-12-12v-.381c0-70.343 77.44-63.619 77.44-107.408 0-20.016-17.761-40.211-57.44-40.211-29.144 0-44.265 9.649-59.211 28.692-3.908 4.98-11.054 5.995-16.248 2.376l-13.134-9.15c-5.625-3.919-6.86-11.771-2.645-17.177C185.658 133.514 210.842 116 255.67 116c52.32 0 97.44 29.751 97.44 80.211 0 67.414-77.44 63.849-77.44 107.408V304c0 6.627-5.373 12-12 12zM256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8z" />
                                </svg>
                                </div> -->
                                <div class="dropdown__menu-logout">Выйти</div>
                            </a>
                            </li>
                            
                        </ul>
                        </div>
                    </transition>
                </div>
            </div>
        </nav>
        
    </header>
    <div class="all-courses">
        <ul>
            <li><router-link to="/catalog" @click.native="loadCatalog()">Каталог</router-link></li>
            <li><router-link to="/podpiska" class="ch-head-item">Подписка</router-link></li>
            <li><div class="ch-head-item" @click="checkAuthForSaved(),loadlistSavedCourses()">Сохраненное</div></li>
            <li><div class="ch-head-item" @click="checkAuth()" >Личный кабинет</div></li>
        </ul>
        
    </div> 
    <transition name="fade">
        <div id="shadow" v-show="show" v-on:click="show=!show"></div>
    </transition>
    <transition name="fade">
        <div class="dws-wrapper" id="sign-up" v-show="show">
            
            <div class="dws-form" >
                <div class="close">
                    <div class="close-btn fa fa-close" v-on:click="show=!show"></div>
                </div>
                <div class="label-form">
                    <label class="tab" title="Вкладка 1"
                    v-bind:class="{'active': isActiveSignIn}"
                    v-on:click="isActiveSignIn=true, isActiveSignUp=false"
                    >Авторизация</label>
                    <label class="tab" title="Вкладка 2"
                    v-bind:class="{'active': isActiveSignUp}"
                    v-on:click="isActiveSignIn=false, isActiveSignUp=true"
                    >Регистрация</label>
                </div>
                <form class="tab-form" 
                v-bind:class="{'active': isActiveSignIn}">
                    <div class="box-input" v-bind:class="{'focus':isFocusEmail}">
                        <label class="labelText">Введите E-mail</label>
                        <input class="input" type="email" required=""
                        v-on:focus="isFocusEmail=true" v-on:blur="onBlur" 
                        v-model="emailAut">
                    </div>
                    <div class="box-input" v-bind:class="{'focus':isFocusPass}">
                        <label class="labelText">Введите пароль</label>
                        <input class="input" type="password" required=""
                        v-on:focus="isFocusPass=true" v-on:blur="onBlur" 
                        v-model="passwordAut">
                    </div>
                    <a type="submit" class="button" @click="checkLogIn()">Войти</a>
                    <!-- <a href="#">Я забыл свой E-mail или пароль</a> -->
                </form>
                <form class="tab-form" 
                 method="post" novalidate="true"
                v-bind:class="{'active': isActiveSignUp}">
                    <div class="box-input" v-bind:class="{'focus':isFocusEmailReg}">
                        <label class="labelText">Введите E-mail адрес</label>
                        <input class="input" v-model="params.email" :class="validEmail(params.email)?applyInputStyle(params.email):applyInputStyle()" 
                        type="email" required=""
                        v-on:focus="isFocusEmailReg=true" v-on:blur="onBlur" 
                        >
                    </div>
                    <div class="box-input" v-bind:class="{'focus':isFocusName}">
                        <label class="labelText">Введите Имя</label>
                        <input class="input" v-model="params.username" type="name" :class="applyInputStyle(params.username)"
                        v-on:focus="isFocusName=true" v-on:blur="onBlur" 
                        >
                    </div>
                    <div class="box-input" v-bind:class="{'focus':isFocusPassFirstReg}">
                        <label class="labelText">Введите пароль</label>
                        <input class="input" v-model="params.password" type="password" :class="applyPasswordStyle(params.password,secPass)"
                        v-on:focus="isFocusPassFirstReg=true" v-on:blur="onBlur" 
                        > 
                    </div>
                    <div class="box-input" v-bind:class="{'focus':isFocusPassSecReg}">
                        <label class="labelText">Подтвердите пароль</label>
                        <input class="input" type="password" :class="applyPasswordStyle(params.password,secPass)"
                        v-on:focus="isFocusPassSecReg=true" v-on:blur="onBlur" 
                        v-model="secPass">
                    </div>
                    
                    <a type="submit" class="button" @click="(
                        params.password.length > 0 &&
                        params.username.length > 0 &&
                        params.password==secPass && 
                        checked==true&&
                        validEmail(params.email))?checkPostListSignUp():
                        (callBadWarnSignUp(),show=true)" >Регистрация</a>
                
                    <div class="recover">
                        <input type="checkbox" id="ckbox" v-model="checked">
                        <label for="ckbox">Ознакомлен(-а) и принимаю 
                            <router-link to="/soglashenie" @click.native="show=!show">Пользовательское соглашение</router-link> 
                            <router-link to="/politika" @click.native="show=!show">Политика конфиденциальности</router-link> 
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</div>    

</template>
<script>
import { mapActions } from "vuex";
export default {
    name: 'Header',
    data(){
        return{
            noSrCourses:false,
            noSrAuthors:false,
            logOrAva:true,
            showLogo:false,
            showMenu:false,
            // logText:'Войти',
            logInInfo:{},
            checked:true,
            searchText: '',
            searchList:[],
            searchBtn:true, 
            logIn:false,
            areaShow:false,
            showFade:false,
            headerShow:true,
            showSearch:false,
            showSearchBtn:false,
            show:false,
            isActiveSignIn:true,
            isActiveSignUp:false,
            isFocusPass:false,
            isFocusEmail:false,
            isFocusEmailReg:false,
            isFocusPassFirstReg:false,
            isFocusPassSecReg:false,
            isFocusName:false,
            params:{
                email:"",
                password:"",
                username:"", 
            },
            emailAut:"admin@admin.co",
            passwordAut:"admin",
            secPass:""

        }
    },
    watch:{
        searchText:function() {this.loadSearch()},
    },
    computed:{
        baseUrl(){
        return this.$store.getters.getServerUrl
        },
    },
    async created()
    {
        const token = await this.refreshAccessToken()
        if (token){
            this.$store.commit('setIsAuthenticated', true)
            this.$store.commit('updateAccessToken', token.access)
        }
        this.$root.$refs.Header=this
        if( !(this.$store.getters.getId 
            && this.$store.getters.getUsername 
            && this.$store.getters.getRefreshToken)){
                this.$store.commit('clearLocalStorage')
                this.logIn=true
                return;
            }
        this.changeLogoOrSign()
    },
    methods:{
        ...mapActions('subscription', ['isUserSubscribe', 'setResult']),
        goToSearchCat: function(){
            if(this.searchList.courses.length>0){
                this.areaShow=false,
                this.showSearch = !this.showSearch,
                this.showSearchBtn=!this.showSearchBtn, 
                this.showFade=!this.showFade, 
                this.headerShow=!this.headerShow,
                this.searchBtn=true, 
                this.logOrAva=true,
                this.searchText=''
                if(this.$router.history.current.fullPath!='/searchcatalog'){
                    this.$router.push('/searchcatalog')
                }else{
                    this.$root.$refs.SearchCatalog.searchCatalogListCourses=this.searchList.courses
                }
            }
            
            
        },
        checkAuth: function(){
            if (this.$store.getters.getIsAuthenticated){
                this.$router.push('/lk')
            }else{
                // this.show=true
                this.$awn.warning('Для входа в личный кабинет, пожалуйста авторизуйтесь', this.$options)
            }
        },
        checkAuthForSaved: function(){
            if (this.$store.getters.getIsAuthenticated){
                this.$router.push('/saved')
            }else{
                // this.show=true
                this.$awn.warning('Для просмотра сохраненных, пожалуйста авторизуйтесь', this.$options)
            }
        },
        loadCatalog: function(){
            this.$root.$refs.Catalog.loadListBy()
        },
        changeLogoOrSign: function(){
            if (this.$store.getters.getIsAuthenticated==true){
                this.showLogo=true
                this.logIn=false
            }else{
                this.showLogo=false
                this.logIn=true
            }
        },
        callGoodWarnSignUp: function () { 
            this.$awn.success('Регистация прошла успешно', this.$options)
            this.isActiveSignIn=true
            this.isActiveSignUp=false
            this.emailAut=this.params.email
            this.isFocusEmail=true
            this.passwordAut=this.params.password
            this.isFocusPass=true
            this.params.email=''
            this.params.password=''
            this.secPass=''
            this.params.username=''
        },
        callBadWarnSignUp: function () { 
            this.$awn.warning('Заполните обязательные поля', this.$options)
        },
        callGoodWarnSignIn: function () { 
            this.$awn.success(`Вы вошли в аккаунт! Здравствуйте!`, this.$options)
            this.show=false
            this.logText='Выйти'
            
        },
        callBadWarnSignIn: function () { 
            this.$awn.warning('Неверно введена почта или пароль', this.$options)
        },

        applyInputStyle: function (targetInput) { 
            return [(targetInput) ? ('input-has-value-style')
             : ('input-no-value-style')]
        },
        applyPasswordStyle: function (pasInputFir,pasInputSec) { 
            return [(pasInputFir==pasInputSec&&pasInputFir.length>0&&pasInputSec.length>0) ? ('input-has-value-style')
             : ('input-no-value-style')]
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
            
        },
        async loadListSearch(pathUrl)
        {
			const listA = await this.axios
            .get(`${pathUrl}`)
            .then(response => response.data)
            return listA
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
        async checkPostListSignUp()
        {
            const listA = await this.axios
            .post(`${this.$store.getters.getServerUrl}/api/accounts/user/create`,
            {
                email : this.params.email,
                username : this.params.username,
                password : this.params.password
            })
            .then(response => {
                if(response.status==200){
                    console.log(response.status)
                    // this.postListSignUp()
                    this.callGoodWarnSignUp()
                }
                return response.data
            })
            .catch(error =>{
                console.log(error.response.status)
                if(error.response.status!=200){
                    this.$awn.warning('Пользователь с таким почтовым адресом уже зарегестрирован', this.$options)
                }
            })
            return listA
        },
        // async postListSignUp()
        // {
        //     const listA = await this.axios
        //     .post(`${this.$store.getters.getServerUrl}/api/accounts/user/create`,
        //     {
        //         email : this.params.email,
        //         username : this.params.username,
        //         password : this.params.password
        //     })
        //     .then(response => {
        //         return response.data
        //     })
        //     return listA
        // },
        async refreshAccessToken()
        {
            const token = await this.axios
            .post(`${this.$store.getters.getServerUrl}/api/accounts/user/login/refresh`,
            {
                refresh:this.$store.getters.getRefreshToken
            })
            .then(response => {
                return response.data
            })
            .catch(error =>{
                console.log(error)
                console.log(error.response)
            })          
            return token
        },
        async checkLogIn()
        {
            const listA = await this.axios
            .post(`${this.$store.getters.getServerUrl}/api/accounts/user/login`,
            {
                email : this.emailAut,
                password : this.passwordAut
            })
            .then(response => {
                if(response.status==200){
                    this.$store.commit('updateAccessToken', response.data.access)
                    this.$store.commit('updateRefreshToken', response.data.refresh)
                    this.$store.commit('updateUsername', response.data.user)
                    this.$store.commit('updateId', response.data.id)
                    this.$store.commit('setIsAuthenticated', true)
                    if (response.data.id)
                        this.isUserSubscribe(response.data.id);
                    this.callGoodWarnSignIn()
                    this.showLogo=true
                    this.logIn=false
                    this.$root.$refs.Presentation.loadCourseByClick()

                    
                    
                }else{
                    this.callBadWarnSignIn()
                    this.showLogo=false
                    this.logIn=true
                    
                }
                this.changeLogoOrSign()
                return response.data
            })
            .catch(error =>{
                console.log(error.response.status)
                if(error.response.status!=200){
                    this.showLogo=false
                    this.logIn=true
                    this.callBadWarnSignIn()
                }
            })
            return listA
        },
        // async postLogIn()
        // {
        //     const listA = await this.axios
        //     .post(`${this.$store.getters.getServerUrl}/api/accounts/user/login/`,
        //     {
        //         email : this.emailAut,
        //         password : this.passwordAut
        //     })
        //     .then(response => {
        //         return response.data
        //     })
        //     .catch(error =>{
        //         console.log(error.response.status)
        //     })
        //     localStorage.id=listA.id
        //     localStorage.email=listA.user
        //     localStorage.refresh=listA.refresh
        //     localStorage.access=listA.access
        //     return listA
        // },
        async logOut()
        {
            this.setResult(false);
            this.$store.commit('clearLocalStorage')
            this.$router.push('/')
            this.$awn.warning('Вы вышли из аккаунта! До скорых встреч', this.$options)
            this.logIn=true
            this.showLogo=false
            
            // this.$store.commit('subscription/SET_RESULT', false);
            // this.SET_RESULT(false);
            
            // const base = this.$store.getters.getBase
            // const axios = this.axios.create(base)
            // const listA = await axios
            // .post('/api/accounts/user/logout',
            // {
            //     refresh_token: this.$store.getters.getRefreshToken
            // })
            // .then(response => {
            //     console.log(response.status)
            //     this.$store.commit('clearLocalStorage')
            //     this.$awn.warning('Вы вышли из аккаунта! До скорых встреч', this.$options)
            //     return response.data
            //     })
            // this.changeLogoOrSign()
            // return listA
        },
        onBlur(){
            
            if(this.emailAut == ""){
            this.isFocusEmail = false
            }
            if(this.passwordAut == ""){
            this.isFocusPass = false
            }
            if(this.params.email == ""){
            this.isFocusEmailReg = false
            }
            if(this.params.password == ""){
            this.isFocusPassFirstReg = false
            }
            if(this.secPass == ""){
            this.isFocusPassSecReg = false
            }
            if(this.params.username == ""){
            this.isFocusName = false
            }
            
        },
        
        loadSearch:async function(){
            this.searchList=await this.loadListSearch(`${this.$store.getters.getServerUrl}/api/search?search=${this.searchText}`)
            if(this.searchText.length>0){
                this.areaShow=true
            }else{
                this.areaShow=false
            }
            if(this.searchList.courses==0){
                this.noSrCourses=true
            }else{
                this.noSrCourses=false
            }
            if(this.searchList.authors==0){
                this.noSrAuthors=true
            }else{
                this.noSrAuthors=false
            }
        },
        courseClicked:async function(searchItem){
            this.$root.$refs.Presentation.loadCourseByClick(searchItem.id)
        },
        authorClicked:async function(searchAut){
            this.$root.$refs.Author.loadAuthorByClick(searchAut.custom_user.id)
        },
        async loadlistSavedCourses() { 
            this.$root.$refs.Saved.savedListCourses=await this.loadList(`/api/accounts/profile/${this.$store.getters.getId}/saved`)   
        },
        
        // ...mapMutations('subscription', ['SET_RESULT'])
        
        }
}
</script>
<style>

</style>


