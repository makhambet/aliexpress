<template>
    <div class="products" v-if="SEARCH">
        <b-container>
            <p>Результаты поиска:</p>
            <div class="grid" v-if="SEARCH.data.length > 0">
                <div
                    v-for="item in SEARCH.data"
                    :key="item.id"
                >
                    <app-product 
                        :product="item" 
                    ></app-product>
                </div>
            </div>
            <div v-if="SEARCH.data && SEARCH.data.length === 0">
                <p>Товары не найдены</p>
            </div>
        </b-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import AppProduct from '@/components/product/'
    export default {
        props: {
            text: {
                type: String
            },
        },
        computed: {
            ...mapGetters([
                'SEARCH'
            ])
        },
        components: {
            AppProduct,
        },
        created () {
            this.$store.dispatch('GET_SEARCH', {
                'text': this.text
            });
        },
    }
</script>

<style scoped>
    .grid{
        display: grid;
        --auto-grid-min-size: 200px;
        grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size), 1fr));
        grid-gap: 20px;
    }
</style>