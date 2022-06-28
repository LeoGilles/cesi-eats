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
                <p class="estimation--temps">Estimation du temps</p>
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
            <v-btn variant="outlined" color="teal">Accepter</v-btn>
        </div>
        <div class="reject--button">
            <v-btn variant="outlined" color="error">Refuser</v-btn>
        </div>
   </div>

  </div>
</template>

<script lang="ts">
export default {
    name: "LivraisonComponent",
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
    .livraison--component{
        margin-bottom: 5px;
        .color--bar {
            background-color: #5d99a7;
            height: 2px;
            width: 100%;
        }

        .wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 7px;
        margin-bottom: 7px;
        
    }
        .wrapper--button{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 50px;
            padding-right: 50px;
        }
        
    }
</style>