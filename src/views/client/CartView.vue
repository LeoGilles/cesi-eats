<template>
    <div class="cart">
        <div class="articles">
            <h1>Panier</h1>
            <div class="deliveryAdresse">
                <input type="text" v-model="adressDelivery" :placeholder="adressDelivery"/>

            </div>

            <div class="article" v-if="cart.length > 0">
                <h2>Articles</h2>
                <div class="details" v-for="product in refreshProduct" :key="product.id">
                    <ProductCart v-bind:product="product" v-bind:qte="qteProduct(product.id)"/>
                </div>
            </div>
            <div class="article" v-else>
                <p>Vous n'avez pas encore d'article dans votre panier,<br>
                    <router-link to="/">rendez-vous sur la page d'acceuil</router-link>
                </p>
            </div>
        </div>

        <div class="total">
            <div class="section">
                <p>Commandes : </p>
                <p>{{FunTotalPriceCmd()}} €</p>
            </div>
            <div class="section">
                <p>Service : </p>
                <p>{{cart.length>0 ? servicePrice : 0}} €</p>
            </div>
            <div class="section">
                <p>Livraison : </p>
                <p>{{cart.length>0 ? deliveryCost : 0}} €</p>
            </div>
            <div class="section">
                <p>Total : </p>
                <p>{{cart.length>0 ? totalToPaid() : 0}} €</p>
            </div>
            <div class="btn">
                <button class="paid" @click="paid()">Payer</button>
            </div>
        </div>
    </div>

</template>

<script>
    import store from "@/store";
    import ProductCart from "@/components/ProductCart";
    // eslint-disable-next-line no-unused-vars
    import axios from 'axios'

    export default {
        name: "CartUser",
        components: {ProductCart},
        data() {
            return {
                products: [],
                cart: store.getters.getCart,
                totalPriceCmd: 0,
                deliveryCost: 10,
                servicePrice: 20,
                adressDelivery: '32 rue du gigot',
            }
        },
        methods: {
            paid() {
                let articlesId = []
                this.cart.forEach(product => {
                    articlesId.push(product._id)
                })
                console.log(articlesId)

                // axios.get('http://localhost:4000/api/commande/restaurant/22')
                //     .then(function (response) {
                //         // handle success
                //         console.log(response);
                //     })
                //     .catch(function (error) {
                //         // handle error
                //         console.log(error);
                //     })
                if (this.cart.length>0){
                    axios.post('http://localhost:4000/api/commande', {
                        ClientId: 1,
                        RestaurantId: this.cart[0].RestaurantId,
                        Prix: this.totalToPaid(),
                        Description: "z",
                        Status: 1,
                        Article: articlesId,
                        Menu: "zs"
                    })
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                  //  this.$router.push({name: '/suivi', params: { cmdNum: "bar"}})
                }else
                    console.log('le panier est vide')


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

            FunTotalPriceCmd() {

                let res = 0
                for (let i = 0; i < this.cart.length; i++) {
                    // @ts-ignore
                    res += this.cart[i].Prix
                }
                this.totalPriceCmd = res
                return res
            },

            totalToPaid() {
                return this.totalPriceCmd + this.deliveryCost + this.servicePrice
            }

        },
        computed: {
            refreshProduct() {
                return new Set(this.cart)
            }
        },

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

                button {
                    padding: 10px;
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
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .section {
                display: flex;
                justify-content: space-between;
                padding: 20px;
            }

            .btn {
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

                .paid:active {
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
