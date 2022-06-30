<template>
    <h2>Livraison en cours</h2>
    {{livraisonEnCours}}
    <v-btn variant="outlined" color="teal" @click="deliveryFinish()">Commande donné au client</v-btn>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "LivraisonPage",
        data(){
            return{
                livraisonEnCours: null,
            }
        },
        methods:{
            getDeliveryInProgresse(){
                axios.get('http://localhost:1000/gateway/api/commande/status/'+4, {LivreurId: 12})
                    .then(response => {
                        // this.popularRestaurants = response.data
                        console.log(response.data[0])
                        this.livraisonEnCours = response.data[0]
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            deliveryFinish(){
                axios.put('http://localhost:1000/gateway/api/changeStatusCommande/'+this.livraisonEnCours._id, {Status: 6})
                    .then(response => {
                        // this.popularRestaurants = response.data
                        console.log(response.data)
                        this.$router.push("/livraisonPage")
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

        },
        mounted(){
            this.getDeliveryInProgresse()
        }
    }
</script>

<style scoped>

</style>
