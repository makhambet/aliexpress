import api from '@/help/api'

let state = {
    products: [],
    product: [],
    addresses: [],
    baskets: [],
    cats: [],
    orders: [],
    banners: [],
    cat_products: [],
    count: 0,
    info: [],
    offers: [],
    speciality: [],
    search: [],
    profile: [],
    buy_with_it: [],
    brands: []
}

let mutations = {
    SET_PRODUCTS(state, payload){
        state.products = payload
    },
    SET_PRODUCT(state, payload){
        state.product = payload
    },
    SET_ADDRESSES(state, payload){
        state.addresses = payload
    },
    SET_BASKETS(state, payload){
        state.baskets = payload
    },
    SET_CATS(state, payload){
        state.cats = payload
    },
    SET_ORDERS(state, payload){
        state.orders = payload
    },
    SET_BANNERS(state, payload){
        state.banners = payload
    },
    SET_CAT_PRODUCTS(state, payload){
        state.cat_products = payload;
    },
    SET_COUNT(state, payload){
        state.count = payload;
    },
    SET_INFO(state, payload){
        state.info = payload;
    },
    SET_OFFERS(state, payload){
        state.offers = payload;
    },
    SET_SPECIALITY(state, payload){
        state.speciality = payload;
    },
    SET_SEARCH(state, payload){ 
        state.search = payload;
    },
    SET_PROFILE(state, payload){
        state.profile = payload;
    },
    SET_BUY_WITH_IT(state, payload){
        state.buy_with_it = payload;
    },
    SET_BRANDS(state, payload){
        state.brands = payload;
    }
}

let actions = {
    GET_PRODUCTS: async({commit}, payload) => {
        api.get('/product/all/product', {
            params: payload
        })
        .then(response => {
            console.log(response)
            commit('SET_PRODUCTS', response.data);
        })
        .catch(e => {
            commit('SET_PRODUCTS', e.response);
        })
    },
    GET_PRODUCT: async({commit}, payload) => {
        api.get('/product/all/product/' + payload)
        .then(response => {
            commit('SET_PRODUCT', response.data.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_ADDRESSES: async({commit}) => {
        api.get('/address/all')
        .then(response => {
            commit('SET_ADDRESSES', response.data.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_BASKETS: async({commit}) => {
        api.get('/basket/all')
        .then(response => {
            commit('SET_BASKETS', response.data.data);
        })
        .catch(() => {
            commit('SET_BASKETS', []);
        })
    },
    GET_CATS: async({commit}) => {
        api.get('/cats/all')
        .then(response => {
            commit('SET_CATS', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_ORDERS: async({commit}) => {
        api.get('/product/all/product')
        .then(response => {
            commit('SET_ORDERS', response);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_BANNERS: async({commit}) => {
        api.get('/main/super/offer')
        .then(response => {
            commit('SET_BANNERS', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_CAT_PRODUCTS: async({commit}) => {
        api.get('/cats/products')
        .then(response => {
            commit('SET_CAT_PRODUCTS', response.data.data);
        })
        .catch(e => {
            commit('SET_CAT_PRODUCTS', e.response.data);
        })
    },
    GET_COUNT: async({commit}) => {
        api.get('/basket/count')
        .then(response => {
            commit('SET_COUNT', response.data.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_INFO: async({commit}) => {
        api.get('/main/all/info')
        .then(response => {
            commit('SET_INFO', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_OFFERS: async({commit}) => {
        api.get('/main/all/offers')
        .then(response => {
            commit('SET_OFFERS', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_SPECIALITY: async({commit}) => {
        api.get('/main/all/speciality')
        .then(response => {
            commit('SET_SPECIALITY', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_SEARCH: async({commit}, payload) => {
        api.post('/product/search', payload)
        .then(response => {
            commit('SET_SEARCH', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_PROFILE: async({commit}, payload) => {
        api.get('/user/getuserinfo', payload)
        .then(response => {
            commit('SET_PROFILE', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_BUY_WITH_IT: async({commit}, payload) => {
        api.post('/product/buy_with_it/' + payload)
        .then(response => {
            commit('SET_BUY_WITH_IT', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
    GET_BRANDS: async({commit}) => {
        api.get('/product/brands')
        .then(response => {
            commit('SET_BRANDS', response.data);
        })
        // .catch(e => {
        //     console.log(e.response)
        // })
    },
}

export default {
    state,
    mutations,
    actions
}