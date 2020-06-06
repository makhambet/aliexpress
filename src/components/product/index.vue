<template>
    <div class="product">
        <figure @click="open()" v-if="product.images && product.images.length > 0">
            <!-- <img src="https://a.lmcdn.ru/img600x866/G/A/GA002LWIVS77_3324795_1_v5.jpg" alt=""> -->
            <img :src="url + product.images[0].url" alt="">
            <!-- <img :src="url + url" alt=""> -->
        </figure>
        <p>{{product.name}}</p>
        <p class="price">{{product.price}} тг</p>
        
        <div class="flex">
            <div class="count">
                <button @click="product.count++">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="7" width="2" height="16" rx="1" fill="#C4C4C4"/>
                        <rect x="16" y="7" width="2" height="16" rx="1" transform="rotate(90 16 7)" fill="#C4C4C4"/>
                    </svg>
                </button>
                <span>{{product.count}} шт</span>
                <button @click="product.count--" :disabled="product.count <= 1">                    
                    <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="16" width="2" height="16" rx="1" transform="rotate(90 16 0)" fill="#C4C4C4"/>
                    </svg>
                </button>
            </div>
            <div class="cart" @click="buy()">
                <figure>
                    <img src="@/assets/images/cart2.png" alt="">
                </figure>
            </div>
        </div>
        <app-not v-if="box" @close="box=false" :stylish="stylish" :title="stylish"></app-not>
    </div>
</template>

<script>
    import api from '@/help/api'
    import Cookies from 'js-cookie'
    export default {
        props: {
            product: {
                type: Object
            },
        },
        data() {
            return {
                url: 'http://45.136.56.72/',
                title: '',
                stylish: '',
                box: false,
            }
        },
        methods: {
            open() {
                this.$router.push({name: 'product', params: {id: this.product.id.toString()}})
            },
            // async buy(){
            //     await api.post('/basket/add', {
            //         product_id: this.product.id,
            //         count: this.product.count
            //     })
            //     .then(response => {
            //         console.log(response);
            //         this.$store.dispatch('GET_COUNT');
            //     })
            //     .catch(e => {
            //         console.log(e.response)
            //     })
            // },
            async buy(){
                if(Cookies.get('aliexpress-auth')){
                    await api.post('/basket/add', {
                        product_id: this.product.id,
                        count: this.product.count,
                    })
                    .then(() => {
                        this.title = 'Успешно добавлен!';
                        this.styles = 'success';
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
                        if(basket[i].id === this.product.id){
                            basket[i].product_quantity += this.product.count;
                            break;
                        }
                        else if(i === basket.length -1 ){
                            basket.push({
                                id: this.product.id,
                                product_name: this.product.name,
                                product_price: this.product.price,
                                product_quantity: this.product.count,
                                product_image: this.product.images.length > 0 ? this.product.images[0].url : null
                            })
                            break;
                        }
                    }
                    if(basket.length === 0){
                        basket.push({
                            id: this.product.id,
                            product_name: this.product.name,
                            product_price: this.product.price,
                            product_quantity: this.product.count,
                            product_image: this.product.images.length > 0 ? this.product.images[0].url : null
                        })
                    }
                    this.title = 'Успешно добавлен!';
                    this.styles = 'success';
                    this.box = true;
                    localStorage.setItem('aliexpress-basket', JSON.stringify(basket));
                    this.$store.dispatch('GET_LOCAL_COUNT', basket.length)
                }
            },
        },
    }
</script>

<style scoped>
    figure img{
        width: 100%;
        max-width: 250px;
        cursor: pointer;
    }
    .product{
        font-size: 12px;
        padding: 10px;
        border-radius: 4px;
        transform: all .5s;
    }
    .product:hover{
        box-shadow: 0 0 19px 2px rgba(0, 0, 0, .3);
    }
    .product > figure img{
        height: 200px;
    }
    p{
        margin-bottom: .5rem;
        font-weight: bold;
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
    .count span{
        font-size: 12px;
        line-height: 24px;
        border-left: 1px solid #C4C4C4;
        border-right: 1px solid #C4C4C4;
        padding: 0 20px;
        color: #000;
    }
    .cart{
        /* background: #93CCEC; */
        background: #fff;
        border: 1px solid #C4C4C4;
        border-radius: 5px;
        padding: 1px 16px;
        cursor: pointer;
    }
    .cart figure{
        margin-bottom: 0;
    }
    .cart figure img{
        width: 25px;
    }
    /* #B22021 */
    
</style>