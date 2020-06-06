<template>
    <div class="profile">
        <b-container>
            <h3>Профиль</h3>
            <b-row>
                <div class="col-12 col-md-3">Имя</div>
                <div class="col-12 col-md-9"><p>{{PROFILE.first_name}}</p></div>
            </b-row>
            <b-row>
                <div class="col-12 col-md-3">Фамилия</div>
                <div class="col-12 col-md-9"><p>{{PROFILE.last_name}}</p></div>
            </b-row>
            <b-row>
                <div class="col-12 col-md-3">Номер</div>
                <div class="col-12 col-md-9"><p>{{PROFILE.phone}}</p></div>
            </b-row>
            <b-row>
                <div class="col-12 col-md-3">Email</div>
                <div class="col-12 col-md-9"><p>{{PROFILE.email}}</p></div>
            </b-row>
            <b-row>
                <div class="col-12 col-md-3">Бонус</div>
                <div class="col-12 col-md-9"><p>{{PROFILE.bonus || 0}}</p></div>
            </b-row>
            <b-row>
                <div class="col-12 col-md-3"><p>Адреса доставки</p></div>
                <div class="col-12 col-md-9">
                    <div v-if="PROFILE.addresses.length === 0 && PROFILE.addresses">Нет добавленных адресов</div>
                    <ol>
                        <li v-for="item in PROFILE.addresses" :key="item.id">
                            Ул. {{item.street}} дом {{item.home}} кВ{{item.apartment}}
                            <a @click="deleteAddress(item.id)" class="delete">Удалить</a>
                        </li>
                    </ol>
                </div>
            </b-row>
            <button @click="newAddress = !newAddress">Добавить адрес</button>
        </b-container>
        <div class="new" v-if="newAddress || newCard">
            <form v-if="newAddress">
                <h4>Добавить адрес</h4>
                <input v-model="street" type="text" placeholder="Введите улицу">
                <input v-model="home" type="text" placeholder="Введите дом">
                <input v-model="apartment" type="text" placeholder="Введите номер квартиры">
                <button @click.prevent="addAddress()">Добавить</button>
            </form>
            <!-- <form target="_blank" v-if="newCard" action="http://45.136.56.72/api/card/create/web1" method="POST">
                <h4>Добавить карту</h4>
                <input placeholder="Номер карты" name="cardNumber" type="text">
                <input placeholder="Месяц" name="expDateMonth" type="text">
                <input placeholder="Год" name="expDateYear" type="text">
                <input placeholder="CVV код" name="cvv" type="text">
                <input name="token" :value="PROFILE.token" type="hidden">
                <input placeholder="Полное имя" name="fullname" type="text">
                <button type="submit">OK</button>
            </form> -->
            <div @click="newAddress = false" class="close"></div>
        </div>
        <app-not :title="title" :stylish="stylish" v-if="box" @close="box=false"></app-not>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import api from '@/help/api'
    export default {
        data() {
            return {
                street: '',
                home: '',
                apartment: '',
                newCard: false,
                newAddress: false,
                title: '',
                stylish: '',
                box: false,
            }
        },
        computed: {
            ...mapGetters([
                'PROFILE'
            ])
        },
        methods: {
            async addAddress() {
                await api.post('/address/add', {
                    street: this.street,
                    home: this.home,
                    apartment: this.apartment
                })
                .then(response => {
                    this.$store.dispatch('GET_PROFILE');
                    this.newAddress = false
                })
                // .catch(e => {
                //     console.log(e.response)
                // })
            },
            async deleteAddress(id){
                let ask = confirm('Вы уверены удалить этот адрес?');
                if(ask){
                    await api.post('/address/delete', {
                        address_id: id
                    })
                    .then(() => {
                        this.$store.dispatch('GET_PROFILE');
                    })
                    .catch(e => {
                        if(e.response.data){
                            this.title = 'Нельзя удалить этот адрес';
                            this.stylish = 'success';
                            this.box = true
                        }
                    })
                }

            }
        },
        created () {
            this.$store.dispatch('GET_PROFILE');
        },
    }
</script>

<style scoped>
    .row{
        margin-bottom: 10px
    }
    .row > div:last-child p{
        font-weight: bolder;
    }
    ol, ul{
        padding-left: 15px;
    }
    .cards li > div{
        background: #2a98ff;
        display: flex;
    }
    .cards ul{
        padding-left: 0;
    }
    .cards li{
        list-style: none;
    }
    .new{
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .3);
        width: 100%;
        height: 100%;
        z-index: 3;
    }
    .new form{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        width: 400px;
        background: #fff;
        padding: 30px;
        z-index: 2;
    }
    .new form input{
        width: 100%;
        margin-bottom: 20px;
        border-radius: 5px;
        padding: 5px 0 5px 15px;
        border: 1px solid #ddd;
    }
    .new form button{
        width: 100%;
    }
    button{
        padding: 5px 20px;
        border-radius: 5px;
        border: 1px solid #2a98ff;
        background: none;
        color: #2a98ff;
        font-weight: bolder;
    }
    .new .close{
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
    }
    .delete{
        color: red;
        font-size: 14px;
        margin-left: 20px;
        cursor: pointer;
    }
</style>