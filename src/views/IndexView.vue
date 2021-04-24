<template>
    <v-container fluid class="fill-height grey lighten-3 d-flex justify-center align-center" style="width: 100vw;">
        <v-btn :to="{name: 'signup'}" x-large class="ma-3">Signup</v-btn>
        <v-btn :to="{name: 'login'}" x-large class="ma-3">Login</v-btn>
    </v-container>
</template>

<script>
    export default {
        name: "IndexView"
    }
</script>

<style scoped>

</style>