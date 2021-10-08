<template>
    <v-card>
        <v-card-title>
            NodeMedia
            <v-spacer></v-spacer>
            <v-menu offset-y left>
              <template v-slot:activator="{ on, attrs }">
                  <v-btn v-on="on" v-bind="attrs">Add</v-btn>
              </template>
              <v-list>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-youtube</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Youtube</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-icon><v-icon>mdi-image-filter-hdr</v-icon></v-list-item-icon>
                    <v-list-item-title>Image</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

        </v-card-title>
        <v-card-text>
            <v-container fluid class="d-flex">
                <v-row>
                    <v-col cols="2" style="height: 70px; background-color: #3C90BE">Test</v-col>
                    <v-col cols="2" style="height: 70px; background-color: #3C90BE">Test</v-col>
                    <v-col cols="2" style="height: 70px; background-color: #3C90BE">Test</v-col>
                    <v-col cols="2" style="height: 70px; background-color: #3C90BE">Test</v-col>
                    <v-col cols="2" style="height: 70px; background-color: #3C90BE">Test</v-col>
                    <v-col cols="2" style="height: 70px; background-color: #3C90BE">Test</v-col>
                    <v-col cols="2" style="height: 70px; background-color: #3C90BE">Test</v-col>
                </v-row>
            </v-container>
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