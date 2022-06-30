<template>
    <div class="managementClient" v-if="role == 4">
        <v-card class="d-flex justify-start pa-2 mb-6 align-center outlined tile" v-for="User in Users" :key="User">
            <v-text-field v-model="User.UsersName" label="Nom" class="mr-6" style=" width: 150px;"></v-text-field>
            <v-text-field v-model="User.UsersMail" label="Mail" class="mr-6" style=" width: 250px;"></v-text-field>
            <v-text-field v-model="User.Roles" label="Role" class="mr-6" style=" width: 50px;"></v-text-field>
            <v-card-text class="mr-6">Date d'inscription : {{User.DateOfJoining}}</v-card-text>
            <v-btn color="success" class="mr-6"
                @click="SaveClient(User.UsersName,User.UsersMail,User.Roles,User.UsersId)">Save</v-btn>
            <v-btn class="mr-6" @click="suspendClient()">Suspendre</v-btn>
            <v-btn color="error" class="mr-10" @click="deleteClient(User.UsersId)">Supprimer</v-btn>
        </v-card>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from '../../store'
    export default {
        name: "ManagementClient",
        data() {
            return {
                Users: [{}],
                role: 0,
            }
        },
        methods: {
            deleteClient(UsersId) {
                let config = {
                    method: 'delete',
                    url: 'http://localhost:10432/api/Users/' + UsersId,
                    headers: {}
                };

                axios(config)
                    .then(() => {
                        this.$notify({
                            text: "Vous avez supprimer le client !",
                            type: 'success'
                        });
                        this.refresh()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            suspendClient() {
                this.$notify({
                    text: "Vous avez suspendu le client !",
                    type: 'warn'
                });
                console.log('suspend client account')
            },
            SaveClient(UsersName, UsersMail, Roles, UsersId) {
                let data = JSON.stringify({
                    "UsersId": UsersId,
                    "UsersName": UsersName,
                    "UsersMail": UsersMail,
                    "Roles": Roles,
                });
                let config = {
                    method: 'put',
                    url: 'http://localhost:10432/api/Users',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios(config)
                    .then(() => {
                        this.$notify({
                            text: "Vous avez edité le client !",
                            type: 'success'
                        });
                        this.refresh()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            refresh() {
                let config = {
                    method: 'get',
                    url: 'http://localhost:10432/api/Users',
                    headers: {},
                    withCredentials: true
                };

                axios(config)
                    .then((response) => {
                        this.Users = response.data
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        mounted() {
            
                let config2 = {
                method: 'get',
                url: 'http://localhost:10432/api/Users/' + store.state.userId,
                headers: {}
            };

            axios(config2)
                .then((response2) => {                   
                    store.commit('SetUserRole', response2.data[0]["Roles"])
                    this.role = store.state.userRole
                })
                .catch((error) => {
                    console.log(error);
                });
            this.refresh()
        },

    }
</script>

<style scoped lang="scss">
    .managementClient {
        border-top: 1px solid #4D90A0;
        padding: 20px 5%;
        display: flex;
        flex-direction: column;

    }

    @media (max-width: 899px) {
        .managementClientActions {
            display: flex;
            flex-direction: column;
            align-items: center;


        }

    }

    @media (min-width: 900px) {
        .managementClient {
            display: flex;
            justify-content: space-between;
            align-items: center;

        }
    }
</style>