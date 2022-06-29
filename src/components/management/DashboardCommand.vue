<template>
    <div class="dashboardCommand">
        <tile-management class="item-a" v-bind:stat="totalCmd" v-bind:title="'Total des commandes passées'"/>
        <tile-management class="item-b" v-bind:stat="totalCmdLivre" v-bind:title="'Total des commandes livrées'"/>
        <tile-management class="item-c" v-bind:stat="totalCmdNonLivre" v-bind:title="'Total des commandes pas encorelivrées'"/>
        <tile-management class="item-d" v-bind:stat="meanCart" v-bind:title="'Moyenne des commandes passées'"/>
        <tile-management class="item-e" v-bind:stat="meanCart" v-bind:title="'Moyenne des commandes passées'"/>
        <tile-management class="item-f" v-bind:stat="totalCmdEnPrep" v-bind:title="'Nombre de commande en préparation'"/>
        <tile-management class="item-g" v-bind:stat="totalCmdEnLivraison" v-bind:title="'Nombre de commande en livraison'"/>
    </div>

</template>

<script>
    import TileManagement from "./TileManagement";
    import axios from 'axios'

    export default {
        name: "DashboardCommand",
        components: {TileManagement},
        data(){
            return{
                totalCmd: null,
                totalCmdLivre: null,
                totalCmdNonLivre: null,
                meanCart: null,
                totalCmdEnPrep: null,
                totalCmdEnLivraison: null,
            }
        },
        methods:{
            getTotalCmd(){
                axios.get('http://localhost:1000/gateway/api/commercial/commande/')
                    .then(response => {
                        this.totalCmd= response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getTotalCmdLivre(){
                axios.get('http://localhost:1000/gateway/api/commercial/commandeLivre/')
                    .then(response => {
                        this.totalCmdLivre= response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getTotalCmdNonLivre(){
                axios.get('http://localhost:1000/gateway/api/commercial/commandeNonLivre/')
                    .then(response => {
                        this.totalCmdNonLivre= response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getTotalCmdEnPrep(){
                axios.get('http://localhost:1000/gateway/api/commercial/commandePreparation/')
                    .then(response => {
                        this.totalCmdEnPrep= response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getTotalCmdEnLivraison(){
                axios.get('http://localhost:1000/gateway/api/commercial/commandeLivraison/')
                    .then(response => {
                        this.totalCmdEnLivraison= response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },

            getMeanCart(){
                axios.get('http://localhost:1000/gateway/api/commercial/panierMoyen/')
                    .then(response => {
                        const prix = response.data
                        let sum =0
                        for(let i = 0; i<prix.length; i++){
                            sum = sum+prix[i].Prix
                        }
                        const mean =  sum/prix.length
                        this.meanCart = mean.toFixed(2)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }


        },
        mounted(){
            this.getTotalCmd()
            this.getTotalCmdLivre()
            this.getTotalCmdNonLivre()
            this.getMeanCart()
            this.getTotalCmdEnPrep()
            this.getTotalCmdEnLivraison()
        }
    }
</script>

<style scoped lang="scss">
    .dashboardCommand {
        display: grid;

        column-gap: 10px;
        row-gap: 15px;

    }

    .item-a {
        grid-area: header;
    }

    .item-b {
        grid-area: main;
    }

    .item-c {
        grid-area: sidebar;
    }

    .item-d {
        grid-area: other;
    }

    .item-e {
        grid-area: tileE;
    }

    .item-f {
        grid-area: tileF;
    }

    .item-g {
        grid-area: tileG;
    }

    @media (max-width: 899px) {
        .dashboardCommand {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: [row1-start] 50px [row1-end] 100px [third-line] auto [last-line];
            grid-template-areas:
                    "header header header item-e main tileF"
                    "sidebar sidebar tileG other other other";
        }

    }

    @media (min-width: 900px) {
        .dashboardCommand {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: [row1-start] 100px [row1-end] 100px [third-line] auto [last-line];
            grid-template-areas:
                    "header header tileE tileF main tileG"
                    "header header sidebar other other other";
        }
    }
</style>
