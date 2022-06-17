<template>
    <div class="trackingView">
        <h1>Suivi de votre commande</h1>
        <div class="followedTrackingView">
            <img alt="" src=""/>
            <v-timeline>
                <v-timeline-item>timeline item</v-timeline-item>
                <v-timeline-item class="text-right">
                    timeline item
                </v-timeline-item>
                <v-timeline-item>timeline item</v-timeline-item>
            </v-timeline>
        </div>
        <div class="map">

        </div>
    </div>

</template>

<script>
    export default {
        name: "TrackingView"
    }
</script>

<style scoped lang="scss">
    .trackingView{
        padding: 2% 5%;

    }
</style>
