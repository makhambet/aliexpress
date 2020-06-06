
let getters = {
    PRODUCTS: (state) => state.get.products,
    PRODUCT: (state) => state.get.product,
    CATS: (state) => state.get.cats,
    BANNERS: (state) => state.get.banners,
    CAT_PRODUCTS: (state) => state.get.cat_products,
    COUNT: (state) => state.get.count,
    BASKETS: (state) => state.get.baskets,
    INFO: (state) => state.get.info,
    OFFERS: (state) => state.get.offers,
    SPECIALITY: (state) => state.get.speciality,
    SEARCH: (state) => state.get.search,
    PROFILE: (state) => state.get.profile,
    BUY_WITH_IT: (state) => state.get.buy_with_it,
    ADDRESSES: (state) => state.get.addresses,
    BRANDS: (state) => state.get.brands,



    AUTH: (state) => state.local.auth,
    SIGN: (state) => state.local.sign,
    LOCAL_COUNT: (state) => state.local.local_count,
    LOCAL_BASKET: (state) => state.local.local_basket,
}
export default getters;