.<template>
    <div class="mainBody">
        <v-menu v-if="NotifCount != 0" open-on-hover>
            <template v-slot:activator="{ props }">
                <div v-bind="props" class="text-none x-small" stacked>
                    <v-badge :content="NotifCount" color="error">
                        <v-icon>mdi-bell-outline</v-icon>
                    </v-badge>
                </div>
            </template>
            <v-list>
                <v-list-item v-for="notification in NotificationsList" :key="notification">
                    <v-list-item-title>{{ notification.Message }}</v-list-item-title>
                    <v-spacer></v-spacer>
                    <button class="marginIcon" @click="delNotifications(notification._id)" stacked>
                        <font-awesome-icon icon="fa-delete-left" style="color:darkred;" />
                    </button>
                </v-list-item>
            </v-list>
        </v-menu>

        <button class="text-none iconSize" @click="refreshData" v-else stacked>
            <v-icon class="iconSize" >mdi-bell-outline</v-icon>
        </button>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from '../store'
    import {
        ref
    } from 'vue'
    export default {
        name: 'UserNotifications',

        data: () => ({
            NotifCount: ref(0),
            NotificationsList: ref([{}]),

        }),
        computed() {
            this.NotifCount = this.NotificationsList.length

        },
        created(){
            this.refreshData()
        },
        methods: {
            delNotifications(id) {


                let data = JSON.stringify({
                    "_id": id
                });

                let config = {
                    method: 'delete',
                    url: 'http://localhost:3040/api/notifications/',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };

                axios(config)
                    .then(() => {
                        this.refreshData()
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            refreshData() {

                axios.get('http://localhost:3040/api/notifications/' + store.state.userId)
                    .then((response) => {
                        this.NotificationsList = response.data
                        this.NotifCount = this.NotificationsList.length
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

        }
    }
</script>

<style>
    .iconSize {
        height: 10px;
        width: 10px;
    }

    .marginIcon {
        margin-left: 10px;
    }
</style>
