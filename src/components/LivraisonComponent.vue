<template>
    <div class="livraison--component">

        <div class="wrapper">
            <div class="restaurant--part">
                <h3 class="livraison--componentTitle">{{this.restaurant.Nom}}</h3>
                <div class="wrapper--text">
                    <p class="Adresse--restaurant">{{this.restaurant.Adresse}}e</p>
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

        <!--        <div class="restaurant&#45;&#45;part">-->
        <!--            <h3 class="livraison&#45;&#45;componentTitle">Restaurant</h3>-->
        <!--            <div class="wrapper&#45;&#45;text">-->
        <!--                <p class="Adresse&#45;&#45;restaurant">Adresse du restaurant de la commande</p>-->
        <!--                <p class="nom&#45;&#45;restaurant">Nom du Restaurant</p>-->
        <!--                <p class="estimation&#45;&#45;temps">{{tab_livraison.Description}}</p>-->
        <!--            </div>-->
        <!--        </div>-->

        <!--        <div class="client&#45;&#45;part">-->
        <!--            <div class="title&#45;&#45;client">-->
        <!--                <h2 class="title">Client</h2>-->
        <!--            </div>-->
        <!--            <div class="wrapper&#45;&#45;text">-->
        <!--                <p class="adresse&#45;&#45;client">Adresse du client de la commande</p>-->
        <!--                <p class="nom&#45;&#45;client">Nom du Client</p>-->
        <!--                <p class="estimation&#45;&#45;temps">Estimation du temps</p>-->
        <!--            </div>-->
        <!--        </div>-->

    </div>


</template>

<script>
    import axios from 'axios'

    export default {
        name: "LivraisonComponent",
        props: [
            'tab_livraison'
        ],
        data() {
            return {
                alreadyInDelivery: false,
                restaurant: 'null'
            }
        },
        methods: {
            acceptLivraison() {
                if (this.alreadyInDelivery) {
                    this.$notify({
                        text: "Veuillez finir votre commande actuelle avant d'en accepter une autre",
                        type: "warn"
                    })
                } else {
                    axios.put('http://localhost:1000/gateway/api/changeStatusCommande/' + this.tab_livraison._id, {
                        Status: 4,
                        LivreurId: 12
                    })
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
        mounted() {
            //recupere si le livreur a un commande en cours
            axios.get('http://localhost:1000/gateway/api/commandeLivreur/' +12)
                .then(response => {
                    if (response.data > 0)
                        this.alreadyInDelivery = true
                    else
                        this.alreadyInDelivery = false
                })
                .catch(error => {
                    console.log(error)
                })
            if(this.tab_livraison.RestaurantId){
                axios.get('http://localhost:1000/gateway/restaurant/' + this.tab_livraison.RestaurantId)
                    .then(response => {
                        this.restaurant = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }else
                this.$notify({text:'Desole une erreur c\'est produite', type: 'warn'})

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


    .livraison--component {
        margin-bottom: 5px;
        border-top: 1px solid #4D90A0;

        .livraison--componentTitle {
            margin: 10px;
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
