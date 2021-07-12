<template>
    <node-detail :node="$store.getters.getCurrentNode" @change="updateCurrentNode"></node-detail>
</template>

<script>
    import NodeDetail from '@/components/palace/node/NodeDetail';

    export default {
        name: "NodeDetailView",
        props: ['nodeId'],
        components: {NodeDetail},
        methods: {
            async updateCurrentNode(newData) {
                await this.$store.dispatch('updateNode', [this.nodeId, newData]);
            }
        },
        watch: {
            async nodeId(newValue) {
                if (newValue  !== this.$store.getters.getCurrentNodeId) {
                    await this.$store.dispatch('fetchMindPalaceNode', newValue);
                }
            }
        },
        async mounted() {
            if (this.nodeId !== this.$store.getters.getCurrentNodeId) {
                await this.$store.dispatch('fetchMindPalaceNode', this.nodeId);
            }
        }
    }
</script>

<style scoped>

</style>