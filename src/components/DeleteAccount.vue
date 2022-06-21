<template>
    <div class="deleteAccount">
        <h3>Êtes-vous sur de vouloir supprimer votre compte ? Toutes les données seront effacées et irrécupérables.</h3>
        <button @click="deleteAccount()">Supprimer son compte</button>
    </div>
</template>

<script>
    export default {
        name: "DeleteAccount",

        methods:{
            deleteAccount(){
                console.log('delete')
            }
        }
    }
</script>

<style scoped lang="scss">
    .deleteAccount{
        padding: 5%;
        button {
            padding: 1cm;
            margin: 50px 0;
            color: #FFF;
            border-radius: 20px;
            background: #af4646;
            box-shadow: 20px 20px 60px #bebebe,
            -20px -20px 60px #fff;
        }

        button:active {
            border-radius: 20px;
            background: #af4646;
            box-shadow: inset 20px 20px 60px #953c3c,
            inset -20px -20px 60px #c95151;
        }
    }
</style>
