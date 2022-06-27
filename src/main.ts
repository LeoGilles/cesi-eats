import { createApp  } from 'vue'
import App from './App.vue'
import router from './router'
//import store from './store'
import vuetify from './plugins/vuetify'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDeleteLeft,faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faDeleteLeft)
library.add(faPlus)

const store = require('./store')

const app = createApp(App).use(store).use(store).use(router).use(vuetify)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
