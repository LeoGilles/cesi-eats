<template>
  <div class="livraison--page">
    <div class="title--page">
        <h1 class="title">Commandes autours de vous</h1>
    </div>

    <LivraisonComponent v-for="(liv, i) in livraisons" :key="i" :tab_livraison="liv"/>
  </div>
</template>

<script>
import axios from 'axios';
import LivraisonComponent from '../components/LivraisonComponent.vue'
export default {
    name: "LivraisonPage",
    components: {
        LivraisonComponent,
    },
    data() {
        return{
            livraisons: [],
        }
    },
    mounted(){
        axios.get('http://localhost:4000/api/commande/status/3')
        .then((response) => {
            console.log(response.data);
            this.livraisons = response.data;
        })
        .catch((error) => {
            console.log(error);
        })
    }
}
</script>

<style>
h1 {
    font-size: 1.2em;
    text-align: justify;
    text-justify: inter-word;
    padding-left: 10px;
}
</style>