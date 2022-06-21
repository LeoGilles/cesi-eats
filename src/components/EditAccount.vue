<template>
    <div class="editAccount">
        <div class="editAccountInput">
            <label for="name">Nom : </label>
            <p :style="editName ? edit : null"> nom du gars </p>
            <input v-model="newName" type="text" id="name" name="name" :style="!editName ? edit : null">
            <p class="closeMap" @click="editing('name')"> {{editName ? 'Enregistrer' : 'Editer'}} </p>
        </div>

        <div class="editAccountInput">
            <label for="mail">Adresse mail :</label>
            <p :style="editMail ? edit : null"> email du gars </p>
            <input v-model="newMail" type="email" id="mail" name="mail" :style="!editMail ? edit : null">
            <p class="closeMap" @click="editing('mail')"> {{editMail ? 'Enregistrer' : 'Editer'}} </p>
        </div>


    </div>

</template>

<script>
    export default {
        name: "editAccount",
        data() {
            return {
                editName: false,
                editMail: false,
                newName: '',
                newMail: '',
                edit: {
                    display: "none",
                }
            }
        },

        methods: {
            editing(edit) {
                if (edit === 'name') {
                    if (this.editName) {
                        console.log('editing name')
                        console.log(this.newName)
                    }
                    this.editName = !this.editName;
                } else if (edit === 'mail') {
                    if (this.editMail) {
                        console.log('editing mail')
                        console.log(this.newMail)
                    }
                    this.editMail = !this.editMail;
                } else
                    return;

            },
        }

    }
</script>

<style scoped lang="scss">

    .editAccount {
        padding: 5%;
        .editAccountInput {
            padding: .5cm;
            display: flex;
            justify-content: space-between;

            label {
                font-size: large;
                font-weight: bold;
            }

            input {
                border: 1px solid black;
                border-radius: 5px;
            }

            p {
                padding: 0 5px;
            }
        }
    }

</style>
