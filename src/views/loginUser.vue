.<template>
    <div class="d-flex justify-center mb-6 body">
        <v-card v-if="form1State" width="60%">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-model="UsersName" :counter="10" :rules="nameRules" label="Name" required>
                </v-text-field>

                <v-text-field v-model="UsersMail" :rules="emailRules" label="E-mail" required></v-text-field>

                <v-text-field v-model="UsersPassword" type="password" label="Password" required></v-text-field>

                <v-select v-model="Roles" :items="items" item-value="id" item-text="name"
                    :rules="[v => !!v || 'Role is required']" label="Roles" required>
                </v-select>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="SubmitCreate">
                    Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset1">
                    Cancel
                </v-btn>
                <v-btn variant="plain" class="mr-1" @click="Switch">
                    Log In
                </v-btn>
            </v-form>
        </v-card>
        <v-card v-if="form2State" width="60%">
            <v-form ref="form2" v-model="valid" lazy-validation>

                <v-text-field v-model="UsersMail" :rules="emailRules" label="E-mail" required></v-text-field>

                <v-text-field v-model="UsersPassword" type="password" label="Password" required></v-text-field>

                <v-btn :disabled="!valid" color="success" class="mr-4" @click="LoginUser">
                    Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="reset2">
                    Cancel
                </v-btn>
                <v-btn variant="plain" class="mr-1" @click="Switch">
                    Don't have an account ?
                </v-btn>
            </v-form>
        </v-card>

        <v-snackbar v-model="snackbar">
            {{ textSnack }}

            <template v-slot:action="{ attrs }">
                <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import axios from 'axios';
    import {
        useCookies
    } from "vue3-cookies";
    export default {
        name: 'LoginUser',
        data: () => ({
            valid: true,
            form1State: false,
            form2State: true,
            UsersName: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            UsersMail: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            UsersPassword: '',
            DateOfJoining: '',
            PhotoFileName: '',
            Roles: null,
            snackbar: false,
            textSnack: '',
            items: [
                "Client", "Livreur", "Restaurateur"
            ],
        }),
        setup() {
            const {
                cookies
            } = useCookies();
            return {
                cookies
            };
        },
        methods: {
            reset1() {
                this.$refs.form.reset()
            },
            reset2() {
                this.$refs.form2.reset()
            },
            Switch() {
                this.form1State = !this.form1State
                this.form2State = !this.form2State
            },
            SubmitCreate() {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                this.DateOfJoining = date;
                this.PhotoFileName = "blank.png";
                var number = 1;
                if (this.Roles == 2) {
                    number = 2;
                }
                if (this.Roles == 3) {
                    number = 3;
                }

                const data = JSON.stringify({
                    UsersName: this.UsersName,
                    UsersPassword: this.UsersPassword,
                    UsersMail: this.UsersMail,
                    Roles: number,
                    DateOfJoining: this.DateOfJoining,
                    PhotoFileName: this.PhotoFileName
                })

                var config = {
                    method: 'post',
                    url: 'http://localhost:5000/api/Users',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data
                };
                axios(config)
                    .then(function () {
                        this.textSnack = "Successfully added User"
                        this.snackbar = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            LoginUser() {

                const data = JSON.stringify({
                    "UsersMail": this.UsersMail,
                    "UsersPassword": this.UsersPassword
                });

                var config = {
                    method: 'post',
                    url: 'http://localhost:5000/api/Login',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data,

                };

                axios(config)
                    .then(response => {
                        console.log(response.data['token']);
                        this.cookies.set("Token", response.data['token']);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }

        }
    }
</script>

<style lang="scss">
    .body {
        margin: 20px;
        padding: 50px;

    }
</style>