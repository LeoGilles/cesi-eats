import { createApp  } from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDeleteLeft,faPlus, faHamburger } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Notifications from '@kyvg/vue3-notification'

library.add(faDeleteLeft)
library.add(faPlus)
library.add(faHamburger)

const store = require('./store')

const app = createApp(App).use(store).use(store).use(router).use(vuetify).use(Notifications)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
