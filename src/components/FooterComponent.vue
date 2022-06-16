<template>
    <div class="footer">
        <div class="logo">
            <h1>Cesi ton gras</h1>
            <div class="socialMedia">
                <img alt="twitter" src="">
                <img alt="facebook" src="">
                <img alt="linkedin" src="">
            </div>
        </div>
        <div class="shortcuts links">
            <router-link to="">Obtenir de l’aide</router-link>
            <router-link to="">Ajoutez votre restaurant</router-link>
            <router-link to="">Devenez coursier-partenaire</router-link>
            <router-link to="">Restaurants à proximité</router-link>
        </div>
        <div class="importantLinks links">
            <router-link to="">Fonctionnement des sites et des applications Uber et Uber Eats</router-link>
            <router-link to="">Politique de confidentialité</router-link>
            <router-link to="">Conditions</router-link>
            <router-link to="">Tarifs</router-link>
            <router-link to=""> Ne pas vendre mes données (Californie)</router-link>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FooterComponent"
    }
</script>

<style lang="scss" scoped>
    .footer {
        padding-top: 20px;
        padding-bottom: 50px;
        border-top: 1px solid #4D90A0;


        .logo {
            .socialMedia {
                display: flex;


                img {
                    height: 30px;
                }
            }
        }

        .links {
            display: flex;
            flex-direction: column;
            text-align: left;

            a {
                padding: 10px 0;
                color: black;
                text-decoration: none;
            }

            a:hover {
                text-decoration: underline;
            }
        }
    }

    @media (max-width: 749px) {
        .socialMedia {
            justify-content: space-around;
        }
        .indicationLinks {
            display: flex;

            div {
                padding: 10px;
            }
        }

    }

    @media (min-width: 750px) {
        .footer {
            display: flex;
            justify-content: space-around;

            .socialMedia {
                flex-direction: column;
            }
        }
    }
</style>
