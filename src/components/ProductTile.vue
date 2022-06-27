<template>
    <div class="article">
        <img alt="image article" class="imgArticle" :src="content.Img">

        <h3 class="titleArticle">{{content.Nom}}</h3>
        <p class="ingredient">Ingrédients : {{content.Description}}</p>
        <p class="price">Price : {{content.Prix}}€</p>
        <div class="add">
            <button class="addToCart" v-on:click="addArticle(content)">Add <font-awesome-icon icon="fa-plus" style="color:lime;" />
            
            </button>

        </div>
    </div>


</template>

<script>
    import store from "@/store";
    export default {
        name: "ProductTile",
        props: ['content'],
        methods: {
            addArticle(product) {

                console.log('cart '+ store.getters.getCart)
                store.commit('setCart', product);
                console.log(store.getters.getCart)
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
