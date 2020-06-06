<template>
    <div class="signup">
        <form>
            <h2>Регистрация!</h2>
            <FormulateForm
                class="order-form"
                name="signup"
                @submit="signup"
                v-model="values"
            >
                <FormulateInput
                    name="first_name"
                    type="text"
                    placeholder="Введите ваше имя"
                    validation="required"
                />
                <FormulateInput
                    name="last_name"
                    type="text"
                    placeholder="Введите вашу фамилию"
                    validation="required"
                />
                
                <the-mask v-model="phone" mask="+7 (7##) ### ##-##" placeholder="+7 (700) 000 00-00"/>

                <FormulateInput
                    name="email"
                    type="text"
                    placeholder="Ваш E-mail"
                    validation="required|email"
                />
                <FormulateInput
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    validation="required|min:4,length"
                />
                <button type="submit">Регистрация</button>
                <!-- <button type="submit" @click.prevent="signup()">Регистрация</button> -->
            </FormulateForm>
        </form>
    </div>
</template>

<script>
    import api from '@/help/api'
    import Cookies from 'js-cookie'
    import { TheMask } from 'vue-the-mask'
    export default {
        data() {
            return {
                email: '',
                password: '',
                phone: '',
                first_name: '',
                last_name: '',
                values: {}
            }
        },
        methods: {
            async signup() {
                await api.post('sign-up', {
                    email: this.values.email,
                    password: '7' + this.values.password,
                    first_name: this.values.first_name,
                    last_name: this.values.last_name,
                    phone: this.phone,
                })
                .then(response => {
                    Cookies.set('aliexpress-auth', true, 14);
                    Cookies.set('aliexpress-token', response.data.token, 14);
                    this.$store.dispatch('GET_AUTH', true)
                    this.manyAdd();
                    this.$emit('close');
                })
                .catch(e => {
                    if(e.response.data) alert(e.response.data.message)
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
                // .catch(e => console.log(e.response));
            }
        },
        components: {
            TheMask,
        },
    }
</script>

<style scoped>
    .signup{
        position: absolute;
        width: 500px;
        top: 50%;
        left: 50%;
        background: #fff;
        transform: translate(-50%, -50%);
        padding: 4% 40px;
        border-radius: 5px;
        font-size: 16px;
        text-align: center;
    }
    input{
        width: 100%;padding: 5px 5px 5px 15px;
        margin-bottom: 10px;
        border-radius: 3px;
        border: 1px solid #444;
    }
    button{
        width: 100%;
        background: #8BBBE9;
        border: none;
        padding: 5px;
        color: #fff;
    }
</style>