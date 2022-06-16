<template>
    <div class="cart">
        <div class="articles">
            <h1>Pannier</h1>
            <div class="adresse">
                <p>32 rue du gigot</p>
                <button>Modifier</button>
            </div>

            <div class="article">
                <h2>Article</h2>
                <div class="details">

                </div>
            </div>
        </div>

        <div class="total">
            <div class="section">
                <p>Commandes : </p>
                <p>23 €</p>
            </div>
            <div class="section">
                <p>Service : </p>
                <p>2 €</p>
            </div>
            <div class="section">
                <p>Livraison : </p>
                <p>60 €</p>
            </div>
            <div class="section">
                <p>Total : </p>
                <p>70€</p>
            </div>
            <div class="btn">
                <button class="command">Commander</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "CartUser",
    }
</script>

<style lang="scss" scoped>
    .cart {
        display: flex;
        padding: 2% 5%;

        .articles {
            .adresse {
                display: flex;
                width: 500px;
                border-bottom: 1px solid #4D90A0;

                p {
                    padding: 5%;
                }

                button {
                    border: none;
                    background-color: #FFF;
                }
            }

            .article {
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

            btn {
                display: flex;
                justify-content: flex-end;
            }
        }

        @media (max-width: 899px) {
            .cart {
            }
        }

        @media (min-width: 900px) {
            .cart {
            }
        }
    }
</style>
