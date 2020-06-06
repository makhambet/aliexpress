<template>
    <footer class="footer">
        <b-container>
            <b-row>
                <div class="col-12 col-md-2 logo">
                    <img src="@/assets/images/logo.png" alt="">
                </div>
                <div class="col-12 col-md-6 menu">
                    <ul>
                        <router-link tag="li" to="/info/about">О нас</router-link>
                        <router-link tag="li" to="/info/delivery">Доставка</router-link>
                        <router-link tag="li" to="/info/payment">Оплата</router-link>
                        <router-link tag="li" to="/info/faq">FAQ</router-link>
                    </ul>
                    <ul>
                        <li>                            
                            <img src="@/assets/images/vk.png" alt="">
                        </li>
                        <li>                            
                            <img src="@/assets/images/twitter.png" alt="">
                        </li>
                        <li>                            
                            <img src="@/assets/images/telegram.png" alt="">
                        </li>
                        <li>                            
                            <img src="@/assets/images/instagram.png" alt="">
                        </li>
                        <li>                            
                            <img src="@/assets/images/facebook.png" alt="">
                        </li>
                    </ul>
                </div>
                <div class="col-md-4 col-12 contact">
                    <div>
                        Телефон доставки г.Алматы: +7 (777) 777 77 77
                    </div>
                    <div>
                        Если у вас есть вопрос, напишите нам письмо <a href="mailto:help@info.kz">help@info.kz</a>
                    </div>
                </div>
            </b-row>
        </b-container>
    </footer>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .footer{
        margin-top: 5%;
        background: #3A3A3A;
        padding: 20px 0;
        color: #fff;
    }
    .menu > ul{
        display: flex;
        padding-left: 0;
        margin: 0;
        font-size: 14px;
    }
    .menu > ul li{
        list-style: none;
        margin-right: 10px;
        cursor: pointer;
    }
    .contact{
        font-size: 12px;
    }
    .logo img{
        width: 50px;
    }
</style>