<template>
  <nav>
    <router-link to="/">Cesi Eats</router-link>

    <input placeholder="Restaurant, type, ..." type="text">
    <input placeholder="Adresse" type="text">
    <div>
      <div v-if="this.token == '' || this.token == null ">
        <v-btn @click="RedirectLogIn" color="#4D90A0" dark>
           <span class="text-white">Log In</span>
        </v-btn>
      </div>
      <div v-else class="flexHori">
        <div class="dropdown">
          <v-btn variant="outlined">My account</v-btn>
          <div class="dropdown-link">
            <router-link class="routerMargin" to="/account">
              <v-btn>Mon compte</v-btn>
            </router-link>
            <router-link class="routerMargin" to="/orders">
              <v-btn>Commandes</v-btn>
            </router-link>
            <v-btn class="routerMargin" @click="LogOut">Déconnexion</v-btn>
          </div>
        </div>
        <UserNotifications />
      </div>
    </div>

    <router-link to="/cart">Panier</router-link>
    <router-link to="/suivi">Suivre vos commandes</router-link>
    <router-link to="/LivraisonPage">Livreur</router-link>
  </nav>
  <router-view @message="setMessage" />
  <div>
    <FooterComponent />
  </div>
  <notifications />
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    box-shadow: 0px 10px 10px -3px grey;
  }


.flexHori{
  display: flex;
  flex-direction: row;
  align-items: center;
}

  .dropdown {
    position: relative;
    display: inline-block;
    margin-right: 20px;
  }

  .routerMargin {
    margin: 5px;
  }

  .dropdown-link {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
    border-radius: 10%;
  }

  .dropdown:hover .dropdown-link {
    display: flex;
    flex-direction: column;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
<script>
  import FooterComponent from "@/components/FooterComponent";
  import UserNotifications from "@/components/UserNotifications"
  import {
    useCookies
  } from "vue3-cookies";
  import store from './store'
  import axios from 'axios';
  import {
    ref
  } from 'vue'
  export default {
    components: {
      FooterComponent,
      UserNotifications
    },
    setup() {
      const {
        cookies
      } = useCookies();
      return {
        cookies
      };
    },
    data: () => ({
      token: ref(''),
    }),
    computed() {
      this.token = store.state.token
    },
    mounted() {
      if (this.cookies.isKey("Token") != null) {
        store.state.token = this.cookies.get("Token")
        this.token = store.state.token
        this.DecodeToken()
      }
    },
    methods: {
      LogOut() {
        store.commit('deltoken')
        this.token = ref('')
        this.$router.push("/")
        this.cookies.remove("Token")
      },
      RedirectLogIn() {
        this.$router.push("/loginUser")
      },
      setMessage(msg) {
        this.token = ref(msg);
      },
      DecodeToken() {
        if (this.cookies.isKey("Token")) {

          // store.state.token = this.cookies.get("Token")
          // this.setMessage(store.state.token)

          let data = JSON.stringify({
            "token": this.cookies.get("Token")
          });

          let config = {
            method: 'post',
            url: 'http://localhost:10432/api/Login/JWT',
            headers: {
              'Content-Type': 'application/json',
            },
            data: data
          };

          axios(config)
            .then((response) => {
              store.commit("addUserId", response.data["UsersId"])
               let config2 = {
                method: 'get',
                url: 'http://localhost:10432/api/Users/' + response.data["UsersId"],
                headers: {}
            };

            axios(config2)
                .then((response2) => {                   
                    store.commit('SetUserRole', response2.data[0]["Roles"])
                })
                .catch((error) => {
                    console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        }

      }
    }

  }
</script>
