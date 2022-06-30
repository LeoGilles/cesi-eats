<template>
    <div class="footer">
        <div class="logo">
            <h1><router-link to="/" class="footerNameSite">Cesi ton gras</router-link> </h1>
            <div class="socialMedia">
                <a href="http://example.com"><img alt="twitter" title="twitter" :src="twitter"></a>
                <a href="http://example.com"><img alt="facebook" title="facebook" :src="facebook"></a>
                <a href="http://example.com"><img alt="linkedin" title="linkedin" :src="linkedin"></a>
            </div>
        </div>
        <div class="shortcuts links">
            <router-link to="">Obtenir de l’aide</router-link>
            <router-link to="">Ajoutez votre restaurant</router-link>
            <router-link to="">Devenez coursier-partenaire</router-link>
        </div>
        <div class="importantLinks links">
            <router-link to="/politique">Politique de confidentialité</router-link>
            <router-link to="">Conditions</router-link>
        </div>

    </div>
</template>

<script>
    export default {
        name: "FooterComponent",
        data(){
            return{
                twitter: require('@/assets/footer/twitter.png'),
                facebook: require('@/assets/footer/facebook.png'),
                linkedin: require('@/assets/footer/linkedin.png'),
            }
        }
    }
</script>

<style lang="scss" scoped>
    .footer {
        margin-top: 20px;
        padding-top: 20px;
        padding-bottom: 50px;
        border-top: 1px solid #4D90A0;

        .footerNameSite{
            text-decoration: none;
            color: black;
        }

        .logo {
            .socialMedia {
                display: flex;
                align-items: center;


                img {
                    padding: 5px;
                    height: 32px;
                    width: 32px;

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
