<template>
    <div class="livraison--component">
        <div class="color--bar">

        </div>
        <div class="wrapper">
            <div class="restaurant--part">
                <div class="title--restaurant">
                    <h2 class="title">Restaurant</h2>
                </div>
                <div class="wrapper--text">
                    <p class="Adresse--restaurant">Adresse du restaurant de la commande</p>
                    <p class="nom--restaurant">Nom du Restaurant</p>
                    <p class="estimation--temps">{{tab_livraison.Description}}</p>
                </div>
            </div>
            <div class="client--part">
                <div class="title--client">
                    <h2 class="title">Client</h2>
                </div>
                <div class="wrapper--text">
                    <p class="adresse--client">Adresse du client de la commande</p>
                    <p class="nom--client">Nom du Client</p>
                    <p class="estimation--temps">Estimation du temps</p>
                </div>
            </div>
        </div>
        <div class="wrapper--button">
            <div class="accept--button">
                <v-btn variant="outlined" color="teal" @click="acceptLivraison()">Accepter</v-btn>
            </div>
            <div class="reject--button">
                <v-btn variant="outlined" color="error">Refuser</v-btn>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import store from '../store'
    export default {
        name: "LivraisonComponent",
        props: {
            tab_livraison: Object,
        },
        data(){
            return{
                alreadyInDelivery: false
            }
        },
        methods: {
            acceptLivraison() {
                console.log(this.tab_livraison)
                if(this.alreadyInDelivery){
                    this.$notify({text: "Veuillez finir votre commande actuelle avant d'en accepter une autre", type: "warn"})
                }else{
                    axios.put('http://localhost:1000/gateway/api/changeStatusCommande/'+this.tab_livraison._id, {Status: 4, LivreurId: store.state.userId})
                        .then(response => {
                            // this.popularRestaurants = response.data
                            console.log(response.data)
                            this.$emit('ChangeStatus')
                            this.$router.push("/livraison")

                        })
                        .catch(error => {
                            console.log(error)
                        })
                }

            },
        },
        mounted(){
            axios.get('http://localhost:4000/api/commande/commandeLivreur/'+store.state.userId)
                .then(response => {
                    console.log(response.data)
                    if(response.data>0)
                        this.alreadyInDelivery = true
                    else
                        this.alreadyInDelivery = false
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
</script>

<style lang="scss">

    p {
        font-size: 0.7em;
        padding-left: 10px;
        padding-right: 10px;
        margin: 0;
        text-align: justify;
        text-justify: inter-word;
    }

    h2 {
        font-size: 1em;
        text-align: justify;
        text-justify: inter-word;
        padding-left: 10px;
    }

    .livraison--component {
        margin-bottom: 5px;

        .color--bar {
            background-color: #5d99a7;
            height: 2px;
            width: 100%;
        }

        .wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 7px;
            margin-bottom: 7px;

        }

        .wrapper--button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 50px;
            padding-right: 50px;
        }

    }
</style>
