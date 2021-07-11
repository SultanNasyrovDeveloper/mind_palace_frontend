<template>
    <v-container class="d-flex justify-center">
        <login-form></login-form>
    </v-container>
</template>

<script>
    import LoginForm from '@/components/account/LoginForm'


    export default {
        name: "LoginView",
        components: { LoginForm }
    }
</script>

<style scoped>

</style>