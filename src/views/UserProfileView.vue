<template>
    <v-card>
        <v-card-title>User profile card</v-card-title>
        <v-card-text>
            {{ $store.getters.getUser }}
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "UserProfileView",
        async mounted() {
            if (!this.$store.getters.getUserId) {
                this.$store.dispatch('fetchCurrentUser');
            }
        }

    }
</script>

<style scoped>

</style>