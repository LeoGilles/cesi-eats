<template>
    <div class="trackingView">
        <h1>Suivi de votre commande</h1>
        <div class="followedTrackingView">
<!--            <img alt="" src=""/>-->
<!--            <v-timeline>-->
<!--                <v-timeline-item>timeline item</v-timeline-item>-->
<!--                <v-timeline-item class="text-right">-->
<!--                    timeline item-->
<!--                </v-timeline-item>-->
<!--                <v-timeline-item>timeline item</v-timeline-item>-->
<!--            </v-timeline>-->

            <div class="trackingViewAdvancement" :style="status>=1 ? styleTrackBar:null"></div>
            <div class="trackingViewAdvancement" :style="status>=2 ? styleTrackBar:null"></div>
            <div class="trackingViewAdvancement" :style="status>=3 ? styleTrackBar:null"></div>
            <div class="trackingViewAdvancement" :style="status>=4 ? styleTrackBar:null"></div>

            <p class="trackingViewDesc"></p>
        </div>
        <div class="map">

        </div>
    </div>

</template>

<script>
    export default {
        name: "TrackingView",
        data(){
            return{
                status: 3,
                styleTrackBar: {
                    backgroundColor: '#4D90A0'
                }
            }
        },
        methods: {
            getCommandInProgress(){

            }
        }
    }
</script>

<style scoped lang="scss">
    .trackingView{
        padding: 2% 5%;

        .followedTrackingView{
            display: flex;
            justify-content: center;

            .trackingViewAdvancement{
                margin: 10px;
                width: 200px;
                height: 30px;
                border-radius: 5px;
                border: 1px solid #4D90A0;
            }
        }

    }
</style>
