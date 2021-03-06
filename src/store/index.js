import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import subscription from './modules/subscription.module'


// Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseServer: 'https://api.youcleve.com',
        // baseServer: 'http://127.0.0.1:8000',
        // baseServer: 'https://gentle-reef-53739.herokuapp.com',
        // baseServer: 'https://84.252.133.121',

        authUser: {},
        user: {
            username: '',
            id: '',
        },
        isSubscribed: false,
        isAuthenticated: false,
        jwtAccess: localStorage.getItem('access'),
        jwtRefresh: localStorage.getItem('refresh'),
    },
    mutations: {
        updateId(state, value) {
            Vue.set(state, 'user.id', value)
            localStorage.setItem('id', value)
        },
        setIsSubscribed(state, value) {
            state.isSubscribed = value;
        },
        setIsAuthenticated(state, value) {
            Vue.set(state, 'isAuthenticated', value)
                // state.isAuthenticated = value
        },
        setAuthUser(state, payload) {
            state.authUser = payload.authUser
            state.isAuthenticated = payload.isAuthenticated
        },
        updateAccessToken(state, newToken) {
            localStorage.setItem('access', newToken);
            state.jwtAccess = newToken;
        },
        updateRefreshToken(state, newToken) {
            localStorage.setItem('refresh', newToken);
            state.jwtRefresh = newToken;
        },
        updateUsername(state, username) {
            Vue.set(state, 'user.username', username)
            localStorage.setItem('username', username);

        },
        clearLocalStorage(state) {
            localStorage.clear()
            state.jwtAccess = ''
            state.jwtRefresh = ''
            state.isAuthenticated = false
            state.user = {}
        },
        removeToken(state) {
            localStorage.removeItem('token');
            state.jwt = null;
        }
    },
    actions: {
        logout: async(context) => {
            context.commit('clearLocalStorage')
            this.$router.push('/')
        },
        refresh: async(context) => {
            let path = '/api/accounts/user/login/refresh';
            let data = {
                refresh: context.getters.getRefreshToken
            }
            const options = {
                url: path,
                baseURL: context.state.baseServer,
                method: 'POST',
                data: data,
            }
            let response = await axios(options)
            console.log('Access', response)
            if (response.status == 200) {
                context.commit('updateAccessToken', response.data.access)
                return true
            }
            return false
        },
        request: (context, { auth, method, path, data, params, headers }) => {
            // console.log("Payload", auth, method, path, data, params, headers)
            const options = {
                url: path,
                baseURL: context.state.baseServer,
                method: method,
                headers: headers,
                data: data,
                params: params,
            }
            if (auth) {
                const authorization = {
                    Authorization: `JWT ${context.state.jwtAccess}`,
                    'Content-Type': 'application/json'
                }
                options.xhrFields = {
                    withCredentials: true
                }
                options.headers = {...options.headers, ...authorization }
            }
            return options
        },
        authenticatedRequest: async(context, { method, path, data, params, headers }) => {
            let options = await context.dispatch('request', {
                auth: true,
                path: path,
                method: method,
                headers: headers,
                data: data,
                params: params,
            });
            // console.log(options)
            let response = ''
            try {
                response = await axios(options)
                    // axios(options)
                    //     .then(res => { console.log('ok', res) })
                    //     .catch(error => {
                    //         console.log('response: ', error.response.data);
                    //     });
            } catch (e) {
                console.log(e.da)
                let refresh = await context.dispatch('refresh')
                console.log('Refresh', refresh)
                if (refresh) {
                    options = await context.dispatch('request', {
                        auth: true,
                        path: path,
                        method: method,
                        headers: headers,
                        data: data,
                        params: params,
                    });

                    response = await axios(options)
                } else {
                    console.log("Error")
                    await context.dispatch('logout')
                }
            }
            console.log('Response', response)
            console.log('Response status', response.status)

            return response
        },
        // simpleRequest: (context, method, path, data, params, headers) => {
        //     const options = context.dispatch.getRequestOptions(false, method, path, data, params, headers);
        //     this.axios(options)
        //         .then(response => {
        //             console.log(response.data)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // },
    },
    modules: { subscription },
    getters: {
        getServerUrl: state => {
            return state.baseServer
        },
        getId: state => {
            if (state.isAuthenticated == true) {
                state.user.id = localStorage.getItem('id')
            }
            if (state.user.id)
                return state.user.id
            return localStorage.getItem('id')
        },
        getIsSubscribed: state => {
            return state.isSubscribed;
        },
        getIsAuthenticated: state => {
            return state.isAuthenticated
        },
        getRefreshToken: state => {
            return state.jwtRefresh
        },
        getUsername: state => {
            if (state.isAuthenticated == true) {
                state.user.username = localStorage.getItem('username')
            }
            if (state.user.username)
                return state.user.username
            return localStorage.getItem('username')
        },
        getBase: state => {
            return {
                baseURL: state.baseServer,
                headers: {
                    Authorization: `JWT ${state.jwtAccess}`,
                    'Content-Type': 'application/json'
                },
                xhrFields: {
                    withCredentials: true
                }
            }
        },
        // getRequestOptions: (state, auth, method, path, data, params, headers) => {
        //     const options = {
        //         url: path,
        //         baseURL: state.baseServer,
        //         method: method,
        //         headers: headers,
        //         data: data,
        //         params: params,
        //     }
        //     if (auth) {
        //         options.headers += {
        //                 Authorization: `JWT ${state.jwtAccess}`,
        //                 'Content-Type': 'application/json'
        //             },
        //             options.xhrFields = {
        //                 withCredentials: true
        //             }
        //     }
        //     return options
        // },

        // getRequest: (auth, method, path, data, params, headers) => {
        //     const options = {
        //         url: path,
        //         baseURL: state.baseServer,
        //         method: method,
        //         headers: headers,
        //         data: data,
        //         params: params,
        //     }
        //     if (auth) {
        //         options.headers += {
        //                 Authorization: `JWT ${state.jwtAccess}`,
        //                 'Content-Type': 'application/json'
        //             },
        //             options.xhrFields = {
        //                 withCredentials: true
        //             }
        //     }
        //     this.axios(options)
        //         .then()
        // },
        // refreshToken: state => {
        //     const listA = await this.axios
        //         .post(`${this.$store.getters.getServerUrl}/api/accounts/user/login`, {

        //         })
        //         .then(response => {
        //             if (response.status == 200) {
        //                 this.$store.commit('updateAccessToken', response.data.access)
        //                 this.$store.commit('updateRefreshToken', response.data.refresh)
        //                 this.$store.commit('updateUsername', response.data.user)
        //                 this.$store.commit('updateId', response.data.id)
        //                 this.$store.commit('setIsAuthenticated', true)

        //                 this.callGoodWarnSignIn()
        //                 this.showLogo = true
        //                 this.logIn = false
        //                 this.$root.$refs.Presentation.loadCourseByClick()

        //             } else {
        //                 this.callBadWarnSignIn()
        //                 this.showLogo = false
        //                 this.logIn = true

        //             }
        //             this.changeLogoOrSign()
        //             return response.data
        //         })
        //         .catch(error => {
        //             console.log(error.response.status)
        //             if (error.response.status != 200) {
        //                 this.showLogo = false
        //                 this.logIn = true
        //                 this.callBadWarnSignIn()
        //             }
        //         })
        //     return listA
        // }
    }
})


//TODO use tt norms pro