<template>
    <div class="article">
        <img alt="image article" class="imgArticle" src="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_1280.jpg">

        <h3 class="titleArticle">{{content.Nom}}</h3>
        <p class="ingredient">Ingrédients : {{content.Description}}</p>
        <p class="price">Price : {{content.Prix}}€</p>
        <div class="add">
            <button class="addToCart" v-on:click="addArticle(content)">
                <img :src="this.addToCart" alt="Ajouter au panier" title="Ajouter au panier">
            </button>

        </div>
    </div>


</template>

<script>
    import store from "@/store";
    export default {
        name: "ProductTile",
        props: ['content'],
        data(){
            return{
                cart: store.getters.getCart,
                addToCart: require('@/assets/add-to-cart.png')
            }
        },
        methods: {
            addArticle(product) {

                if (this.cart.length ===0 || this.cart[0].RestaurantId === product.RestaurantId){
                    store.commit('setCart', product);
                    this.$notify({text:"Article "+product.Nom+" ajouté au panier !", type: 'success'});
                }else{
                    this.$notify({text: "L'article ne peut pas être ajouté au panier car il ne fait pas parti du même restaurant!", type: 'warn'});
                }
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
        margin: 70px;
        min-width: 200px;
        max-width: 250px;
    }

    .imgArticle {
        position: absolute;
        top: -25%;
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
