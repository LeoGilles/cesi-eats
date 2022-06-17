import { createApp  } from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import vuetify from './plugins/vuetify'

const {store } = require('./store')

const app = createApp(App).use(store).use(router).use(vuetify)


app.mount('#app')
