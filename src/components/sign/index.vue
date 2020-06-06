<template>
    <div class="sign">
        <signin @close="data" v-if="SIGN === 'signin'" class="block"></signin>
        <signup @close="$emit('close')" v-if="SIGN === 'signup'" class="block"></signup>
        <div class="close" @click="$emit('close')"></div>
    </div>
</template>

<script>
    import Signin from './components/signin'
    import Signup from './components/signup'
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'SIGN'
            ])
        },
        methods: {
            data() {
                this.$emit('close')
            }
        },
        components: {
            Signin,
            Signup
        },
    }
</script>

<style scoped>
    .sign{
        position: fixed;
        background: rgba(0, 0, 0, .4);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 8;
    }
    .close{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .block{
        z-index: 2;
    }
</style>