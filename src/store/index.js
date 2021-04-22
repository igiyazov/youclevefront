import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // baseServer: 'http://178.154.209.134',
        baseServer: 'http://127.0.0.1:8000',
        // baseServer: 'https://gentle-reef-53739.herokuapp.com',
        // baseServer: 'http://192.168.0.102:8000',

        authUser: {},
        user: {
            username: '',
            id: '',
        },
        isAuthenticated: false,
        jwtAccess: localStorage.getItem('access'),
        jwtRefresh: localStorage.getItem('refresh'),
    },
    mutations: {
        updateId(state, value) {
            Vue.set(state, 'user.id', value)
            localStorage.setItem('id', value)
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
        request: (context, { auth, method, path, data, params, headers }) => {
            console.log("Payload", auth, method, path, data, params, headers)
            const options = {
                url: path,
                baseURL: context.state.baseServer,
                method: method,
                data: data,
                params: params,
                headers: headers,
            }
            if (auth) {
                options.headers += {
                        Authorization: `JWT ${context.state.jwtAccess}`,
                        'Content-Type': 'application/json'
                    },
                    options.xhrFields = {
                        withCredentials: true
                    }
            }
            return options
        },
        authenticatedRequest: async(context, { method, path, data, params, headers }) => {
            console.log(method, path, data, params, headers)
            const options = await context.dispatch('request', {
                auth: true,
                path: path,
                method: method,
                headers: headers || undefined,
                data: data,
                params: params,
            });
            console.log(options)
            axios(options)
                // .then(response => {
                //     console.log(response.data)
                // })
                // .catch(error => {
                //     console.log(error)
                // })
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
    modules: {},
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