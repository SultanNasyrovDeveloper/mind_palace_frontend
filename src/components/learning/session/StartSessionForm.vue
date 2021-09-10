<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Start new learning session
            </v-card-title>
            <v-card-text>
                <v-autocomplete
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        label="Target node"
                        autofocus
                        chips
                ></v-autocomplete>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
                <v-btn x-large class="success">Start</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
    
</template>

<script>
    import apiClient from '@/services/api';

    export default {
        name: "StartSessionForm",
        data() {
            return {
                isLoading: false,
                search: '',
                items: []
            }
        },
        watch: {
            async search(newValue) {
                console.log(newValue);
            }
        }
    }
</script>

<style scoped>

</style>