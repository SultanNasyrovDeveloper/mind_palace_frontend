<template>
    <v-contanier class="d-flex justify-center">
        <signup-form></signup-form>
    </v-contanier>
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