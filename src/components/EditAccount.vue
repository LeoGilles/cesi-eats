<template>
    <div class="editAccount">
        <v-form v-model="valid" lazy-validation>
            <v-text-field v-model="Name" label="Nom" required>
            </v-text-field>

            <v-text-field v-model="Mail" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-select v-model="Roles" :items="items" 
            :rules="[v => !!v || 'Role is required']" label="Roles" required>
        </v-select>
        </v-form>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="EditUser">
            Save
        </v-btn>

    </div>

</template>

<script>
    import store from '../store'
    import axios from 'axios';
    import {
        ref
    } from 'vue'
    export default {
        name: "editAccount",
        data() {
            return {
                valid: true,
                editName: false,
                editMail: false,
                Name: ref(''),
                Mail: ref(''),
                Roles: ref(''),
                items: [
                    "Client", "Livreur", "Restaurateur"
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                edit: {
                    display: "none",
                }
            }
        },
        mounted() {
            let config = {
                method: 'get',
                url: 'http://localhost:10432/api/Users/' + store.state.userId,
                headers: {}
            };

            axios(config)
                .then((response) => {
                    this.Name = response.data[0]["UsersName"]

                    this.Mail = response.data[0]["UsersMail"]

                    if (response.data[0]["Roles"] == 2) {
                        this.Roles = "Livreur"
                    }
                    else if (response.data[0]["Roles"] == 3) {
                        this.Roles = "Restaurateur"
                    } else {
                        this.Roles = "Client"
                    }

                })
                .catch((error) => {
                    console.log(error);
                });
        
        },
        methods: {
            editing(edit) {
                if (edit === 'name') {
                    if (this.editName) {
                        console.log('editing name')
                        console.log(this.newName)
                    }
                    this.editName = !this.editName;
                } else if (edit === 'mail') {
                    if (this.editMail) {
                        console.log('editing mail')
                        console.log(this.newMail)
                    }
                    this.editMail = !this.editMail;
                } else
                    return;

            },
            EditUser() {
                let temp
                if (this.Roles == "Livreur") {
                    temp = 2
                }
                else if (this.Roles == "Restaurateur") {
                    temp = 3
                }else {
                    temp = 1
                }

                let data = JSON.stringify({
                    "UsersId": store.state.userId,
                    "UsersName": this.Name,
                    "UsersMail": this.Mail,
                    "Roles": temp
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
                        this.$router.push("/")
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }

    }
</script>

<style scoped lang="scss">
    .editAccount {
        padding: 5%;

        .editAccountInput {
            padding: .5cm;
            display: flex;
            justify-content: space-between;

            label {
                font-size: large;
                font-weight: bold;
            }

            input {
                border: 1px solid black;
                border-radius: 5px;
            }

            p {
                padding: 0 5px;
            }
        }
    }
</style>