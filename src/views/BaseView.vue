<template>
    <v-container fluid class="ma-0 pa-0">
        <v-app-bar app>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Palaces Of Mind</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-container>
</template>


<script>
    export default {
        name: "BaseView",
        data() {
            return {}
        }
    }
</script>

<style scoped>

</style>