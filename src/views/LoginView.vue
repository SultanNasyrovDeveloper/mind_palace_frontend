<template>
    <v-container class="d-flex justify-center">
        <login-form></login-form>
    </v-container>
</template>

<script>
    import LoginForm from '@/components/user/LoginForm'


    export default {
        name: "LoginView",
        components: { LoginForm }
    }
</script>

<style scoped>

</style>