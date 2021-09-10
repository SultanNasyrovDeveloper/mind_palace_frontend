<template>
    <v-card>
        <v-card-title>
            NodeMedia
            <v-spacer></v-spacer>
            <v-btn color="success" @click="toggleAddMediaForm">
                <v-icon small mr-4>mdi-plus</v-icon>
                Add media
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-slide-group>
                <v-slide-item
                  v-for="value in [1, 2, 3, 4, 5]"
                  :key="value"
                >
                    <v-btn large>Test</v-btn>
                </v-slide-item>
              </v-slide-group>
        </v-card-text>
        <v-dialog v-model="addMediaForm">
            <v-card>
                <v-card-title>

                </v-card-title>
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