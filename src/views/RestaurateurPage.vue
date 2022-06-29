.<template>
    <div class="d-flex justify-center mb-6 body">
        <v-card width="60%">
            <v-form v-model="valid" lazy-validation>
                <v-text-field v-model="RestoName" :counter="10" :rules="nameRules" label="Nom du Restaurant" required>
                </v-text-field>

                <v-text-field v-model="RestoDesc" label="Restaurant description"></v-text-field>

                <v-row no-gutters>
                    <v-dialog v-model="dialogArticle" persistent>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" @click="AddArticle()" v-bind="props">
                                Add Article
                            </v-btn>
                        </template>
                        <v-card class="ArticleCard">
                            <v-card-title>
                                <span class="text-h5">Article :</span>
                            </v-card-title>
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
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" text @click="CloseDialog">
                                    Close
                                </v-btn>

                                <v-btn color="blue-darken-1" variant="outlined" text @click="SaveArticle">
                                    Save
                                </v-btn>

                                <v-btn variant="outlined" v-if="this.ArticleId != ''" text @click="DeleteArticle()">
                                    Delete
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>

                <h1>Mes Plats</h1>
                <v-row no-gutters class="d-flex flex-wrap" style="width: auto">
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
                                <v-btn color="orange-lighten-2"
                                    @click="EditArticle(article._id,article.Nom,article.Description,article.Prix)"
                                    variant="text">
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
                    <v-dialog v-model="dialogMenu" persistent>
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" @click="AddMenu()" v-bind="props">
                                Add Menu
                            </v-btn>
                        </template>
                        <v-card class="ArticleCard">
                            <v-card-title>
                                <span class="text-h5">Menu :</span>
                            </v-card-title>
                            <v-text-field v-model="MenuName" :counter="20" :rules="nameRules" label="Nom du Menu"
                                required>
                            </v-text-field>
                            <v-text-field v-model="MenuDesc" label="Description/Contenu du Menu">
                            </v-text-field>
                            <v-text-field v-model="MenuPrice" :rules="PriceRules" label="Prix du Menu €" required>
                            </v-text-field>

                            <v-combobox  v-model="MenuArticle"  item-title="Nom" item-value="_id" :items="MyArticle" label="Select the articles" multiple chips></v-combobox>

                             <v-spacer></v-spacer>
                            <v-card-actions class="centerBtn">
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" text @click="CloseDialog2">
                                    Close
                                </v-btn>

                                <v-btn color="blue-darken-1" variant="outlined" text @click="SaveMenu">
                                    Save
                                </v-btn>

                                <v-btn variant="outlined" v-if="this.MenuId != ''" text @click="DeleteMenu()">
                                    Delete
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>

                <h1>Mes Menus</h1>

                <v-row no-gutters class="d-flex flex-wrap" style="width: auto">
                    <v-col class="colCard" :key="menu" v-for="menu in MyMenu">
                        <v-card class="mx-auto" max-width="300px" height="250px">
                            <v-img :src="menu.Img" height="100px" cover></v-img>

                            <v-card-title>
                                {{menu.Nom}}
                            </v-card-title>

                            <v-card-subtitle>
                                {{menu.Description}}
                            </v-card-subtitle>

                            <v-card-actions>
                                <v-btn color="orange-lighten-2" @click="EditMenu(menu._id,menu.Nom,menu.Description,menu.Prix,menu.Article)" variant="text">
                                    Edit Menu
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-card-text>
                                    {{menu.Prix}} €
                                </v-card-text>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>

                <v-row no-gutters>
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="SubmitSave">
                        Save
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
            RestoName: ref(''),
            ArticleName: ref(''),
            ArticleImg: ref(''),
            ArticlePrice: ref(0),
            ArticleDesc: ref(''),
            MenuName: ref(''),
            MenuPrice: ref(0),
            MenuDesc: ref(''),
            MenuArticle: ref([]),
            RestoImg: '',
            ArticleId: ref(''),
            MenuId: ref(''),
            token: ref(''),
            select: [],
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters',
            ],
            PriceRules: [
                v => !!v || 'Price is required',
                v => /\d+(?:[.,]\d{0,2})?/.test(v) || 'Price must be valid',
            ],
            PhotoFileName: '',
            dialogArticle: false,
            dialogMenu: false,
            MyArticle: ref([{}]),
            MyMenu: ref([{}]),
            MyResto: ref([{}]),
            RestoDesc: ref('')
        }),
        computed() {
            this.RestoName = store.state.MyResto.Nom
            this.RestoDesc = store.state.MyResto.Description
            this.MyArticle = store.state.MyResto.Article
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

            this.refreshResto()
            this.refreshArticle()
            this.refreshMenu()
        },
        methods: {
            SaveArticle() {
                let config3 = {
                    method: 'get',
                    url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                    headers: {}
                };
                axios(config3)
                    .then((response3) => {
                        if (this.ArticleId == '') {
                            const data = JSON.stringify({
                                "Nom": this.ArticleName,
                                "Img": this.ArticleImg,
                                "Prix": this.ArticlePrice,
                                "Description": this.ArticleDesc
                            });

                            var config1 = {
                                method: 'post',
                                url: 'http://localhost:3000/api/Article/' + response3.data["_id"],
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data,
                            };

                            axios(config1)
                                .then(() => {
                                    this.refreshArticle()
                                    this.dialog = false
                                    this.ArticleId = ''

                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                        } else {

                            const data2 = JSON.stringify({
                                "_id": this.ArticleId,
                                "Nom": this.ArticleName,
                                "Img": this.ArticleImg,
                                "Prix": this.ArticlePrice,
                                "Description": this.ArticleDesc
                            });

                            var config2 = {
                                method: 'put',
                                url: 'http://localhost:3000/api/Article/' + response3.data["_id"],
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data2,
                            };

                            axios(config2)
                                .then(() => {
                                    this.refreshArticle()
                                    this.dialog = false
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }
                    }).catch((error) => {
                        console.log(error);
                    });

            },
            SaveMenu(){
                let config3 = {
                    method: 'get',
                    url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                    headers: {}
                };
                axios(config3)
                    .then((response3) => {
                        if (this.MenuId == '') {
                            const data = JSON.stringify({
                                "Nom": this.MenuName,
                                "Img": this.MenuImg,
                                "Prix": this.MenuPrice,
                                "Description": this.MenuDesc,
                                "Article": this.MenuArticle
                            });

                            var config1 = {
                                method: 'post',
                                url: 'http://localhost:3000/api/Menu/' + response3.data["_id"],
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data,
                            };

                            axios(config1)
                                .then(() => {
                                    this.refreshMenu()
                                    this.dialogMenu = false
                                    this.MenuId = ''

                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                        } else {

                            const data2 = JSON.stringify({
                                "_id": this.MenuId,
                                "Nom": this.MenuName,
                                "Img": this.MenuImg,
                                "Prix": this.MenuPrice,
                                "Description": this.MenuDesc,
                                "Article": this.MenuArticle
                            });

                            var config2 = {
                                method: 'put',
                                url: 'http://localhost:3000/api/Menu/' + response3.data["_id"],
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: data2,
                            };

                            axios(config2)
                                .then(() => {
                                    this.refreshMenu()
                                    this.dialogMenu = false
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                        }
                    }).catch((error) => {
                        console.log(error);
                    });

            },
            EditArticle(_id, Nom, Description, Prix) {

                this.ArticleId = _id
                this.ArticleName = Nom
                this.ArticleDesc = Description
                this.ArticlePrice = Prix

                this.dialogArticle = true

            },
            EditMenu(_id, Nom, Description, Prix,Articles){
                this.MenuId = _id
                this.MenuName = Nom
                this.MenuDesc = Description
                this.MenuPrice = Prix
                this.MenuArticle = Articles

                this.dialogMenu = true
            },
            CloseDialog() {
                this.dialogArticle = false
                this.ArticleId = ''
                this.ArticleName = ''
                this.ArticleDesc = ''
                this.ArticlePrice = 0
            },
            CloseDialog2() {
                this.MenuId = ''
                this.MenuName = ''
                this.MenuDesc = ''
                this.MenuPrice = 0
                this.MenuArticle = null
                this.MenuArticle = []
                this.dialogMenu = false
            },

            AddArticle() {
                this.ArticleId = ''
                this.ArticleName = ''
                this.ArticleDesc = ''
                this.ArticlePrice = 0

                this.dialogArticle = true
            },
            AddMenu(){
                this.MenuId = ''
                this.MenuName = ''
                this.MenuDesc = ''
                this.MenuPrice = 0
                this.MenuArticle = null
                this.MenuArticle = []
                this.dialogMenu = true
            },
            DeleteArticle() {
                let config = {
                    method: 'get',
                    url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                    headers: {}
                };
                axios(config)
                    .then((response) => {
                        const data = JSON.stringify({
                            "_id": this.ArticleId,
                        });

                        var config2 = {
                            method: 'delete',
                            url: 'http://localhost:3000/api/Article/' + response.data["_id"],
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data,
                        };

                        axios(config2)
                            .then(() => {
                                this.refreshArticle()
                                this.dialogArticle = false
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    }).catch((error) => {
                        console.log(error);
                    });

            },
            DeleteMenu(){
                 let config = {
                    method: 'get',
                    url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                    headers: {}
                };
                axios(config)
                    .then((response) => {
                        const data = JSON.stringify({
                            "_id": this.MenuId,
                        });

                        var config2 = {
                            method: 'delete',
                            url: 'http://localhost:3000/api/Menu/' + response.data["_id"],
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: data,
                        };

                        axios(config2)
                            .then(() => {
                                this.refreshMenu()
                                this.dialogMenu = false
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    }).catch((error) => {
                        console.log(error);
                    });
            },
            reset1() {
                this.$refs.form.reset()
            },
            SubmitSave() {
                if (store.state.userId != 0) {
                    let config = {
                        method: 'get',
                        url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                        headers: {}
                    };

                    axios(config)
                        .then((response) => {

                            if (response.data == null) {
                                let data2 = JSON.stringify({
                                    RestaurantId: store.state.userId
                                });


                                let config2 = {
                                    method: 'post',
                                    url: 'http://localhost:3000/api/Restaurant/',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: data2
                                };
                                axios(config2)
                                    .then(() => {
                                        let data3 = JSON.stringify({
                                            "Nom": this.RestoName,
                                            "Description": this.RestoDesc
                                        });
                                        let config3 = {
                                            method: 'put',
                                            url: 'http://localhost:3000/api/Restaurant/' + store.state
                                                .userId,
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            data: data3
                                        };
                                        axios(config3)
                                            .then(() => {
                                                this.refreshResto()
                                                this.$router.push("/")
                                            }).catch((error) => {
                                                console.log(error);
                                            });
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                            } else {
                                let data4 = JSON.stringify({
                                    "Nom": this.RestoName,
                                    "Description": this.RestoDesc
                                });
                                let config4 = {
                                    method: 'put',
                                    url: 'http://localhost:3000/api/Restaurant/' + store.state.userId,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: data4
                                };
                                axios(config4)
                                    .then(() => {
                                        this.refreshResto()
                                        this.$router.push("/")
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                            }

                        }).catch((error) => {
                            console.log(error);
                        });
                }
            },
            refreshResto() {
                if (store.state.userId != 0) {
                    let config = {
                        method: 'get',
                        url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                        headers: {}
                    };
                    axios(config)
                        .then((response) => {
                            store.state.MyResto.Nom = response.data["Nom"];
                            store.state.MyResto.Description = response.data["Description"]
                            this.RestoName = store.state.MyResto.Nom
                            this.RestoDesc = store.state.MyResto.Description
                        }).catch((error) => {
                            console.log(error);
                        });
                }
            },
            refreshMenu(){
                 if (store.state.userId != 0) {

                    let config = {
                        method: 'get',
                        url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                        headers: {}
                    };
                    axios(config)
                        .then((response) => {
                            let config2 = {
                                method: 'get',
                                url: 'http://localhost:3000/api/Menu/' + response.data["_id"],
                            };
                            axios(config2)
                                .then((response2) => {
                                    store.state.MyResto.Menu = response2.data;
                                    this.MyMenu = response2.data
                                }).catch((error) => {
                                    console.log(error);
                                });
                        }).catch((error) => {
                            console.log(error);
                        });


                }
            },
            refreshArticle() {
                if (store.state.userId != 0) {

                    let config = {
                        method: 'get',
                        url: 'http://localhost:3000/api/RestaurantObj/' + store.state.userId,
                        headers: {}
                    };
                    axios(config)
                        .then((response) => {
                            let config2 = {
                                method: 'get',
                                url: 'http://localhost:3000/api/Article/' + response.data["_id"],
                            };
                            axios(config2)
                                .then((response2) => {
                                    store.state.MyResto.Article = response2.data;
                                    this.MyArticle = response2.data
                                }).catch((error) => {
                                    console.log(error);
                                });
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

    .colCard {
        margin: 10px;
    }
</style>