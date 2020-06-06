<template>
    <nav class="cats">
        <ul>
            <li v-for="item in CATS" :key="item.id">
                <span @click="open(item.id)">{{item.name}}</span>
                <div class="subCats">
                    <ul class="container">
                        <li @click="open(i.id)" v-for="i in item.sub_cats" :key="i.id">
                            <a>{{i.name}}</a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'CATS'
            ])
        },
        methods: {
            open(id) {
                this.$store.dispatch('GET_PRODUCTS', {
                    'cats[0]': id
                });
                this.$router.push({name: 'products', params: {id: id.toString()}})
            }
        },
        created () {
            
        },
    }
</script>

<style scoped>
    .cats{
        padding: 10px 0 0;
        position: relative;
        z-index: 3;
    }
    .cats > ul{
        display: flex;
        justify-content: center;
        padding-left: 0;
        overflow: hidden;
    }
    .cats li{
        list-style: none;
        margin: 0 10px;
        cursor: pointer;
    }
    .cats li span:hover{
        color: rgba(0, 0, 0, 0.5);
    }
    .cats ul:hover .subCats{
        transform: translateY(0);
        transition: all .3s;
    }
    .cats li:hover .subCats{
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    .cats li:hover .subCats a:visited{
        opacity: 0;
        visibility: hidden;
        transform: translateY(-100px);
    }
    .subCats{
        position: absolute;
        top: 0;
        left: 0;
        background: #f4f4f4;
        width: 100%;
        z-index: 2;
        top: 100%;
        min-height: 50px;
        border: 1px solid #C4C4C4;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-100px);
    }
    .subCats > ul{
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
    }
    .subCats li{
        width: 30%;
        flex-wrap: wrap;
        background: #fff;
        border: 1px solid #dfdfdf;
        padding: 5px 20px;
        margin-bottom: 5px;
    }
    .subCats li:hover{
        color: rgba(0, 0, 0, 0.5);
    }
</style>