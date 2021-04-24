<template>
    <div>
        <v-card style="min-width: 25vw">
            <v-card-title>Signup form</v-card-title>
            <v-card-subtitle>Enter valid username and password.</v-card-subtitle>
            <v-card-text>
                <v-form>
                    <v-text-field label="Username"></v-text-field>
                    <v-text-field label="Password" type="password"></v-text-field>
                    <v-text-field label="Confirm password" type="password"></v-text-field>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "SignupForm"
    }
</script>

<style scoped>

</style>