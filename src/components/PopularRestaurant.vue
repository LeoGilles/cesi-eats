<template>
    <h2>{{content.nom}}</h2>
    <div id="v-carousel" type="x/template">
        <div class="card-carousel-wrapper">
            <div :disabled="atHeadOfList" @click="moveCarousel(-1)" class="card-carousel--nav__left"></div>
            <div class="card-carousel">
                <div class="card-carousel--overflow-container">
                    <div :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
                         class="card-carousel-cards">

                        <div :key="meal.nom" class="card-carousel--card" v-for="meal in meals">
                            <ProductTile v-bind:content="meal"/>
                        </div>
                    </div>
                </div>
            </div>
            <div :disabled="atEndOfList" @click="moveCarousel(1)" class="card-carousel--nav__right"></div>
        </div>
    </div>


</template>

<script>
    import ProductTile from "./ProductTile";

    export default {
        name: "PopularRestaurant",
        components: {ProductTile,},
        props: ['content'],
        data() {
            return {
                currentOffset: 0,
                windowSize: 3,
                paginationFactor: 220,
                meals: {
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
            }
        },
        computed: {
            atEndOfList() {
                return this.currentOffset <= (this.paginationFactor * -1) * (this.meals.length - this.windowSize);
            },
            atHeadOfList() {
                return this.currentOffset === 0;
            },
        },
        methods: {
            moveCarousel(direction) {
                console.log(this.meals.length);

                // Find a more elegant way to express the :style. consider using props to make it truly generic
                if (direction === 1 && !this.atEndOfList) {
                    this.currentOffset -= this.paginationFactor;
                } else if (direction === -1 && !this.atHeadOfList) {
                    this.currentOffset += this.paginationFactor;
                }
            },

        },
        beforeMount() {
            console.log('test')
        }


    }
</script>

<style lang="scss" scoped>
    $vue-navy: #2c3e50;
    $vue-navy-light: #3a5169;
    $vue-teal: #42b883;
    $vue-teal-light: #42b983;
    $gray: #666a73;
    $light-gray: #f8f8f8;


    body {
        background: $light-gray;
        color: $vue-navy;
        font-family: 'Source Sans Pro', sans-serif;
    }

    .card-carousel-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0 40px;
        color: $gray;
    }

    .card-carousel {
        display: flex;
        justify-content: center;

        &--overflow-container {
            overflow: hidden;
        }

        &--nav__left,
        &--nav__right {
            display: inline-block;
            width: 15px;
            height: 15px;
            padding: 10px;
            box-sizing: border-box;
            border-top: 2px solid $vue-teal;
            border-right: 2px solid $vue-teal;
            cursor: pointer;
            margin: 0 20px;
            transition: transform 150ms linear;

            &[disabled] {
                opacity: 0.2;
                border-color: black;
            }
        }

        &--nav__left {
            transform: rotate(-135deg);

            &:active {
                transform: rotate(-135deg) scale(0.9);
            }
        }

        &--nav__right {
            transform: rotate(45deg);

            &:active {
                transform: rotate(45deg) scale(0.9);
            }
        }
    }

    .card-carousel-cards {
        display: flex;
        transition: transform 150ms ease-out;
        transform: translatex(0px);

        .card-carousel--card {
            margin: 0 10px;
            cursor: pointer;
            z-index: 3;
            margin-bottom: 2px;

            &:first-child {
                margin-left: 0;
            }

            &:last-child {
                margin-right: 0;
            }


            &--footer {
                border-top: 0;
                padding: 7px 15px;


            }
        }
    }


</style>
