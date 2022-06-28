<template>
  <div class="livraison--page">
    <div class="title--page">
        <h1 class="title">Commandes autours de vous</h1>
    </div>

    <LivraisonComponent/>
    <LivraisonComponent/>
  </div>
</template>

<script lang="ts">
import LivraisonComponent from '../components/LivraisonComponent.vue'
export default {
    name: "LivraisonPage",
    components: {
        LivraisonComponent,
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