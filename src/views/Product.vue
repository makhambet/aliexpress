<template>
    <div class="product">
        <b-container v-if="PRODUCT.parend_cat">
            <div class="title">
                <p>
                    {{PRODUCT.parend_cat.name}}
                    <span>/</span>
                    <!-- Шампуни, бальзамы, маски для волос
                    <span>/</span>  -->
                    <span> {{PRODUCT.cat.name}}</span>
                </p>
            </div>
            <b-row>
                <div class="col-3">
                    <div class="menu">
                        <div class="cat_name">
                            {{PRODUCT.parend_cat.name}}:
                        </div>
                        <div 
                            :class="{active: item.id === PRODUCT.cat.id}"
                            v-for="item in PRODUCT.parend_cat.sub_cats"
                            :key="item.id"
                        >
                            {{item.name}}
                        </div>
                    </div>
                </div>
                <div class="col-5">
                    <div class="product-img">
                        <!-- <img src="https://a.lmcdn.ru/img600x866/G/A/GA002LWIVS77_3324795_1_v5.jpg" alt=""> -->
                        <img :src="url + PRODUCT.images[0].url" alt="">
                    </div>
                </div>
                <div class="col-4">
                    <p><strong>{{PRODUCT.name}}</strong></p>
                    <b-row>
                        <div class="col-lg-4 col-md-6 col-12">
                            <strong>1580 тг</strong>
                        </div>
                        <div class="col-lg-8 col-md-6 col-12">
                            <div class="count">
                                <button @click="PRODUCT.count++">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="7" width="2" height="16" rx="1" fill="#C4C4C4"/>
                                        <rect x="16" y="7" width="2" height="16" rx="1" transform="rotate(90 16 7)" fill="#C4C4C4"/>
                                    </svg>
                                </button>
                                <span>{{PRODUCT.count}} шт</span>
                                <button @click="PRODUCT.count--" :disabled="PRODUCT.count<=1">
                                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="16" width="2" height="16" rx="1" transform="rotate(90 16 0)" fill="#C4C4C4"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </b-row>
                    <div class="buy" @click="buy()">
                        Добавить в корзину
                    </div>
                    <div class="description">
                        <p>ОПИСАНИЕ ПРОДУКТА:</p>
                        <p>{{PRODUCT.description}}</p>
                        <p>                        
                            Страна-производитель: <span>{{PRODUCT.country}}</span> <br>
                            Бренд: <span v-if="PRODUCT.brand">{{PRODUCT.brand.name}}</span>
                        </p>
                    </div>
                </div>
            </b-row>
            <!-- <p>Также клиенты посмотрели:</p>
            {{BUY_WITH_IT}} -->
            <app-carousel v-if="BUY_WITH_IT && BUY_WITH_IT.length > 0" :title="'Также клиенты посмотрели:'" :products="BUY_WITH_IT"></app-carousel>
        </b-container>
        <app-not :title="title" :stylish="stylish" v-if="box" @close="box=false"></app-not>
    </div>
</template>

<script>
    import api from '@/help/api'
    import Cookies from 'js-cookie'
    import { mapGetters } from 'vuex'
    import AppCarousel from '@/components/carousel/'
    export default {
        props: {
            id: {
                type: String,
                required: true
            },
        },
        data() {
            return {
                url: 'http://45.136.56.72/',
                title: '',
                stylish: '',
                box: false
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCT',
                'BUY_WITH_IT'
            ])
        },
        methods: {
            async buy(){
                if(Cookies.get('aliexpress-auth')){
                    await api.post('/basket/add', {
                        product_id: this.PRODUCT.id,
                        count: this.PRODUCT.count,
                    })
                    .then(() => {
                        this.title = 'Успешно добавлен!';
                        this.stylish = 'success';
                        this.box = true;
                        this.$store.dispatch('GET_COUNT');
                    })
                    // .catch(e => {
                    //     console.log(e.response);
                    // })
                }
                else{
                    let basket = JSON.parse(localStorage.getItem('aliexpress-basket')) || [];
                    for (let i = 0; i < basket.length; i++) {
                        if(basket[i].id === this.PRODUCT.id){
                            basket[i].product_quantity += this.PRODUCT.count;
                            break;
                        }
                        else if(i === basket.length -1 ){
                            basket.push({
                                id: this.PRODUCT.id,
                                product_name: this.PRODUCT.name,
                                product_price: this.PRODUCT.price,
                                product_quantity: this.PRODUCT.count,
                                product_image: this.PRODUCT.images.length > 0 ? this.PRODUCT.images[0].url : null
                            })
                            break;
                        }
                    }
                    if(basket.length === 0){
                        basket.push({
                            id: this.PRODUCT.id,
                            product_name: this.PRODUCT.name,
                            product_price: this.PRODUCT.price,
                            product_quantity: this.PRODUCT.count,
                            product_image: this.PRODUCT.images.length > 0 ? this.PRODUCT.images[0].url : null
                        })
                    }
                    this.title = 'Успешно добавлен!';
                    this.stylish = 'success';
                    this.box = true;
                    this.$store.dispatch('GET_LOCAL_COUNT', basket.length)
                    localStorage.setItem('aliexpress-basket', JSON.stringify(basket));
                }
                this.PRODUCT.count = 1;
            }
        },
        components: {
            AppCarousel,
        },
        created () {
            this.$store.dispatch('GET_PRODUCT', this.id);
            this.$store.dispatch('GET_BUY_WITH_IT', this.id)
        },
    }
</script>

<style scoped>
    .title{
        color: #48ABE3;
    }
    .title span{
        color: #6a6a6a;
        font-weight: bolder;
    }
    .menu{
        background: #EFEEEE;
        border-radius: 5px;
        color: #3D8FBD;
        padding: 5px 0;
    }
    .menu > div{
        padding: 5px 10px;
        cursor: pointer;
    }
    .menu .cat_name{
        color: #000;
    }
    .menu .active{
        border: 1px solid #C4C4C4;
    }
    .product-img{
        border: 1px solid #000000;
        text-align: center;
    }
    .product-img img{
        max-width: 100%;
        min-width: 100px;
        max-height: 400px;
    }
    .count button{
        background: none;
        border: 1px solid #C4C4C4;
        color: #C4C4C4;
        font-size: 28px;
        line-height: 28px;
        padding: 0 10px;
        outline: none;
        cursor: pointer;
    }
    .count button:disabled{
        cursor: not-allowed;
    }
    .count button:first-child{
        border-radius: 5px 0 0 5px;
    }
    .count button:last-child{
        border-radius: 0 5px 5px 0;
    }
    .count span{
        padding: 8px 15px 1px;
        border: 1px solid #C4C4C4;
        border-left: none;
        border-right: none;
        font-weight: bold;
    }
    .buy{
        background: #B22021;
        border: 1px solid #C4C4C4;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 15px 0;
        text-align: center;
        color: #fff;
        padding: 5px 0;
    }
    .description span{
        color: #3D8FBD;
    }
</style>