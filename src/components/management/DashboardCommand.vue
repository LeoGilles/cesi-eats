<template>
    <div class="dashboardCommand">
        <tile-management class="item-a"/>
        <tile-management class="item-b"/>
        <tile-management class="item-c"/>
        <tile-management class="item-d"/>
    </div>

</template>

<script>
    import TileManagement from "./TileManagement";

    export default {
        name: "DashboardCommand",
        components: {TileManagement},
    }
</script>

<style scoped lang="scss">
    .dashboardCommand {
        display: grid;

        column-gap: 10px;
        row-gap: 15px;

    }

    .item-a {
        grid-area: header;
    }

    .item-b {
        grid-area: main;
    }

    .item-c {
        grid-area: sidebar;
    }

    .item-d {
        grid-area: other;
    }

    @media (max-width: 899px) {
        .dashboardCommand {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: [row1-start] 50px [row1-end] 100px [third-line] auto [last-line];
            grid-template-areas: "header header header . main ." "sidebar sidebar sidebar other other other";
        }

    }

    @media (min-width: 900px) {
        .dashboardCommand {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: [row1-start] 100px [row1-end] 100px [third-line] auto [last-line];
            grid-template-areas:
                    "header header . . main ."
                    "header header sidebar other other other";
        }
    }
</style>
