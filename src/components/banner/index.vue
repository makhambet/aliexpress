<template>
    <div class="banner">
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide
                v-for="item in BANNERS"
                :key="item.id"
            >
                <img :src="url + item.url" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    loop: true
                },
                // swiperOptionThumbs: {
                //   spaceBetween: 10,
                //   slidesPerView: 2,
                //   touchRatio: 0.2,
                //   loop: true,
                //   loopedSlides: 5, //looped slides should be the same
                //   slideToClickedSlide: true,
                // },
                url: 'http://45.136.56.72/'
            }
        },
        computed: {
            ...mapGetters([
                'BANNERS'
            ])
        },
        components: {
            swiper,
            swiperSlide
        },
        created () {
            this.$store.dispatch('GET_BANNERS');
        },
    }
</script>


<style scoped>
    .swiper-container {
        background-color: #fff;
    }
    .swiper-slide {
        background-size: cover;
        background-position: center;
    }
    .gallery-top {
        height: 80%!important;
        width: 100%;
    }
    .gallery-thumbs {
        height: 20%!important;
        box-sizing: border-box;
        padding: 10px 0;
    }
    .gallery-thumbs .swiper-slide {
        width: 25%;
        height: 100%;
        opacity: 0.4;
    }
    .gallery-thumbs .swiper-slide-active {
        opacity: 1;
    }
    .gallery-thumbs img{
        max-width: 100%;
    }
    .gallery-top img{
        width: 100%;
    }
    .grid{
        margin-top: 1.5rem;
        display: grid;
        grid-template-columns: repeat(2, 50%);
        grid-column-gap: 1rem;
        width: calc(100% - 1rem);
    }
    .grid > div, .grid figure, .grid figure img{
        width: 100%;
        max-width: 100%;
    }
    img{
        width: 100%;
        height: 400px;
        margin-bottom: 10px;
    }
</style>