<template>
    <v-card style="min-width: 25vw">
        <v-card-title>Login form</v-card-title>
        <v-card-subtitle>Please enter your username and password.</v-card-subtitle>
        <v-card-text>
            <v-form>
                <v-text-field v-model="username" label="Username"></v-text-field>
                <v-text-field v-model="password" label="Password" type="password"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center py-5">
            <v-btn x-large :enable="formIsValid" class="success" @click="login">Send</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "LoginForm",
        data() {
            return {
                username: '',
                password: '',
                formIsValid: false,
                loading: false
            }
        },
        methods: {
            async login() {
                const username = this.username;
                const password = this.password;
                const credentials = {username: username, password: password};
                this.$store.dispatch('login', credentials)
            }
        }
    }
</script>

<style scoped>

</style>