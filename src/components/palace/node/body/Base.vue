<template>
    <v-container fluid class="ma-0 pa-0 fill-height">
        <v-row class="fill-height">
            <v-col cols="12" class="pb-0 mb-0 mt-0 pt-0">
                <v-card elevation="1" class="rounded-b-0">
                    <v-card-title>
                        <slot name="card-name"></slot>
                        <v-spacer></v-spacer>
                        <slot name="options"></slot>
                    </v-card-title>
                </v-card>
            </v-col>
            <v-col cols="12" class="my-1 py-0 pt-0 mt-0 fill-height">
                <v-card class="rounded-t-0 fill-height elevation-1">
                    <v-card-text class="fill-height">
                        <slot name="editor"></slot>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "BaseNodeBody",
    }
</script>

<style scoped>

</style>