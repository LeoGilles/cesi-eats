<template>
    <div class="referFriend">
        <v-card class="d-flex flex-column mx-auto justify-space-around mb-6">
            <h3>Entrer le mail de l'ami que vous voulez parrainer et gagner des avantages sur votre prochaine commande
            </h3>
            <v-form v-model="valid" lazy-validation>
                <v-text-field v-model="referMail" :rules="emailRules" label="Amis actuel parrainé :" required></v-text-field>
            </v-form>
            <v-btn color="success" @click="referFriend">Valider</v-btn>
        </v-card>
    </div>
</template>

<script>
    import store from '../store'
    import axios from 'axios';
    export default {
        name: "ReferFriend",
        data() {
            return {
                valid: true,
                referMail: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        mounted() {
            let config1 = {
                method: 'get',
                url: 'http://localhost:3030/api/parrainage/' + store.state.userId,
            };

            axios(config1)
                .then((response) => {
                    this.referMail = response.data["UserMail"]
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        methods: {
            referFriend() {
                let config1 = {
                    method: 'get',
                    url: 'http://localhost:3030/api/parrainage/' + store.state.userId,
                };

                axios(config1)
                    .then((response1) => {

                        if (response1.data["UserIdParrain"] == store.state.userId) {
                            let data2 = JSON.stringify({
                                "UserIdParrain": store.state.userId,
                                "UserMail": this.referMail
                            })
                            let config2 = {
                                method: 'put',
                                url: 'http://localhost:3030/api/parrainage',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data2
                            }

                            axios(config2)
                                .then(() => {

                                    alert("Le parrainage à bien été enregistré")
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        } else {
                            let data3 = JSON.stringify({
                                "UserIdParrain": store.state.userId,
                                "UserMail": this.referMail
                            })
                            let config3 = {
                                method: 'post',
                                url: 'http://localhost:3030/api/parrainage',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data3
                            }

                            axios(config3)
                                .then(() => {

                                    alert("Le parrainage à bien été enregistré")
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });





            },
        }
    }
</script>

<style scoped lang="scss">
    .referFriend {
        padding: 5%;
        display: flex;

    }
</style>