import { isSubscribe } from '../../api/subscription';

const state = {
    result: undefined,
}

const getters = {
    getIsSubscribed: state => state.result,
}
const mutations = {
    SET_RESULT(state, data) {
        state.result = data;
    }
}
const actions = {
    isUserSubscribe: async({ commit }, user_id) => {
        const subVars = {
            'subed': true,
            'notsubed': false
        }
        try {
            const response = await isSubscribe(user_id);
            commit('SET_RESULT', subVars[response.data.detail], { root: true });
            commit('setIsSubscribed', subVars[response.data.detail], { root: true });
            return subVars[response.data.detail]
        } catch (error) {
            console.log('Subscribe info error');
            console.log(error);
        }
    },
    setResult: ({ commit }, value) => {
        // state.result = value;
        commit('setIsSubscribed', value, { root: true });
        // commit('SET_RESULT', value, { root: true });
    }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}