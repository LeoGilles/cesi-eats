<template>
    <div class="account">
        <h1>Bienvenue sur votre compte {{this.UserName}}</h1>
        <div class="accountPage">
            <div class="accountbtn">
                <button v-on:click="openMenuAccount('modify')">Modifier</button>
                <button v-on:click="openMenuAccount('delete')">Supprimer votre compte</button>
                <button v-on:click="openMenuAccount('refer')">Parrainer un ami</button>
                <router-link to="/RestaurateurPage" v-if="this.role == 3"><button>Gerer mon restaurant</button>
                </router-link>
                <router-link to="/LivraisonPage" v-if="this.role == 2"><button>Service Livreur</button></router-link>
                <router-link to="/commercial" v-if="this.role == 4"><button>Service Commercial</button></router-link>
                <router-link to="/orders">
                    <button>Votre historique de commandes</button>
                </router-link>

            </div>
            <div class="accountComponentOpen">
                <edit-account :style="!editButton ? buttonNav : null" />
                <delete-account :style="!deleteButton ? buttonNav : null" />
                <refer-friend :style="!referButton ? buttonNav : null" />
            </div>
        </div>

    </div>
</template>

<script>
    import EditAccount from "../../components/EditAccount";
    import DeleteAccount from "../../components/DeleteAccount";
    import ReferFriend from "../../components/ReferFriend";
    import store from '../../store'
    import axios from 'axios';
    import {
        ref
    } from 'vue'
    export default {
        name: "AccountView",
        components: {
            ReferFriend,
            DeleteAccount,
            EditAccount
        },
        data() {
            return {
                editButton: true,
                deleteButton: false,
                referButton: false,
                role: ref(0),
                UserName: ref(''),
                buttonNav: {
                    display: "none",
                }
            }
        },
        computed() {
            this.role = store.state.userRole
        },
        mounted() {
            let config = {
                method: 'get',
                url: 'http://localhost:10432/api/Users/' + store.state.userId,
                headers: {}
            };

            axios(config)
                .then((response) => {
                    this.UserName = response.data[0]["UsersName"]
                    store.commit('SetUserRole', response.data[0]["Roles"])
                    this.role = store.state.userRole
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        methods: {
            openMenuAccount(button) {
                if (button === 'modify') {
                    this.editButton = true;
                    this.deleteButton = false;
                    this.referButton = false;
                } else if (button === 'delete') {
                    this.editButton = false;
                    this.deleteButton = true;
                    this.referButton = false;
                } else if (button === 'refer') {
                    this.editButton = false;
                    this.deleteButton = false;
                    this.referButton = true;
                }

            },

        }
    }
</script>

<style scoped lang="scss">
    .account {
        padding: 20px;

        .accountPage {
            margin: 20px 0;

            .accountbtn {


                button {
                    border-radius: 20px;
                    background: linear-gradient(145deg, #cacaca, #f0f0f0);
                    box-shadow: 20px 20px 60px #bebebe,
                        -20px -20px 60px #ffffff;
                }

                button:focus {
                    border-radius: 20px;
                    background: #e0e0e0;
                    box-shadow: inset 20px 20px 60px #bebebe,
                        inset -20px -20px 60px #ffffff;
                }

                a {
                    color: #3b4a5a;
                }
            }

            .accountComponentOpen {
                width: 100%;
            }
        }

    }

    @media (max-width: 899px) {
        .accountbtn {
            button {
                margin: 10px;
                padding: 20px;
            }
        }

    }

    @media (min-width: 900px) {
        .accountPage {
            display: flex;

            .accountbtn {
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                button {
                    min-width: 300px;
                    margin: 20px 0;
                    padding: 1cm;
                }

                button:active {}
            }
        }
    }
</style>
