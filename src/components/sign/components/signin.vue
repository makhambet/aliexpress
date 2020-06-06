<template>
    <div class="signin">
        <h2>Добро пожаловать!</h2>
        <FormulateForm
            class="order-form"
            name="signup"
            @submit="signin"
            v-model="values"
        >
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
            <button type="submit">Войти</button>
            <hr>
        </FormulateForm>
        <!-- <input v-model="email" type="text" placeholder="E-mail">
        <input v-model="password" type="password" placeholder="Пароль"> -->
    </div>
</template>

<script>
    import api from '@/help/api'
    import Cookies from 'js-cookie'
    export default {
        data() {
            return {
                email: '',
                password: '',
                values: {}
            }
        },
        methods: {
            async signin() {
                await api.post('/sign-in',{
                    email: this.values.email,
                    password: this.values.password
                })
                .then(response => {
                    Cookies.set('aliexpress-auth', true, 14);
                    Cookies.set('aliexpress-token', response.data.token, 14);
                    this.$store.dispatch('GET_AUTH', true)
                    this.$store.dispatch('GET_COUNT');
                    this.$emit('close');
                    this.manyAdd();
                })
                // .catch(e => {
                //     console.log(e.response)
                // })
            }
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
    }
</script>

<style scoped>
    .signin{
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