<template>
    <v-card class="ma-1">
        <v-card-title>
            <v-container fluid class="ma-0 pa-0">
                <v-row>
                    <v-col cols="8" class="d-flex align-center">
                        <v-btn
                                plain
                                icon
                                v-if="$store.getters.getMindPalaceRootId"
                                @click="goBackToMindPalace"
                        >
                            <v-icon>mdi-arrow-left</v-icon>
                        </v-btn>
                        <node-breadcrumbs :items="node.ancestors"></node-breadcrumbs>
                    </v-col>
                    <v-col cols="4" class="d-flex justify-end align-center">
                        <v-btn plain>Configure</v-btn>
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
        methods: {
            goBackToMindPalace() {
                if (this.$store.getters.getMindPalaceRootId) {
                    this.$router.push(
                        {name: 'mypalace', params: {rootId: this.$store.getters.getMindPalaceRootId}}
                    );
                }

            }
        }
    }
</script>

<style scoped>

</style>