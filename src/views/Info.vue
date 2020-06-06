<template>
    <div class="info">
        <b-container v-if="INFO">
            <!-- <h2>
                <span v-if="$route.params.name === 'about'">О нас</span>
                <span v-if="$route.params.name === 'delivery'">Доставка</span>
                <span v-if="$route.params.name === 'payment'">Оплата</span>
                <span v-if="$route.params.name === 'faq'">FAQ</span>
            </h2>
            <div v-if="$route.params.name === 'about'">{{INFO[0].text}}</div>
            <div v-if="$route.params.name === 'delivery'">{{INFO[1].text}}</div>
            <div v-if="$route.params.name === 'payment'">{{INFO[2].text}}</div>
            <div v-if="$route.params.name === 'faq'">{{INFO[3].text}}</div> -->
            <b-row>
                <div class="col-md-3 col-12 menu">
                    <ul>
                        <router-link to="/info/about" tag="li" :class="{'active': $route.params.name === 'about'}">О нас</router-link>
                        <router-link to="/info/payment" tag="li" :class="{'active': $route.params.name === 'payment'}">Оплата</router-link>
                        <router-link to="/info/delivery" tag="li" :class="{'active': $route.params.name === 'delivery'}">Доставка</router-link>
                        <router-link to="/info/faq" tag="li" :class="{'active': $route.params.name === 'faq'}">FAQ</router-link>
                        <router-link to="/info/bonus" tag="li" :class="{'active': $route.params.name === 'bonus'}">Бонусная система</router-link>
                        <router-link to="/info/program" tag="li" :class="{'active': $route.params.name === 'program'}">Программа переработки пакетов и батареек</router-link>
                        <!-- <router-link to="/info/questions" tag="li" :class="{'active': $route.params.name === 'questions'}">Часто задаваемые вопросы</router-link> -->
                    </ul>
                </div>
                <div class="col-md-8 col-12">
                    <div v-if="$route.params.name === 'about'" v-html="INFO[0].text">{{INFO[0].text}}</div>
                    <div v-if="$route.params.name === 'delivery'" v-html="INFO[1].text"></div>
                    <div v-if="$route.params.name === 'payment'" v-html="INFO[2].text"></div>
                    <div v-if="$route.params.name === 'faq'">
                        <h1>FAQ</h1>
                        <div class="tabs">
                            <p @click="count(1)">Как зарегистрироваться?</p>
                            <div v-if="id === 1">
                                <p>Регистрация на сайте занимает пару минут:</p>
                                <ul>
                                    <li>В правом верхнем углу сайта найдите кнопку &laquo;Вход&raquo;</li>
                                    <li>Введите свой номер телефона с префиксом +7, получите SMS и введите короткий номер. Готово!</li>
                                </ul>

                                <p>Если у вас нет поблизости телефона, вы можете зарегистрироваться по e-mail, нажмите кнопку ниже &laquo;Войти по почте&raquo; &mdash; далее &laquo;Зарегистрироваться по почте&raquo;. Заполните необходимые данные, кликните &laquo;Зарегистрироваться&raquo; и активируйте ссылку подтверждения на почте.</p>
                            </div>
                        </div>
                        <div class="tabs">
                            <p @click="count(2)">Как сделать заказ?</p>
                            <div v-if="id === 2">
                                <p>Вы можете найти нужные продукты четырьмя способами:</p>
                                <ul>
                                    <li>Ввести название в строке поиска</li>
                                    <li>В навигации по разделам (например, Продукты &mdash;&gt; Бакалея &mdash;&gt; Мука)</li>
                                    <li>В спецколлекциях на главной странице.</li>
                                    <li>Позвонить нашим операторам и назвать продукты, которые хотите заказать. Мы посмотрим товары в наличии и оформим заказ.</li>
                                </ul>
                                <p>Добавляйте товары в корзину. Минимального и максимального заказа на сайте нет &mdash; от количества товаров зависит лишь цена доставки. Чтобы отправить заказ, заходите в &laquo;Корзину&raquo; в правой верхней части сайта и нажмите кнопку &laquo;Оформить заказ&raquo;.</p>
                            </div>
                        </div>
                        <div class="tabs">
                            <p @click="count(3)">Как оплатить?</p>
                            <div v-if="id === 3">
                                <p>Оплачивать можно 4 способами, выберите удобный для себя:</p>
                                <ul>
                                    <li>Наличными курьеру</li>
                                    <li>Онлайн, платежной карточкой Visa/MasterCard</li>
                                    <li>Карточкой курьеру (курьер привезет POS-терминал и выдаст вам чек)</li>
                                    <li>Банковским переводом (для юр. лиц)</li>
                                </ul>
                                <p>Если у вас возникли проблемы с оплатой, позвоните нам по телефонам +7 (727) 346 85 83, +7 (778) 021 13 17 или напишите на help@arbuz.kz.</p>
                            </div>
                        </div>
                        <div class="tabs">
                            <p @click="count(4)">Когда доставят заказ?</p>
                            <div v-if="id === 4">
                                <p>Арбуз работает каждый день с 10.00 до 22.00. Время доставки зависит от того, когда будет сделан заказ.</p>
                                <p>Мы доставляем заказы день в день в пределах рабочих часов, но также можем и в другой запланированный день &mdash; укажите нужную дату в в комментарии к заказу (не позднее 14 дней после оформления заказа).</p>
                            </div>
                        </div>
                        <div class="tabs">
                            <p @click="count(5)">Сколько стоит доставка?</p>
                            <div v-if="id === 5">
                                <p>Доставка Arbuz.kz действует только в городе Алматы. Стоимость доставки по Алматы: 700 тенге, при заказе на сумму меньше 7 000 тг. При заказе на сумму свыше 7 000 &mdash; бесплатно.</p>
                            </div>
                        </div>
                        <div class="tabs">
                            <p @click="count(6)">Почему изменилась стоимость заказа? Мне вернут деньги?</p>
                            <div v-if="id === 6">
                                <p>Если в заказе были весовые товары, не всегда есть возможность набрать точную массу до грамма, поэтому стоимость заказа может по итогу незначительно поменяться.</p>

                                <p>Если сумма оказалась меньше, а вы уже оплатили онлайн, то сумма списания денег на карте поменяется в течение 3-х рабочих дней.</p>

                                <p><strong>Внимание! При корректировке итоговой суммы от банка не приходит оповещений. Измененную сумму списания вы увидите в выписке на дату оформления заказа. </strong></p>

                                <p>Если же сумма больше, то нужно будет доплатить разницу наличными курьеру при доставке.</p>

                                <p>В обоих случаях, оператор вас обязательно предупредит.</p>

                                <p><strong>Важно! Как происходит возврат суммы:</strong></p>

                                <p>Если вы при доставке отказались от части заказа, то мы оформим возврат денег в течение 3-х дней с даты доставки. Обычно деньги возвращаются за 2-3 дня. В редких случаях возврат денег может занять до 14 дней.</p>

                                <p dir="ltr">Если у вас настроены смс или пуш-уведомления, то вам придет оповещение о возврате средств.</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="$route.params.name === 'bonus'" v-html="INFO[4].text"></div>
                    <div v-if="$route.params.name === 'program'" v-html="INFO[5].text"></div>
                    <div v-if="$route.params.name === 'questions'" v-html="INFO[6].text"></div>
                </div>
            </b-row>
            
        </b-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                id: null
            }
        },
        computed: {
            ...mapGetters([
                'INFO'
            ])
        },
        methods: {
            count(id) {
                if(this.id !== id) this.id = id;
                else this.id = null;
            }
        },
        created () {
            this.$store.dispatch('GET_INFO');
        },
    }
</script>

<style scoped>
    .menu ul{
        padding-left: 0;
        background: #f8f8f8;
        border-radius: 2px;
    }
    .menu li{
        list-style: none;
        padding: .5rem 1rem;
        cursor: pointer;
        color: #B22021;
        font-weight: 500;
    }
    li.active{
        background: #B22021;
        color: #FFF;
    }
    .tabs{
        width: 100%;
        background-color: rgba(0,0,0,.03);
        padding: .75rem 1.25rem;
        border-radius: calc(.25rem - 1px) calc(.25rem - 1px) 0 0;
        border: 1px solid rgba(0,0,0,.125);
    }
    .tabs > p{
        margin-bottom: 0;
        font-size: 18px;
        cursor: pointer;
        color: #B22021;
    }
    .tabs > div{
        margin-top: 20px;
        border-top: 1px solid rgba(0,0,0,.125);
        padding-top: 20px;
    }
</style>