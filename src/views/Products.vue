<template>
    <div class="products" v-if="PRODUCTS">
        <b-container>
            <p>Результаты поиска:</p>
            <b-row>
                <div class="col-md-3 col-12">
                    <div class="filter">
                        <h4>Фильтр</h4>
                        <p>Цена</p>
                        <input v-model="min" placeholder="Минимум" type="text">
                        <input v-model="max" placeholder="Максимум" type="text">
                        <hr style="height: .5px; background: rgba(178, 32, 33, .5);">
                        <p>Категории</p>
                        <nav>
                            <ul>
                                <li v-for="item in CATS" :key="item.id">
                                    <p class="flex mt-2">
                                        <span @click="open(item.id)">{{item.name}}</span>
                                        <span>
                                            <b-icon @click="open(item.id)" v-if="cats.indexOf(item.id) === -1" class="mr-2" icon="chevron-compact-down"></b-icon>
                                            <b-icon @click="close(item.id)" v-if="cats.indexOf(item.id) !== -1" class="mr-2" icon="chevron-compact-up"></b-icon>
                                        </span>
                                    </p>
                                    <ul v-if="cats.indexOf(item.id) !== -1">
                                        <li v-for="i in item.sub_cats" :key="i.id">
                                            <b-form-checkbox
                                                v-model="cats"
                                                :value="i.id"
                                                unchecked-value="not_accepted"
                                                style="border-color: #995A9D;"
                                            >
                                                {{i.name}}
                                            </b-form-checkbox>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        <p>Бренды</p>
                        <nav>
                            <ul>
                                <li v-for="i in BRANDS" :key="i.id">
                                    <b-form-checkbox
                                        v-model="brands"
                                        :value="i.id"
                                        unchecked-value="not_accepted"
                                        style="border-color: #995A9D;"
                                    >
                                        {{i.name}}
                                    </b-form-checkbox>
                                </li>
                            </ul>
                        </nav>
                        <button @click="filter()">Поиск</button>
                    </div>
                </div>
                <div class="col-md-9 col-12">
                    <h4>Продукты</h4>
                    <div class="grid" v-if="PRODUCTS.products">
                        <div
                            v-for="item in PRODUCTS.products.data"
                            :key="item.id"
                        >
                            <app-product 
                                :product="item" 
                            ></app-product>
                        </div>
                        <div v-if="PRODUCTS.products.data && PRODUCTS.products.data.length === 0">
                            <p>Товары не найдены</p>
                        </div>
                    </div>
                    <div class="text-center mt-3" v-if="PRODUCTS.products">
                        <b-pagination
                            align="center"
                            v-if="PRODUCTS.products.data && PRODUCTS.products.data.length > 0"
                            v-model="page"
                            :total-rows="PRODUCTS.products.total"
                            :per-page="PRODUCTS.products.per_page"
                            aria-controls="my-table"
                            @change="paginate(PRODUCTS.products.current_page)"
                        ></b-pagination>
                    </div>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import AppProduct from '@/components/product/'
    export default {
        props: {
            id: {
                type: String
            },
        },
        data() {
            return {
                cats: [],
                min: 0,
                max: 200000,
                page: 1,
                brands: []
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CATS',
                'BRANDS'
            ])
        },
        components: {
            AppProduct,
        },
        methods: {            
            open(id){
                if(this.cats.indexOf(id) === -1)
                    this.cats.push(id);
            },
            close(id){
                if(this.cats.indexOf(id) !== -1)
                {
                    this.cats.splice(this.cats.indexOf(id), 1);
                }
            },
            filter(){
                let arr = {
                    'price_min': this.min,
                    'price_max': this.max,
                    'page': 1
                };
                let url = 'price_min=' + this.min + '&price_max=' + this.max;
                for (let i = 0; i < this.cats.length; i++) {
                    arr['cats[' + i + ']'] = this.cats[i];
                    url += '&cats[' + i + ']' + '=' + this.cats[i]
                }
                for (let i = 0; i < this.brands.length; i++) {
                    arr['brands[' + i + ']'] = this.brands[i];
                    url += '&brands[' + i + ']' + '=' + this.brands[i]
                }
                // this.$store.dispatch('GET_PRODUCTS', arr);
                this.filtered = false;
                this.$router.push({name: 'filter', params: {id: url}})
                localStorage.setItem('filter_aliexpress', JSON.stringify(arr));
                setTimeout(() => {
                    this.$store.dispatch('GET_PRODUCTS', arr);
                    // console.log(this.$route)
                }, 200);
            },
            paginate(page){
                setTimeout(() => {
                    let arr = JSON.parse(localStorage.getItem('filter_aliexpress')) || [];
                    arr.page = this.page;
                    this.$store.dispatch('GET_PRODUCTS', arr);
                }, 100);
            }
        },
        created () {
            if(this.$route.name==='products'){
                this.$store.dispatch('GET_PRODUCTS', {
                    'cats[0]': this.id,
                    page: this.page || 1
                });
            }
            else if(this.$route.name === 'filter'){
                let arr = JSON.parse(localStorage.getItem('filter_aliexpress')) || [];
                arr.page = this.page || 1;
                this.$store.dispatch('GET_PRODUCTS', arr);
            }
            this.$store.dispatch('GET_BRANDS')
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
    nav > ul{
        padding-left: 0;
    }
    nav ul li{
        list-style: none;
        cursor: pointer;
    }
    .filter button{
        padding: 5px 40px;
        color: #fff;
        background: #B22021;
        border: none;
        border-radius: 4px;
    }
    nav > ul ul{
        padding-left: 20px;
    }
    /* .filter input::placeholder{
        color: #B22021;
    } */
    .filter input{
        padding: 2px 10px;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid #B22021;
        color: #B22021;
    }
    .filter > p{
        font-weight: bolder;
    }
</style>