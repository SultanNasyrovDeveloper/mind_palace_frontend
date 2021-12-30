<template>
    <v-container fluid>
        <node-detail 
                :node="$store.getters.getCurrentNode" 
                @change="updateCurrentNode"
        ></node-detail>
        <v-overlay :value="loading">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
    </v-container>
</template>

<script>
    import NodeDetail from '@/components/palace/node/NodeDetail';

    export default {
        name: "NodeDetailView",
        props: ['nodeId'],
        components: {NodeDetail},
        data() {
            return {
                loading: false
            }
        },
        methods: {
            async updateCurrentNode(newData) {
                this.loading = true;
                await this.$store.dispatch('updateNode', [this.nodeId, newData]);
                this.loading = false;
            }
        },
        watch: {
            async nodeId(newValue) {
                if (newValue  !== this.$store.getters.getCurrentNodeId) {
                    this.loading = true;
                    await this.$store.dispatch('fetchMindPalaceNode', newValue);
                    this.loading = false;
                }
            }
        },
        async mounted() {
            if (this.nodeId !== this.$store.getters.getCurrentNodeId) {
                this.loading = true;
                await this.$store.dispatch('fetchMindPalaceNode', this.nodeId);
                this.loading = false;
            }
        }
    }
</script>

<style scoped>

</style>