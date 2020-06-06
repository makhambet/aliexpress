import Cookies from 'js-cookie'

let state = {
    auth: false,
    sign: [],
    local_count: [],
    local_basket: []
}

let mutations = {
    SET_AUTH(state, payload){
        state.auth = payload
    },
    SET_SIGN(state, payload){
        state.sign = payload
    },
    SET_LOCAL_COUNT(state, payload){
        state.local_count = payload
    },
    SET_LOCAL_BASKET(state, payload){
        state.local_basket = payload
    },
}

let actions = {
    GET_AUTH: async({commit}, payload) => {
        if(payload){
            commit('SET_AUTH', payload);
        }
        else{
            let auth = Cookies.get('aliexpress-auth');
            if(auth){
                commit('SET_AUTH', auth);
            }
            else{
                commit('SET_AUTH', false);
            }
        }
    },
    GET_SIGN: async({commit}, payload) => {
        if(payload) commit('SET_SIGN', payload);
        else commit('SET_SIGN', false);
    },
    GET_LOCAL_COUNT: async({commit}) => {
        let basket = JSON.parse(localStorage.getItem('aliexpress-basket')) || [];
        let count = basket.length;
        commit('SET_LOCAL_COUNT', count);
    },
    GET_LOCAL_BASKET: async({commit}) => {
        let basket = JSON.parse(localStorage.getItem('aliexpress-basket')) || [];
        commit('SET_LOCAL_BASKET', basket);
    },
}

export default {
    state,
    mutations,
    actions
}