.<template>
    <div>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" class="text-none" stacked>
                    <v-badge :content="NotifCount" color="error">
                        <v-icon>mdi-bell-outline</v-icon>
                    </v-badge>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="notification in NotificationsList" :key="notification">
                    <v-list-item-title>{{ notification.Message }}</v-list-item-title>
                    <v-btn class="text-none" stacked>
                        <v-icon icon="fas fa-solid fa-x" />
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-btn class="text-none" stacked>
            <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import store from '../store'
    import axios from 'axios';
    import '@fortawesome/fontawesome-free/css/all.css'
    import {
        ref
    } from 'vue'
    export default {
        name: 'Notifications',
         icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    }},
        data: () => ({
            NotifCount: ref(0),
            NotificationsList: ref([{}]),
        }),
        computed(){

        },
        mounted(){
            
        }
    }
</script>

<style>

</style>