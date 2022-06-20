.<template>
    <div class="d-flex justify-center mb-6 body">
        <v-card width="60%">
            <v-form v-model="valid" lazy-validation>
                <v-text-field v-model="RestoName" :counter="10" :rules="nameRules" label="Nom du Restaurant" required>
                </v-text-field>

                <v-text-field v-model="RestoDesc" label="Restaurant description"></v-text-field>

                <v-row no-gutters>
                    <v-dialog v-model="dialog" persistent>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" v-bind="props">
                                Add Article
                            </v-btn>
                        </template>
                        <v-card class="ArticleCard">
                            <v-text-field v-model="ArticleName" :counter="20" :rules="nameRules"
                                label="Nom de l'article" required>
                            </v-text-field>
                            <v-text-field v-model="ArticleDesc" label="Description de l'article">
                            </v-text-field>
                            <v-text-field v-model="ArticlePrice" :rules="PriceRules" label="Prix de l'article €"
                                required>
                            </v-text-field>

                            <v-file-input show-size label="File input (Max 1MB)" v-model="ArticleImg"></v-file-input>
                            <v-spacer></v-spacer>
                            <v-card-actions class="centerBtn">
                                <v-btn color="blue-darken-1" text @click="dialog = false">
                                    Close
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="outlined" text @click="SaveArticle">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>

                <v-row no-gutters class="overflow-x-auto" style="width: auto">
                    <v-col class="colCard" :key="article" v-for="article in MyArticle">
                        <v-card class="mx-auto" max-width="300px" height="250px">
                            <v-img :src="article.Img" height="100px" cover></v-img>

                            <v-card-title>
                                {{article.Nom}}
                            </v-card-title>

                            <v-card-subtitle>
                                {{article.Description}}
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn color="orange-lighten-2" variant="text">
                                    Edit Article
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-card-text>
                                    {{article.Prix}} €
                                </v-card-text>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                </v-row>

                <v-row no-gutters>
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="SubmitSave">
                        Save
                    </v-btn>
                    <v-btn color="error" class="mr-4" @click="reset1">
                        Cancel
                    </v-btn>
                </v-row>
            </v-form>
        </v-card>
    </div>
</template>

<script>
    import store from '../store'
    import axios from 'axios';
    import {
        ref
    } from 'vue'
    import {
        useCookies
    } from "vue3-cookies";
    export default {
        name: 'RestaurateurPage',

        data: () => ({
            valid: true,
            RestoName: '',
            ArticleName: '',
            ArticleImg: '',
            ArticlePrice: 0,
            ArticleDesc: '',
            RestoImg: '',
            token: ref(''),
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters',
            ],
            PriceRules: [
                v => !!v || 'Price is required',
                v => /\d+(?:[.,]\d{0,2})?/.test(v) || 'Price must be valid',
            ],
            PhotoFileName: '',
            dialog: false,
            MyResto: ref({}),
            MyArticle: ref([{}]),
            RestoDesc: ''
        }),
        computed() {
            this.MyResto = store.state.MyResto
            this.MyArticle = store.state.MyResto.Article
            console.log(this.MyArticle)
            this.MyMenu = store.state.MyResto.Menu
        },
        setup() {
            const {
                cookies
            } = useCookies();
            return {
                cookies
            };
        },
        mounted() {
           this.refreshArticle()
        },
        methods: {
            SaveArticle() {

                const data = JSON.stringify({
                    "Nom": this.ArticleName,
                    "Img": this.ArticleImg,
                    "Prix": this.ArticlePrice,
                    "Description": this.ArticleDesc
                });

                var config = {
                    method: 'post',
                    url: 'http://localhost:3000/api/Article/' + store.state.userId,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data,
                };

                axios(config)
                    .then(() => {
                        this.refreshArticle()
                        this.dialog = false
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            reset1() {
                this.$refs.form.reset()
            },
            SubmitSave() {

            },
            refreshArticle(){
                 if (store.state.userId != 0) {
                let config = {
                    method: 'get',
                    url: 'http://localhost:3000/api/Article/' + store.state.userId,
                };
                axios(config)
                    .then((response) => {
                        store.state.MyResto.Article = response.data;
                        this.MyArticle = response.data
                    }).catch((error) => {
                        console.log(error);
                    });
            }
            }
            

        }

    }
</script>

<style lang="scss">
    .body {
        margin: 20px;
        padding: 50px;

    }

    .ArticleCard {
        width: 600px;
        padding: 10px;
    }

    .centerBtn {
        width: 50px;
        align-content: center;

        v-btn {
            align-self: right;
        }
    }
    .colCard{
        margin: 10px;
    }
</style>