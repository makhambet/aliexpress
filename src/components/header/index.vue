<template>
    <div class="header">
        <mini-header></mini-header>
        <main-header></main-header>
        <cats-header></cats-header>
    </div>
</template>

<script>
    import MiniHeader from './components/mini'
    import MainHeader from './components/main'
    import CatsHeader from './components/cats'
    export default {
        components: {
            MiniHeader,
            MainHeader,
            CatsHeader
        },
    }
</script>

<style scoped>

</style>