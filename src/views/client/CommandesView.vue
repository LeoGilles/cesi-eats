<template>
    <h1>Historique des commandes</h1>
    <div >
        <CommandeComponent/>
    </div>
    
</template>

<script>
    import CommandeComponent from "../../components/CommandeComponent";

    export default {
        name: "CommandesView",
        components: {CommandeComponent}
    }
</script>

<style lang="scss" scoped>

</style>
