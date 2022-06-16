<template>
    <div class="article">
        <img alt="image article" class="imgArticle" src="../assets/buger.webp">

        <h3 class="titleArticle">{{content.nom}}</h3>
        <p class="ingredient">Ingrédients : {{content.description}}</p>
        <p class="price">Price : {{content.price}}€</p>
        <div class="add">
            <button class="addToCart" v-on:click="test"><img alt="panier" src="" title="Ajouter au panier"></button>

        </div>
    </div>


</template>

<script>
    export default {
        name: "ProductTile",
        props: ['content'],
        methods: {
            test() {
                console.log(this.content)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .article {
        position: relative;
        background-color: rgba(193, 193, 193, .34);
        border-radius: 20px;
        padding: 60px 30px 30px 30px;
        margin: 50px;
        min-width: 200px;
        max-width: 250px;
    }

    .imgArticle {
        position: absolute;
        top: -15%;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        width: 160px;
        border-radius: 20px;
    }

    .titleArticle {
        font-size: 1.5em;
    }

    .price {
        font-weight: bold;
    }

    .add {
        display: flex;
        justify-content: flex-end;
    }

    .addToCart {
        img {

        }
    }
</style>
