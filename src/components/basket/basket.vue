<template>
    <div class="col-12 col-md-8 basket">
        <div class="title">Корзина</div>
        <div class="box">Товар(ы)</div>
        <b-container>
            <div class="products" v-if="BASKETS.length > 0 && AUTH">
                <b-row v-for="item in BASKETS" :key="item.id">
                    <div class="col-12 col-md-3">
                        <figure>
                            <img :src="url + item.product.images[0].url" alt="">
                        </figure>
                    </div>
                    <div class="col-12 col-md-6">
                        <h3>{{item.product.price}}</h3>
                        <p>{{item.product.name}}</p>
                    </div>
                    <div class="col-12 col-md-3 right">
                        <div class="count">
                            <button @click="add(item.product.id)">                    
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="7" width="2" height="16" rx="1" fill="#C4C4C4"/>
                                    <rect x="16" y="7" width="2" height="16" rx="1" transform="rotate(90 16 7)" fill="#C4C4C4"/>
                                </svg>
                            </button>
                            <strong>{{item.count}} шт</strong>
                            <button @click="substrac(item.product.id)">                    
                                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="16" width="2" height="16" rx="1" transform="rotate(90 16 0)" fill="#C4C4C4"/>
                                </svg>
                            </button>
                        </div>
                        <button @click="deleteBasket(item.basket_id)">Удалить</button>
                    </div>
                </b-row>
                <b-row>
                    <div class="col-6"></div>
                    <div class="col-6">
                        <div class="flex">
                            <span>Всего товаров на сумму:</span>
                            <span>{{total}} тг</span>
                        </div>
                        <div class="flex">
                            <span>Цена доставки:</span>
                            <span>700 тг</span>
                        </div>
                        <div class="flex">
                            <span class="pt-1">Итоговая сумма: </span>
                            <p>{{total + 700}} тг</p>
                        </div>
                    </div>
                </b-row>
            </div>
            <div class="products" v-if="LOCAL_BASKET.length > 0 && !AUTH">
                <b-row v-for="(item, index) in LOCAL_BASKET" :key="item.id">
                    <div class="col-12 col-md-3">
                        <figure>
                            <img :src="url + item.product_image" alt="">
                        </figure>
                    </div>
                    <div class="col-12 col-md-6">
                        <h3>{{item.product_price}}</h3>
                        <p>{{item.product_name}}</p>
                    </div>
                    <div class="col-12 col-md-3 right">
                        <div class="count">
                            <button @click="localCount(index, '+')">                    
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="7" width="2" height="16" rx="1" fill="#C4C4C4"/>
                                    <rect x="16" y="7" width="2" height="16" rx="1" transform="rotate(90 16 7)" fill="#C4C4C4"/>
                                </svg>
                            </button>
                            <strong>{{item.product_quantity}} шт</strong>
                            <button :disabled="item.product_quantity <= 1" @click="localCount(index, '-')">                    
                                <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="16" width="2" height="16" rx="1" transform="rotate(90 16 0)" fill="#C4C4C4"/>
                                </svg>
                            </button>
                        </div>
                        <button @click="deleteLocal(index)">Удалить</button>
                    </div>
                </b-row>
                <b-row>
                    <div class="col-6"></div>
                    <div class="col-6">
                        <div class="flex">
                            <span>Всего товаров на сумму:</span>
                            <span>{{local_total}} тг</span>
                        </div>
                        <div class="flex">
                            <span>Цена доставки:</span>
                            <span>700 тг</span>
                        </div>
                        <div class="flex">
                            <span class="pt-1">Итоговая сумма: </span>
                            <p>{{local_total + 700}} тг</p>
                        </div>
                    </div>
                </b-row>
            </div>
            <div v-if="BASKETS.length === 0 && LOCAL_BASKET.length === 0" class="mt-5">
                <h3>Ваша корзина пуста</h3>
                <router-link to="/" tag="button" class="goHome">Вернутся к товарам</router-link>
            </div>
        </b-container>
        <app-not :title="title" :stylish="stylish" v-if="box" @close="box=false"></app-not>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import api from '@/help/api'
    export default {
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
                'BASKETS',
                'LOCAL_BASKET',
                'AUTH',
            ]),
            total(){
                let price = 0;
                this.BASKETS.forEach(element => {
                    price += element.count * element.product.price
                });

                return price;
            },
            local_total(){
                let price = 0;
                this.LOCAL_BASKET.forEach(element => {
                    price += element.product_quantity * element.product_price
                });

                return price;
            }
        },
        methods: {
            async add(id) {
                await api.post('/basket/add', {
                    product_id: id,
                    count: 1
                })
                .then(() => {
                    this.repeat();
                    this.title = 'Успешно';
                    this.stylish = 'success';
                    this.box = true
                })
                // .catch(e => {
                //     console.log(e.response)
                // })
            },
            async substrac(id){
                await api.post('/basket/subtract', {
                    product_id: id
                })
                .then(() => {
                    this.repeat();
                    this.title = 'Успешно';
                    this.stylish = 'success';
                    this.box = true
                })
                // .catch(e => {
                //     console.log(e.response)
                // })
            },
            localCount(index, a){
                let local_basket = JSON.parse(localStorage.getItem('aliexpress-basket')) || [];
                if(a === '-')
                    local_basket[index].product_quantity--;
                if(a === '+')
                    local_basket[index].product_quantity++;
                
                localStorage.setItem('aliexpress-basket', JSON.stringify(local_basket));
                this.$store.dispatch('GET_LOCAL_COUNT');
                this.$store.dispatch('GET_LOCAL_BASKET');
            },
            async deleteLocal(index){
                let local_basket = JSON.parse(localStorage.getItem('aliexpress-basket')) || [];
                local_basket.splice(index, 1);
                this.title = 'Успешно';
                this.stylish = 'success';
                this.box = true
                localStorage.setItem('aliexpress-basket', JSON.stringify(local_basket));
                this.$store.dispatch('GET_LOCAL_COUNT');
                this.$store.dispatch('GET_LOCAL_BASKET');
            },
            repeat(){
                this.$store.dispatch('GET_LOCAL_COUNT');
                this.$store.dispatch('GET_BASKETS');
                this.$store.dispatch('GET_LOCAL_BASKET');
            },
            async deleteBasket(id){
                await api.post('/basket/delete', {
                    basket_id: id
                })
                .then(() => {
                    this.repeat();
                    this.title = 'Успешно';
                    this.stylish = 'success';
                    this.box = true
                    this.$store.dispatch('GET_BASKETS');
                    this.$store.dispatch('GET_COUNT');
                })
                // .catch(e => {
                //     console.log(e.response)
                // })
            }
        },
        created () {
            this.repeat();
        },
    }
</script>

<style scoped>
    .title{
        color: #555;
        border-bottom: 1px solid #C4C4C4;
        padding-left: 10px;
    }
    .basket{
        background: #ECECEC;
        border-radius: 10px;
        padding: 10px 20px;
    }
    .box{
        background: #C4C4C4;
        font-size: 12px;
        padding: 7px 10px 7px 20px;
        margin-top: 15px;
    }
    .products > div:not(:last-child){
        border: 0.5px solid #C4C4C4;
        border-radius: 5px;
        margin-top: 20px;
        padding: 10px;
    }
    .products > div:last-child{
        margin-top: 30px;
        font-size: 14px;
    }
    .products > div:last-child p{
        font-size: 16px;
        font-weight: bold;
    }
    .right{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-direction: column;
    }
    .count{
        display: flex;
        border: 1px solid #C4C4C4;
        border-radius: 5px;
    }
    .count button{
        border: none;
        background: none;
        color: #C4C4C4;
        padding: 0;
        padding: 3px 5px;
    }
    .count button:disabled{
        cursor: not-allowed;
    }
    .count strong{
        font-size: 12px;
        line-height: 24px;
        border-left: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        padding: 0 20px;
        color: #000;
    }
    figure img{
        max-width: 100%;
    }
    .right > button{
        background: #B22021;
        border: 0.5px solid #C4C4C4;
        border-radius: 5px;
        color: #fff;
        padding: 2px 10px;
    }
    .goHome{
        background: #B22021;
        border: 0.5px solid #939292;
        border-radius: 2px;
        color: #fff;
        padding: 5px auto;
    }
</style>