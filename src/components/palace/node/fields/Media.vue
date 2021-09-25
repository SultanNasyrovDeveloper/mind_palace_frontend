<template>
    <v-card>
        <v-card-title>NodeMedia</v-card-title>
        <v-card-text>
            <v-slide-group>
                <v-slide-item class="green lighten-2 text--white">
                    <v-btn dark class="mr-1" style="height: 75px; width: 100px;">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-slide-item>
                <v-slide-item v-for="value in [1, 2, 3, 4, 5]" :key="value">
                    <v-btn style="height: 75px; width: 100px;" class="mr-1">Test</v-btn>
                </v-slide-item>
              </v-slide-group>
        </v-card-text>
        <v-dialog v-model="addMediaForm">
            <v-card>
                <v-card-title>Test</v-card-title>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
    export default {
        name: "Media",
        data() {
           return {
               addMediaForm: false,
           }
        },
        methods: {
            toggleAddMediaForm() {

            }
        }
    }
</script>

<style scoped>

</style>