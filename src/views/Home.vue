<template>
    <div class="home">
        <b-container>
            
            <app-banner></app-banner>
            <div class="aside">
                <b-row>
                    <div v-for="item in OFFERS" :key="item.id" class="col-md-4 col-12">
                        <a :href="item.link">
                            <div :style="{backgroundColor: item.color}" class="aside-block">
                                <p>{{item.title}}</p>
                                <small>{{item.description}}</small>
                            </div>
                        </a>
                    </div>
                </b-row>
            </div>
            <p><strong>Специальные коллекции:</strong></p>
            <div class="grid">
                <div :style="{backgroundImage: 'url(' + url + item.url + ')'}" v-for="item in SPECIALITY" :key="item.id">
                    <div class="grid-block">
                        <a :href="item.link">
                            <button class="flex">
                                <span>{{item.title}}</span>
                                <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.79996 1.72493L12.2372 8.97485L6.79996 16.2249" stroke="white" stroke-width="2"/>
                                </svg>
                            </button>
                        </a>
                        <small>{{item.description}}</small>
                    </div>
                </div>
            </div>
            <div v-for="item in CAT_PRODUCTS" :key="item.id">
                <app-carousel v-if="item.products && item.products.length > 0" :title="item.name" :products="item.products"></app-carousel>
            </div>
            <!-- <form action="http://45.136.56.72/api/card/create/web1" method="POST">
                <input name="cardNumber" type="text">
                <input name="expDateMonth" type="text">
                <input name="expDateYear" type="text">
                <input name="cvv" type="text">
                <input name="token" type="text">
                <input name="fullname" type="text">
                <button type="submit">OK</button>
            </form> -->
        </b-container>
    </div>
</template>

<script>
    import AppCarousel from '@/components/carousel/'
    import AppBanner from '@/components/banner/'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                url: 'http://45.136.56.72/'
            }
        },
        computed: {
            ...mapGetters([
                'CAT_PRODUCTS',
                'CAT_PRODUCTS',
                'OFFERS',
                'SPECIALITY'
            ])
        },
        components: {
            AppCarousel,
            AppBanner
        },
    }
</script>

<style scoped>
    .grid > :nth-child(1){
        grid-area: a;
        /* background: #8BBBE9; */
    }
    .grid > :nth-child(2){
        grid-area: b;
        /* background: #F2B0AC; */
    }
    .grid > :nth-child(3){
        grid-area: c;
        /* background: #DAEF86; */
    }
    .grid{
        display: grid;
        grid-template-areas: "a b c";
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        grid-gap: 20px;
    }
    .grid > div{
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.3);
        box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5), -4px -4px 4px rgba(0, 0, 0, 0.5);
        padding: 20px;
        position: relative;
        height: 440px;
        background-size: cover;
    }
    .grid > div button{
        color: #fff;
        padding: 5px 10px;
        width: 200px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);
        border-radius: 9px;
        align-items: center;
    }
    .grid > :nth-child(1) button{
        background: #F2B0AC;
        border: 1px solid #F2B0AC;
    }
    .grid > :nth-child(2) button{
        background: #5AB5E9;;
        border: 1px solid #5AB5E9;
    }
    .grid > :nth-child(3) button{
        background: #B7D052;
        border: 1px solid #B7D052;
    }
    .grid > div small, .grid > div a{
        color: #fff;
    }
    .grid-block{
        position: absolute;
        bottom: 20px;
    }
    .grid > :nth-child(1) .grid-block{
        right: 20px;
    }
    .grid > :nth-child(2) .grid-block{
        left: 20px;
    }
    .grid > :nth-child(3) .grid-block{
        right: 5%;
    }
    .aside{
        margin-bottom: 5%;
    }
    .aside .aside-block{
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        padding: 10px 20px;
        color: #fff;
    }
    .aside .aside-block p{
        margin-bottom: 0px;
    }
    .aside a, .aside a:hover{
        text-decoration: none;
    }
</style>