<template>
    <div class="home">
        <div class="come">
            <h1>Le <span class="color">meilleur</span> endroit
                pour <span class="color">manger</span> se trouve
                dans votre canapé</h1>
            <input class="searchRestaurant" placeholder="Restaurant, type, ..." type="text">

        </div>


        <div class="bestProducts">
            <div class="background"/>
            <div :key="article.restaurantId" v-for="article in populaMeals">
                <ProductTile v-bind:content="article"/>
            </div>

        </div>
    </div>
    <div :key="restaurant.id" class="popular" v-for="restaurant in popularRestaurants">
        <PopularRestaurant v-bind:content="restaurant"/>
    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import {defineComponent} from 'vue';
    import ProductTile from '@/components/ProductTile.vue'; // @ is an alias to /src
    import PopularRestaurant from '@/components/PopularRestaurant.vue'; // @ is an alias to /src

    export default defineComponent({
        name: 'HomeView',
        components: {
            ProductTile,
            PopularRestaurant

        },
        data() {
            return {
                populaMeals: {
                    burgerTest: {
                        nom: 'Burger',
                        img: '../assets/buger.webp',
                        restaurantId: 1,
                        price: 12.2,
                        description: "Boeuf, tomate, pain, salade"
                    },
                    burgerTest2: {
                        nom: 'Burger 2',
                        img: '../assets/buger.webp',
                        restaurantId: 1,
                        price: 12.2,
                        description: "Boeuf, tomate, pain, salade"
                    },
                    burgerTest3: {
                        nom: 'Burger 3',
                        img: '../assets/buger.webp',
                        restaurantId: 1,
                        price: 12.2,
                        description: "Boeuf, tomate, pain, saladeBoeuf, tomate, pain, saladeBoeuf, tomate, pain, salade"
                    },
                    burgerTest4: {
                        nom: 'Burger 4',
                        img: '../assets/buger.webp',
                        restaurantId: 1,
                        price: 12.2,
                        description: "Boeuf, tomate, pain, salade"
                    }
                },
                popularRestaurants: {
                    restaurant1: {
                        nom: "restaurant1",
                        mdp: "",
                        adresse: "10 rue de Paris, Paris, 75001",
                        dateOfJoining: "2012-01-03",
                        img: "",
                        role: "1",
                    },
                    restaurant2: {
                        nom: "restaurant2",
                        mdp: "",
                        adresse: "10 rue de Paris, Paris, 75001",
                        dateOfJoining: "2012-01-03",
                        img: "",
                        role: "1",
                    },
                    restaurant3: {
                        nom: "restaurant3",
                        mdp: "",
                        adresse: "10 rue de Paris, Paris, 75001",
                        dateOfJoining: "2012-01-03",
                        img: "",
                        role: "1",
                    },
                }
            }
        },
        methods: {
            test(newTest: any) {
                console.log('test')
                console.log(newTest)
            }
        }
    });
</script>
<style lang="scss">

    .home {
        padding: 20px;

        .come {

            h1 {
                font-size: 70px;
            }

            .searchRestaurant {
                margin: 20px 0;
                padding: 10px;
                width: 500px;
                min-width: 300px;
                border-radius: 10px;
                border-color: #2c3e50;
                display: flex;
                border-width: 1px;
                font-size: 25px;
            }

        }
    }

    .color {
        color: #4D90A0;
    }


    @media (max-width: 1200px) {
        .home {
            .come {

                .searchRestaurant {
                    min-width: 300px;
                }

            }

            .bestProducts {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;

                .background {
                    display: none;
                }
            }
        }


    }

    @media (min-width: 1200px) {
        .home {
            display: flex;
            justify-content: space-around;

            .come {
                max-width: 50%;

                h1 {
                    text-align: left;
                }

                .searchRestaurant {
                    min-width: 300px;
                    display: flex;
                }

            }

            .bestProducts {
                display: flex;
                flex-wrap: wrap;
                position: relative;

                .background {
                    position: absolute;
                    background-color: rgba(77, 140, 160, .5);
                    right: 5%;
                    height: 100%;
                    width: 70%;
                    border-radius: 20px;
                }
            }
        }

    }


</style>