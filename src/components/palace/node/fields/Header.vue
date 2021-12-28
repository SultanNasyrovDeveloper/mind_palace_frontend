<template>
    <v-card class="ma-1">
        <v-card-title>
            <v-container fluid class="ma-0 pa-0">
                <v-row>
                    <v-col cols="6" class="d-flex align-center">
                        <v-btn
                                plain
                                icon
                                v-if="$store.getters.getMindPalaceRootId"
                                class="mr-4"
                                @click="goBackToMindPalace"
                        >
                            <v-icon>mdi-arrow-left-bold</v-icon>
                        </v-btn>
                        <node-breadcrumbs :items="node.ancestors"></node-breadcrumbs>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-end align-center">
                        <node-detail-learning></node-detail-learning>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-title>
    </v-card>
</template>


<script>
    import NodeBreadcrumbs from '@/components/palace/node/fields/Breadcrumbs';
    import NodeDetailLearning from '@/components/learning/NodeDetailLearning'

    export default {
        name: "Header",
        props: ['node'],
        components: { NodeBreadcrumbs, NodeDetailLearning },
        methods: {
            goBackToMindPalace() {
                if (this.$store.getters.getMindPalaceRootId) {
                    this.$router.push(
                        {name: 'mypalace', params: {rootId: this.$store.getters.getMindPalaceRootId}}
                    );
                }
                // TODO: else go to user mind palace root
            }
        }
    }
</script>

<style scoped>

</style>