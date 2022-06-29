<template>
    <div class="body">
        <v-card no-gutters v-for="commande in MyCmd" :key="commande">
            <v-card-text v-if="commande.ClientId == userId" class="text-h6">
               Restaurant : {{commande.RestaurantId}}, Prix de la commande : {{commande.Prix}} €
            </v-card-text>

            <v-card-text v-else class="text-h6">
               Client (Anonyme) : {{commande.ClientId}}, Prix de la commande : {{commande.Prix}} €
            </v-card-text>

            <v-btn style="margin: 10px;" rounded="lg" color="primary"
                @click="OpenDialog(commande.Status,commande.Prix,commande.Description,commande.Article,commande.dateTimeCommander,commande.dateTimeLivreur,commande.dateTimeRecu)">
                Suivre la commande
            </v-btn>
            <v-divider></v-divider>
        </v-card>

        <v-dialog v-model="dialog" persistent>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Suivi de votre commande</span>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex justify-center mb-6 align-content-center" outlined tile>
                        <v-container style="max-width: 600px;">
                            <v-timeline truncate-line="start" side="end" align="start">
                                <v-timeline-item v-if="CmdStatus>=1" dot-color="pink" size="small">
                                    <div class="d-flex flexVer">
                                        <strong class="mr-4">{{CmddateTimeCommander}}</strong>
                                        <div>
                                            <div class="text-caption">
                                                En attente 
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item v-if="CmdStatus>=2" dot-color="teal-lighten-3" size="small">
                                    <div class="d-flex">
                                        <strong class="mr-4"></strong>
                                        <div>
                                            <strong>Le Restaurant prépare votre commande</strong>
                                            <div class="text-caption">
                                                {{CmdDescription}}
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item v-if="CmdStatus>=3" dot-color="pink" size="small">
                                    <div class="d-flex">
                                        <strong class="mr-4">{{CmddateTimeLivreur}}</strong>
                                        <div>
                                            <strong>le Livreur prend en charge votre commande</strong>
                                        </div>
                                    </div>
                                </v-timeline-item>

                                <v-timeline-item v-if="CmdStatus>=4" dot-color="teal-lighten-3" size="small">
                                    <div class="d-flex">
                                        <strong class="mr-4">{{CmddateTimeRecu}}</strong>
                                        <div>
                                            <strong>Le livreur vous attend à votre porte</strong>
                                            <div class="text-caption">
                                                Bonne appetit !
                                            </div>
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-container>

                        <v-card class="mx-auto" width="500">
                            <div v-if="CmdStatus ==1">
                                <v-img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA5gplHjBPdr5W7M9mzFOedn2gY7R1WNIuYw&usqp=CAU"
                                    height="200px"></v-img>
                                <v-card-title>
                                    En attente de la confirmation du restaurant
                                </v-card-title>
                            </div>
                            <div v-if="CmdStatus ==2">
                                <v-img
                                    src="https://i.pinimg.com/originals/28/4d/41/284d412ca30a4c3c2d0e882f1587d029.gif"
                                    height="200px" cover></v-img>
                                <v-card-title>
                                    Le Restaurant prépare votre commande
                                </v-card-title>

                                <v-card-subtitle>
                                    Veuillez Patientez
                                </v-card-subtitle>
                            </div>
                            <div v-if="CmdStatus == 3">
                                <v-img
                                    src="https://foodservices1.files.wordpress.com/2020/12/food-delivery-lapd.gif?w=640"
                                    height="200px">
                                </v-img>
                                <v-card-title>
                                    Le Livreur est en route
                                </v-card-title>
                                <v-card-subtitle>
                                    Il ne devrait pas tarder
                                </v-card-subtitle>
                            </div>


                            <v-card-actions>
                                <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show">
                                </v-btn>
                            </v-card-actions>

                            <v-expand-transition>
                                <div v-show="show">
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        Description : {{CmdDescription}}
                                    </v-card-text>
                                    <v-card-text>
                                        Prix : {{CmdPrix}} €
                                    </v-card-text>
                                    <v-card-text>
                                        Articles : {{CmdArticle}} 
                                    </v-card-text>
                                </div>
                            </v-expand-transition>
                        </v-card>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" text @click="CloseDialog">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
    import store from '../../store'
    import axios from 'axios';
    import moment from 'moment';
    export default {
        name: "TrackingView",
        data() {
            return {
                show: false,
                dialog: false,
                CmdStatus: 0,
                CmdPrix: 0,
                CmdDescription: '',
                CmdArticle: [],
                CmdNom: "",
                CmddateTimeCommander: '',
                CmddateTimeLivreur: '',
                CmddateTimeRecu: '',
                MyCmd: [{}],
                role: 0,
                userId: 0,
            }
        },
        mounted() {
            let config = {
                method: 'get',
                url: 'http://localhost:10432/api/Users/' + store.state.userId,
                headers: {}
            };

            axios(config)
                .then((response) => {
                    store.commit('SetUserRole', response.data[0]["Roles"])
                    this.role = store.state.userRole
                    this.userId = store.state.userId
                    this.refreshCommand()
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        methods: {
            refreshCommand() {

                if (this.role == 1) {
                    let config = {
                        method: 'get',
                        url: 'http://localhost:4000/api/commande/client/now/' + store.state.userId,
                        headers: {}
                    };
                    axios(config)
                        .then((response) => {
                            this.MyCmd = response.data
                            this.MyCmd.forEach(cmd => {
                                cmd.dateTimeCommander = moment(cmd.dateTimeCommander).format('MMMM Do YYYY, h:mm:ss a')
                                    let config3 = {
                                        method: 'get',
                                        url: 'http://localhost:3000/api/Restaurant/' + cmd.RestaurantId,
                                        headers: {}
                                    };
                                    axios(config3)
                                        .then((response3) => {
                                            cmd.RestaurantId = response3.data['Nom']
                                            console.log(cmd)
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
                    let config3 = {
                        method: 'get',
                        url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                        headers: {}
                    };
                    axios(config3)
                        .then((response3) => {
                            let config = {
                                method: 'get',
                                url: 'http://localhost:4000/api/commande/restaurant/now/' + response3.data["_id"],
                                headers: {}
                            };

                            axios(config)
                                .then((response) => {
                                    this.MyCmd = response.data
                                    this.MyCmd.forEach(cmd => cmd.dateTimeCommander = moment(cmd
                                        .dateTimeCommander).format('MMMM Do YYYY, h:mm:ss a'))
                                    console.log(this.MyCmd)
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            },
            OpenDialog(Status, Prix, Description, Article, dateTimeCommander, dateTimeLivreur, dateTimeRecu) {
                console.log(store.state.userRole)
                this.CmdStatus = Status
                this.CmdPrix = Prix
                this.CmdDescription = Description
                this.CmdArticle = Article
                this.CmddateTimeCommander = dateTimeCommander
                this.CmddateTimeLivreur = dateTimeLivreur
                this.CmddateTimeRecu = dateTimeRecu

                this.dialog = true
            },
            CloseDialog() {
                this.CmdStatus = 0
                this.CmdPrix = 0
                this.CmdDescription = ''
                this.CmdArticle = []
                this.CmddateTimeCommander = ""
                this.CmddateTimeLivreur = ""
                this.CmddateTimeRecu = ""

                this.dialog = false
            }
        }
    }
</script>

<style scoped lang="scss">
    .body {
        margin: 20px;
        min-height: 800px;
    }

    .flexVer {
        flex-direction: column;
    }

    .trackingView {
        vertical-align: center;
    }
</style>