<template>
    <div class="modalbox" :class="stylish">
        {{title}}
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: 'Успешно'
            },
            stylish: {
                type: String,
                default: 'success'
            }
        },
        created () {
            setTimeout(() => {
                this.$emit('close')
            }, 1500);;
        },
    }
</script>

<style scoped>
    .success{
        background: #7DCA9D;
        color: #fff;
    }
    .modalbox{
        width: 300px;
        padding: 20px 30px;
        border-radius: 4px;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -20%);
        z-index: 3;
        text-align: center;
    }
</style>