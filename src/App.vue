<template>
  <nav>
    <router-link to="/">Cesi Eats</router-link>

    <input placeholder="Restaurant, type, ..." type="text">
    <input placeholder="Adresse" type="text">
    <div v-if="this.token == '' ">
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
    computed(){
      this.token = store.state.token
    },
    methods: {
      LogOut() {
        store.commit('deltoken')
        this.token = ref('')
      },
            RedirectLogIn() {
        this.$router.push("/loginUser")
      },
      setMessage(msg) {
        this.token = ref(msg);
      }
    }

  }
</script>