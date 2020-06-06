<template>
    <div class="carousel">
        <carousel>
            <h5>{{title}}</h5>
        </carousel>
        <carousel
            :perPage="4" 
            :perPageCustom="[[360, 1], [579, 2], [768, 3], [1200, 4], [1700, 5]]" 
            :paginationEnabled="true" 
            :navigationEnabled="true" 
            :navigationNextLabel="'&#8250;'" 
            :navigationPrevLabel="'&#8249;'"
        >
            <slide
                data-index="0"
                data-name="MySlideName"
                @slideclick="handleSlideClick"
                v-for="item in products" 
                :key="item.id"
            >
                <app-products :product="item"></app-products>
            </slide>
        </carousel>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    export default {
        props: {
            title: {
                type: String,
                default: 'Шампуни'
            },
            products: {
                type: Array
            }
        },
        methods: {
            handleSlideClick() {
                
            }
        },
        components: {
            Carousel,
            Slide,
            AppProducts: () => ({
                component: import('../product/index'),
                delay: 200,
                timeout: 5000
            }),
        }
    }
</script>

<style scoped>
    h5{
        margin:  0 0 3% 1%;
        font-weight: bold;
    }
</style>