<template>
    <div class="tileManagement">
        <p class="">{{stat}}</p>
        <h3>{{title}}</h3>
    </div>
</template>

<script>
    export default {
        name: "TileManagement",
        props: ['stat', 'title']
    }
</script>

<style scoped lang="scss">
    .tileManagement{
        border-radius: 10px;
        box-shadow:  5px 5px 10px #d9d9d9,
        -5px -5px 10px #ffffff;
    }
</style>
