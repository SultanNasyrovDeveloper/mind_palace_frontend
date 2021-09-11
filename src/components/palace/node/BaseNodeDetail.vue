<template>
    <v-container fluid class="ma-0 fill-height d-flex align-start">
        <v-row>
            <v-col cols="12 pb-0">
                <slot name="header"></slot>
            </v-col>
            <v-col cols="7" class="d-flex align-start" style="height: 80vh">
                <slot name="body"></slot>
            </v-col>
            <v-col cols="5">
                <v-container fluid class="ma-0 pa-0">
                    <v-row>
                        <v-col cols="12" class="mb-1 pb-0">
                            <slot name="general"></slot>
                        </v-col>
                        <v-col cols="12" class="my-1 py-0">
                            <slot name="learning"></slot>
                        </v-col>
                        <v-col cols="12" class="my-1 py-0">
                            <slot name="media"></slot>
                        </v-col>
                        <v-col cols="12" class="my-1 py-0">
                            <slot name="connections"></slot>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "BaseNodeDetail"
    }
</script>

<style scoped>

</style>