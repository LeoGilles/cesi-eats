<template>
    <div class="dashboardCommand">
        <div class="item-a tile">test</div>
        <div class="item-b tile">test</div>
        <div class="item-c tile">test</div>
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
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: [row1-start] 50px [row1-end] 100px [third-line] auto [last-line];
        grid-template-areas: "header header header . main ." "sidebar sidebar sidebar other other other";
        column-gap: 10px;
        row-gap: 15px;

        .tile {
            border-radius: 10px;
            box-shadow: 5px 5px 10px #d9d9d9,
            -5px -5px 10px #ffffff;
        }
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
</style>
