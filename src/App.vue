<template>
  <nav>
    <router-link to="/">Cesi Eats</router-link>

    <input placeholder="Restaurant, type, ..." type="text">
    <input placeholder="Adresse" type="text">
    <router-link v-if="token == null" to="/loginUser">Connexion</router-link>
    <div v-else class="dropdown">
      <div>UserName</div>
      <div class="dropdown-link">
        <router-link to="/account">Mon compte</router-link>
        <router-link to="/orders">Commandes</router-link>
        <router-link to="/orders">Déconnexion</router-link>
      </div>
    </div>

    <router-link to="/cart">Panier</router-link>
    <router-link to="/suivi">suivicmd</router-link>
  </nav>
  <router-view />
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

  export default {
    components: {
      FooterComponent
    },

  }
</script>
