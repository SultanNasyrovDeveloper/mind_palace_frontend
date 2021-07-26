<template>
    <v-container fluid class="d-flex justify-center">
        <v-card min-width="40vw">
            <v-card-title class="d-flex flex-column align-start">
                <node-breadcrumbs :items="node.ancestors"></node-breadcrumbs>
                {{ node.name }}
            </v-card-title>
            <v-card-subtitle>

            </v-card-subtitle>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
                <v-btn @click="">Finish session</v-btn>
                <v-btn @click="$router.push({name: 'node.detail', params: {nodeId: nodeId}})">
                    See card
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-container>

</template>

<script>
    import { mapGetters } from 'vuex';

    import NodeBreadcrumbs from '@/components/palace/node/fields/Breadcrumbs';


    export default {
        name: "NodeLearningCard",
        props: ['nodeId'],
        components: { NodeBreadcrumbs, },
        computed: {
            ...mapGetters({node: 'getCurrentNode'}),
        },
        methods: {
            async finishSession() {
                await this.$store.dispatch('finishSession');
                this.$router.push({name: 'learning.node', params: {nodeId: 1}});
            }
        },
        watch: {
            async nodeId(newValue) {
                await this.$store.dispatch('fetchMindPalaceNode', newValue);
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchMindPalaceNode', this.nodeId);
        },
    }
</script>

<style scoped>

</style>