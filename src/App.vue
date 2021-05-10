<template>
    <v-app>
        <router-view></router-view>

        <v-snackbar v-model="showSnackbar" light app top right timeout="3000">
            {{ $store.getters.getSnackbarText }}
            <template v-slot:action="{ attrs }">
                <v-btn plain @click="showSnackbar = false">
                    <v-icon small>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    computed: {
        showSnackbar: {
            get() {
                return this.$store.getters.getShowSnackbar
            },
            set(newValue) {
                this.$store.commit('setShowSnackbar', false)
            }
        }
    },
    async mounted() {
        await this.$store.dispatch('fetchEnums')
    }
};
</script>

<style>
    @import './assets/mdi/css/materialdesignicons.min.css';
</style>
