<template>
    <div class="home">
        <div class="come">
            <h1>Le <span class="color">meilleur</span> endroit
                pour <span class="color">manger</span> se trouve
                dans votre canapé</h1>
            <input class="searchRestaurant" placeholder="Restaurant, type, ..." type="text">

        </div>


        <div class="bestProducts">
            <div class="background"></div>
            <div :key="article.id" v-for="article in populaMeals">
                <ProductTile v-bind:content="article" />
            </div>

        </div>
    </div>
    <div v-if="!isFetching">
        <div :key="restaurant.id" class="popular" v-for="restaurant in popularRestaurants">
            <PopularRestaurant v-bind:content="restaurant"/>
        </div>
    </div>
     <div v-else>
        Loading restaurants...
         {{popularRestaurants[0].Nom}}
     </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import {
        defineComponent
    } from 'vue';
    import ProductTile from '@/components/ProductTile.vue'; // @ is an alias to /src
    import PopularRestaurant from '@/components/PopularRestaurant.vue';
    import {
        mapActions,
        mapState
    } from "vuex"; // @ is an alias to /src
    import store from '../store'
    import axios from 'axios';
    import {
        ref
    } from 'vue'
    export default defineComponent({
        name: 'HomeView',
        components: {
            ProductTile,
            PopularRestaurant

        },
        computed: {
            ...mapState([
                'count',
                'popularMeals',
            ]),
        },
        data() {
            return {
                isFetching: true,
                populaMeals:[],
                popularRestaurants: ref([{}])

            }
        },
        mounted() {

            axios.get('http://localhost:1000/gateway/allRestaurant/')
                .then(response => {
                    this.popularRestaurants = response.data
                    //this.restoName(response.data.RestaurantId)
                    this.isFetching= !this.isFetching
                })
                .catch(error => {
                    console.log(error)
                })

            axios.get('http://localhost:1000/gateway/popularArticle/')
                .then(response => {
                    this.populaMeals = response.data
                    //this.restoName(response.data.RestaurantId)
                    //this.isFetching= !this.isFetching
                })
                .catch(error => {
                    console.log(error)
                })
        },
        methods: {
            ...mapActions([
                'setPopularMeals',
                'increment'
            ]),
           async test() {

            },
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

    @media screen and (max-width: 1150px) {
        .home{
            .come{
                h1{
                    font-size: 60px;
                }
            }
        }
    }
    @media screen and (max-width: 1000px) {
        .home{
            .come{
                h1{
                    font-size: 45px;
                }
            }
        }
    }
    @media screen and (max-width: 850px) {
        .home{
            .come{
                h1{
                    font-size: 30px;
                }
            }
        }
    }
</style>
