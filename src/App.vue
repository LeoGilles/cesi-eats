<template>
  <nav>
    <router-link to="/">Cesi Eats</router-link>

    <input placeholder="Restaurant, type, ..." type="text">
    <input placeholder="Adresse" type="text">
    <div v-if="this.token == '' || this.token == null ">
      <v-btn @click="RedirectLogIn" color="primary" dark>
        Log In
      </v-btn>
    </div>
    <div v-else class="dropdown">
      <div>my account</div>
      <div class="dropdown-link">
        <router-link to="/account">Mon compte</router-link>
        <router-link to="/orders">Commandes</router-link>
        <v-btn @click="LogOut">Déconnexion</v-btn>
      </div>
    </div>

    <router-link to="/RestaurateurPage">Resto</router-link>
    <router-link to="/cart">Panier</router-link>
    <router-link to="/suivi">suivicmd</router-link>
  </nav>
  <router-view @message="setMessage" />
  <div>
    <FooterComponent />
  </div>
</template>

<style>
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

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-link {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    padding: 12px 16px;
    z-index: 1;
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
      FooterComponent
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
            })
            .catch((error) => {
              console.log(error);
            });
        }

      }
    }

  }
</script>