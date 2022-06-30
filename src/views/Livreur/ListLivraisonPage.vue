<template>
    <div class="livraison--page">
        <div class="title--page">
            <h1 class="livraison--pageTitle">Commandes autours de vous</h1>
        </div>

        <LivraisonComponent v-for="(liv, i) in livraisons" :key="i" :tab_livraison="liv"/>
    </div>
</template>

<script>
    import axios from 'axios';
    import LivraisonComponent from '../../components/LivraisonComponent.vue'

    export default {
        name: "LivraisonPage",
        components: {
            LivraisonComponent,
        },
        data() {
            return {
                livraisons: [],
            }
        },
        mounted() {
            axios.get('http://localhost:1000/gateway/api/commande/status/' + 3)
                .then((response) => {
                    this.livraisons = response.data;
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    }
</script>

<style lang="scss">
    .livraison--page {

        .livraison--pageTitle {
            margin: 10px;
        }
    }

</style>
