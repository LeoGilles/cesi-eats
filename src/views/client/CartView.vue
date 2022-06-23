<template>
    <div class="cart">
        <div class="articles">
            <h1>Pannier</h1>
            <div class="deliveryAdresse">
                <p>32 rue du gigot</p>
                <button @click="changeAdresse()">Modifier</button>

            </div>

            <div class="article" v-if="products.length > 0">
                <h2>Articles</h2>
                <div class="details" v-for="product in products" :key="product.id">
                    <ProductCart v-bind:product="product" v-bind:qte="qteProduct(product.id)"/>
                </div>
            </div>
            <div class="article" v-else>
                <p>Vous n'avez pas encore d'article dans votre pannier,<br> <router-link to="/">rendez-vous sur la page d'acceuil</router-link></p>
            </div>
        </div>

        <div class="total">
            <div class="section">
                <p>Commandes : </p>
                <p>{{totalPriceCmd}} €</p>
            </div>
            <div class="section">
                <p>Service : </p>
                <p>{{servicePrice}} €</p>
            </div>
            <div class="section">
                <p>Livraison : </p>
                <p>{{deliveryCost}} €</p>
            </div>
            <div class="section">
                <p>Total : </p>
                <p>{{totalToPaid()}} €</p>
            </div>
            <div class="btn">
                <button class="paid">Payer</button>
            </div>
        </div>
    </div>

</template>

<script>
    import store from "@/store";
    import ProductCart from "@/components/ProductCart";

    export default {
        name: "CartUser",
        components: {ProductCart},
        data() {
            return {
                products: store.getters.getProducts,
                cart: store.getters.getCart,
                totalPriceCmd: store.getters.getTotalPriceCmd,
                deliveryCost: 10,
                servicePrice: 20,
            }
        },
        methods: {
            changeAdresse() {
                console.log('t')
            },

            qteProduct(id) {
                let qte = 0
                for (let i = 0; i < this.cart.length; i++) {
                    if (this.cart[i].id === id) {
                        qte++
                    }
                }
                return qte
            },
            totalToPaid() {
                return this.totalPriceCmd + this.deliveryCost + this.servicePrice
            }

        },
        mounted() {
            console.log(this.products)
        }
    }
</script>

<style lang="scss" scoped>
    .cart {
        padding: 2% 5%;

        .articles {
            .deliveryAdresse {
                display: flex;
                justify-content: space-between;
                width: 500px;
                border-bottom: 1px solid #4D90A0;

                p {
                    padding: 5%;
                }

                button {
                    padding: 0 10px;
                    margin: 5px;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(145deg, #ffffff, #e6e6e6);
                    box-shadow: 10px 10px 60px #c0c0c0,
                    -10px -10px 60px #ffffff;
                }

                button:active {
                    background: #ffffff;
                    box-shadow: inset 20px 20px 60px #d9d9d9,
                    inset -20px -20px 60px #ffffff;

                }
            }

            .article {
                padding-top: 10px;
                display: flex;
                flex-direction: column;

                h2 {
                    text-align: left;
                }

                .details {
                    display: flex;
                }
            }
        }

        .total {
            width: 500px;
            background-color: rgba(77, 144, 160, .5);
            border-radius: 20px;
            margin: 10px;
            padding-bottom: 20px;

            .section {
                display: flex;
                justify-content: space-between;
                padding: 20px;
            }
            .btn{
                display: flex;
                justify-content: flex-end;
                .paid {

                    padding: 10px 20px;
                    margin: 10px;
                    border: none;
                    border-radius: 10px;
                    background: linear-gradient(145deg, #ffffff, #e6e6e6);
                    box-shadow: 10px 10px 60px #c0c0c0,
                    -10px -10px 60px #ffffff;
                }
                .paid:active{
                    background: #ffffff;
                    box-shadow: inset 20px 20px 60px #d9d9d9,
                    inset -20px -20px 60px #ffffff;
                }
            }


        }
    }

    @media (max-width: 899px) {
        .cart {

        }
    }

    @media (min-width: 900px) {
        .cart {
            display: flex;
            justify-content: space-between;
        }
    }
</style>
