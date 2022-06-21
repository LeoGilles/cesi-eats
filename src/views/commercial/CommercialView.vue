<template>
    <div class="commercialView">
        <h1>Service commercial</h1>

        <div class="commercialViewBtn">
            <button v-on:click="openMenuCommercial('gestionClient')">Gestion clients</button>
            <button v-on:click="openMenuCommercial('dashaboard')">Dashaboard</button>
        </div>
        <management-client :style="!clientButton ? buttonNav : null"/>
        <dashboard-command :style="!dashboardButton ? buttonNav : null"/>
    </div>


</template>

<script>
    import ManagementClient from "../../components/management/ManagementClient";
    import DashboardCommand from "../../components/management/DashboardCommand";

    export default {
        name: "CommercialView",
        components: {DashboardCommand, ManagementClient},
        data() {
            return {
                clientButton: true,
                dashboardButton: false,
                buttonNav: {
                    display: "none",
                }
            }
        },
        methods:{
            openMenuCommercial(btn){
                if (btn==='gestionClient'){
                    this.clientButton = true;
                    this.dashboardButton = false;
                }else if (btn==='dashaboard'){
                    this.clientButton = false;
                    this.dashboardButton = true;
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .commercialView {
        margin-top: 20px;
        .commercialViewBtn {
            button {
                border-radius: 20px;
                background: linear-gradient(145deg, #f9f9f9, #f0f0f0);
                box-shadow: 20px 20px 60px #bebebe,
                -20px -20px 60px #ffffff;
            }

            button:active {
                border-radius: 20px;
                background: #e0e0e0;
                box-shadow: inset 20px 20px 60px #bebebe,
                inset -20px -20px 60px #ffffff;
            }
        }
    }

    @media (max-width: 899px) {
        .commercialViewBtn {
            button {
                margin: 10px;
                padding: 20px;
            }
        }

    }

    @media (min-width: 900px) {
        .commercialView {
            .commercialViewBtn {

                button {
                    min-width: 200px;
                    margin: 40px;
                    padding: .5cm;
                }

                button:active {

                }
            }
        }
    }
</style>
