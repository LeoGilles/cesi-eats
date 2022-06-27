<template>
    <h1 class="commandHistoryTitle">Historique des commandes</h1>

    <div v-for="cmd in historyCmd" :key="cmd._id">
        <CommandeComponent v-bind:commande="cmd"/>
    </div>

</template>

<script>
    import CommandeComponent from "../../components/CommandeComponent";
    import axios from 'axios'
    export default {
        name: "CommandesView",
        components: {CommandeComponent},

        data(){
            return{
                historyCmd: [],
                restoName: ''
            }
        },



        mounted() {
            axios.get('http://localhost:4000/api/commande/')
                .then(response => {
                    console.log(response.data)
                    this.historyCmd = response.data
                    //this.restoName(response.data.RestaurantId)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
</script>

<style lang="scss" scoped>
    .commandHistoryTitle {
        margin: 10px;
    }
</style>
