<template>
    <v-container fluid class="ma-0 pa-0 fill-height grey lighten-4">
        <v-app-bar app clipped-left elevation="1">
            <v-toolbar-title>
                <router-link :to="{name: 'dashboard'}" class="text-decoration-none">
                    <span class="h6 font-weight-black teal--text text--lighten-1">
                        MINDASE:beta
                    </span>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <user-navbar-menu></user-navbar-menu>
        </v-app-bar>

        <v-navigation-drawer app clipped mini-variant mobile-breakpoint="0">
            <v-list>
                <v-list-item :to="{name: 'dashboard'}">
                    <v-list-item-icon><v-icon>mdi-view-dashboard-variant</v-icon></v-list-item-icon>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{ name: 'mypalace', params: { rootId: $store.getters.getUserMindPalaceRootId }}">
                    <v-list-item-icon><v-icon>mdi-sitemap</v-icon></v-list-item-icon>
                    <v-list-item-title>My mind palace</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{name: 'learning'}">
                    <v-list-item-icon><v-icon>mdi-school</v-icon></v-list-item-icon>
                    <v-list-item-title>Learning</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon><v-icon>mdi-heart</v-icon></v-list-item-icon>
                    <v-list-item-title>Favorites</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon><v-icon>mdi-account-group</v-icon></v-list-item-icon>
                    <v-list-item-title>People (under development)</v-list-item-title>
                </v-list-item>
                <v-list-item :to="{name: 'profile'}">
                    <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
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
            if (this.$store.getters.getCurrentLearningSessionId && this.$store.getters.getCurrentLearningNodeId) {
                this.$router.push(
                    {name: 'learning.node', params: {nodeId: this.$store.getters.getCurrentLearningNodeId}}
                )
            }
            if (!this.$store.getters.getUserId) {
                await this.$store.dispatch('fetchCurrentUser');
            }
        }
    }
</script>

<style scoped>

</style>