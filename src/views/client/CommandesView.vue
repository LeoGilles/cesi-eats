<template>
    <h1 class="commandHistoryTitle">Historique des commandes</h1>

    <div v-for="cmd in historyCmd" :key="cmd._id">
        <CommandeComponent v-bind:commande="cmd" @weAreSure="refreshCommand()"/>
    </div>

</template>

<script>
    import CommandeComponent from "../../components/CommandeComponent";
    import store from '../../store'
    import axios from 'axios';
    import moment from 'moment';

    export default {
        name: "CommandesView",
        components: {CommandeComponent},

        data() {
            return {
                historyCmd: [],
                restoName: '',
                role: 0,
                userId: 0,
            }
        },

        methods: {
            refreshCommand() {
                if (this.role == 1) {
                    axios.get('http://localhost:1000/gateway/api/commande/client/' + store.state.userId)
                        .then((response) => {
                            this.historyCmd = response.data
                            this.historyCmd.forEach(cmd => {
                                cmd.dateTimeCommander = moment(cmd.dateTimeCommander).format('MMMM Do YYYY, h:mm:ss a')
                                axios.get('http://localhost:3000/api/Restaurant/' + cmd.RestaurantId)
                                    .then((response3) => {
                                        cmd.RestaurantId = response3.data['Nom']
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            })

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else if (this.role == 3) {
                    axios.get('http://localhost:3000/api/RestaurantObj/' + store.state.userId)
                        .then((response3) => {
                            axios('http://localhost:4000/api/commande/restaurant/' + response3.data["_id"])
                                .then((response) => {
                                    this.historyCmd = response.data
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        },
        mounted() {
            axios.get('http://localhost:10432/api/Users/' + store.state.userId)
                .then((response) => {

                    store.commit('SetUserRole', response.data[0]["Roles"])
                    this.role = store.state.userRole
                    this.userId = store.state.userId

                    this.refreshCommand()
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
</script>

<style lang="scss" scoped>
    .commandHistoryTitle {
        margin: 10px;
    }
</style>
