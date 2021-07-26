<template>
    <v-app>
        <router-view></router-view>
        <v-snackbar v-model="snackbar">
            {{ $store.getters.getSnackbarText }}
        </v-snackbar>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    computed: {
        snackbar: {
            get() {
                return this.$store.getters.getShowSnackbar
            },
            set(newValue) {
                this.$store.commit('setShowSnackbar', newValue);
            }
        }
    }
};
</script>

<style>
    @import './assets/mdi/css/materialdesignicons.min.css';
</style>
