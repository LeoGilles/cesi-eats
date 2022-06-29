<template>
    <div class="cmd">
        <img alt="imgCommande" class="imgCmd" src="../assets/buger.webp"/>
        <div class="details">
            <h2>{{'restoName'}}</h2>
            <p>{{commande.Prix}}€ · {{commande.dateTimeCommander}} · {{commande.Status}} · <a href="">Facture</a></p>
        </div>
        <button class="linkToRestaurant">Voir le restaurant</button>
        <div class="cmdManage">
            <button @click="supprOnHistoryClient(commande._id)">Supprimer cette commande de l'historique </button>
        </div>
    </div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "CommandeComponent",
        props: ['commande'],

        data (){
            return{
                restoName: '',
                commandeVerif: [],
                status: null,
            }
        },

        methods:{
            // async getRestoName(restoId){
            //     //console.log(this.props.commande)
            //     axios.get('http://localhost:3000/api/Restaurant/'+restoId)
            //         .then(response => {
            //             console.log(response.data.Nom)
            //             this.restoName = response.data.Nom
            //             //this.restoName(response.data.RestaurantId)
            //             return response.data.Nom
            //             //
            //         })
            //         .catch(error => {
            //             console.log(error)
            //         })
            //     console.log(this.restoName)
            // }

            supprOnHistoryClient(idCmd){
                if (this.commande.Status===8){
                    axios.put('http://localhost:1000/gateway/api/changeStatusCommande/'+idCmd, {Status: 9})
                        .then(response => {
                            // this.popularRestaurants = response.data
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    this.$notify({text: 'La commande nom resto à été supprimer de votre historique !', type: 'warn'})
                }else if (this.commande.Status===6){
                    axios.put('http://localhost:1000/gateway/api/changeStatusCommande/'+idCmd, {Status: 7})
                        .then(response => {
                            // this.popularRestaurants = response.data
                            console.log(response)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    this.$notify({text: 'La commande nom resto à été supprimer de votre historique !', type: 'warn'})
                }else{
                    this.$notify({text: 'Il est pour le moment, impossible de supprimer cette commande de votre historique !', type: 'warn'})
                }
                this.$emit('getHistoriqueCmd')
            }
        },

        mounted() {
            if(this.commande.Status === 7){
                this.commandeVerif = null
            }
            console.log(this.commande)
        }
    }
</script>

<style lang="scss" scoped>
    .cmd {
        border-top: 1px solid #4D90A0;
        padding: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .imgCmd {
            border-radius: 5px;
        }

        .details {
            a {
                text-decoration: none;
                color: #000;
            }

            a:hover {
                text-decoration: underline;
            }
        }

        .linkToRestaurant {
            border: none;
            border-radius: 10px;
            background: linear-gradient(145deg, #ffffff, #e6e6e6);
            box-shadow: 20px 20px 60px #d9d9d9,
            -20px -20px 60px #ffffff;

        }

        .linkToRestaurant:active {
            background: #ffffff;
            box-shadow: inset 20px 20px 60px #d9d9d9,
            inset -20px -20px 60px #ffffff;

        }
    }

    @media (max-width: 749px) {
        .cmd {
            .imgCmd {
                max-height: 100px;
            }

            .linkToRestaurant {
                width: 100px;
                height: 50px;
            }
        }

    }

    @media (min-width: 750px) {
        .cmd {
            .imgCmd {
                max-height: 200px;
            }

            .linkToRestaurant {
                font-size: large;
                width: 15%;
                height: 100px;
            }
        }
    }
</style>
