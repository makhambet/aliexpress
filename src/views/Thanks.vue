<template>
    <b-container class="text-center">
        <h2>Спасибо за покупки</h2>
        <p>Наши модераторы свяжутся с Вами!</p>
        <router-link tag="button" to="/">На главную</router-link>
    </b-container>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .container{
        margin-top: 5%;
        height: 40vh;
    }
    button{
        background: #B22021;
        padding: 5px 15px;
        color: #fff;
        font-weight: bolder;
        border: none;
        border-radius: 4px;
    }
</style>