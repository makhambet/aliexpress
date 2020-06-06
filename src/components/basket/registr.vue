<template>
    <div class="registr">
        <div class="title">Оформеление заказа</div>
        <FormulateForm
                class="order-form"
                name="signup"
                v-model="values"
            >
            <div v-if="!AUTH">
                <h5 class="mt-2">Личные данные:</h5>
                <label>Имя</label>
                <FormulateInput
                    name="first_name"
                    type="text"
                    placeholder="Введите ваше имя"
                    validation="required"
                />
                <label>Телефон</label>
                <the-mask v-model="phone" placeholder="+7 (700) 000 00-00" mask="+7 (7##) ### ##-##"/>
            </div>
            <h5 class="mt-2">Адрес:</h5>
            <div v-if="AUTH">
                <b-form-radio 
                    class="radio"
                    v-model="address"
                    :value="item.id"
                    v-for="item in ADDRESSES" :key="item.id"
                >
                    <div class="mt-1 mb-1">
                        Ул.{{item.street}} дом {{item.home}} кВ {{item.apartment}}
                    </div>
                </b-form-radio>
            </div>
            
            <div v-if="ADDRESSES.length === 0 || !AUTH">
                <label>Улица</label>
                <FormulateInput
                    name="street"
                    type="text"
                    placeholder="Введите вашу улицу"
                    validation="required"
                />
                <label>Дом</label>
                <FormulateInput
                    name="home"
                    type="text"
                    placeholder="Введите ваш дом"
                    validation="required"
                />
                <label>Квартира</label>
                <FormulateInput
                    name="apartment"
                    type="text"
                    placeholder="Введите вашу квартиру"
                    validation="required"
                />
            </div>
            <label class="mt-3">Вид доставки</label>
            <b-form-radio class="radio" value="1" v-model="delivery">
                <div class="mt-1 mb-1"><strong>Обычная доставка</strong></div>
                <div>
                    Ближайшая доставка завтра с 13:00 до 15:00
                    <strong>Стоимость 700 тг. При заказе свыше 7000 тг бесплатно</strong> <a href="#">Условия доставки</a>
                </div>
            </b-form-radio>
            <h5 class="mt-3">Доставка:</h5>
            <label>Дата</label>
            <FormulateInput
                name="date"
                type="date"
                placeholder="Введите дату"
                validation="required"
            />
            <label>Время</label>
            <FormulateInput
                name="time"
                type="time"
                placeholder="Введите время"
                validation="required"
            />
            <label>Комментарий к заказу</label>
            <FormulateInput
                name="comment"
                type="textarea"
                placeholder="Напишите что-нибудь"
                validation="required"
            />
            <label>Чего не хватило в ассортименте</label>
            <FormulateInput
                name="text"
                type="textarea"
                placeholder="Напишите что-нибудь"
                validation="required"
            />
            <h5 class="mt-3">Варианты оплаты:</h5>
            <b-form-radio value="1" v-model="payment" name="payment" type="radio">Наличными курьеру</b-form-radio>
            <b-form-radio value="2" v-model="payment" name="payment" type="radio">Онлайн банковской картой</b-form-radio>
            <b-form-radio value="3" v-model="payment" name="payment" type="radio">Банковским переводом</b-form-radio>
            <b-form-radio value="4" v-model="payment" name="payment" type="radio">Банковской картой курьеру</b-form-radio>
            <button v-if="AUTH && payment !== '2'" @click="buy()" class="registrBtn mt-3">Оформить заказ</button>
            <button v-if="!AUTH && payment !== '2'" @click="signup()" class="registrBtn mt-3">Оформить заказ</button>
            <button v-if="payment === '2'" @click="newCard = !newCard" class="registrBtn mt-3">Оформить заказ</button>
        </FormulateForm>
        <app-not :title="title" :stylish="stylish" v-if="box" @close="box=false"></app-not>
        <div class="new" v-if="newCard">
            <form>
                <div class="d-flex">
                    <img src="https://static.cloudpayments.ru/pk_b430f8b23575e9942b71e7d2b3f49/logo.PNG" alt="">
                    <p>Заполните платежные данные</p>
                </div>
                <div style="position: relative; height: 300px;">
                    <div class="card1">
                        <the-mask mask="#### #### #### ####" placeholder="Номер карты"/>
                        <div class="months">
                            <input type="text" maxlength="2" size="2" placeholder="ММ"/>
                            <span class="slash">/</span>
                            <input type="text" maxlength="2" size="2"  placeholder="ГГ"/>
                        </div>                    
                        <input style="text-transform: uppercase;" type="text" placeholder="Имя владельца"/>
                    </div>
                    <div class="card2">
                        <div class="strip">                  
                            <input type="text" maxlength="4" size="4"  placeholder="CVC"/>
                        </div>
                    </div>
                </div>
                <button v-if="AUTH" @click.prevent="buy()" class="registrBtn mt-3">Оплатить</button>
                <button v-if="!AUTH" @click.prevent="signup()" class="registrBtn mt-3">Оплатить</button>
            </form>
            <div @click="newCard = false" class="close"></div>
        </div>
    </div>
</template>

<script>
    import api from '@/help/api'
    import Cookies from 'js-cookie'
    import { mapGetters } from 'vuex'
    import { TheMask } from 'vue-the-mask'

    export default {
        data() {
            return {
                street: '',
                home: '',
                apartment: '',
                delivery: '1',
                date: '',
                time: '',
                comment: '',
                payment: '1',
                text: '',
                address: '',
                name: '',
                phone: '',
                user_token: '',
                title: '',
                stylish: '',
                box: false,
                newCard: false,
                values: {}
            }
        },
        computed: {
            ...mapGetters([
                'ADDRESSES',
                'AUTH'
            ])
        },
        methods: {
            async buy() {
                let formData = new FormData();
                formData.append('delivery_hour',  this.values.time);
                formData.append('delivery_date',  this.values.date);
                formData.append('pay_type',  this.payment);
                formData.append('address_id',  this.address);

                formData.append('comment',  this.values.comment);
                formData.append('yet',  this.values.text);
                if(this.AUTH) formData.append('address_id',  this.address);

                formData.append('street',  this.values.street);
                formData.append('home',  this.values.home);
                formData.append('apartment',  this.values.apartment);
                await api.post('/basket/buy', formData)
                .then(response => {
                    localStorage.removeItem('aliexpress-basket')
                    if(!this.AUTH) Cookies.remove('aliexpress-token');


                    this.$store.dispatch('GET_BASKETS');
                    this.$store.dispatch('GET_COUNT');
                    this.$store.dispatch('GET_LOCAL_COUNT');
                    this.$store.dispatch('GET_LOCAL_BASKET');
                    this.$router.push('/thanks');
                    
                    this.title = 'Успешно';
                    this.stylish = 'success';
                    this.box = true
                })
                .catch(e => {
                    if(e.response.data){
                        this.title = e.response.data.message;
                        this.stylish = 'success';
                        this.box = true
                    }
                })
            },
            async signup(){
                await api.post('sign-up', {
                    last_name: this.values.name,
                    phone: this.phone
                })
                .then(response => {
                    Cookies.set('aliexpress-token', response.data.token, 1);
                    this.user_token = response.data.token
                    this.manyAdd();
                })
                .catch(e => {
                    if(e.response.data){
                        this.title = e.response.data.message;
                        this.stylish = 'success';
                        this.box = true
                    }
                })
            },
            async manyAdd(){
                let formData = new FormData();
                let local_basket = JSON.parse(localStorage.getItem('aliexpress-basket')) || [];
                for (let i = 0; i < local_basket.length; i++) {
                    formData.append('baskets[' + i + '][product_id]', local_basket[i].id)
                    formData.append('baskets[' + i + '][count]', local_basket[i].product_quantity)
                }
                await api.post('/basket/manyAdd', formData)
                .then(() => {
                    this.buy();
                })
                .catch(e => {
                    if(e.response.data){
                        this.title = e.response.data.message;
                        this.stylish = 'success';
                        this.box = true
                    }
                });
            }
        },
        components: {
            TheMask,
        },
        created () {
            this.$store.dispatch('GET_ADDRESSES');
        },
    }
</script>

<style scoped>
    .registr{
        background: #ECECEC;
        border-radius: 10px;
        padding: 10px 20px;
    }
    .title{
        color: #555;
        border-bottom: 1px solid #C4C4C4;
        padding-left: 10px;
    }
    input{
        width: 100%;
        background: #FFFFFF;
        border: 0.5px solid #939292;
        box-sizing: border-box;
        border-radius: 5px;
        height: 30px;
    }
    label{
        margin-top: 10px;
        margin-bottom: 0;
        font-size: 12px;
    }
    .radio{
        font-size: 12px;
    }
    .registrBtn{
        width: 100%;
        background: #B22021;
        border: 0.5px solid #939292;
        border-radius: 2px;
        color: #fff;
        padding: 5px 0;
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
        width: 560px;
        background: #fff;
        padding: 30px;
        z-index: 2;
    }
    .new .close{
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: pointer;
    }
    .new form .card1, .new form .card2{
        width: 400px;
        height: 228px;
        position: absolute;
        padding: 28px;
        border-radius: 10px;
        border: 1px solid #B7BEC1;
    }
    .new form .card1{
        z-index: 2;
        background: #F1F5F7;
    }
    .new form .card2{
        background: linear-gradient(to bottom,rgba(241,245,247,1) 0px,rgba(241,245,247,1) 20px,rgba(219,227,230,1) 20px,rgba(219,227,230,1) 70px,rgba(241,245,247,1) 70px,rgba(241,245,247,1) 100%);
        z-index: 1;
        left: 100px;
        top: 50px;
    }
    .new form input{
        width: 100%;
        border-radius: 0;
        margin-bottom: 20px;
        padding: 5px 0 5px 10px;
        border: 1px solid #ddd;
        box-sizing: border-box;
        height: 46px;
        font-size: 20px;
        border: 1px solid rgba(73,79,82,0.75);
    }
    .new form .months input, .new form .strip input{
        width: 53px;
        margin-right: 10px;
    }
    .strip{
        text-align: right;
        margin-top: 60px;
    }
    .new form .months span{
        font-size: 24px;
        padding-right: 10px;
    }
    .new form button{
        width: 100%;
    }
    .new form img{
        width: 95px;
        height: 65px;
        margin-bottom: 10px;
    }
    .new form > div:first-child{
        align-items: center;
    }
    .new form > div:first-child p{
        margin-left: 30px;
        font-weight: bolder;
        font-size: 20px;
    }
    .new form button{
        background: #1b96fe;
        color: #fff;
        height: 66px;
        border: none;
        font-weight: bolder;
        text-transform: uppercase;
        border-radius: 4px;
    }
</style>