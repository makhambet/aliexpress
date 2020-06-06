<template>
    <div class="basket">
        <b-container>
            <b-row>
                <app-basket></app-basket>
                <div class="col-12 col-md-4">
                    <app-registr></app-registr>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import AppBasket from '@/components/basket/basket'
    import AppRegistr from '@/components/basket/registr'
    export default {
        components: {
            AppBasket,
            AppRegistr
        },
    }
</script>

<style scoped>

</style>