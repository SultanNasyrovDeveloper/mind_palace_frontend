<template>
    <v-container class="d-flex justify-center">
        <signup-form></signup-form>
    </v-container>
</template>

<script>
    import SignupForm from '@/components/user/SignupForm'

    export default {
        name: "SignupView",
        components: { SignupForm }
    }
</script>

<style scoped>

</style>