<template>
    <div class="referFriend">
        <h3>Entrer le mail de l'ami que vous voulez parrainer et gagner 10€ sur votre prochaine commande</h3>
        <input v-model="referMail" type="email" placeholder="example@email.com"/>
        <button v-on:click="referFriend">Envoyer le parrainage</button>
    </div>
</template>

<script>
    export default {
        name: "ReferFriend",
        data() {
            return {
                referMail: '',
            }
        },
        methods:{
            referFriend(){
                console.log(this.referMail)
            },
        }
    }
</script>

<style scoped lang="scss">
    .referFriend{
        padding: 5%;

        input{
            border: 1px solid black;
            border-radius: 5px;
        }
        button{
            padding: 30px;
            margin: 50px;
            border-radius: 20px;
            background: linear-gradient(145deg, #cacaca, #f0f0f0);
            box-shadow: 20px 20px 60px #bebebe,
            -20px -20px 60px #ffffff;
        }
        button:active{
            border-radius: 20px;
            background: #e0e0e0;
            box-shadow: inset 20px 20px 60px #bebebe,
            inset -20px -20px 60px #ffffff;
        }
    }
</style>
