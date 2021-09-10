<template>
    <v-container fluid class="ma-0 pa-0 fill-height">
        <v-app-bar app clipped-left dense>
            <v-app-bar-nav-icon @click="$store.commit('toggleSidebar')"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <router-link to="/">Palaces of Mind</router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <user-navbar-menu></user-navbar-menu>
        </v-app-bar>

        <v-navigation-drawer app clipped v-if="$store.getters.getSidebar">
            <v-list>
                <v-list-item :to="{name: 'dashboard'}">
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{ name: 'mypalace', params: { rootId: $store.getters.getUserMindPalaceRootId }}">
                    <v-list-item-title>My mind palace</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Favorites</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{name: 'learning'}">
                    <v-list-item-title>Learning</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>People (under development)</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{name: 'profile'}">
                    <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-container fluid class="fill-height">
            <v-main class="fill-height">
                <router-view></router-view>
            </v-main>
        </v-container>
    </v-container>
</template>


<script>
    import UserNavbarMenu from '@/components/account/UserNavbarMenu'

    export default {
        name: "BaseView",
        components: { UserNavbarMenu },
        data() {
            return {}
        },
        async mounted() {
            await this.$store.dispatch('fetchEnums');
            await this.$store.dispatch('fetchMyActiveSession');
        }
    }
</script>

<style scoped>

</style>