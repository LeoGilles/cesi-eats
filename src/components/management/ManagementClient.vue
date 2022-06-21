<template>
    <div class="managementClient">
        <div class="managementClientInfo">
            <p class="managementClientUsername">username</p>
            <p class="managementClientMail">mail@example.com</p>
        </div>
        <p class="role">role : 1</p>
        <p class="managementClientDateJoin">17/4/1974</p>
        <div class="managementClientActions">
            <button class="managementClientSuspend" @click="suspendClient()">Suspendre</button>
            <button class="managementClientDelete" @click="deleteClient()">Supprimer</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ManagementClient",
        data(){
            return{
            }
        },
        methods: {
            deleteClient(){
                console.log('delete client account')
            },
            suspendClient() {
                console.log('suspend client account')
            }
        }
    }
</script>

<style scoped lang="scss">
    .managementClient{
        border-top: 1px solid #4D90A0;
        padding: 20px 5%;


        .managementClientActions{
            display: flex;

            button{
                border-radius: 20px;
                background: linear-gradient(145deg, #f9f9f9, #f0f0f0);
                box-shadow: 20px 20px 60px #bebebe,
                -20px -20px 60px #ffffff;
            }
            button:active{
                border-radius: 20px;
                background: #e0e0e0;
                box-shadow: inset 20px 20px 60px #bebebe,
                inset -20px -20px 60px #ffffff;
            }
        }
    }

    @media (max-width: 899px) {
        .managementClientActions{
            display: flex;
            flex-direction: column;
            align-items: center;
            button{
                margin: 30px 10px 10px 10px;
                padding: 20px;
            }
        }

    }

    @media (min-width: 900px) {
        .managementClient{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .managementClientActions{

                button{
                    min-width: 200px;
                    margin: 0 40px;
                    padding: .5cm;
                }
                button:active{

                }
            }
        }
    }
</style>
