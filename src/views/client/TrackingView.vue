<template>
    <div class="body">
        <h1>Suivi de votre commande</h1>

        <div class="d-flex justify-center mb-6 align-content-center" outlined tile>
            <v-container style="max-width: 600px;">
                <v-timeline truncate-line="start" side="end" align="start">
                    <v-timeline-item v-if="status>=1" dot-color="pink" size="small">
                        <div class="d-flex">
                            <strong class="mr-4">14h30</strong>
                            <div>
                                <strong>Nouvelle Commande</strong>
                                <div class="text-caption">
                                    Menu Maxi Best of
                                </div>
                            </div>
                        </div>
                    </v-timeline-item>

                    <v-timeline-item v-if="status>=2" dot-color="teal-lighten-3" size="small">
                        <div class="d-flex">
                            <strong class="mr-4">14h35</strong>
                            <div>
                                <strong>Le Restaurant prépare votre commande</strong>
                                <div class="text-caption mb-2">
                                    Menu Maxi Best of
                                </div>
                            </div>
                        </div>
                    </v-timeline-item>

                    <v-timeline-item v-if="status>=3" dot-color="pink" size="small">
                        <div class="d-flex">
                            <strong class="mr-4">14h45</strong>
                            <div>
                                <strong>le Livreur prend en charge votre commande</strong>
                            </div>
                        </div>
                    </v-timeline-item>

                    <v-timeline-item v-if="status>=4" dot-color="teal-lighten-3" size="small">
                        <div class="d-flex">
                            <strong class="mr-4">14h55</strong>
                            <div>
                                <strong>Commande livré</strong>
                                <div class="text-caption">
                                    Bonne appetit !
                                </div>
                            </div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </v-container>

            <v-card class="mx-auto" width="500">
                <div v-if="status ==1">
                    <v-img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA5gplHjBPdr5W7M9mzFOedn2gY7R1WNIuYw&usqp=CAU"
                        height="200px"></v-img>
                    <v-card-title>
                        En attente de la confirmation du restaurant
                    </v-card-title>
                </div>
                <div v-if="status ==2">
                    <v-img src="https://i.pinimg.com/originals/28/4d/41/284d412ca30a4c3c2d0e882f1587d029.gif"
                        height="200px" cover></v-img>
                    <v-card-title>
                        Le Restaurant prépare votre commande
                    </v-card-title>

                    <v-card-subtitle>
                        Veuillez Patientez
                    </v-card-subtitle>
                </div>
                <div v-if="status == 3">
                    <v-img src="https://foodservices1.files.wordpress.com/2020/12/food-delivery-lapd.gif?w=640"
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
                    <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
                </v-card-actions>

                <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>
                        <v-card-text>
                            Votre commande :
                            Menu Best of, Coca
                        </v-card-text>
                        <v-card-text>
                            Prix : 8 €
                        </v-card-text>
                    </div>
                </v-expand-transition>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TrackingView",
        data() {
            return {
                status: 3,
                show: false,
            }
        },
        methods: {
            getCommandInProgress() {

            }
        }
    }
</script>

<style scoped lang="scss">
.body{
    margin: 20px;
    min-height: 800px;
}
    .trackingView {
        vertical-align: center;
    }
</style>