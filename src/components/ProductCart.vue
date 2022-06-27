<template>
    <div class="productCart">
        <div class="desProductCart">
            <p class="productCartName">{{product.Nom}}</p>
            <p>Description : </p>
            <p class="descriptionProductCart">{{product.Description}}</p>
        </div>

        <div class="detailsProductCart">
            <img alt="image produit" :src="product.Img"/>
            <p class="qte">
                <span class="moins" v-on:click="deleteArticle(product)">-</span>
                {{qte}}
                <span class="plus" v-on:click="addArticle(product)">+</span>
            </p>
            <p class="price">{{product.Prix}} €</p>

        </div>
    </div>


</template>

<script>
    import store from "@/store";

    export default {
        name: "ProductCart",
        props: ['product', 'qte'],
        data() {
            return {
                newQte: 0,
            }
        },
        methods: {
            test() {
                console.log(this.newQte)
            },
            deleteArticle(product) {
                store.commit('deleteProductInCart', product)
            },
            addArticle(product) {
                store.commit('setCart', product);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .productCart {
        display: flex;
        justify-content: space-between;
        width: 100%;

        .desProductCart {
            p {
                text-align: left;
                padding: 10px 0;
            }

            .productCartName {
                font-weight: bold;
            }

            .descriptionProductCart {
                width: 50px;
            }
        }

        .detailsProductCart {
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            select {
                text-align: right;
                border: none;
                background-color: #FFF;
            }

            p {
                text-align: right;
            }

            span{
                padding: 0 5px;
                cursor: pointer;
            }
        }
    }
</style>
