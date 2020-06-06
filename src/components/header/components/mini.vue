<template>
    <div class="mini">
        <b-container>
            <b-row class="justify-content-between">
                <div>
                    <router-link tag="span" to="/info/about">О нас</router-link>
                    <router-link tag="span" to="/info/delivery">Доставка</router-link>
                    <router-link tag="span" to="/info/payment">Оплата</router-link>
                    <router-link tag="span" to="/info/faq">FAQ</router-link>
                </div>
                <div v-if="!AUTH">
                    <span @click="open('signin')">Войти</span>
                    <span @click="open('signup')">Регистрация</span>
                </div>
                <div v-if="AUTH">
                    <router-link tag="span" to="/profile">Профиль</router-link>
                    <span @click="exit">Выйти</span>
                </div>
            </b-row>
        </b-container>
        <sign @close="auth=false" v-if="auth" ></sign>
        <app-not :title="title" :stylish="stylish" v-if="box" @close="box=false"></app-not>
    </div>
</template>

<script>
    import Sign from '@/components/sign/'
    import { mapGetters } from 'vuex'
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
                auth: false,
                title: '',
                stylish: '',
                box: false
            }
        },
        computed: {
            ...mapGetters([
                'AUTH'
            ])
        },
        methods: {
            open(a) {
                this.$store.dispatch('GET_SIGN', a);
                this.auth = true
            },
            exit(){
                Cookies.remove('aliexpress-auth')
                Cookies.remove('aliexpress-token')
                this.$store.dispatch('GET_AUTH');
                this.title = 'Вы вышли',
                this.stylish = 'success',
                this.box = false
                if(this.$route.name !== 'Home'){
                    this.$router.push('/')
                }
            }
        },
        components: {
            Sign,
        },
        created () {
            this.$store.dispatch('GET_AUTH');
        },
    }
</script>

<style scoped>
    .mini{
        color: rgba(0, 0, 0, 0.4);
        font-size: 12px;
        padding: 10px 0;
        border-bottom: 1px solid #C4C4C4;
    }
    span{
        margin-right: 15px;
        cursor: pointer;
    }
</style>