<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                >
                    <v-icon class="text-success">mdi-account</v-icon>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-if="!$store.getters.getUserIsLoggedIn">
                    <v-list-item-icon>
                        <v-icon small>mdi-account-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Signup</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="!$store.getters.getUserIsLoggedIn" :to="{name: 'login'}">
                    <v-list-item-icon>
                        <v-icon small>mdi-login</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Login</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="$store.getters.getUserIsLoggedIn" :to="{name: 'profile'}">
                    <v-list-item-icon>
                        <v-icon small>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
                <v-list-item v-if="$store.getters.getUserIsLoggedIn" @click="logout">
                    <v-list-item-icon>
                        <v-icon small>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "UserNavbarMenu",
        methods: {
            async logout() {
                await this.$store.dispatch('logout');
            }
        }
    }
</script>

<style scoped>

</style>