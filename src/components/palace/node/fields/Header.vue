<template>
    <v-card class="ma-1">
        <v-card-title>
            <v-container fluid class="ma-0 pa-0">
                <v-row>
                    <v-col cols="8" class="d-flex align-center">
                        <node-breadcrumbs :items="node.ancestors"></node-breadcrumbs>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end align-center">
                        <v-btn plain>Configure</v-btn>
                        <v-btn icon class="px-2 py-1" @click="$emit('close')">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
    </v-card>
</template>


<script>
    import NodeBreadcrumbs from '@/components/palace/node/fields/Breadcrumbs';


    export default {
        name: "Header",
        props: ['node'],
        components: { NodeBreadcrumbs, },
        computed: {

        }
    }
</script>

<style scoped>

</style>