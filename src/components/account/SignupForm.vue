<template>
    <div>
        <v-card style="min-width: 25vw">
            <v-card-title>Signup form</v-card-title>
            <v-card-subtitle>Enter valid username and password.</v-card-subtitle>
            <v-card-text>
                <v-form
                    ref="signupForm"
                    v-model="formIsValid"
                    @submit="signup"
                >
                    <v-container fluid v-if="formErrorMessage">
                        <span class="red--text">{{ formErrorMessage }}</span>
                    </v-container>

                    <v-text-field
                            v-model="username"
                            :rules="usernameRules"
                            :error-messages="passwordErrorMessage"
                            label="Username"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            :rules="usernameRules"
                            :error-messages="passwordErrorMessage"
                            label="Password"
                            type="password"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="confirmPassword"
                            :rules="confirmPasswordRules"
                            :error-messages="confirmPasswordErrorMessage"
                            label="Confirm password"
                            type="password"
                            required
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-center">
                <v-btn @click="$router.push({name: 'index'})" class="px-5">Cancel</v-btn>
                <v-btn @click="reset" class="px-5">Reset</v-btn>
                <v-btn 
                        @click="signup" 
                        type="submit" 
                        class="px-5 teal white--text"
                >sign up</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    const _remove = require('lodash/remove');
    const PASSWORD_NOT_EQUAL_ERROR_MESSAGE = 'Passwords not equal.';


    export default {
        name: "SignupForm",
        data() {
            return {
                formIsValid: false,
                formErrorMessage: null,

                username: '',
                usernameErrorMessage: null,
                usernameRules: [
                    // not in registered namespace
                    // minimun size
                ],

                password: '',
                passwordErrorMessage: null,
                passwordRules: [
                    // password minimun size
                    // basic characters validation
                ],

                confirmPassword: '',
                confirmPasswordErrorMessage: [],
                confirmPasswordRules: [
                ]
            }
        },
        methods: {
            validate() {
                this.validateConfirmPassword();
            },
            validateConfirmPassword() {
                // Validate passwords are equal
                if (this.confirmPassword) {
                    if (this.confirmPassword !== this.password && !this.confirmPasswordErrorMessage.includes(
                        PASSWORD_NOT_EQUAL_ERROR_MESSAGE
                    )) {
                        this.confirmPasswordErrorMessage.push(PASSWORD_NOT_EQUAL_ERROR_MESSAGE);
                    }
                } else {
                    _remove(this.confirmPasswordErrorMessage, PASSWORD_NOT_EQUAL_ERROR_MESSAGE);
                }

            },
            reset() {
                this.$refs.signupForm.reset();
            },
            async signup() {
                this.validate();
                if (this.formIsValid) {
                    const credentials = {username: this.username, password: this.password};
                    const userSignedUp = await this.$store.dispatch('signup', credentials);
                    if (userSignedUp) {
                        const userLoggedIn = await this.$store.dispatch('login', credentials);
                        if (userLoggedIn) {
                            this.$router.push({name: 'dashboard'});
                        }
                    }
                }
            }
        }

    }
</script>

<style scoped>

</style>