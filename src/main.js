import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueAWN from "vue-awesome-notifications"


import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'


// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

// Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(VuePlyr, {
    plyr: {
        settings: ['quality', 'speed', 'loop'],
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'airplay', 'fullscreen'],
        quality: { default: 360, options: [1080, 720, 480, 360] },
        speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
        clickToPlay: true
    }
})
let options = {
    durations: {
        success: 4000,
        warning: 4000
    }
}

Vue.use(VueAWN, options)


Vue.use(VueAxios, axios, VueAwesomeSwiper)

// window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false

new Vue({
    router,
    store,
    axios,
    render: h => h(App),
}).$mount('#app')