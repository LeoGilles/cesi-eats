<template>
    <h1 class="commandHistoryTitle">Historique des commandes</h1>

    <div v-for="cmd in historyCmd" :key="cmd._id">
        <CommandeComponent v-bind:commande="cmd" @getHistoriqueCmd="getHistoriqueCmd"/>
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

        methods:{
            getHistoriqueCmd(){
                axios.get('http://localhost:1000/gateway/api/commande/'+123)
                    .then(response => {
                        console.log(response.data)
                        let verifCmd= []
                        for (let i =0; i<response.data.length; i++){
                            if (response.data[i].Status<7||response.data[i].Status===8){
                                console.log(response.data[i])
                                verifCmd.push(response.data[i])
                            }
                        }
                        this.historyCmd = verifCmd
                        //this.restoName(response.data.RestaurantId)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        },


        mounted() {
            this.getHistoriqueCmd()
        }
    }
</script>

<style lang="scss" scoped>
    .commandHistoryTitle {
        margin: 10px;
    }
</style>
